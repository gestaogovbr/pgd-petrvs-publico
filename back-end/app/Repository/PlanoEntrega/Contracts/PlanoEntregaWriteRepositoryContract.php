<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntrega\Contracts;

use App\Models\PlanoEntrega;
use Carbon\Carbon;

interface PlanoEntregaWriteRepositoryContract
{
    public function agendarEnvio(PlanoEntrega $planoEntrega, Carbon $dataAgendamento): void;

    public function registrarTentativa(PlanoEntrega $planoEntrega): void;

    public function registrarSucesso(PlanoEntrega $planoEntrega): void;

    public function registrarInsucesso(PlanoEntrega $planoEntrega, string $mensagem): void;

    public function registrarConclusao(PlanoEntrega $planoEntrega, string $mensagem): void;

    public function registrarLog(PlanoEntrega $planoEntrega, string $mensagem): void;
}
