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
        $model->setAttribute('data_agendamento_envio', $dataAgendamento);
        $timestampsEnabled = $model->timestamps;
        $model->timestamps = false;
        try {
            $model->saveQuietly();
        } finally {
            $model->timestamps = $timestampsEnabled;
        }
    }

    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function registrarTentativa(Model $model): void
    {
        $data = Carbon::now();
        $model->setAttribute('data_tentativa_envio', $data);
        $timestampsEnabled = $model->timestamps;
        $model->timestamps = false;
        try {
            $model->saveQuietly();
        } finally {
            $model->timestamps = $timestampsEnabled;
        }
    }

    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function registrarSucesso(Model $model): void
    {
        $data = Carbon::now();
        $model->setAttribute('data_envio_api_pgd', $data);
        $model->setAttribute('data_conclusao_envio', $data);
        $timestampsEnabled = $model->timestamps;
        $model->timestamps = false;
        try {
            $model->saveQuietly();
        } finally {
            $model->timestamps = $timestampsEnabled;
        }
        $this->registrarLog($model, 'Envio realizado com sucesso.');
    }

    // o insucesso é uma tentativa de envio que falhou, mas que ainda pode ser reprocessada posteriormente
    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function registrarInsucesso(Model $model, string $mensagem): void
    {
        $data = Carbon::now();
        $model->setAttribute('data_tentativa_envio', $data);
        $timestampsEnabled = $model->timestamps;
        $model->timestamps = false;
        try {
            $model->saveQuietly();
        } finally {
            $model->timestamps = $timestampsEnabled;
        }
        $this->registrarLog($model, $mensagem);
    }

    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function registrarConclusao(Model $model, string $mensagem): void
    {
        $data = Carbon::now();
        $model->setAttribute('data_conclusao_envio', $data);
        $timestampsEnabled = $model->timestamps;
        $model->timestamps = false;
        try {
            $model->saveQuietly();
        } finally {
            $model->timestamps = $timestampsEnabled;
        }
        $this->registrarLog($model, $mensagem);
    }

    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function registrarLog(Model $model, string $mensagem): void
    {
        $model->setAttribute('log_envio', $mensagem);
        $timestampsEnabled = $model->timestamps;
        $model->timestamps = false;
        try {
            $model->saveQuietly();
        } finally {
            $model->timestamps = $timestampsEnabled;
        }
    }
}
