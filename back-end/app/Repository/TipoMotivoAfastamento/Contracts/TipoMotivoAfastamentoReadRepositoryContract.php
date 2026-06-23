<?php

declare(strict_types=1);

namespace App\Repository\TipoMotivoAfastamento\Contracts;

use Illuminate\Support\Collection;

interface TipoMotivoAfastamentoReadRepositoryContract
{
    public function getAllForDropdown(): Collection;
}
