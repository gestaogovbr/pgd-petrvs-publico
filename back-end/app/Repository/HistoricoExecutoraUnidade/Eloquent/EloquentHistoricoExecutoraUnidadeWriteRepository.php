<?php

declare(strict_types=1);

namespace App\Repository\HistoricoExecutoraUnidade\Eloquent;

use App\Models\HistoricoExecutoraUnidade;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\HistoricoExecutoraUnidade\Contracts\HistoricoExecutoraUnidadeWriteRepositoryContract;

class EloquentHistoricoExecutoraUnidadeWriteRepository extends AbstractEloquentWriteRepository implements HistoricoExecutoraUnidadeWriteRepositoryContract
{
    public function __construct(HistoricoExecutoraUnidade $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): HistoricoExecutoraUnidade
    {
        /** @var HistoricoExecutoraUnidade */
        return parent::create($attributes);
    }

    public function encerrarPeriodoAberto(string $unidadeId, string $dataFim): void
    {
        $this->model->newQuery()
            ->where('unidade_id', $unidadeId)
            ->whereNull('data_fim')
            ->update(['data_fim' => $dataFim]);
    }
}
