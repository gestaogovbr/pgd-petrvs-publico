<?php

declare(strict_types=1);

namespace App\Repository\Atividade\Contracts;

use App\Models\Atividade;

interface AtividadeReadRepositoryContract
{
    public function findWithPlanoTrabalho(string|int $id): ?Atividade;
}
