<?php

namespace App\Services\Siape\BuscarDados;

use App\Exceptions\RequestConectaGovException;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Facades\Cache;

abstract class BuscarDadosSiape
{
    private $contentType = 'application/x-www-form-urlencoded';
    private string $authorizationHeader;

    public function __construct(
        private readonly string $cpf,
        private readonly string $url,
        private readonly string $client,
        private readonly string $secret,
        private readonly mixed $config
    ) {
        $this->authorizationHeader = 'Basic ' . base64_encode($this->client . ':' . $this->secret);
    }


    public function getToken()
    {
        // $cachedToken = Cache::get('siape_token');
        
        // if ($cachedToken) {
        //     return $cachedToken;
        // }

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->url . '/oauth2/jwt-token',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Content-Type: ' . $this->contentType,
                'Authorization: ' . $this->authorizationHeader,
            ],
            CURLOPT_POSTFIELDS => http_build_query(['grant_type' => 'client_credentials']),
        ]);

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
            curl_close($curl);
            Log::error('cURL error: ' . $error_msg);
            throw new RequestConectaGovException('cURL error: ' . $error_msg);
        }

        curl_close($curl);

        $data = json_decode($response, true);

        if (isset($data['access_token'])) {
        //     Cache::put('siape_token', $data['access_token'], now()->addMinutes(25));
            return $data['access_token'];
        }

        throw new RequestConectaGovException('Falha ao gerar o token. Response: ' . $response);
    }

    public abstract function enviar() : void;


    public function getUrl(): string
    {
        return $this->url;
    }
    

    public function getCpf(): string
    {
        return $this->cpf;
    }

    public function getContentType(): string
    {
        return $this->contentType;
    }

    public function getAuthorizationHeader(): string
    {
        return $this->authorizationHeader;
    }

    public function getConfig(): mixed
    {
        return $this->config;
    }

}