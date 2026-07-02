<?php

declare(strict_types=1);

namespace App\Repository\SipecUnidade\Contracts;

use Illuminate\Database\Eloquent\Model;

interface SipecUnidadeReadRepositoryContract
{
    /**
     * @return Model|null
     */
    public function findByCodigo(string $codigo): ?Model;

    public function chunkNaoProcessados(int $chunkSize, callable $callback): void;
}
