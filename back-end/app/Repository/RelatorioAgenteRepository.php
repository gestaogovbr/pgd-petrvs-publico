<?php

declare(strict_types=1);

namespace App\Repository;

use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;
use App\Repository\RelatorioAgente\Contracts\RelatorioAgenteReadRepositoryContract;

class RelatorioAgenteRepository
{
    public function __construct(
        private readonly RelatorioAgenteReadRepositoryContract $readRepository
    ) {
    }

    public function query(RelatorioAgenteQueryDTO $dto): array
    {
        return $this->readRepository->query($dto);
    }
}
