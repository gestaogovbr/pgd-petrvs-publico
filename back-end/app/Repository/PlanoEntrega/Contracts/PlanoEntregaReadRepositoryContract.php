<?php

namespace App\Repository\PlanoEntrega\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface PlanoEntregaReadRepositoryContract
{
    public function getPlanosEntregaAvaliacao(array $unidadesIds): Collection;
    public function getPlanosEntregaHomologacao(array $unidadesIds): Collection;
    public function getEntregasPlanoEntregaHomologacao(array $unidadesIds): Collection;
}
