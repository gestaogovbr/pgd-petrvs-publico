<?php

namespace App\V2\TipoModalidade;

use App\Repository\TipoModalidadeRepository;
use Illuminate\Support\Collection;

class TipoModalidadeService
{
    public function __construct(
        private readonly TipoModalidadeRepository $repository
    ) {
    }

    public function index(): Collection
    {
        return $this->repository->getAll();
    }
}
