<?php

namespace App\Services;

use App\Exceptions\ServerException;
use Firebase\JWT\JWT;
use Google\Client;

class GoogleService
{
    private $client_id;

    function __construct($config = null) {
        $gapi_config = $config ?: config('google');
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