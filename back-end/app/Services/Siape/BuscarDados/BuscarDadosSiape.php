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
    CONST QUANTIDADE_MAXIMA_REQUISICOES = 10;
    CONST LIMITE_MAXIMO_CONECTAGOV = 30;
    private $contentType = 'application/x-www-form-urlencoded';
    private string $authorizationHeader;
    protected static $token = null;
    protected static $tokenExpiresAt = null;
    private $url;
    private $cpf;
    private $client;
    private $secret;
    private ?int $quantidadeMaxRequisicoes;
    public $config;

    public function __construct(
        mixed $config
    ) {
        $this->config = $config;
        $this->cpf = $config["cpf"];
        $this->url = $config["url"];
        $this->client = $config["conectagov_chave"];
        $this->secret = $config["conectagov_senha"];
        $this->quantidadeMaxRequisicoes = $config["conectagov_qtd_max_requisicoes"] ?? self::QUANTIDADE_MAXIMA_REQUISICOES;
        
        if($this->quantidadeMaxRequisicoes > self::LIMITE_MAXIMO_CONECTAGOV){
            $this->quantidadeMaxRequisicoes = self::QUANTIDADE_MAXIMA_REQUISICOES;
        }
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

    // a partir de um lote de servidores, busca os dados da API
    public function executaRequisicoes(array $xmlsData){
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
        }

        Log::info("Quantidade de requisições abertas: " . count($xmlsData));
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

            curl_multi_remove_handle($multiCurl, $ch);

            curl_close($ch);
        }

        curl_multi_close($multiCurl);

        if (!empty($errorLog)) {
            Log::error('Erros na requisição: ' . json_encode($errorLog));
        }

        return $respostas;
    }

    public function executaRequisicao(string $xmlData)
    {
       return $this->buscaSincrona($xmlData);
    }

    private function sanitizeXml(string &$response): void
    {
        $response = trim($response);
        $response = preg_replace('/&(?!amp;|lt;|gt;|quot;|apos;)/', '&amp;', $response);
        $response = preg_replace('/[^\P{C}\t\n\r]/u', '', $response);
        $response = preg_replace('/xmlns=""/', '', $response);
        $response = str_replace('\"', '"', $response);
        $response = str_replace("\n", '', $response);
    }

    public function prepareResponseXml(string $response) : SimpleXMLElement
    {
        $this->sanitizeXml($response);
        libxml_use_internal_errors(true); 
        $response = <<<XML
        $response
        XML;
        $responseXml = simplexml_load_string($response, 'SimpleXMLElement', LIBXML_NOCDATA);
        if ($responseXml === false) {
            $errors = libxml_get_errors();
            foreach ($errors as $error) {
                Log::alert("==========");
                Log::error('XML Error: ' . $error->message);
            }
            libxml_clear_errors();
            throw new RequestConectaGovException('Invalid XML response'); 
        }
        
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

    public function buscaSincrona(string $xmlData)
    {
        $token = $this->getToken();

        $curl = curl_init();

        $headers = [
            'x-cpf-usuario: ' . $this->getCpf(),
            'Authorization: Bearer ' . $token,
            'Content-Type: application/xml',
        ];

        curl_setopt_array($curl, [
            CURLOPT_URL => $this->geturl() . '/api-consulta-siape/v1/consulta-siape',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $xmlData,
        ]);

        /*Log::info('Busca - Request para ' . $this->geturl() . '/api-consulta-siape/v1/consulta-siape', [
            'headers' => $headers,
            'body' => $xmlData
        ]);*/

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
            curl_close($curl);
            throw new Exception('cURL error: ' . $error_msg);
        }

        curl_close($curl);
        //Log::info(' Response: ' . $response);
        return $response;
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

    public function getQtdMaxRequisicoes(): int
    {
        return $this->quantidadeMaxRequisicoes;
    }

}