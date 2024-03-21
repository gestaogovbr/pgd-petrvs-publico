<?php
namespace App\Services\PGD;

use Illuminate\Support\Facades\Http;

class HttpSenderService
{

    public function enviarDados($dados, $token, $body)
    {
        $header = ['Content-Type' => 'application/json-patch+json'];

        //$exportacaoService = new ExportacaoService();
        //$exportacao = $exportacaoService->registrarExportacao($tipo, $dados, $body);
        
        $response = Http::withOptions(['verify'=> false, 'timeout'=> 35])
        ->withHeaders($header)
        ->withToken($token, 'Bearer')->put($dados['url'], $body);

        //$exportacaoService->atualizarRetorno($exportacao, $response->json());
/*         if($response->successful()){
            return $response->json();
            //return "succesful";
        }else{
            return "error";
        } */
        return $response->successful() ? $response->json() : "error";

    }
        
}

