<?php

declare(strict_types=1);

namespace App\Repository\SiapeListaUORGS\Contracts;

use App\Models\SiapeListaUORGS;

/**
 * @see \App\Repository\SiapeListaUORGS\Eloquent\EloquentSiapeListaUORGSReadRepository
 */
interface SiapeListaUORGSReadRepositoryContract
{
    public function findUnprocessed(): ?SiapeListaUORGS;
}
