<?php

declare(strict_types=1);

namespace App\Repository\RelatorioAgente\Contracts;

interface RelatorioAgenteReadRepositoryContract
{
    public function query(array $data): array;
}
