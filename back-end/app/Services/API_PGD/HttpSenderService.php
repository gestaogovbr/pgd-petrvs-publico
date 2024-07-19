<?php
namespace App\Services\API_PGD;

use Illuminate\Support\Facades\Http;

class HttpSenderService
{
    public function getHttpClient($token) 
    {
        $headers = ['Content-Type' => 'application/json-patch+json'];

        return Http::withOptions(['verify'=> false, 'timeout'=> 35])
            ->withHeaders($headers)
            ->baseUrl(config('pgd.host'))
            ->withToken($token);
    }

    public function enviarDados($token, $endpoint, $body)
    {
        $client = $this->getHttpClient($token);

        $response = $client->put($endpoint, $body);

        return $response->successful() ? $response->json() : "error";
    }
}

