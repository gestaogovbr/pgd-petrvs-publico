<?php
namespace App\Services\Siape\Consulta;

use Illuminate\Support\Facades\Log;
use App\Services\Siape\Consulta\Traits\SiapeConfig;
use App\Services\Siape\Consulta\Traits\SiapeGetToken;

abstract class SiapeService extends SiapeBaseService {

    use SiapeGetToken, SiapeConfig;

    public string $authorizationHeader;

    public function __construct() {
        $this->setConfig();
        $this->authorizationHeader = 'Basic ' . base64_encode($this->client . ':' . $this->secret);
    }

    public function getHeaders() {
        $token = $this->getToken();
        return [
            'x-cpf-usuario: ' . $this->getCpf(),
            'Authorization: Bearer ' . $token,
            'Content-Type: application/xml'
        ];
    }

    public function buscar($params): string|bool {

        $body = $this->getBody($params);
        $headers = $this->getHeaders();
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->getUrl() . '/api-consulta-siape/v1/consulta-siape',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $body->getXml(),
        ]);

        Log::info('Busca - Request para ' . $this->geturl() . '/api-consulta-siape/v1/consulta-siape', [
            'headers' => $headers,
            'body' => $body->getXml()
        ]);

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
            curl_close($curl);
            throw new \Exception('cURL error: ' . $error_msg);
        }

        curl_close($curl);
        Log::info(' Response: ' . $response);
        return $response;
    }

}