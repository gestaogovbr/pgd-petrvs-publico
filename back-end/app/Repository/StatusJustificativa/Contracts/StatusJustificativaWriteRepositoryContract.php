<?php

declare(strict_types=1);

namespace App\Repository\StatusJustificativa\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\StatusJustificativa\Eloquent\EloquentStatusJustificativaWriteRepository
 */
interface StatusJustificativaWriteRepositoryContract
{
    /** @return \App\Models\StatusJustificativa */
    public function create(array $attributes): Model;
}
