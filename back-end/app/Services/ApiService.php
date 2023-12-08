<?php

namespace App\Services;

use App\Exceptions\ServerException;
use Firebase\JWT\JWT;
use Google\Client;
use Throwable;

class ApiService
{
    private $maxExpirationTime = 60000;

    function __construct($config = null) {
        $petrvs_config = $config ?: config('petrvs');
        $this->maxExpirationTime = $petrvs_config['api-max-expiration-time-token'] ?: 60000;
    }

    /**
     * Obtem a credencial pelo Token
     * 
     * @param string $token  Token de login do gapi
     * @param string $key  Private key
     * @return mixed  Credencial ou ["error" => string]
     */
    function verifyToken($token, $key, $entidade)
    {
        $return = array();
        try {
            //openssl_get_publickey($key);
            openssl_private_decrypt(base64_decode($token), $decrypted, $key);
            $payload = json_decode($decrypted, true) ?: [];
            if(!empty($payload)){
                /* Valida o timestemp */
                if(abs($payload["timestamp"] - time()) > $this->maxExpirationTime) throw new ServerException("Api_Service_Expirad_Token");
                /* Valida a entidade */
                if($payload["entidade"] != $entidade) throw new ServerException("Api_Service_Invalid_Token");
                /* Valida se o CPF e o email estão em branco */
                if(empty($payload["cpf"]) && $payload["email"]) throw new ServerException("Api_Service_Invalid_Credentials");
                $return = $payload;
            } else {
                throw new ServerException("Api_Service_Invalid_Token", $decrypted);
            }
        } catch (Throwable $e) {
            $return['error'] = $e->getMessage();
        }
        return $return;
    }

    /**
     * Preenche o usuário com as informações vindas do token
     * 
     * @param Usuario $usuario Usuário model
     * @param mixed $credencial  Dados retornados do login
     */
    public function fillUsuarioWithCredential(&$usuario, $credencial) {
        $usuario->password = null; 
        $usuario->email = $credencial["email"];
        $usuario->cpf = $credencial["cpf"];
        $usuario->nome = $credencial["nome"];
        $usuario->id_sei = $credencial["id_sei"];
        $usuario->apelido = $credencial["name"];
    }
}