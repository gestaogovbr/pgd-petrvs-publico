<?php
namespace App\Services\API_PGD;

use Illuminate\Support\Facades\Http;

class HttpSenderService
{
    CONST TIMEOUT = 35;
    private array $logReponse;
    public function getHttpClient($token) : \Illuminate\Http\Client\PendingRequest
    {
        return Http::withOptions(['verify'=> false, 'timeout'=> self::TIMEOUT])
            ->baseUrl(config('pgd.host'))
            ->withToken($token);
    }

    public function enviarDados($token, $endpoint, $body) : bool
    {
      try {
        $response = $this->getHttpClient($token)->post($endpoint, $body);
        $this->logReponse = $response->json();
        return $response->successful();
      } catch (\Exception $e) {
        return false;
      }
    }

    public function getLogReponse() : array
    {
      return $this->logReponse;
    }
}

