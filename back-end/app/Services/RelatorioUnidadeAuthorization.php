<?php

declare(strict_types=1);

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Support\AuthenticatedUsuario;

class RelatorioUnidadeAuthorization
{
    public const CAPACIDADE = 'MOD_RELATORIO_UNIDADE';

    public const MSG_ACESSO_NEGADO = 'Acesso negado ao relatório de Unidades.';

    public function usuarioAutorizado(): Usuario
    {
        $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
        if ($usuario === null) {
            throw new ServerException('RelatorioUnidade');
        }

        $this->assertPodeConsultar($usuario);

        return $usuario;
    }

    public function assertPodeConsultar(Usuario $usuario): void
    {
        if (! $usuario->hasPermissionTo(self::CAPACIDADE)) {
            throw new ServerException('RelatorioUnidade');
        }
    }
}
