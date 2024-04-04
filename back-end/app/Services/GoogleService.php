<?php

namespace App\Services;

use App\Exceptions\ServerException;
use Firebase\JWT\JWT;
use Google\Client;
use Throwable;

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
            $url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' . $token;
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $response = curl_exec($ch);
            $err = curl_error($ch);  //if you need
            curl_close($ch);

            $payload = json_decode($response,true);
            if($payload){
                $return = $payload;
            } else {
                throw new ServerException("Google_Service_Invalid_Token");
            }
        } catch (Throwable $e) {
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
