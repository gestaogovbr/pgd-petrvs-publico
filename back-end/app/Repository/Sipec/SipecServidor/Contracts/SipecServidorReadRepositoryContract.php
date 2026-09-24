<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecServidor\Contracts;

use Illuminate\Database\Eloquent\Model;

interface SipecServidorReadRepositoryContract
{
    /**
     * @return Model|null
     */
    public function findByCpfAndMatricula(string $cpf, ?string $matricula): ?Model;

    /**
     * Processa registros não marcados como processados em chunks.
     *
     * @param int $chunkSize
     * @param callable $callback
     */
    public function chunkNaoProcessados(int $chunkSize, callable $callback): void;
}
