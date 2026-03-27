<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Contracts;

use App\Models\PlanoTrabalho;
use Illuminate\Database\Eloquent\Model;

interface PlanoTrabalhoWriteRepositoryContract
{
    /** @return PlanoTrabalho */
    public function create(array $attributes): Model;

    /** @return PlanoTrabalho|null */
    public function update(string|int $id, array $attributes): ?Model;

    public function delete(string|int $id): bool;
}
