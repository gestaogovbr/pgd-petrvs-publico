<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\TipoMotivoAfastamento\Contracts\TipoMotivoAfastamentoReadRepositoryContract;
use Illuminate\Support\Collection;

class TipoMotivoAfastamentoRepository
{
    public function __construct(
        private readonly TipoMotivoAfastamentoReadRepositoryContract $readRepository
    ) {
    }

    public function getAllForDropdown(): Collection
    {
        return $this->readRepository->getAllForDropdown();
    }
}
