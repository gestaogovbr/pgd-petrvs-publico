<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega;

use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Services\RelatorioPlanoEntregaAuthorization;
use App\Support\AuthenticatedUsuario;

class RelatorioEntregaAuthorization
{
    public const CAPACIDADE = 'MOD_RELATORIO_ENTREGA';

    /**
     * @var list<string>
     */
    public const CAPACIDADES = [
        RelatorioPlanoEntregaAuthorization::CAPACIDADE,
        self::CAPACIDADE,
    ];

    public const MSG_ACESSO_NEGADO = 'Acesso negado ao relatório de Entregas.';

    public function usuarioAutorizado(): Usuario
    {
        $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
        if ($usuario === null) {
            throw new ServerException('RelatorioCapacidade', self::MSG_ACESSO_NEGADO);
        }

        $this->assertPodeConsultar($usuario);

        return $usuario;
    }

    public function assertPodeConsultar(Usuario $usuario): void
    {
        foreach (self::CAPACIDADES as $capacidade) {
            if ($usuario->hasPermissionTo($capacidade)) {
                return;
            }
        }

        throw new ServerException('RelatorioCapacidade', self::MSG_ACESSO_NEGADO);
    }
}
