<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecBuscaHistorico\Eloquent;

use App\Models\SipecBuscaHistorico;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Sipec\SipecBuscaHistorico\Contracts\SipecBuscaHistoricoWriteRepositoryContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

final class EloquentSipecBuscaHistoricoWriteRepository extends AbstractEloquentWriteRepository implements SipecBuscaHistoricoWriteRepositoryContract
{
    public function __construct(SipecBuscaHistorico $model)
    {
        $this->model = $model;
    }

    /**
     * @return SipecBuscaHistorico
     */
    public function registrar(string $resultado): Model
    {
        return $this->create([
            'data_execucao' => Carbon::now(),
            'resultado'     => $resultado,
        ]);
    }
}
