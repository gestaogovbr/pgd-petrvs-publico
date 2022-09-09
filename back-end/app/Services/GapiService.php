<?php

namespace App\Services;

use App\Exceptions\ServerException;
use Firebase\JWT\JWT;
use Google\Client;
use Illuminate\Support\Facades\Storage;

class GapiService
{
    private $client_id;

    function __construct($config = null) {
        $gapi_config = $config ?: config('gapi');
        $this->client_id = $gapi_config['client_id'];
    }

    /**
     * Obtem a credencial pelo Token id do gapi
     * 
     * @param string $token  Token de login do gapi
     * @return mixed  Credencial ou ["error" => string]
     */
    function verifyToken($token = '')
    {
        $return = array();
        try {
            JWT::$leeway = 86400; /* Previnir o Firebase\JWT\BeforeValidException */
            $client = new Client(["client_id" => $this->client_id]);
            $payload = $client->verifyIdToken($token);
            if($payload){
                $return = $payload;
            } else {
                throw new ServerException("GapiService_Invalid_Token");
            }
        } catch (Exception $e) {
            $return['error'] = $e->getMessage();
        }
        return $return;
    }

    public function downloadImgProfile($url_picture, $path_user) {
        $url = "http://www.google.co.in/intl/en_com/images/srpr/logo1w.png";
        $contents = file_get_contents($url);
        $name = substr($url, strrpos($url, '/') + 1);
        Storage::put($name, $contents);
    }

    /**
     * Obtem o IP da requisição
     * 
     * @param Usuario $usuario Usuário model
     * @param mixed $credencial  Dados retornados do login
     */
    public function fillUsuarioWithCredential(&$usuario, $credencial) {
        $usuario->password = null; //Hash::make($credencial["email"]);
        $usuario->email = $credencial["email"];
        $usuario->nome = $credencial["name"];
        $usuario->id_google = $credencial["sub"];
        $usuario->apelido = $credencial["name"];
    }
}