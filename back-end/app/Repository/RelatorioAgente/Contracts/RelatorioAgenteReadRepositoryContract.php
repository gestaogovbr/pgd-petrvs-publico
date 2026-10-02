<?php

declare(strict_types=1);

namespace App\Repository\RelatorioAgente\Contracts;

use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;

interface RelatorioAgenteReadRepositoryContract
{
    public function query(RelatorioAgenteQueryDTO $dto): array;
}
