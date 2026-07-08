<?php

namespace App\Services\Sipec;

use Illuminate\Support\Facades\Cache;
use App\Exceptions\RequestConectaGovException;
use App\Facades\SipecLog;
use App\Exceptions\SipecApiRetryableException;
use App\Repository\SipecSyncCheckpointRepository;
use App\Services\Sipec\Servidor\SipecServidorSincronizacaoService;
use App\Services\Sipec\Unidade\SipecUnidadeSincronizacaoService;

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

    private SipecSyncCheckpointRepository $checkpointRepository;
    private SipecUnidadeSincronizacaoService $sipecUnidadesService;
    private SipecServidorSincronizacaoService $sipecServidoresService;

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

        $this->checkpointRepository = app(SipecSyncCheckpointRepository::class);
        $this->sipecUnidadesService = new SipecUnidadeSincronizacaoService($this);
        $this->sipecServidoresService = new SipecServidorSincronizacaoService($this);
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
            SipecLog::error('SIPEC token cURL error: ' . $error);
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
     * Delega para SipecServidorSincronizacaoService.
     */
    public function buscarServidores(?string $codUorg = null, bool $participaPgd = true): array
    {
        return $this->sipecServidoresService->buscarServidores($codUorg, $participaPgd);
    }

    public function buscarServidorPorCpf(string $cpf, ?string $codUorg = null): ?array
    {
        return $this->sipecServidoresService->buscarServidorPorCpf($cpf, $codUorg);
    }

    public function buscarServidoresDaUnidade(string $codUorg, bool $participaPgd = true): array
    {
        return $this->sipecServidoresService->buscarServidoresDaUnidade($codUorg, $participaPgd);
    }

    /**
     * Busca os dados de uma unidade pelo código UORG.
     * Delega para SipecUnidadesService.
     */
    public function buscarUnidade(?string $codUorg = null): ?array
    {
        return $this->sipecUnidadesService->buscarUnidade($codUorg);
    }

    public function getCodUorg(): string
    {
        return $this->codUorg;
    }

    public function getCodOrgao(): string
    {
        return $this->codOrgao;
    }

    /**
     * Executa requisição GET autenticada na API SIPEC.
     *
     * @param string $path Path relativo (ex: '/api-sipec/v1/unidades?codUorg=123')
     * @param string $token Token de autenticação
     */
    public function executarGet(string $path, string $token): array
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->url . $path,
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
            SipecLog::error('SIPEC cURL error: ' . $error);
            throw new RequestConectaGovException('SIPEC cURL error: ' . $error);
        }

        $curl = null;

        if ($httpCode >= 400) {
            SipecLog::error('SIPEC HTTP ' . $httpCode, ['response' => $response]);
            throw new RequestConectaGovException('SIPEC: HTTP ' . $httpCode . ' - ' . $response, $httpCode);
        }

        $data = json_decode($response, true);

        if (!is_array($data)) {
            SipecLog::error('SIPEC: resposta inválida', ['response' => $response]);
            throw new RequestConectaGovException('SIPEC: resposta inválida');
        }

        return $data;
    }

    /**
     * Executa Fase 0 completa com resiliência: Redis lock, checkpoint por página, retry adaptativo.
     * Retomável do ponto de falha sem overlap.
     *
     * @param string|null $tenantId
     * @param string|null $dataUltimaTransacaoUnidades Data da última execução sem falhas de unidades (filtro delta)
     * @param string|null $dataUltimaTransacaoServidores Data da última execução sem falhas de servidores (filtro delta)
     */
    public function executarFase0(?string $tenantId = null, ?string $dataUltimaTransacaoUnidades = null, ?string $dataUltimaTransacaoServidores = null): array
    {
        $lockKey = 'sipec_fase0_' . ($tenantId ?? 'default');
        $lock = Cache::lock($lockKey, 600);

        if (!$lock->get()) {
            SipecLog::warning("SIPEC Fase 0: já em execução para tenant {$tenantId}");
            return ['status' => 'locked', 'unidades' => 0, 'servidores' => 0];
        }

        try {
            $checkpoint = $this->checkpointRepository->firstOrCreateByTenantId($tenantId, 'unidades', 0);

            $totalUnidades = 0;
            $totalServidores = 0;

            if ($checkpoint->etapa === 'unidades') {
                $codUorg = $this->codUorg !== '' ? $this->codUorg : null;
                $totalUnidades = $this->sipecUnidadesService->coletarUnidadesPaginado($tenantId, $checkpoint->ultima_pagina, $dataUltimaTransacaoUnidades, $codUorg);
                $this->checkpointRepository->updateByTenantId($tenantId, 'servidores', 0, null);
                $checkpoint = $this->checkpointRepository->findByTenantId($tenantId);
            }

            if ($checkpoint->etapa === 'servidores') {
                $totalServidores = $this->sipecServidoresService->coletarServidoresPaginado($tenantId, $checkpoint->ultima_pagina ?? 0, $dataUltimaTransacaoServidores);
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

    /**
     * GET com retry adaptativo:
     * - 5XX / timeout: backoff exponencial longo (5s, 15s, 45s)
     * - 4XX: fail fast (não retryable)
     * - cURL error: retry com backoff curto (2s, 4s, 8s)
     */
    public function executarGetComRetry(string $path, int $maxRetries = 3): array
    {
        $attempt = 0;

        while (true) {
            try {
                $token = $this->getToken();
                return $this->executarGet($path, $token);
            } catch (RequestConectaGovException $e) {
                $attempt++;
                $httpCode = $e->getCode();

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

                SipecLog::warning("SIPEC retry {$attempt}/{$maxRetries}", [
                    'path' => $path,
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
