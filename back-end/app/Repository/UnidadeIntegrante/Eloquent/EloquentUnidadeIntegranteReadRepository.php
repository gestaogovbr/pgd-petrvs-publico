<?php

declare(strict_types=1);

namespace App\Repository\UnidadeIntegrante\Eloquent;

use App\Models\UnidadeIntegrante;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

/**
 * @see \App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteReadRepositoryContract
 */
class EloquentUnidadeIntegranteReadRepository extends AbstractEloquentReadRepository implements UnidadeIntegranteReadRepositoryContract
{
    public function __construct(UnidadeIntegrante $model)
    {
        $this->model = $model;
    }

    public function findCuradoresByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('curador')
            ->where('usuario_id', $usuarioId)
            ->has('curador')
            ->get();
    }

    public function findColaboracoesByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('colaborador')
            ->where('usuario_id', $usuarioId)
            ->has('colaborador')
            ->get();
    }

    public function findGerenciasSubstitutasByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('gestorSubstituto')
            ->where('usuario_id', $usuarioId)
            ->has('gestorSubstituto')
            ->get();
    }

    public function findGerenciasDelegadasByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('gestorDelegado')
            ->where('usuario_id', $usuarioId)
            ->has('gestorDelegado')
            ->get();
    }

    public function findGerenciasTitularesByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('gestor')
            ->where('usuario_id', $usuarioId)
            ->has('gestor')
            ->get();
    }

    public function findLotacoesByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('lotado')
            ->where('usuario_id', $usuarioId)
            ->has('lotado')
            ->get();
    }

    public function findGestorByUnidade(string $unidadeId): ?UnidadeIntegrante
    {
        return $this->model->newQuery()
            ->with('gestor')
            ->where('unidade_id', $unidadeId)
            ->has('gestor')
            ->first();
    }

    public function findUnidadeIntegrante(string $usuarioId, string $unidadeId): ?UnidadeIntegrante
    {
        return $this->model->newQuery()
            ->where('usuario_id', $usuarioId)
            ->where('unidade_id', $unidadeId)
            ->first();
    }
}