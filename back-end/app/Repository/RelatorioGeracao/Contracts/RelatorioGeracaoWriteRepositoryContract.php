<?php

declare(strict_types=1);

namespace App\Repository\RelatorioGeracao\Contracts;

use App\Models\RelatorioGeracao;

interface RelatorioGeracaoWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): RelatorioGeracao;

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string|int $id, array $attributes): ?RelatorioGeracao;

    public function marcarErroSeProcessando(string $id, ?string $mensagem): bool;

    public function marcarExpiradas(int $minutosLimite, string $mensagem): int;

    public function forceDelete(string $id): bool;
}
