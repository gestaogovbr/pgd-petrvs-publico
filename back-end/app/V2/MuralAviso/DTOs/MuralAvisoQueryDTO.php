<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\DTOs;

use App\Enums\PainelUsuarioNivel;

class MuralAvisoQueryDTO
{
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
        return $this->nivelUsuario === PainelUsuarioNivel::ORGAO_CENTRAL->value;
    }

    /**
     * @return list<string>
     */
    public function getFilterTenantIds(): array
    {
        return $this->isOrgaoCentral() ? [] : $this->tenantIds;
    }
}
