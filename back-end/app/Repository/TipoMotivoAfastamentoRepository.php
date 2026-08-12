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

    public function findById(string $id): ?\App\Models\TipoMotivoAfastamento
    {
        /** @var \App\Models\TipoMotivoAfastamento|null */
        return $this->readRepository->findById($id);
    }
}
