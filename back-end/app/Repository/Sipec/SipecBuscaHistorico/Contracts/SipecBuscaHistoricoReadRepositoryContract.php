<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecBuscaHistorico\Contracts;

use Illuminate\Database\Eloquent\Model;

interface SipecBuscaHistoricoReadRepositoryContract
{
    /**
     * @return Model|null
     */
    public function findMaisRecente(): ?Model;
}
