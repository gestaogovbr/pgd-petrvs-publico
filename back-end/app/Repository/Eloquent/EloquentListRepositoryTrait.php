<?php

declare(strict_types=1);

namespace App\Repository\Eloquent;

use Illuminate\Database\Eloquent\Builder;

trait EloquentListRepositoryTrait
{
    /**
     * Aplica condições no formato [coluna, operador, valor]. Para cada coluna com entrada no mapa
     * de handlers, chama o callable correspondente. Colunas sem handler são ignoradas.
     *
     * @param list<array{0: string, 1: string, 2: mixed}> $where
     * @param array<string, callable(Builder, string, mixed): void> $handlersByColumn
     */
    protected function applyWhere(Builder $query, array $where, array $handlersByColumn): void
    {
        \Log::info("Applying where conditions", ['conditions' => $where]);
        foreach ($where as $condition) {
            if (!\is_array($condition) || \count($condition) < 3) {
                continue;
            }

            [$column, $operator, $value] = $condition;

            $handler = $handlersByColumn[$column] ?? null;
            if ($handler === null) {
                continue;
            }

            \Log::info("Applying where condition: column={$column}, operator={$operator}, value=" . json_encode($value));

            $handler($query, $operator, $value);
        }
    }

    /**
     * @param array<int|string, string> $with
     */
    protected function applyWith(Builder $query, array $with): void
    {
        if ($with === []) {
            return;
        }

        $query->with($with);
    }

    /**
     * @param list<array{0: string, 1?: string}> $orderBy
     */
    protected function applyOrderBy(Builder $query, array $orderBy): void
    {
        if ($orderBy === []) {
            return;
        }

        foreach ($orderBy as $ordem) {
            $query->orderBy($ordem[0], $ordem[1] ?? 'asc');
        }
    }

    protected function applyLimitPage(Builder $query, ?int $limit, int $page = 1): void
    {
        if ($limit === null || $limit <= 0) {
            return;
        }

        $query->skip(max($page - 1, 0) * $limit)->take($limit);
    }
}
