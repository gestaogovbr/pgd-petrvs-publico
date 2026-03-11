<?php

declare(strict_types=1);

namespace App\Repository\SiapeBlackListServidor\Eloquent;

use App\Models\SiapeBlackListServidor;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<SiapeBlackListServidor>
 */
class EloquentSiapeBlackListServidorWriteRepository extends AbstractEloquentWriteRepository implements SiapeBlackListServidorWriteRepositoryContract
{
    public function __construct(SiapeBlackListServidor $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): SiapeBlackListServidor
    {
        /** @var SiapeBlackListServidor $model */
        $model = parent::create($attributes);
        return $model;
    }

    public function forceDelete(string $id): bool
    {
        return $this->model->newQuery()->withTrashed()->whereKey($id)->forceDelete() >= self::MINIMUM_DELETED_ROWS;
    }
}