<?php

namespace App\Repository;

use App\Repository\TipoModalidade\Contracts\TipoModalidadeReadRepositoryContract;

class TipoModalidadeRepository
{
    protected TipoModalidadeReadRepositoryContract $readRepository;

    public function __construct(TipoModalidadeReadRepositoryContract $readRepository)
    {
        $this->readRepository = $readRepository;
    }

    public function getDefaultId(): ?string
    {
        return $this->readRepository->getDefaultId();
    }
}
