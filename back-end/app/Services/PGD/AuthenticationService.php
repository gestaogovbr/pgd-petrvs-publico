<?php
namespace App\Services\PGD;

use Illuminate\Support\Facades\Http;

class AuthenticationService
{


    public function getToken()
    {

        $header = [
            'Accept' => 'application/json',
            'Content-Type' => 'application/x-www-form-urlencoded'
        ];

        $form_params = [
            'username' => config('pgd')['username'],
            'password' => config('pgd')['password']
        ];

        $response = Http::withOptions(['verify'=> false, 'timeout'=> 29])
        ->withHeaders($header)
        ->asForm()->post(config('pgd.host').'/token', $form_params);
    
        if($response->successful()){
            $reponse_obj = $response->json();
            if(isset($reponse_obj['access_token'])){
                return $reponse_obj['access_token'];
            }
        }else{
            dd("Falha autenticação");
        }
        return false;
    }
}

