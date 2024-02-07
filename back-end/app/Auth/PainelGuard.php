<?php

namespace App\Auth;

use Illuminate\Auth\SessionGuard;

class PainelGuard extends SessionGuard
{
    public function __construct($name, PainelUsuarioProvider  $provider, $session, $request = null)
    {
        parent::__construct($name, $provider, $session, $request);
    }
}
