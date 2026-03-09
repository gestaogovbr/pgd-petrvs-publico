<?php

declare(strict_types=1);

namespace App\Repository\Entidade\Eloquent;

use App\Models\Entidade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Entidade\Contracts\EntidadeReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<Entidade>
 */
class EloquentEntidadeReadRepository extends AbstractEloquentReadRepository implements EntidadeReadRepositoryContract
{
    public function __construct(Entidade $model)
    {
        $this->model = $model;
    }

    public function findById(string|int $id, array $with = []): ?Entidade
    {
        $query = $this->query();
        if (!empty($with)) {
            $query->with($with);
        }
        /** @var Entidade|null $result */
        $result = $query->find($id);
        return $result;
    }

    public function findBySigla(string $sigla, array $with = []): ?Entidade
    {
        $query = $this->query();
        if (!empty($with)) {
            $query->with($with);
        }
        /** @var Entidade|null $result */
        $result = $query->where('sigla', $sigla)->first();
        return $result;
    }
}