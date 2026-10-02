<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecBuscaHistorico\Eloquent;

use App\Models\SipecBuscaHistorico;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Sipec\SipecBuscaHistorico\Contracts\SipecBuscaHistoricoWriteRepositoryContract;
use Illuminate\Support\Carbon;

/**
 * @extends AbstractEloquentWriteRepository<SipecBuscaHistorico>
 */
final class EloquentSipecBuscaHistoricoWriteRepository extends AbstractEloquentWriteRepository implements SipecBuscaHistoricoWriteRepositoryContract
{
    public function __construct(SipecBuscaHistorico $model)
    {
        $this->model = $model;
    }

    public function registrar(string $resultado): SipecBuscaHistorico
    {
        /** @var SipecBuscaHistorico $registro */
        $registro = $this->create([
            'data_execucao' => Carbon::now(),
            'resultado'     => $resultado,
        ]);

        return $registro;
    }
}
