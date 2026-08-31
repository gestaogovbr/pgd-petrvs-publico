<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\DTOs;

class MuralAvisoQueryDTO
{
    private const NIVEL_ORGAO_CENTRAL = 1;

    /**
     * @param list<string> $tenantIds
     */
    public function __construct(
        public readonly int $nivelUsuario,
        public readonly array $tenantIds,
        public readonly int $perPage,
    ) {}

    public function isOrgaoCentral(): bool
    {
        return $this->nivelUsuario === self::NIVEL_ORGAO_CENTRAL;
    }

    /**
     * @return list<string>
     */
    public function getFilterTenantIds(): array
    {
        return $this->isOrgaoCentral() ? [] : $this->tenantIds;
    }
}
