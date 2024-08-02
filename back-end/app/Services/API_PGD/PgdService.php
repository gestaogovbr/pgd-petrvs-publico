<?php
namespace App\Services\API_PGD;

use App\Exceptions\ExportPgdException;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Client\RequestException;

class PgdService
{
    CONST TIMEOUT = 35;
    private mixed $logReponse = null;
    private ?\Exception $exception = null;
    public function getHttpClient($token) : \Illuminate\Http\Client\PendingRequest
    {
        return Http::withOptions(['verify'=> false, 'timeout'=> self::TIMEOUT])
            ->baseUrl(config('pgd.host'))
            ->withToken($token);
    }

    public function enviarDados($token, $endpoint, $body) : bool
    {
      try {
        $this->exception = null;

        $response = $this->getHttpClient($token)->put($endpoint, $body)
          ->throw(function (Response $response, RequestException $e) {
            $this->logReponse = $response;
          });
        return $response->successful();

      } catch (\Exception $e) {
        $this->exception = $e;

        $response = $this->getLogReponse();
        
        if ($response->status() == 422) {
          $data = $response->json();

          if (is_array($data['detail'])) {
            $errorData = $data['detail'][0];
            throw new ExportPgdException($errorData['msg'].' '.implode(', ', $errorData['loc']));
          } else {
            throw new ExportPgdException($data['detail']);
          }
          
        } else {
          throw new ExportPgdException('Erro inesperado. Status: '.$response->status().
            ". Msg: ".$e->getMessage());
        }

        return false;
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
}

