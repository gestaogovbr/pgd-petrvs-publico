<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecBuscaHistorico\Contracts;

use App\Models\SipecBuscaHistorico;

interface SipecBuscaHistoricoReadRepositoryContract
{
    public function findMaisRecente(): ?SipecBuscaHistorico;
}
