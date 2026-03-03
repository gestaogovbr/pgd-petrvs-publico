<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntrega\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface PlanoEntregaReadRepositoryContract
{
    public function getPlanosEntregaAvaliacao(array $unidadesIds): Collection;
    public function getPlanosEntregaHomologacao(array $unidadesIds): Collection;
    public function getEntregasPlanoEntregaHomologacao(array $unidadesIds): Collection;
}
