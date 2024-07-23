<?php
namespace App\Services\API_PGD;

use Illuminate\Support\Facades\Http;

class HttpSenderService
{
    public function getHttpClient($token) 
    {
       // $headers = ['Content-Type' => 'application/json-patch+json'];

        return Http::withOptions(['verify'=> false, 'timeout'=> 35])
            ->baseUrl(config('pgd.host'))
            ->withToken($token);
    }

    public function enviarDados($token, $endpoint, $body)
    {
        $client = $this->getHttpClient($token);

        return $client->put($endpoint, $body);
    }
}

