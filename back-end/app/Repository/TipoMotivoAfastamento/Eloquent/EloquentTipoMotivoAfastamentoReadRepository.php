<?php

declare(strict_types=1);

namespace App\Repository\TipoMotivoAfastamento\Eloquent;

use App\Models\TipoMotivoAfastamento;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\TipoMotivoAfastamento\Contracts\TipoMotivoAfastamentoReadRepositoryContract;
use Illuminate\Support\Collection;

/**
 * @extends AbstractEloquentReadRepository<TipoMotivoAfastamento>
 */
class EloquentTipoMotivoAfastamentoReadRepository extends AbstractEloquentReadRepository implements TipoMotivoAfastamentoReadRepositoryContract
{
    public function __construct(TipoMotivoAfastamento $model)
    {
        $this->model = $model;
    }

    public function getAllForDropdown(): Collection
    {
        return $this->query()
            ->whereNull('deleted_at')
            ->select(['id', 'codigo', 'nome', 'horas'])
            ->orderBy('nome')
            ->get();
    }
}
