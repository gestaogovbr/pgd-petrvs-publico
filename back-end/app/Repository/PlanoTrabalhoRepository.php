<?php

namespace App\Repository;

use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class PlanoTrabalhoRepository
{
    public function __construct(
        protected PlanoTrabalhoReadRepositoryContract $readRepository,
        protected PlanoTrabalhoWriteRepositoryContract $writeRepository
    ) {}

    public function getPlanosTrabalhoAssinatura(array $unidadesIds, string $usuarioId): Collection
    {
        return $this->readRepository->getPlanosTrabalhoAssinatura($unidadesIds, $usuarioId);
    }
}
