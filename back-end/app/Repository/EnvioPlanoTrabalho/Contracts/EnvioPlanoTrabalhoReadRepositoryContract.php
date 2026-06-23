<?php

declare(strict_types=1);

namespace App\Repository\EnvioPlanoTrabalho\Contracts;

interface EnvioPlanoTrabalhoReadRepositoryContract
{
    public function query(array $data): array;
}
