<?php

declare(strict_types=1);

namespace App\Repository\TipoMotivoAfastamento\Contracts;

use Illuminate\Support\Collection;

interface TipoMotivoAfastamentoReadRepositoryContract
{
    public function getAllForDropdown(): Collection;

    /**
     * @return \App\Models\TipoMotivoAfastamento|null
     */
    public function findById(string|int $id): ?\Illuminate\Database\Eloquent\Model;
}
