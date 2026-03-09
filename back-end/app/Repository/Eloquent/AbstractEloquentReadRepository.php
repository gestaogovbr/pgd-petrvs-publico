<?php

declare(strict_types=1);

namespace App\Repository\Eloquent;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @template TModel of Model
 */
abstract class AbstractEloquentReadRepository
{
    protected const DEFAULT_PER_PAGE = 15;
    /**
     * @var TModel
     */
    protected Model $model;

    protected function query(): Builder
    {
        return $this->model->newQuery();
    }

    /**
     * @param string|int $id
     * @return TModel|null
     */
    public function findById(string|int $id): ?Model
    {
        return $this->query()->find($id);
    }

    /**
     * Alias para findById para ficar próximo do Eloquent.
     *
     * @param string|int $id
     * @return TModel|null
     */
    public function find(string|int $id): ?Model
    {
        return $this->findById($id);
    }

    /**
     * @param array<string, mixed> $criteria
     * @return TModel|null
     */
    public function findOneBy(array $criteria): ?Model
    {
        $query = $this->applyCriteria($this->query(), $criteria);

        return $query->first();
    }

    /**
     * @param array<string, mixed> $criteria
     * @return Collection<int, TModel>
     */
    public function findWhere(array $criteria): Collection
    {
        $query = $this->applyCriteria($this->query(), $criteria);

        /** @var Collection<int, TModel> $result */
        $result = $query->get();

        return $result;
    }

    /**
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = self::DEFAULT_PER_PAGE): LengthAwarePaginator
    {
        return $this->query()->paginate($perPage);
    }

    /**
     * @param Builder $query
     * @param array<string, mixed> $criteria
     */
    protected function applyCriteria(Builder $query, array $criteria): Builder
    {
        foreach ($criteria as $field => $value) {
            $query->where($field, $value);
        }

        return $query;
    }
}
