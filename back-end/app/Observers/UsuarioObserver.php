<?php

namespace App\Observers;

use App\Models\Usuario;
use App\Services\API_PGD\UsuarioEnvioService;
use Illuminate\Support\Facades\Log;

class UsuarioObserver
{
    public function updated(Usuario $usuario): void
    {
        if ($usuario->wasChanged('deleted_at')) {
            return; // ignora se veio de restore

        }

        if (!tenancy()->initialized) {
            Log::error('Tentativa de agendar envio de usuário sem tenant inicializado');
            return;
        }

        UsuarioEnvioService::processar(tenant('id'), $usuario, 'Usuario');
    }
}
