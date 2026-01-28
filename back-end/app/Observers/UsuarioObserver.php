<?php

namespace App\Observers;

use App\Models\Usuario;
use App\Services\API_PGD\UsuarioEnvioService;
use Illuminate\Support\Facades\Log;

class UsuarioObserver
{
    public function updated(Usuario $usuario): void
    {
        if (!tenancy()->initialized) {
            Log::warning('Tentativa de agendar envio de usuário sem tenant inicializado');
            return;
        }

        UsuarioEnvioService::processar(tenant('id'), $usuario);
    }
}
