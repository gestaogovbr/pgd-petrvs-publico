<?php

declare(strict_types=1);

namespace App\Repository\TipoPlanejamentoObjetivo\Eloquent;

use App\Models\TipoPlanejamentoObjetivo;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\TipoPlanejamentoObjetivo\Contracts\TipoPlanejamentoObjetivoReadRepositoryContract;
use Illuminate\Support\Collection;

/**
 * @extends AbstractEloquentReadRepository<TipoPlanejamentoObjetivo>
 */
class EloquentTipoPlanejamentoObjetivoReadRepository extends AbstractEloquentReadRepository implements TipoPlanejamentoObjetivoReadRepositoryContract
{
    public function __construct(TipoPlanejamentoObjetivo $model)
    {
        $this->model = $model;
    }

    /** @return Collection<int, TipoPlanejamentoObjetivo> */
    public function getAll(?string $estrutura = null): Collection
    {
        $query = $this->query()->orderBy('nome');

        if ($estrutura !== null) {
            $query->where('estrutura', $estrutura);
        }

        /** @var Collection<int, TipoPlanejamentoObjetivo> */
        return $query->get();
    }
}
