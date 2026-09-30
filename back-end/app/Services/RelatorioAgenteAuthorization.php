<?php

declare(strict_types=1);

namespace App\Services;

use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;
use App\Enums\PerfilEnum;
use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Support\AuthenticatedUsuario;

class RelatorioAgenteAuthorization
{
    public const CAPACIDADE = 'MOD_RELATORIO_USUARIO';

    public const MSG_ACESSO_NEGADO = 'Acesso negado ao relatório de Agentes.';

    public function usuarioAutorizado(): Usuario
    {
        $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
        if ($usuario === null) {
            throw new ServerException('RelatorioAgente', self::MSG_ACESSO_NEGADO);
        }

        $this->assertPodeConsultar($usuario);

        return $usuario;
    }

    public function assertPodeConsultar(Usuario $usuario): void
    {
        if (! $usuario->hasPermissionTo(self::CAPACIDADE)) {
            throw new ServerException('RelatorioAgente', self::MSG_ACESSO_NEGADO);
        }
    }

    /**
     * Perfil participante vê apenas seus próprios dados.
     */
    public function aplicarFiltroParticipante(RelatorioAgenteQueryDTO $dto, Usuario $usuario): RelatorioAgenteQueryDTO
    {
        if (! $this->deveRestringirAoProprioUsuario($usuario)) {
            return $dto;
        }

        return $dto->withFilters(
            $dto->filters->restritoAoUsuario((string) $usuario->id)
        );
    }

    private function deveRestringirAoProprioUsuario(Usuario $usuario): bool
    {
        $nivelPerfil = (int) ($usuario->perfil->nivel ?? PerfilEnum::PARTICIPANTE->value);

        return $nivelPerfil >= PerfilEnum::PARTICIPANTE->value;
    }
}
