<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Exceptions\ServerException;
use GuzzleHttp\RequestOptions;
use Laravel\Socialite\Two\AbstractProvider;
use Laravel\Socialite\Two\ProviderInterface;
use Laravel\Socialite\Two\User;
use SocialiteProviders\Manager\ConfigTrait;

class LoginUnicoProvider extends AbstractProvider //implements ProviderInterface
{
    use ConfigTrait;

    private $codeChallenge;

    function __construct($config = null) {
        $loginUnicoApi_config = $config ?: config('login-unico');
        $this->clientId = $loginUnicoApi_config['client_id'];
        $this->clientSecret = $loginUnicoApi_config['client_secret'];
        $this->redirectUrl = "https://pgd-pre.dth.api.gov.br/login-unico";
        $this->codeChallenge = $loginUnicoApi_config['codeChallenge'];
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

    }    protected function getUserUrl()
    {
        return 'https://sso.staging.acesso.gov.br/userinfo';
    }

    /**
     * {@inheritdoc}
     */
    public function getAccessToken($code)
    {
        $response = $this->getAccessTokenResponse($code);

        return $response;
    }


    /**
     * Get the access token response for the given code.
     *
     * @param  string  $code
     * @return array
     */
    public function getAccessTokenResponse($code)
    {
        $fields = [
            'grant_type' => 'authorization_code',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'code' => $code,
            'redirect_uri' => $this->redirectUrl,
            'code_verifier' => $this->codeChallenge
        ];
        $response = $this->getHttpClient()->post($this->getTokenUrl(), [
            RequestOptions::HEADERS => $this->getTokenHeaders($code),
            RequestOptions::FORM_PARAMS => $fields
        ]);

        return json_decode($response->getBody(), true);
    }

    public function getUserToken($token)
    {
        $response = $this->getUserResponse($token);

        return $response;
    }

    private function getUserResponse($token)
    {
        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer '.$token,
        ];
        $response = $this->getHttpClient()->post($this->getUserUrl(), [
            RequestOptions::HEADERS => $headers
        ]);

        return json_decode($response->getBody(), true);
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

    public function register()
    {
      //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

}
