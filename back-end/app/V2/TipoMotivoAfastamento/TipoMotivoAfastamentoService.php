<?php

declare(strict_types=1);

namespace App\V2\TipoMotivoAfastamento;

use App\Repository\TipoMotivoAfastamentoRepository;
use Illuminate\Support\Collection;

class TipoMotivoAfastamentoService
{
    public function __construct(
        private readonly TipoMotivoAfastamentoRepository $repository
    ) {
    }

    public function index(): Collection
    {
        return $this->repository->getAllForDropdown();
    }
}
