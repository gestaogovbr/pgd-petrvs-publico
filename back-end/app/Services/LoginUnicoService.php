<?php

namespace App\Services;

use App\Exceptions\ServerException;
use Laravel\Socialite\Two\AbstractProvider;
use Laravel\Socialite\Two\ProviderInterface;
use Laravel\Socialite\Two\User;

class LoginUnicoService extends AbstractProvider implements ProviderInterface
{
    private $client_id;
    private $client_secret;

    function __construct($config = null) {
        $loginUnicoApi_config = $config ?: config('loginUnico');
        $this->client_id = $loginUnicoApi_config['client_id'];
        $this->client_secret = $loginUnicoApi_config['client_secret'];
    }

    /**
     * {@inheritdoc}
     */
    protected function getAuthUrl($state)
    {
        return $this->buildAuthUrlFromBase('https://sso.staging.acesso.gov.br/authorize', $state);
    }

    /**
     * {@inheritdoc}
     */
    protected function getTokenUrl()
    {
        return 'https://sso.staging.acesso.gov.br/token';
    }

    /**
     * {@inheritdoc}
     */
    public function getAccessToken($code)
    {
        $response = $this->getHttpClient()->post($this->getTokenUrl(), [
            'headers' => ['Authorization' => 'Basic ' . base64_encode($this->client_id . ':' . $this->client_secret)],
            'body'    => $this->getTokenFields($code),
        ]);

        return $this->getAccessTokenResponse($response->getBody());
    }

    /**
     * {@inheritdoc}
     */
    protected function getUserByToken($token)
    {
        $response = $this->getHttpClient()->get('', [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    protected function mapUserToObject(array $user)
    {
        return (new User)->setRaw($user)->map([
            'id' => $user['id'],
            'nickname' => $user['username'],
            'name' => $user['name'],
            'email' => $user['email'],
            'avatar' => $user['avatar_url'],
        ]);
    }
  
}   