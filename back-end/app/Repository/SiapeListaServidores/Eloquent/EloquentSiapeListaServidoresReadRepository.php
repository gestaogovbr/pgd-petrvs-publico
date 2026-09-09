<?php

declare(strict_types=1);

namespace App\Repository\SiapeListaServidores\Eloquent;

use App\Models\SiapeListaServidores;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SiapeListaServidores\Contracts\SiapeListaServidoresReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

/** @extends AbstractEloquentReadRepository<SiapeListaServidores> */
final class EloquentSiapeListaServidoresReadRepository extends AbstractEloquentReadRepository implements SiapeListaServidoresReadRepositoryContract
{
    public function __construct(SiapeListaServidores $model)
    {
        $this->model = $model;
    }

    public function pendentes(): Collection
    {
        return $this->model->newQuery()
            ->where('processado', false)
            ->orderByDesc('updated_at')
            ->get();
    }
}
