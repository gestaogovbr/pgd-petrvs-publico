<?php
namespace App\Services\API_PGD;

use App\Exceptions\ExportPgdException;
use App\Exceptions\LogError;
use App\Models\Tenant;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Exception;

class PgdService
{
    CONST TIMEOUT = 35;
    private mixed $logReponse = null;
    private ?\Exception $exception = null;

    public function getHttpClient($tenantId, $url) : \Illuminate\Http\Client\PendingRequest
    {
        $token = $this->getToken($tenantId);

        if (!$token) {
            $token = $this->authenticate($tenantId);
        }

        $service = $this;

        return Http::withOptions([
                'verify'=> false,
                'timeout'=> self::TIMEOUT,
                //'debug' => true
            ])
            ->baseUrl($url)
            ->withHeader('User-Agent', 'Petrvs/'.config('app.version'))
            ->withToken($token)
            ->retry(2, 0,
                function (Exception $exception, PendingRequest $request) use ($tenantId, $service) {
                    // Retry em caso de erro 401, obtem novo token
                    if (! $exception instanceof RequestException || $exception->response->status() !== 401) {
                        return false;
                    }

                    Log::info('TIMEOUT DE TOKEN. Reobtendo...');
                    $token = $this->authenticate($tenantId);
                    Log::info('Novo token obtido!');

                    $service->setToken($tenantId, $token);

                    $request->withToken($token);

                    return true;
                }
            );
    }

    public function enviarDados($tenantId, $url, $endpoint, $body) : bool
    {
        $this->exception = null;

        try {
            $response = $this->getHttpClient($tenantId, $url)
                ->put($endpoint, $body);

            return $response->successful();

        } catch (RequestException $exception) {
            $response = $exception->response;

            if ($response && $response->status() == 422)
            {
                $data = $response->json();

                if (is_array($data['detail'])) {
                    $errorData = $data['detail'][0];
                    throw new ExportPgdException($errorData['msg'].' '.implode(', ', $errorData['loc'])); //. ' Data: '.print_r($body, true));
                } else {
                    throw new ExportPgdException($data['detail']); //. ' Data: '.print_r($body, true));
                }

            } else {
                throw new ExportPgdException(
                    "Erro inesperado. Status: ".($response ? $response->status() : '').
                    ". Msg: ".$exception->getMessage().
                    ". URL: ".$endpoint.
                    ". Data: ".print_r($body, true)
                );
            }
        } catch(\Throwable $exception) {
            throw new ExportPgdException(
                "Erro inesperado.".
                ". Msg: ".$exception->getMessage().
                ". URL: ".$endpoint.
                ". Data: ".print_r($body, true)
            );
        }
    }

    public function getLogReponse() : mixed
    {
      return $this->logReponse;
    }

    public function getException() : ?\Exception
    {
      return $this->exception;
    }

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

            if (!$response->successful())
            {
                if ($response->status() == Response::HTTP_UNPROCESSABLE_ENTITY)
                {
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
        return Cache::get("pgd_token_$tenantId", false);
    }
}

