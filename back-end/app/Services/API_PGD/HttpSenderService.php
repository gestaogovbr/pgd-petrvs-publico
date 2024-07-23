<?php
namespace App\Services\API_PGD;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Client\RequestException;

class HttpSenderService
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
          echo "Erro na validação: ".print_r($data['detail'][0], true)."\n";
        } else {
          echo 'Erro cód.'.$response->status().
            " ".$e->getMessage()."\n";
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

