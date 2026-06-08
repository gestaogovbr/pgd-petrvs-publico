<?php

declare(strict_types=1);

namespace App\Repository\TipoPlanejamentoObjetivo\Eloquent;

use App\Models\TipoPlanejamentoObjetivo;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\TipoPlanejamentoObjetivo\Contracts\TipoPlanejamentoObjetivoWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<TipoPlanejamentoObjetivo>
 */
class EloquentTipoPlanejamentoObjetivoWriteRepository extends AbstractEloquentWriteRepository implements TipoPlanejamentoObjetivoWriteRepositoryContract
{
    public function __construct(TipoPlanejamentoObjetivo $model)
    {
        $this->model = $model;
    }
}
