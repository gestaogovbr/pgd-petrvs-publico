<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Eloquent;

use App\Models\PlanoTrabalho;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;
use Carbon\Carbon;

/**
 * @extends AbstractEloquentWriteRepository<PlanoTrabalho>
 */
class EloquentPlanoTrabalhoWriteRepository extends AbstractEloquentWriteRepository implements PlanoTrabalhoWriteRepositoryContract
{
    public function __construct(PlanoTrabalho $model)
    {
        $this->model = $model;
    }

    public function agendarEnvio(PlanoTrabalho $planoTrabalho, Carbon $dataAgendamento): void
    {
        /** @var PlanoTrabalho $planoTrabalho */
        $planoTrabalho->data_agendamento_envio = $dataAgendamento;
        $planoTrabalho->saveQuietly();
    }

    public function registrarTentativa(PlanoTrabalho $planoTrabalho): void
    {
        /** @var PlanoTrabalho $planoTrabalho */
        $planoTrabalho->data_tentativa_envio = Carbon::now();
        $planoTrabalho->saveQuietly();
    }

    public function registrarSucesso(PlanoTrabalho $planoTrabalho): void
    {
        /** @var PlanoTrabalho $planoTrabalho */
        $planoTrabalho->data_envio_api_pgd = Carbon::now();
        $planoTrabalho->log_envio = null;
        $planoTrabalho->saveQuietly();
    }

    public function registrarInsucesso(PlanoTrabalho $planoTrabalho, string $mensagem): void
    {
        $planoTrabalho->data_tentativa_envio = Carbon::now();
        $planoTrabalho->log_envio = $mensagem;
        $planoTrabalho->saveQuietly();
    }
}
