<?php

declare(strict_types=1);

namespace App\Repository\SiapeBlacklistUnidade\Contracts;

use App\Models\SiapeBlacklistUnidade;

interface SiapeBlacklistUnidadeWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): SiapeBlacklistUnidade;

    public function update(string|int $id, array $attributes): ?SiapeBlacklistUnidade;

    public function delete(string|int $id): bool;

    public function restoreAsNovaPendencia(SiapeBlacklistUnidade $blacklist, string $response): SiapeBlacklistUnidade;
}
