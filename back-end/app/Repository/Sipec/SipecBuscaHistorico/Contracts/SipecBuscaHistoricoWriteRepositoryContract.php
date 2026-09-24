<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecBuscaHistorico\Contracts;

use Illuminate\Database\Eloquent\Model;

interface SipecBuscaHistoricoWriteRepositoryContract
{
    /**
     * @return Model
     */
    public function registrar(string $resultado): Model;
}
