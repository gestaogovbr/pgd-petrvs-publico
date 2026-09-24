<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecBuscaHistorico\Eloquent;

use App\Models\SipecBuscaHistorico;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Sipec\SipecBuscaHistorico\Contracts\SipecBuscaHistoricoReadRepositoryContract;
use Illuminate\Database\Eloquent\Model;

final class EloquentSipecBuscaHistoricoReadRepository extends AbstractEloquentReadRepository implements SipecBuscaHistoricoReadRepositoryContract
{
    public function __construct(SipecBuscaHistorico $model)
    {
        $this->model = $model;
    }

    /**
     * @return SipecBuscaHistorico|null
     */
    public function findMaisRecente(): ?Model
    {
        return $this->query()
            ->orderBy('data_execucao', 'desc')
            ->first();
    }
}
