<?php

declare(strict_types=1);

namespace App\Repository\Eloquent;

use Illuminate\Database\Eloquent\Model;

/**
 * @template TModel of Model
 */
abstract class AbstractEloquentWriteRepository
{
    protected const MINIMUM_DELETED_ROWS = 1;
    /**
     * @var TModel
     */
    protected Model $model;

    /**
     * @param array<string, mixed> $attributes
     * @return TModel
     */
    public function create(array $attributes): Model
    {
        /** @var TModel $model */
        $model = $this->model->newInstance($attributes);
        $model->save();

        return $model;
    }

    /**
     * @param string|int $id
     * @param array<string, mixed> $attributes
     * @return TModel|null
     */
    public function update(string|int $id, array $attributes): ?Model
    {
        /** @var TModel|null $model */
        $model = $this->model->newQuery()->find($id);

        if ($model === null) {
            return null;
        }

        $model->fill($attributes);
        $model->save();

        return $model;
    }

    /**
     * @param string|int $id
     */
    public function delete(string|int $id): bool
    {
        return $this->model->newQuery()->whereKey($id)->delete() >= self::MINIMUM_DELETED_ROWS;
    }
}
