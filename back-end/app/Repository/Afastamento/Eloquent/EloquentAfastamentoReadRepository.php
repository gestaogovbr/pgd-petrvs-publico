<?php

declare(strict_types=1);

namespace App\Repository\Afastamento\Eloquent;

use App\DTOs\ListResult;
use App\Models\Afastamento;
use App\Repository\Afastamento\Contracts\AfastamentoReadRepositoryContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class EloquentAfastamentoReadRepository implements AfastamentoReadRepositoryContract
{
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

        $with = $params['with'] ?? [];
        $orderBy = $params['orderBy'];

        if (!empty($with)) {
            $query->with($with);
        }

        if(!empty($orderBy)) {
            foreach($orderBy as $ordem) {
                $query->orderBy($ordem[0], $ordem[1] ?? 'asc');
            }
        }

        $count = $query->count();

        if (!empty($params['limit'])) {
            $query->skip(max($params['page'] - 1, 0) * $params['limit'])->take($params['limit']);
        }

        $rows = $query->get();

        return new ListResult($rows, $count);
    }
}
