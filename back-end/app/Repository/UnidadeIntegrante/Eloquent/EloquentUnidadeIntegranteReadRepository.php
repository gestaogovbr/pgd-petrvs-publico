<?php

declare(strict_types=1);

namespace App\Repository\UnidadeIntegrante\Eloquent;

use App\Models\UnidadeIntegrante;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

/**
 * @see \App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteReadRepositoryContract
 * @extends AbstractEloquentReadRepository<UnidadeIntegrante>
 */
class EloquentUnidadeIntegranteReadRepository extends AbstractEloquentReadRepository implements UnidadeIntegranteReadRepositoryContract
{
    public function __construct(UnidadeIntegrante $model)
    {
        $this->model = $model;
    }

    public function findAllCuradoresByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('curador')
            ->where('usuario_id', $usuarioId)
            ->has('curador')
            ->get();
    }

    public function findAllColaboracoesByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('colaborador')
            ->where('usuario_id', $usuarioId)
            ->has('colaborador')
            ->get();
    }

    public function findAllGerenciasSubstitutasByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('gestorSubstituto')
            ->where('usuario_id', $usuarioId)
            ->has('gestorSubstituto')
            ->get();
    }

    public function findAllGerenciasDelegadasByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('gestorDelegado')
            ->where('usuario_id', $usuarioId)
            ->has('gestorDelegado')
            ->get();
    }

    public function findAllGerenciasTitularesByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('gestor')
            ->where('usuario_id', $usuarioId)
            ->has('gestor')
            ->get();
    }

    public function findAllLotacoesByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->with('lotado')
            ->where('usuario_id', $usuarioId)
            ->has('lotado')
            ->get();
    }

    public function findGestorByUnidade(string $unidadeId): ?UnidadeIntegrante
    {
        $integrante = $this->model->newQuery()
            ->with('gestor')
            ->where('unidade_id', $unidadeId)
            ->has('gestor')
            ->first();

        return $integrante instanceof UnidadeIntegrante ? $integrante : null;
    }

    public function findUnidadeIntegrante(string $usuarioId, string $unidadeId): ?UnidadeIntegrante
    {
        $integrante = $this->model->newQuery()
            ->where('usuario_id', $usuarioId)
            ->where('unidade_id', $unidadeId)
            ->first();

        return $integrante instanceof UnidadeIntegrante ? $integrante : null;
    }

    public function findAllByUsuario(string $usuarioId): Collection
    {
        return $this->model->newQuery()
            ->where('usuario_id', $usuarioId)
            ->get();
    }
}
