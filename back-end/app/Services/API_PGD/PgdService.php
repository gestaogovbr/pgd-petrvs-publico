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
    public function getHttpClient($url, $token) : \Illuminate\Http\Client\PendingRequest
    {
        return Http::withOptions([
            'verify'=> false, 
            'timeout'=> self::TIMEOUT,
            //'debug' => true
          ])
          ->baseUrl($url)
          ->withHeader('User-Agent', 'Petrvs/'.config('app.version'))
          ->withToken($token);
    }

    public function enviarDados($url, $token, $endpoint, $body) : bool
    {
      try {
        $this->exception = null;

        $response = $this->getHttpClient($url, $token)->put($endpoint, $body)
          ->throw(function (Response $response, RequestException $e) {
            $this->logReponse = $response;
          });
        return $response->successful();

      } catch (\Throwable $e) {
        $this->exception = $e;

        $response = $this->getLogReponse();
        
        if ($response && $response->status() == 422) {
          $data = $response->json();

          if (is_array($data['detail'])) {
            $errorData = $data['detail'][0];
            throw new ExportPgdException($errorData['msg'].' '.implode(', ', $errorData['loc'])); //. ' Data: '.print_r($body, true));
          } else {
            throw new ExportPgdException($data['detail']); //. ' Data: '.print_r($body, true));
          }
          
        } else {
          throw new ExportPgdException('Erro inesperado. Status: '.$response->status().
            ". Msg: ".$e->getMessage().
            ". URL: ".$endpoint.
            ". Data: ".print_r($body, true)
          );  
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

