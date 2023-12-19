<?php
namespace App\Services\PGD;

use Illuminate\Support\Facades\Http;

class HttpSenderService
{

    public function enviarDados($url, $token, $body)
    {
        $header = ['Content-Type' => 'application/json-patch+json'];

        $response = Http::withOptions(['verify'=> false, 'timeout'=> 35])
        ->withHeaders($header)
        ->withToken($token, 'Bearer')
        ->asForm()->post($url, $body);

        if($response->succesful()){
            $reponse_obj = $response->json();
            return "succesful";
        }else{
            return "error";
        }
    }
}

