<?php

declare(strict_types=1);

namespace App\Repository\MuralAviso\Contracts;

use App\Models\MuralAviso;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface MuralAvisoReadRepositoryContract
{
    public function findById(string|int $id): ?MuralAviso;

    /**
     * @param list<string> $tenantIds
     */
    public function paginateForPainel(array $tenantIds, int $perPage): LengthAwarePaginator;

    /**
     * Retorna todos os avisos vigentes do tenant, ordenados por origem
     * (Órgão Central primeiro) e data de publicação (mais recente primeiro).
     *
     * @return list<array<string, mixed>>
     */
    public function findVigentes(string $tenantId): array;

    /**
     * Conta avisos publicados por um emissor em determinado mês/ano,
     * considerando a data de publicação. Permite ignorar um aviso específico
     * (ex: o próprio aviso em edição).
     */
    public function countByEmissorNoMes(
        string $remetenteTipo,
        ?string $remetenteTenantId,
        int $ano,
        int $mes,
        ?string $ignorarAvisoId = null,
    ): int;
}
