<?php

declare(strict_types=1);

namespace App\Repository\RelatorioPlanoEntregaLacuna;

use App\Repository\RelatorioPlanoEntregaLacuna\Contracts\RelatorioPlanoEntregaLacunaReadRepositoryContract;
use App\V2\RelatorioPlanoEntregaLacuna\DTOs\RelatorioPlanoEntregaLacunaQueryDTO;

class RelatorioPlanoEntregaLacunaRepository
{
    public function __construct(
        private readonly RelatorioPlanoEntregaLacunaReadRepositoryContract $readRepository
    ) {
    }

    public function query(RelatorioPlanoEntregaLacunaQueryDTO $data): array
    {
        return $this->readRepository->query($data);
    }
}
