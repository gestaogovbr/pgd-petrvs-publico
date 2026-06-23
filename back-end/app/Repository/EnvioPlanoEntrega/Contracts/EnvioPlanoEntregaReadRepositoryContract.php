<?php

declare(strict_types=1);

namespace App\Repository\EnvioPlanoEntrega\Contracts;

interface EnvioPlanoEntregaReadRepositoryContract
{
    public function query(array $data): array;
}
