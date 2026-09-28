<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecBuscaHistorico\Contracts;

use App\Models\SipecBuscaHistorico;

interface SipecBuscaHistoricoWriteRepositoryContract
{
    public function registrar(string $resultado): SipecBuscaHistorico;
}
