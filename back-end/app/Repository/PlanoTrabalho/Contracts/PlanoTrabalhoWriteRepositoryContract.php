<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Contracts;

use App\Models\PlanoTrabalho;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

interface PlanoTrabalhoWriteRepositoryContract
{
    /** @return PlanoTrabalho */
    public function create(array $attributes): Model;

    /** @return PlanoTrabalho|null */
    public function update(string|int $id, array $attributes): ?Model;

    public function delete(string|int $id): bool;

    public function agendarEnvio(PlanoTrabalho $planoTrabalho, Carbon $dataAgendamento): void;

    public function registrarTentativa(PlanoTrabalho $planoTrabalho): void;

    public function registrarSucesso(PlanoTrabalho $planoTrabalho): void;

    public function registrarInsucesso(PlanoTrabalho $planoTrabalho, string $mensagem): void;

    public function registrarConclusao(PlanoTrabalho $planoTrabalho, string $mensagem): void;

    public function registrarLog(PlanoTrabalho $planoTrabalho, string $mensagem): void;
}
