<?php

namespace App\Services\Sipec;

use Illuminate\Support\Facades\Log;
use App\Exceptions\RequestConectaGovException;

class SipecService
{
    private const TOKEN_TTL_MINUTES = 59;

    private string $url;
    private string $client;
    private string $secret;
    private string $cpf;
    private string $codUorg;
    private string $authorizationHeader;

    private static ?string $token = null;
    private static $tokenExpiresAt = null;

    public function __construct(?array $config = null)
    {
        $config = $config ?? config('integracao.sipec');
        $this->url = $config['url'];
        $this->client = $config['conectagov_chave'];
        $this->secret = $config['conectagov_senha'];
        $this->cpf = $config['cpf'];
        $this->codUorg = $config['codUorg'] ?? '';
        $this->authorizationHeader = 'Basic ' . base64_encode($this->client . ':' . $this->secret);
    }

    public function getToken(): string
    {
        if (self::$token && now()->lessThan(self::$tokenExpiresAt)) {
            return self::$token;
        }

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
            curl_close($curl);
            Log::error('SIPEC token cURL error: ' . $error);
            throw new RequestConectaGovException('SIPEC cURL error: ' . $error);
        }

        curl_close($curl);

        $data = json_decode($response, true);

        if (isset($data['access_token'])) {
            self::$token = $data['access_token'];
            self::$tokenExpiresAt = now()->addMinutes(self::TOKEN_TTL_MINUTES);
            return self::$token;
        }

        throw new RequestConectaGovException('SIPEC: Falha ao gerar token. Response: ' . $response);
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

        $url = $this->url . '/api-sipec/v1/servidores?codUorg=' . $codUorg;
        if ($participaPgd) {
            $url .= '&participaPGD';
        }

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

        $url = $this->url . '/api-sipec/v1/servidores?codUorg=' . $codUorg . '&cpf=' . $cpf;

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
     * @param string $codUorg Código da UORG
     * @return array|null Dados da unidade ou null se não encontrada
     */
    public function buscarUnidade(string $codUorg): ?array
    {
        $token = $this->getToken();
        // codOrgao
        $url   = $this->url . '/api-sipec/v1/unidades?' . http_build_query(['codUorg' => $codUorg]);

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
    private function executarGet(string $url, string $token): array
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
            curl_close($curl);
            Log::error('SIPEC cURL error: ' . $error);
            throw new RequestConectaGovException('SIPEC cURL error: ' . $error);
        }

        curl_close($curl);

        if ($httpCode >= 400) {
            Log::error('SIPEC HTTP ' . $httpCode, ['response' => $response]);
            throw new RequestConectaGovException('SIPEC: HTTP ' . $httpCode . ' - ' . $response);
        }

        $data = json_decode($response, true);

        if (!is_array($data)) {
            Log::error('SIPEC: resposta inválida', ['response' => $response]);
            throw new RequestConectaGovException('SIPEC: resposta inválida');
        }

        return $data;
    }

    /**
     * Invalida o token em cache (útil para testes).
     */
    public static function invalidateToken(): void
    {
        self::$token = null;
        self::$tokenExpiresAt = null;
    }
}
