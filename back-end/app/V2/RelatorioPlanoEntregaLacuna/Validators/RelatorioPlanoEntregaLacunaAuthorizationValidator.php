<?php

declare(strict_types=1);

namespace App\V2\RelatorioPlanoEntregaLacuna\Validators;

use App\Exceptions\ForbiddenException;
use App\Exceptions\ValidateException;
use App\Models\Usuario;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeRepository;
use App\Support\AuthenticatedUsuario;
use App\V2\RelatorioPlanoEntregaLacuna\DTOs\RelatorioPlanoEntregaLacunaFiltersDTO;

class RelatorioPlanoEntregaLacunaAuthorizationValidator
{
    private const CAPACIDADE_RELATORIO = 'MOD_RELATORIO_PE';

    private const CAPACIDADE_TODAS_UNIDADES = 'MOD_RELATORIO_PE_TODAS_UNIDADES';

    private const CAPACIDADE_UNIDADES_VINCULADAS = 'MOD_RELATORIO_PE_UNIDADES_VINCULADAS';

    public function __construct(
        private readonly UnidadeIntegranteRepository $integranteRepository,
        private readonly UnidadeRepository $unidadeRepository,
    ) {
    }

    /**
     * Valida se o usuário autenticado possui a capacidade de acesso ao relatório.
     */
    public function validarAcesso(): Usuario
    {
        $usuario = AuthenticatedUsuario::withAreasDeTrabalho();

        if ($usuario === null || ! $usuario->hasPermissionTo(self::CAPACIDADE_RELATORIO)) {
            throw new ForbiddenException('Usuário não possui acesso ao relatório de lacunas de planos de entrega.');
        }

        return $usuario;
    }

    public function validar(Usuario $usuario, RelatorioPlanoEntregaLacunaFiltersDTO $filtros): void
    {
        if ($filtros->unidadeId === null) {
            throw new ValidateException('A unidade de consulta é obrigatória.');
        }

        if ($filtros->periodoInicio === null || $filtros->periodoFim === null) {
            throw new ValidateException('O período da consulta é obrigatório.');
        }

        if ($usuario->hasPermissionTo(self::CAPACIDADE_TODAS_UNIDADES)) {
            return;
        }

        $permitidas = $this->unidadesPermitidas($usuario);

        if (! in_array($filtros->unidadeId, $permitidas, true)) {
            throw new ValidateException('Usuário não possui permissão para consultar a unidade selecionada.');
        }
    }

    /**
     * @return list<string>
     */
    private function unidadesPermitidas(Usuario $usuario): array
    {
        $integrantes = $this->integranteRepository->findAllComAtribuicoesAtivasByUsuario($usuario->id);
        $unidadesDiretas = $integrantes->pluck('unidade_id')->toArray();

        if ($usuario->hasPermissionTo(self::CAPACIDADE_UNIDADES_VINCULADAS)) {
            $vinculadas = $usuario->areasTrabalho?->pluck('unidade_id')->toArray() ?? [];
            $unidadesDiretas = array_values(array_unique(array_merge($unidadesDiretas, $vinculadas)));
        }

        $subordinadas = $this->unidadeRepository
            ->getSubordinadasRecursivas($unidadesDiretas)
            ->pluck('id')
            ->toArray();

        return array_values(array_unique(array_merge($unidadesDiretas, $subordinadas)));
    }
}
