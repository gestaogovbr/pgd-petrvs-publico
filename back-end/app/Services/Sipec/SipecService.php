<?php

namespace App\Services\Sipec;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use App\Exceptions\RequestConectaGovException;
use App\Exceptions\SipecApiRetryableException;
use App\Repository\SipecUnidadeRepository;
use App\Repository\SipecServidorRepository;
use App\Repository\SipecSyncCheckpointRepository;

class SipecService
{
    private const CACHE_KEY_PREFIX = 'sipec_token:';
    private const TOKEN_TTL_MARGIN_SECONDS = 300;

    private string $url;
    private string $client;
    private string $secret;
    private string $cpf;
    private string $codUorg;
    private string $codOrgao;
    private string $authorizationHeader;

    private ?string $cachedToken = null;
    private $cachedTokenExpiresAt = null;

    private SipecUnidadeRepository $sipecUnidadeRepository;
    private SipecServidorRepository $sipecServidorRepository;
    private SipecSyncCheckpointRepository $checkpointRepository;

    public function __construct(?array $config = null)
    {
        $config = $config ?? config('integracao.sipec');
        $this->url = $config['url'];
        $this->client = $config['conectagov_chave'];
        $this->secret = $config['conectagov_senha'];
        $this->cpf = $config['cpf'];
        $this->codUorg = $config['codUorg'] ?? '';
        $this->codOrgao = $config['codOrgao'] ?? '';
        $this->authorizationHeader = 'Basic ' . base64_encode($this->client . ':' . $this->secret);

        $this->sipecUnidadeRepository = app(SipecUnidadeRepository::class);
        $this->sipecServidorRepository = app(SipecServidorRepository::class);
        $this->checkpointRepository = app(SipecSyncCheckpointRepository::class);
    }

    public function getToken(): string
    {
        // 1. Cache em memória (mesma instância)
        if ($this->cachedToken && now()->lessThan($this->cachedTokenExpiresAt)) {
            return $this->cachedToken;
        }

        // 2. Cache Redis (compartilhado entre processos, segregado por tenant)
        $cacheKey = $this->getCacheKey();
        $cached = Cache::get($cacheKey);
        if ($cached && isset($cached['token'], $cached['expires_at'])) {
            $expiresAt = $cached['expires_at'];
            if (now()->timestamp < $expiresAt) {
                $this->cachedToken = $cached['token'];
                $this->cachedTokenExpiresAt = now()->setTimestamp($expiresAt);
                return $this->cachedToken;
            }
            Cache::forget($cacheKey);
        }

        // 3. Token via variável de ambiente (dev/debug)
        $envToken = config('integracao.sipec.token');
        if (!empty($envToken)) {
            return $this->storeToken($envToken);
        }

        // 4. Solicitar novo token ao ConectaGov
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->url . '/oauth2/jwt-token',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/x-www-form-urlencoded',
                'Authorization: ' . $this->authorizationHeader,
            ],
            CURLOPT_POSTFIELDS => http_build_query(['grant_type' => 'client_credentials']),
        ]);

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            $error = curl_error($curl);
            $curl = null;
            Log::error('SIPEC token cURL error: ' . $error);
            throw new RequestConectaGovException('SIPEC cURL error: ' . $error);
        }

        $curl = null;

        $data = json_decode($response, true);

        if (isset($data['access_token'])) {
            return $this->storeToken($data['access_token']);
        }

        throw new RequestConectaGovException('SIPEC: Falha ao gerar token. Response: ' . $response);
    }

    /**
     * Armazena token em memória e Redis com TTL baseado no exp do JWT.
     */
    private function storeToken(string $token): string
    {
        $ttlSeconds = $this->extractTtlFromJwt($token);
        $expiresAt = now()->addSeconds($ttlSeconds);

        $this->cachedToken = $token;
        $this->cachedTokenExpiresAt = $expiresAt;

        Cache::put($this->getCacheKey(), [
            'token' => $token,
            'expires_at' => $expiresAt->timestamp,
        ], $ttlSeconds);

        return $token;
    }

    /**
     * Extrai TTL em segundos do campo `exp` do JWT, com margem de segurança.
     * Retorna fallback de 55 minutos se não conseguir decodificar.
     */
    private function extractTtlFromJwt(string $jwt): int
    {
        $parts = explode('.', $jwt);
        if (count($parts) < 2) {
            return 55 * 60;
        }

        $payload = json_decode(base64_decode(strtr($parts[1], '-_', '+/')), true);

        if (!is_array($payload) || !isset($payload['exp'])) {
            return 55 * 60;
        }

        $ttl = (int) $payload['exp'] - time() - self::TOKEN_TTL_MARGIN_SECONDS;

        return max($ttl, 60);
    }

    /**
     * Consulta servidores por código UORG.
     *
     * @param string|null $codUorg Código da UORG (usa config se null)
     * @param bool $participaPgd Filtrar apenas participantes PGD
     * @return array Dados dos servidores retornados pela API SIPEC
     */
    public function buscarServidores(?string $codUorg = null, bool $participaPgd = true): array
    {
        $codUorg = $codUorg ?? $this->codUorg;
        $token = $this->getToken();

        $params = ['codUorg' => $codUorg];
        $params =['codSitFuncional' =>'1'];
        if ($this->codOrgao !== '') {
            $params['codOrgao'] = $this->codOrgao;
        }
        // if ($participaPgd) {
        //     $params['participaPGD'] = '';
        // }
        $url = $this->url . '/api-sipec/v1/servidores?' . http_build_query($params);

        return $this->executarGet($url, $token);
    }

    /**
     * Busca um servidor específico por CPF.
     *
     * @param string $cpf CPF do servidor (apenas dígitos)
     * @param string|null $codUorg Código da UORG (usa config se null)
     * @return array|null Dados do servidor ou null se não encontrado
     */
    public function buscarServidorPorCpf(string $cpf, ?string $codUorg = null): ?array
    {
        $codUorg = $codUorg ?? $this->codUorg;
        $token = $this->getToken();

        $params = ['codUorg' => $codUorg, 'cpf' => $cpf];
        if ($this->codOrgao !== '') {
            // $params['codOrgao'] = $this->codOrgao;
        }
        $url = $this->url . '/api-sipec/v1/servidores?' . http_build_query($params);

        $data = $this->executarGet($url, $token);

        // API pode retornar lista paginada (content) ou array direto
        $servidores = $data['content'] ?? $data;

        if (!is_array($servidores)) {
            return null;
        }

        // Se retornou lista, filtrar pelo CPF
        foreach ($servidores as $servidor) {
            $cpfServidor = preg_replace('/[^0-9]/', '', $servidor['cpf'] ?? '');
            if ($cpfServidor === $cpf) {
                return $servidor;
            }
        }

        return null;
    }

    /**
     * Consulta todos os servidores de uma UORG (usado na sincronização de unidade).
     *
     * @param string $codUorg Código da UORG
     * @param bool $participaPgd Filtrar apenas participantes PGD
     * @return array Lista paginada (chave 'content') com os servidores
     */
    public function buscarServidoresDaUnidade(string $codUorg, bool $participaPgd = true): array
    {
        return $this->buscarServidores($codUorg, $participaPgd);
    }

    /**
     * Busca os dados de uma unidade pelo código UORG.
     * Endpoint: GET /unidades  (UnidadeDetalhadaDTO — OpenAPI SIGEPE-Integra)
     *
     * @param string|null $codUorg Código da UORG (usa config se null)
     * @return array|null Dados da unidade ou null se não encontrada
     */
    public function buscarUnidade(?string $codUorg = null): ?array
    {
        $codUorg = $codUorg ?? $this->codUorg;
        $token = $this->getToken();
        $params = ['codUorg' => $codUorg];
        if ($this->codOrgao !== '') {
            $params['codOrgao'] = $this->codOrgao;
        }
        $url = $this->url . '/api-sipec/v1/unidades?' . http_build_query($params);

        try {
            $data    = $this->executarGet($url, $token);
            $itens   = $data['content'] ?? $data;

            if (!is_array($itens) || empty($itens)) {
                return null;
            }

            // Filtra pelo código exato caso a API retorne mais de um resultado
            foreach ($itens as $item) {
                if ((string) ($item['codUorg'] ?? '') === $codUorg) {
                    return $item;
                }
            }

            return $itens[0] ?? null;
        } catch (\Exception $e) {
            Log::warning('SIPEC: unidade não encontrada', ['codUorg' => $codUorg, 'error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Executa requisição GET autenticada na API SIPEC.
     */
    protected function executarGet(string $url, string $token): array
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $token,
                'x-cpf-usuario: ' . $this->cpf,
            ],
        ]);

        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        if (curl_errno($curl)) {
            $error = curl_error($curl);
            $curl = null;
            Log::error('SIPEC cURL error: ' . $error);
            throw new RequestConectaGovException('SIPEC cURL error: ' . $error);
        }

        $curl = null;

        if ($httpCode >= 400) {
            Log::error('SIPEC HTTP ' . $httpCode, ['response' => $response]);
            throw new RequestConectaGovException('SIPEC: HTTP ' . $httpCode . ' - ' . $response, $httpCode);
        }

        $data = json_decode($response, true);

        if (!is_array($data)) {
            Log::error('SIPEC: resposta inválida', ['response' => $response]);
            throw new RequestConectaGovException('SIPEC: resposta inválida');
        }

        return $data;
    }

    /**
     * Executa Fase 0 completa com resiliência: Redis lock, checkpoint por página, retry adaptativo.
     * Retomável do ponto de falha sem overlap.
     */
    public function executarFase0(?string $tenantId = null): array
    {
        $lockKey = 'sipec_fase0_' . ($tenantId ?? 'default');
        $lock = Cache::lock($lockKey, 600);

        if (!$lock->get()) {
            Log::warning("SIPEC Fase 0: já em execução para tenant {$tenantId}");
            return ['status' => 'locked', 'unidades' => 0, 'servidores' => 0];
        }

        try {
            $checkpoint = $this->checkpointRepository->firstOrCreateByTenantId($tenantId, 'unidades', 0);

            $totalUnidades = 0;
            $totalServidores = 0;

            if ($checkpoint->etapa === 'unidades') {
                $totalUnidades = $this->coletarUnidadesPaginado($tenantId, $checkpoint->ultima_pagina);
                $this->checkpointRepository->updateByTenantId($tenantId, 'servidores', 0, null);
                $checkpoint = $this->checkpointRepository->findByTenantId($tenantId);
            }

            if ($checkpoint->etapa === 'servidores') {
                $totalServidores = $this->coletarServidoresPaginado($tenantId, $checkpoint->ultima_pagina ?? 0);
                $this->checkpointRepository->updateByTenantId($tenantId, 'completo', 0, null);
            }

            return ['status' => 'completo', 'unidades' => $totalUnidades, 'servidores' => $totalServidores];
        } finally {
            $lock->release();
        }
    }

    /**
     * Reseta checkpoint para permitir re-execução completa.
     */
    public function resetarCheckpoint(?string $tenantId = null): void
    {
        $this->checkpointRepository->deleteByTenantId($tenantId);
    }

    private function coletarUnidadesPaginado(?string $tenantId, int $startPage): int
    {
        $page = $startPage;
        $size = 100;
        $total = 0;

        do {
            $params = http_build_query([
                'codOrgao' => $this->codOrgao,
                'page' => $page,
                'size' => $size,
            ]);
            $url = $this->url . '/api-sipec/v1/unidades?' . $params;

            $data = $this->executarGetComRetry($url);
            $itens = $data['content'] ?? [];
            $totalPages = $data['totalPages'] ?? 1;

            foreach ($itens as $item) {
                $this->sipecUnidadeRepository->updateOrCreateByCodigo(
                    (string) ($item['codUorg'] ?? ''),
                    json_encode($item, JSON_UNESCAPED_UNICODE),
                    false,
                    $item['dataUltimaTransacao'] ?? null
                );
                $total++;
            }

            $this->checkpointRepository->updateByTenantId($tenantId, 'unidades', $page + 1, $totalPages);
            $page++;
        } while ($page < $totalPages);

        return $total;
    }

    private function coletarServidoresPaginado(?string $tenantId, int $startPage): int
    {
        $page = $startPage;
        $size = 100;
        $total = 0;

        do {
            $params = http_build_query([
                'codUorg' => $this->codUorg,
                'codSitFuncional' => '1',
                'codOrgao' => $this->codOrgao,
                'page' => $page,
                'size' => $size,
            ]);
            $url = $this->url . '/api-sipec/v1/servidores?' . $params;

            $data = $this->executarGetComRetry($url);
            $itens = $data['content'] ?? [];
            $totalPages = $data['totalPages'] ?? 1;

            foreach ($itens as $item) {
                $primeiroVinculo = $item['vinculos'][0] ?? $item['vinculos']['0'] ?? [];
                $cpf = $item['cpf'] ?? null;
                $matricula = isset($primeiroVinculo['matriculaSiape']) ? (string) $primeiroVinculo['matriculaSiape'] : null;

                if ($cpf) {
                    $this->sipecServidorRepository->updateOrCreateByCpfAndMatricula(
                        $cpf,
                        $matricula,
                        json_encode($item, JSON_UNESCAPED_UNICODE),
                        false,
                        $primeiroVinculo['dataUltimaTransacao'] ?? null
                    );
                    $total++;
                }
            }

            $this->checkpointRepository->updateByTenantId($tenantId, 'servidores', $page + 1, $totalPages);
            $page++;
        } while ($page < $totalPages);

        return $total;
    }

    /**
     * GET com retry adaptativo:
     * - 5XX / timeout: backoff exponencial longo (5s, 15s, 45s)
     * - 4XX: fail fast (não retryable)
     * - cURL error: retry com backoff curto (2s, 4s, 8s)
     */
    protected function executarGetComRetry(string $url, int $maxRetries = 3): array
    {
        $attempt = 0;

        while (true) {
            try {
                $token = $this->getToken();
                return $this->executarGet($url, $token);
            } catch (RequestConectaGovException $e) {
                $attempt++;
                $httpCode = $e->getCode();

                // 4XX: não retryable — erro de cliente
                if ($httpCode >= 400 && $httpCode < 500) {
                    throw $e;
                }

                if ($attempt >= $maxRetries) {
                    throw new SipecApiRetryableException(
                        $httpCode ?: 0,
                        "Falha após {$maxRetries} tentativas: {$e->getMessage()}",
                        $e
                    );
                }

                // 5XX: backoff exponencial longo (5s, 15s, 45s)
                if ($httpCode >= 500) {
                    $delay = 5 * pow(3, $attempt - 1);
                } else {
                    // Erro de rede/cURL: backoff curto (2s, 4s, 8s)
                    $delay = 2 * pow(2, $attempt - 1);
                }

                Log::warning("SIPEC retry {$attempt}/{$maxRetries}", [
                    'url' => $url,
                    'httpCode' => $httpCode,
                    'delay_seconds' => $delay,
                ]);

                $this->retrySleep($delay);
            }
        }
    }

    /**
     * Pausa entre tentativas de retry. Extraído para permitir override em testes.
     */
    protected function retrySleep(int $seconds): void
    {
        sleep($seconds);
    }

    /**
     * Invalida o token em cache (instância + Redis).
     */
    public function invalidateToken(): void
    {
        $this->cachedToken = null;
        $this->cachedTokenExpiresAt = null;
        Cache::forget($this->getCacheKey());
    }

    private function getCacheKey(): string
    {
        $tenantId = function_exists('tenant') ? (tenant('id') ?? 'default') : 'default';
        return self::CACHE_KEY_PREFIX . $tenantId;
    }
}
