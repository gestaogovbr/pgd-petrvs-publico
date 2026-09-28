<?php

declare(strict_types=1);

namespace App\Repository\Sipec;

use App\Models\SipecBuscaHistorico;
use App\Repository\Sipec\SipecBuscaHistorico\Contracts\SipecBuscaHistoricoReadRepositoryContract;
use App\Repository\Sipec\SipecBuscaHistorico\Contracts\SipecBuscaHistoricoWriteRepositoryContract;

class SipecBuscaHistoricoRepository
{
    public function __construct(
        private readonly SipecBuscaHistoricoReadRepositoryContract $readRepository,
        private readonly SipecBuscaHistoricoWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findMaisRecente(): ?SipecBuscaHistorico
    {
        return $this->readRepository->findMaisRecente();
    }

    public function registrar(string $resultado): SipecBuscaHistorico
    {
        return $this->writeRepository->registrar($resultado);
    }
}
