<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Contracts;

use App\Models\PlanoTrabalho;
use Illuminate\Database\Eloquent\Model;

interface PlanoTrabalhoWriteRepositoryContract
{
    /** @return PlanoTrabalho */
    public function create(array $attributes): Model;

    public function delete(string|int $id): bool;
}
