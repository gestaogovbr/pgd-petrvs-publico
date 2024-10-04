<?php

namespace App\Services\Siape\BuscarDados;

use App\Exceptions\RequestConectaGovException;
use DateTime;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Facades\Cache;

abstract class BuscarDadosSiape
{
    CONST QUANTIDADE_MAXIMA_REQUISICOES = 20;
    private $contentType = 'application/x-www-form-urlencoded';
    private string $authorizationHeader;
    protected static $token = null;
    protected static $tokenExpiresAt = null;

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
        if (self::$token && now()->lessThan(self::$tokenExpiresAt)) {
        return self::$token;
    }

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
            self::$token = $data['access_token'];
            self::$tokenExpiresAt = now()->addMinutes(59);

            return $data['access_token'];
        }
        

        throw new RequestConectaGovException('Falha ao gerar o token. Response: ' . $response);
    }


    protected function executaRequisicoes(array $xmlsData){
        $token = $this->getToken();

        $url = $this->getUrl() . '/api-consulta-siape/v1/consulta-siape';

        $headers = [
            'x-cpf-usuario: ' . $this->getCpf(),
            'Authorization: Bearer ' . $token,
            'Content-Type: application/xml',
        ];

        $multiCurl = curl_multi_init();
        $curlHandles = [];

        foreach ($xmlsData as $key => $xmlData) {
            $curlHandles[$key] = curl_init();

            curl_setopt_array($curlHandles[$key], [
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_HTTPHEADER => $headers,
                CURLOPT_POSTFIELDS => $xmlData,
            ]);

            curl_multi_add_handle($multiCurl, $curlHandles[$key]);

            // Log::info('Request made to ' . $this->geturl() . '/api-consulta-siape/v1/consulta-siape', [
            //     'headers' => $headers,
            //     'body' => $xmlData
            // ]);
        }

        Log::info("quantidade de requisições abertas" . count($xmlsData));
        $esperar = 1;

        do {
            $status = curl_multi_exec($multiCurl, $active);
            curl_multi_select($multiCurl);
            sleep($esperar);
        } while ($active && $status == CURLM_OK);

        $respostas = [];
        foreach ($curlHandles as $key => $ch) {
            if (curl_errno($ch)) {
                $errorLog[] = "Erro na requisição $key: " . curl_error($ch);
                continue;
            }

            $responsesCurl = curl_multi_getcontent($ch);

            if(empty($responsesCurl)){
                Log::alert('Response vazio');
                continue;
            }
            $respostas[$key] = $responsesCurl;
            // array_push($respostas, $responsesCurl);

            curl_multi_remove_handle($multiCurl, $ch);

            curl_close($ch);
        }

        curl_multi_close($multiCurl);

        if (!empty($errorLog)) {
            Log::error('Erros na requisição: ' . json_encode($errorLog));
        }

        return $respostas;
    }

    protected function prepareResponseXml(string $response) : SimpleXMLElement
    {
        $response = trim($response); 
        $response = str_replace(['&lt;', '&gt;', '&quot;', '&amp;', '&apos;'], ['<', '>', '"', '&', "'"], $response); 
        libxml_use_internal_errors(true); 
        $response = <<<XML
        $response
        XML;
        $responseXml = simplexml_load_string($response, "SimpleXMLElement", LIBXML_NOCDATA);
        if ($responseXml === false) {
            $errors = libxml_get_errors();
            foreach ($errors as $error) {
                Log::error('XML Error: ' . $error->message);
            }
            libxml_clear_errors();
            throw new RequestConectaGovException('Invalid XML response'); 
        }
        Log::info('Response convertido: ' , [$responseXml]);
        return $responseXml;
    }

     public function simpleXmlElementToArray(SimpleXMLElement $element) : array{
        $array = [];
        foreach ($element as $key => $value) {
            $array[$key] = (string) $value; 
        }
        return $array;
    }

    public static function asTimestamp($date): int | null {
        $result = gettype($date) == "integer" ? $date : 
            ($date instanceof DateTime ? $date->getTimestamp() : 
            (gettype($date) == "string" ? (strtotime($date) ? strtotime($date) : null) : null));
        return $result;
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