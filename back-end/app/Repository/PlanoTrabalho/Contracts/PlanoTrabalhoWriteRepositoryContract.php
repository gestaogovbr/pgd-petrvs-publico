<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Contracts;

use App\Models\PlanoTrabalho;
use Carbon\Carbon;

interface PlanoTrabalhoWriteRepositoryContract
{
    public function agendarEnvio(PlanoTrabalho $planoTrabalho, Carbon $dataAgendamento): void;

    public function registrarTentativa(PlanoTrabalho $planoTrabalho): void;

    public function registrarSucesso(PlanoTrabalho $planoTrabalho): void;

    public function registrarInsucesso(PlanoTrabalho $planoTrabalho, string $mensagem): void;

    public function registrarConclusao(PlanoTrabalho $planoTrabalho, string $mensagem): void;

    public function registrarLog(PlanoTrabalho $planoTrabalho, string $mensagem): void;
}
