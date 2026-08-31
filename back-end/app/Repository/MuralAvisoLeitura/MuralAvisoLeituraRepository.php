<?php

declare(strict_types=1);

namespace App\Repository\MuralAvisoLeitura;

use App\Models\MuralAvisoLeitura;
use App\Repository\MuralAvisoLeitura\Contracts\MuralAvisoLeituraReadRepositoryContract;
use App\Repository\MuralAvisoLeitura\Contracts\MuralAvisoLeituraWriteRepositoryContract;

class MuralAvisoLeituraRepository
{
    public function __construct(
        private readonly MuralAvisoLeituraReadRepositoryContract $readRepository,
        private readonly MuralAvisoLeituraWriteRepositoryContract $writeRepository,
    ) {}

    public function findByUsuarioId(string $usuarioId): ?MuralAvisoLeitura
    {
        return $this->readRepository->findByUsuarioId($usuarioId);
    }

    public function upsert(string $usuarioId, \DateTimeInterface $dataConfirmacao): void
    {
        $this->writeRepository->upsert($usuarioId, $dataConfirmacao);
    }
}
