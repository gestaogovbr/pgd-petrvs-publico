<?php

declare(strict_types=1);

namespace App\Repository\RelatorioGeracao\Contracts;

use App\Models\RelatorioGeracao;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoIndexDTO;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface RelatorioGeracaoReadRepositoryContract
{
    public function find(string|int $id): ?RelatorioGeracao;

    public function findForUsuario(string $id, string $usuarioId): ?RelatorioGeracao;

    /**
     * @param list<string> $ids
     * @return Collection<int, RelatorioGeracao>
     */
    public function findByIdsForUsuario(array $ids, string $usuarioId): Collection;

    /**
     * @return LengthAwarePaginator<RelatorioGeracao>
     */
    public function paginateForUsuario(string $usuarioId, RelatorioGeracaoIndexDTO $dto): LengthAwarePaginator;

    /**
     * @return Collection<int, RelatorioGeracao>
     */
    public function findAntigas(int $horas): Collection;
}
