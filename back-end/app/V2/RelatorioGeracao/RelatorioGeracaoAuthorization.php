<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao;

use App\Enums\RelatorioGeracaoTipo;
use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Support\AuthenticatedUsuario;

class RelatorioGeracaoAuthorization
{
    public function usuarioAutorizadoParaTipo(RelatorioGeracaoTipo $tipo, string $mensagem): Usuario
    {
        $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
        if ($usuario === null) {
            throw new ServerException('RelatorioCapacidade', $mensagem);
        }

        foreach ($tipo->capacidades() as $capacidade) {
            if ($usuario->hasPermissionTo($capacidade)) {
                return $usuario;
            }
        }

        throw new ServerException('RelatorioCapacidade', $mensagem);
    }

    public function usuarioAutorizado(string $capacidade, string $mensagem): Usuario
    {
        $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
        if ($usuario === null || ! $usuario->hasPermissionTo($capacidade)) {
            throw new ServerException('RelatorioCapacidade', $mensagem);
        }

        return $usuario;
    }
}
