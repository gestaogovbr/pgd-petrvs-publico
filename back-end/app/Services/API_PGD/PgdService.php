<?php
namespace App\Services\API_PGD;

use App\Exceptions\ExportPgdException;
use App\Exceptions\LogError;
use App\Exceptions\TokenPgdException;
use App\Jobs\Envio\Resources\ParticipanteResource;
use App\Jobs\Envio\Resources\PlanoEntregaResource;
use App\Jobs\Envio\Resources\PlanoTrabalhoResource;
use App\Models\Tenant;
use App\Services\API_PGD\Types\ParticipantePgdType;
use Exception;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class PgdService
{
    CONST TIMEOUT = 35;
    private mixed $logReponse = null;
    private ?\Exception $exception = null;

    public function getHttpClient($tenantId) : \Illuminate\Http\Client\PendingRequest
    {
        $token = $this->authenticate($tenantId);

        $service = $this;

        $tenant = Tenant::find($tenantId);

        return Http::withOptions([
                'verify'=> false,
                'timeout'=> self::TIMEOUT,
                //'debug' => true
            ])
            ->baseUrl($tenant->api_url)
            ->withHeader('User-Agent', 'Petrvs/'.config('app.version'))
            ->withToken($token)
            ->retry(2, 0,
                function (Exception $exception, PendingRequest $request) use ($tenantId, $service) {
                    // Retry em caso de erro 401, obtem novo token
                    if (! $exception instanceof RequestException || $exception->response->status() !== 401) {
                        return false;
                    }

                    Log::info('TIMEOUT DE TOKEN. Reobtendo...');
                    $this->clearToken($tenantId);
                    $token = $this->authenticate($tenantId);
                    Log::info('Novo token obtido!');

                    $service->setToken($tenantId, $token);

                    $request->withToken($token);

                    return true;
                }
            );
    }

    public function enviarDados($tenantId, $endpoint, $body) : bool
    {
        $this->exception = null;

        try {
            $response = $this->getHttpClient($tenantId)
                ->put($endpoint, $body);

            return $response->successful();

        } catch(TokenPgdException $e) {
            throw $e;
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
                    ". Msg: ".$exception->getMessage()
                );
            }
        } catch(\Throwable $exception) {
            throw new ExportPgdException(
                "Erro inesperado: ".$exception->getMessage()
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
        $token = self::getToken($tenantId);

        if ($token){
            self::setToken($tenantId, $token);
            return $token;
        }

        $tenant = Tenant::find($tenantId);

        if (!$tenant['api_url']) {
            $errorMsg = 'Endereço URL da API PGD não definidos no Tenant '.$tenantId;
            throw new TokenPgdException($errorMsg);
        }

        if (!$tenant['api_cod_unidade_autorizadora']) {
            $errorMsg = 'Unidade Autorizadora não definida no Tenant '.$tenantId;
            throw new TokenPgdException($errorMsg);
        }

        if (!$tenant['api_username'] or !$tenant['api_password']) {
            $errorMsg = 'Usuário ou senha da API PGD não definidos no Tenant '.$tenantId;
            throw new TokenPgdException($errorMsg);
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

            self::setToken($tenantId, $token);

            return $token;
        } catch(\Throwable $e) {
            Log::error("Erro ao obter Token da API PGD: ".$e->getMessage());
            LogError::newError("Erro ao obter Token da API PGD: ");
            throw new TokenPgdException("Erro ao obter Token da API PGD: ".$e->getMessage());
        }
    }

    public function enviarParticipante($tenantId, $api_cod_unidade_autorizadora, ParticipanteResource $participante) : bool
    {
        $body = (object) json_decode($participante->toJson(), true);
        $body->cod_unidade_autorizadora = $api_cod_unidade_autorizadora;

        $url = "/organizacao/SIAPE/{$api_cod_unidade_autorizadora}/{$participante->cod_unidade_lotacao}/participante/{$participante->matricula_siape}";

        return $this->enviarDados($tenantId, $url, $participante);
    }

    public function enviarPlanoEntrega($tenantId, $api_cod_unidade_autorizadora, PlanoEntregaResource $planoEntrega) : bool
    {
        $body = (object) json_decode($planoEntrega->toJson(), true);
        $body->cod_unidade_autorizadora = $api_cod_unidade_autorizadora;

        $url = "/organizacao/SIAPE/{$api_cod_unidade_autorizadora}/plano_entregas/{$planoEntrega->id_plano_entregas}";

        return $this->enviarDados($tenantId, $url, $planoEntrega);
    }

    public function enviarPlanoTrabalho($tenantId, $api_cod_unidade_autorizadora, PlanoTrabalhoResource $planoTrabalho) : bool
    {
        $body = (object) json_decode($planoTrabalho->toJson(), true);
        $body->cod_unidade_autorizadora = $api_cod_unidade_autorizadora;

        $url = "/organizacao/SIAPE/{$api_cod_unidade_autorizadora}/plano_trabalho/{$planoTrabalho->id}";

        return $this->enviarDados($tenantId, $url, $planoTrabalho);
    }

    public static function setToken($tenantId, $token) {
        Cache::put("pgd_token_$tenantId", $token, 60*10);
    }

    public static function getToken($tenantId) {
        return Cache::get("pgd_token_$tenantId", false);
    }

    public static function clearToken($tenantId) {
        Cache::delete("pgd_token_$tenantId");
    }
}

