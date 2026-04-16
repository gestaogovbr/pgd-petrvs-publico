<?php

declare(strict_types=1);

namespace App\Repository\Afastamento\Eloquent;

use App\DTOs\ListResult;
use App\Models\Afastamento;
use App\Repository\Afastamento\Contracts\AfastamentoReadRepositoryContract;
use App\Repository\Eloquent\EloquentListRepositoryTrait;
use Illuminate\Database\Eloquent\Builder;

class EloquentAfastamentoReadRepository implements AfastamentoReadRepositoryContract
{
    use EloquentListRepositoryTrait;

    public function __construct(
        private readonly Afastamento $afastamento,
    ) {
    }

    public function findById(string $id): ?Afastamento
    {
        if ($id === '') {
            return null;
        }

        return $this->afastamento->newQuery()->find($id);
    }

    public function findAll($params): ListResult
    {
        $query = $this->afastamento->newQuery();

        $this->applyWith($query, $params['with'] ?? []);
        $this->applyOrderBy($query, $params['orderBy'] ?? []);
        $this->applyWhere($query, $params['where'] ?? [], $this->whereHandlers());

        $count = $query->count();

        if (!empty($params['limit'])) {
            $this->applyLimitPage(
                $query,
                (int) $params['limit'],
                (int) ($params['page'] ?? 1)
            );
        }

        \Log::info($query->toSql(), $query->getBindings());

        $rows = $query->get();

        return new ListResult($rows, $count);
    }

    /**
     * @return array<string, callable(Builder, string, mixed): void>
     */
    private function whereHandlers(): array
    {
        return [
            'usuario_id' => static function (Builder $query, string $operator, mixed $value): void {
                $query->where('usuario_id', $value);
            },
        ];
    }
}
