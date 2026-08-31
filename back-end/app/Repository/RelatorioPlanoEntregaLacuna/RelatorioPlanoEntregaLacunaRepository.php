<?php

declare(strict_types=1);

namespace App\Repository\RelatorioPlanoEntregaLacuna;

use App\Repository\RelatorioPlanoEntregaLacuna\Contracts\RelatorioPlanoEntregaLacunaReadRepositoryContract;

class RelatorioPlanoEntregaLacunaRepository
{
    public function __construct(
        private readonly RelatorioPlanoEntregaLacunaReadRepositoryContract $readRepository
    ) {
    }

    public function query(array $data): array
    {
        return $this->readRepository->query($data);
    }
}
