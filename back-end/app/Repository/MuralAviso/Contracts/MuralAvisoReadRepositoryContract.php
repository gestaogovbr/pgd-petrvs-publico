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
     * @return list<array<string, mixed>>
     */
    public function findPendentes(string $tenantId, ?\DateTimeInterface $dataConfirmacao): array;
}
