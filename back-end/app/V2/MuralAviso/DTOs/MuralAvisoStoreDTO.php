<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\DTOs;

use App\Enums\MuralAvisoRemetenteTipo;
use App\Enums\PainelUsuarioNivel;

class MuralAvisoStoreDTO
{
    /**
     * @param list<string> $tenantIds
     */
    public function __construct(
        public readonly string $titulo,
        public readonly string $conteudo,
        public readonly string $destinatario,
        public readonly ?string $tenantId,
        public readonly string $usuarioId,
        public readonly int $nivelUsuario,
        public readonly array $tenantIds,
        public readonly string $dataPublicacao,
        public readonly string $dataExpiracao,
    ) {}

    public function isOrgaoCentral(): bool
    {
        return $this->nivelUsuario === PainelUsuarioNivel::ORGAO_CENTRAL->value;
    }

    public function remetenteTipo(): MuralAvisoRemetenteTipo
    {
        return $this->isOrgaoCentral() ? MuralAvisoRemetenteTipo::ORGAO_CENTRAL : MuralAvisoRemetenteTipo::TENANT;
    }

    public function remetenteTenantId(): ?string
    {
        return $this->isOrgaoCentral() ? null : $this->tenantId;
    }

    /**
     * @param array<string, mixed> $data
     * @param list<string> $tenantIds
     */
    public static function fromArray(array $data, string $usuarioId, int $nivelUsuario, array $tenantIds): self
    {
        return new self(
            titulo: $data['titulo'],
            conteudo: $data['conteudo'],
            destinatario: $data['destinatario'],
            tenantId: $data['tenant_id'] ?? null,
            usuarioId: $usuarioId,
            nivelUsuario: $nivelUsuario,
            tenantIds: $tenantIds,
            dataPublicacao: $data['data_publicacao'],
            dataExpiracao: $data['data_expiracao'],
        );
    }
}
