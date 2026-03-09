<?php

namespace App\Auth;

use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Auth\Authenticatable;
use App\Models\PainelUsuario;
use Illuminate\Support\Facades\Hash;

class PainelUsuarioProvider implements UserProvider
{
    protected $model;

    public function __construct()
    {
        $this->model = new PainelUsuario(); // Crie uma nova instância do modelo de usuário PainelUsuario
    }

    public function retrieveById($identifier)
    {
        return $this->model->find($identifier);
    }

    public function retrieveByToken($identifier, $token)
    {
        return $this->model->where('id', $identifier)
            ->where('remember_token', $token)
            ->first();
    }

    public function retrieveByCredentials(array $credentials)
    {
        return $this->model->where('email', $credentials['email'])->first();
    }

    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        // Obtenha a senha do usuário do modelo autenticável
        $userPassword = $user->getAuthPassword();

        // Obtenha a senha fornecida nos credenciais
        $providedPassword = md5($credentials['password']);

        // Compare as senhas
        return $userPassword === $providedPassword;
    }

    public function updateRememberToken(Authenticatable $user, $token)
    {
        $user->setRememberToken($token);
        /** @var PainelUsuario $user */
        $user->save();
    }

    /**
     * Create a new instance of the user provider for the guard.
     *
     * @param  string  $provider
     * @return \Illuminate\Contracts\Auth\UserProvider|null
     */
    public function createUserProvider($provider)
    {
        if ($provider === 'painel_users') {
            return $this;
        }

        return null;
    }
}
