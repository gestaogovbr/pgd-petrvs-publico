<?php

declare(strict_types=1);

namespace App\Support;

use App\Models\Usuario;
use App\Repository\UsuarioRepository;
use Illuminate\Support\Facades\Auth;

/**
 * Acesso ao {@link Usuario} autenticado fora de {@see \App\Http\Controllers\ControllerBase}
 * (ex.: controllers V2 que estendem apenas {@see \App\Http\Controllers\Controller}).
 */
final class AuthenticatedUsuario
{
    /** Utilizador da sessão/guard atual, ou null se não autenticado ou tipo inesperado. */
    public static function logged(): ?Usuario
    {
        $user = Auth::user();

        return $user instanceof Usuario ? $user : null;
    }

    /**
     * Recarrega o utilizador autenticado com `areasTrabalho.unidade` (tenant atual).
     * Equivalente a {@see \App\Http\Controllers\ControllerBase::getUsuario}.
     */
    public static function withAreasDeTrabalho(): ?Usuario
    {
        $logged = self::logged();
        if ($logged === null) {
            return null;
        }

        return app(UsuarioRepository::class)->findByIdComAreasTrabalho($logged->getKey());
    }
}
