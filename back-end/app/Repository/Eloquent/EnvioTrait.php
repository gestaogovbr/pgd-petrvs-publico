<?php

declare(strict_types=1);

namespace App\Repository\Eloquent;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

trait EnvioTrait
{
    public function agendarEnvio(Model $model, Carbon $dataAgendamento): void
    {
        $model->data_agendamento_envio = $dataAgendamento;
        $model->saveQuietly();
    }

    public function registrarTentativa(Model $model): void
    {
        $model->data_tentativa_envio = Carbon::now();
        $model->saveQuietly();
    }

    public function registrarSucesso(Model $model): void
    {
        $model->data_envio_api_pgd = Carbon::now();
        $model->data_conclusao_envio = Carbon::now();
        $model->saveQuietly();
        $this->registrarLog($model, 'Envio realizado com sucesso.');
    }

    // o insucesso é uma tentativa de envio que falhou, mas que ainda pode ser reprocessada posteriormente
    public function registrarInsucesso(Model $model, string $mensagem): void
    {
        $model->data_tentativa_envio = Carbon::now();
        $this->registrarLog($model, $mensagem);
    }

    public function registrarConclusao(Model $model, string $mensagem): void
    {
        $model->data_conclusao_envio = Carbon::now();
        $this->registrarLog($model, $mensagem);
    }

    public function registrarLog(Model $model, string $mensagem): void
    {
        $model->log_envio = $mensagem;
        $model->saveQuietly();
    }
}
