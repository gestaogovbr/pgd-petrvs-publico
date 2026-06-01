<?php

declare(strict_types=1);

namespace App\Repository\Interfaces;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * @template T of Model
 */
interface EnvioWriteRepositoryInterface
{
    /**
     * @param T $model
     */
    public function agendarEnvio(Model $model, Carbon $dataAgendamento): void;

    /**
     * @param T $model
     */
    public function registrarTentativa(Model $model): void;

    /**
     * @param T $model
     */
    public function registrarSucesso(Model $model): void;

    /**
     * @param T $model
     */
    public function registrarInsucesso(Model $model, string $mensagem): void;

    /**
     * @param T $model
     */
    public function registrarConclusao(Model $model, string $mensagem): void;
}
