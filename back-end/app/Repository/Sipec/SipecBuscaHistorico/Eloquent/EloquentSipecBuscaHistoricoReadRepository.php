<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecBuscaHistorico\Eloquent;

use App\Models\SipecBuscaHistorico;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Sipec\SipecBuscaHistorico\Contracts\SipecBuscaHistoricoReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<SipecBuscaHistorico>
 */
final class EloquentSipecBuscaHistoricoReadRepository extends AbstractEloquentReadRepository implements SipecBuscaHistoricoReadRepositoryContract
{
    public function __construct(SipecBuscaHistorico $model)
    {
        $this->model = $model;
    }

    public function findMaisRecente(): ?SipecBuscaHistorico
    {
        /** @var SipecBuscaHistorico|null $registro */
        $registro = $this->query()
            ->orderBy('data_execucao', 'desc')
            ->first();

        return $registro;
    }
}
