<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntrega\Eloquent;

use App\Models\PlanoEntrega;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaWriteRepositoryContract;
use Carbon\Carbon;

/**
 * @extends AbstractEloquentWriteRepository<PlanoEntrega>
 */
class EloquentPlanoEntregaWriteRepository extends AbstractEloquentWriteRepository implements PlanoEntregaWriteRepositoryContract
{
    public function __construct(PlanoEntrega $model)
    {
        $this->model = $model;
    }

    public function agendarEnvio(PlanoEntrega $planoEntrega, Carbon $dataAgendamento): void
    {
        $planoEntrega->data_agendamento_envio = $dataAgendamento;
        $planoEntrega->saveQuietly();
    }

    public function registrarTentativa(PlanoEntrega $planoEntrega): void
    {
        $planoEntrega->data_tentativa_envio = Carbon::now();
        $planoEntrega->saveQuietly();
    }

    public function registrarSucesso(PlanoEntrega $planoEntrega): void
    {
        $planoEntrega->data_envio_api_pgd = Carbon::now();
        $planoEntrega->log_envio = null;
        $planoEntrega->saveQuietly();
    }

    public function registrarInsucesso(PlanoEntrega $planoEntrega, string $mensagem): void
    {
        $planoEntrega->data_tentativa_envio = Carbon::now();
        $planoEntrega->log_envio = $mensagem;
        $planoEntrega->saveQuietly();
    }
}
