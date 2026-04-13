<?php

declare(strict_types=1);

namespace App\Repository\Ocorrencia\Eloquent;

use App\DTOs\ListResult;
use App\Models\Afastamento;
use App\Repository\Ocorrencia\Contracts\OcorrenciaReadRepositoryContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class EloquentOcorrenciaReadRepository implements OcorrenciaReadRepositoryContract
{
    public function __construct(
        private readonly Afastamento $ocorrencia,
    ) {
    }

    public function findById(string $id): ?Afastamento
    {
        if ($id === '') {
            return null;
        }

        return $this->ocorrencia->newQuery()->find($id);
    }

    public function findAll($data): ListResult
    {
        $query = $this->ocorrencia->newQuery();

        $count = $query->count();

        if (! empty($data['limit'])) {
            $query->skip(max($data['page'] - 1, 0) * $data['limit'])->take($data['limit']);
        }

        $rows = $query->get();

        \Log::info($query->toSql());

        return new ListResult($rows, $count);
    }
}
