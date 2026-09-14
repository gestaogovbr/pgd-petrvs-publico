<?php

declare(strict_types=1);

namespace App\Repository\Sipec;

use App\Repository\Sipec\SipecBuscaHistorico\Contracts\SipecBuscaHistoricoReadRepositoryContract;
use App\Repository\Sipec\SipecBuscaHistorico\Contracts\SipecBuscaHistoricoWriteRepositoryContract;
use Illuminate\Database\Eloquent\Model;

class SipecBuscaHistoricoRepository
{
    public function __construct(
        private readonly SipecBuscaHistoricoReadRepositoryContract $readRepository,
        private readonly SipecBuscaHistoricoWriteRepositoryContract $writeRepository,
    ) {
    }

    /**
     * @return Model|null
     */
    public function findMaisRecente(): ?Model
    {
        return $this->readRepository->findMaisRecente();
    }

    /**
     * @return Model
     */
    public function registrar(string $resultado): Model
    {
        return $this->writeRepository->registrar($resultado);
    }
}
