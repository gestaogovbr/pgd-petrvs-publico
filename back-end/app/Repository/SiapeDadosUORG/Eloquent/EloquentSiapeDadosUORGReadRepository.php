<?php

declare(strict_types=1);

namespace App\Repository\SiapeDadosUORG\Eloquent;

use App\Models\SiapeDadosUORG;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SiapeDadosUORG\Contracts\SiapeDadosUORGReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

/**
 * @extends AbstractEloquentReadRepository<SiapeDadosUORG>
 */
class EloquentSiapeDadosUORGReadRepository extends AbstractEloquentReadRepository implements SiapeDadosUORGReadRepositoryContract
{
    public function __construct(SiapeDadosUORG $model)
    {
        $this->model = $model;
    }

    /** @return Collection<int, SiapeDadosUORG> */
    public function pendentes(string $codigoOrgao): Collection
    {
        return $this->model->newQuery()
            ->where('codigo_orgao', $codigoOrgao)
            ->where('processado', false)
            ->whereNotNull('codigo')
            ->orderByDesc('updated_at')
            ->get();
    }
}
