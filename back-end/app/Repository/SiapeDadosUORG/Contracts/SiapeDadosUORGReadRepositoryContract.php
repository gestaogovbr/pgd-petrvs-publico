<?php

declare(strict_types=1);

namespace App\Repository\SiapeDadosUORG\Contracts;

use App\Models\SiapeDadosUORG;
use Illuminate\Database\Eloquent\Collection;

/**
 * @see \App\Repository\SiapeDadosUORG\Eloquent\EloquentSiapeDadosUORGReadRepository
 */
interface SiapeDadosUORGReadRepositoryContract
{
    /** @return Collection<int, SiapeDadosUORG> */
    public function pendentes(string $codigoOrgao): Collection;
}
