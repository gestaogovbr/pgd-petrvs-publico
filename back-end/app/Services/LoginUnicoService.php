<?php

namespace App\Services;

use App\Exceptions\ServerException;
use Firebase\JWT\JWT;
use Google\Client;
use Throwable;

use Laravel\Socialite\Two\AbstractProvider;
use Laravel\Socialite\Two\ProviderInterface;
use Laravel\Socialite\Two\User;

class LoginUnicoService
{
    private $client_id;

    function __construct($config = null) {
        $loginUnicoApi_config = $config ?: config('login_unico');
        $this->client_id = $loginUnicoApi_config['client_id'];
        $this->clientSecret = $loginUnicoApi_config['client_secret'];
    }


    /**
     * {@inheritdoc}
     */
    protected function getAuthUrl($state)
    {
        return $this->buildAuthUrlFromBase('https://accounts.spotify.com/authorize', $state);
    }

    /**
     * {@inheritdoc}
     */
    protected function getTokenUrl()
    {
        return 'https://accounts.spotify.com/api/token';
    }

    /**
     * {@inheritdoc}
     */
    public function getAccessToken($code)
    {
        $response = $this->getHttpClient()->post($this->getTokenUrl(), [
            'headers' => ['Authorization' => 'Basic ' . base64_encode($this->clientId . ':' . $this->clientSecret)],
            'body'    => $this->getTokenFields($code),
        ]);

        return $this->parseAccessToken($response->getBody());
    }

    /**
     * {@inheritdoc}
     */
    protected function getTokenFields($code)
    {
        return array_add(
            parent::getTokenFields($code), 'grant_type', 'authorization_code'
        );
    }

    /**
     * {@inheritdoc}
     */
    protected function getUserByToken($token)
    {
        $response = $this->getHttpClient()->get('https://api.spotify.com/v1/me', [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    /**
     * {@inheritdoc}
     */
    protected function formatScopes(array $scopes)
    {
        return implode(' ', $scopes);
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