<?php
namespace App\Services\API_PGD;

use Illuminate\Support\Facades\Http;

class HttpSenderService
{

    public function enviarDados($dados, $token, $body)
    {
        $header = ['Content-Type' => 'application/json-patch+json'];

        
        $response = Http::withOptions(['verify'=> false, 'timeout'=> 35])
        ->withHeaders($header)
        ->withToken($token, 'Bearer')->put($dados['url'], $body);

        return $response->successful() ? $response->json() : "error";

    }
        
}

