<?php

declare(strict_types=1);

namespace App\Repository\Eloquent;

use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

trait EnvioTrait
{
    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function agendarEnvio(Model $model, Carbon $dataAgendamento): void
    {
        $model->data_agendamento_envio = $dataAgendamento;
        $model->saveQuietly();
    }

    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function registrarTentativa(Model $model): void
    {
        $model->data_tentativa_envio = Carbon::now();
        $model->saveQuietly();
    }

    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function registrarSucesso(Model $model): void
    {
        $model->data_envio_api_pgd = Carbon::now();
        $model->data_conclusao_envio = Carbon::now();
        $model->saveQuietly();
        $this->registrarLog($model, 'Envio realizado com sucesso.');
    }

    // o insucesso é uma tentativa de envio que falhou, mas que ainda pode ser reprocessada posteriormente
    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function registrarInsucesso(Model $model, string $mensagem): void
    {
        $model->data_tentativa_envio = Carbon::now();
        $model->saveQuietly();
        $this->registrarLog($model, $mensagem);
    }

    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function registrarConclusao(Model $model, string $mensagem): void
    {
        $model->data_conclusao_envio = Carbon::now();
        $model->saveQuietly();
        $this->registrarLog($model, $mensagem);
    }

    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function registrarLog(Model $model, string $mensagem): void
    {
        $model->log_envio = $mensagem;
        $model->saveQuietly();
    }
}
