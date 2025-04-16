<?php

namespace App\Services\API_PGD;

use App\Exceptions\BadRequestException as ExceptionsBadRequestException;
use App\Exceptions\LogError;
use App\Models\Tenant;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;
use App\Exceptions\ExportPgdException;
use Illuminate\Support\Facades\Cache;

class AuthenticationService
{
    public function authenticate(string $tenantId)
    {
        $tenant = Tenant::find($tenantId);

        if (!$tenant['api_url']) {
            $errorMsg = 'Endereço URL da API PGD não definidos no Tenant '.$tenantId;
            throw new ExportPgdException($errorMsg);
        }

        if (!$tenant['api_cod_unidade_autorizadora']) {
            $errorMsg = 'Unidade Autorizadora não definida no Tenant '.$tenantId;
            throw new ExportPgdException($errorMsg);
        }

        if (!$tenant['api_username'] or !$tenant['api_password']) {
            $errorMsg = 'Usuário ou senha da API PGD não definidos no Tenant '.$tenantId;
            throw new ExportPgdException($errorMsg);
        }

        try {
            $response = Http::baseUrl($tenant['api_url'])
                ->asForm()
                ->post('/token', [
                    'username' => $tenant['api_username'],
                    'password' => $tenant['api_password']
                ]);

            if (!$response->successful()) {
                if ($response->status() == Response::HTTP_UNPROCESSABLE_ENTITY) {
                    $data = $response->json();

                    if (is_array($data['detail'])) {
                        $detail = $data['detail'];
                    } else {
                        $detail = json_decode($data['detail'], true);
                    }

                    Log::error("Erro no tenant $tenant->id: ".$detail[0]['msg']);
                } else {
                    $response->throw();
                }
            }

            $dados = $response->json();
            $token = $dados['access_token'];

            $this->setToken($tenantId, $token);

            return $token;
        } catch(\Throwable $e) {
            Log::error("Erro ao obter Token da API PGD: ".$e->getMessage());
            LogError::newError("Erro ao obter Token da API PGD: ");
            throw $e;
        }
    }

    public function setToken($tenantId, $token) {
        Cache::put("pgd_token_$tenantId", $token);
    }

    public function getToken($tenantId) {
        Cache::put("pgd_token_$tenantId", false);
    }
}
