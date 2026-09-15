<?php

declare(strict_types=1);

namespace App\Repository\UnidadeIntegranteAtribuicao\Eloquent;

use App\Models\UnidadeIntegranteAtribuicao;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\UnidadeIntegranteAtribuicao\Contracts\UnidadeIntegranteAtribuicaoWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<UnidadeIntegranteAtribuicao>
 */
class EloquentUnidadeIntegranteAtribuicaoWriteRepository extends AbstractEloquentWriteRepository implements UnidadeIntegranteAtribuicaoWriteRepositoryContract
{
    public function __construct(UnidadeIntegranteAtribuicao $model)
    {
        $this->model = $model;
    }

    public function delete(string|int $id): bool
    {
        $model = $this->model->newQuery()->find($id);

        if ($model === null) {
            return false;
        }

        return (bool) $model->delete();
    }

    public function findOrCreateIncludingDeleted(string $unidadeIntegranteId, string $atribuicao): UnidadeIntegranteAtribuicao
    {
        $query = $this->model->newQuery()
            ->where('unidade_integrante_id', $unidadeIntegranteId)
            ->where('atribuicao', $atribuicao);

        /** @var UnidadeIntegranteAtribuicao|null $model */
        $model = $query->first();

        if ($model === null) {
            /** @var UnidadeIntegranteAtribuicao|null $model */
            $model = $query->withTrashed()->first();
        }

        if ($model === null) {
            /** @var UnidadeIntegranteAtribuicao $model */
            $model = $this->create([
                'unidade_integrante_id' => $unidadeIntegranteId,
                'atribuicao' => $atribuicao,
            ]);
        } elseif ($model->trashed()) {
            $model->restore();
        }

        return $model;
    }

    public function deleteAtivasByUnidadeIntegranteIds(array $unidadeIntegranteIds): int
    {
        if ($unidadeIntegranteIds === []) {
            return 0;
        }

        return $this->model->newQuery()
            ->whereIn('unidade_integrante_id', $unidadeIntegranteIds)
            ->whereNull('deleted_at')
            ->delete();
    }

    public function deleteGestorByUsuario(string $usuarioId, bool $ignorarInformais = true): int
    {
        $query = $this->model->newQuery()
            ->where('atribuicao', 'GESTOR')
            ->whereNull('deleted_at')
            ->whereHas('vinculo', function ($q) use ($usuarioId, $ignorarInformais) {
                $q->where('usuario_id', $usuarioId)
                    ->whereNull('deleted_at');

                if ($ignorarInformais) {
                    $q->whereHas('unidade', function ($uq) {
                        $uq->where('informal', 0)->orWhereNull('informal');
                    });
                }
            });

        return $query->update(['deleted_at' => now()]);
    }
}
