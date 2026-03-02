<?php

namespace App\Repository\PlanoTrabalho\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface PlanoTrabalhoReadRepositoryContract
{
    public function getPlanosTrabalhoAssinatura(array $unidadesIds, string $usuarioId): Collection;
}
