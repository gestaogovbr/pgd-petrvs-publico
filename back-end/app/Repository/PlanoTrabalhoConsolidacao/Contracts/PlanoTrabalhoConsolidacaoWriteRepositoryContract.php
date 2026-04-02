<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoConsolidacao\Contracts;

use Illuminate\Database\Eloquent\Model;

interface PlanoTrabalhoConsolidacaoWriteRepositoryContract
{
    /** @return \App\Models\PlanoTrabalhoConsolidacao */
    public function create(array $attributes): Model;

    public function delete(string|int $id): bool;

    /** @return \App\Models\PlanoTrabalhoConsolidacao|null */
    public function update(string|int $id, array $attributes): ?Model;
}
