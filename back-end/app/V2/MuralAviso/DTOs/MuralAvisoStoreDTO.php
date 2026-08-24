<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\DTOs;

class MuralAvisoStoreDTO
{
    private const NIVEL_ORGAO_CENTRAL = 1;

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
    ) {}

    public function isOrgaoCentral(): bool
    {
        return $this->nivelUsuario === self::NIVEL_ORGAO_CENTRAL;
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
        );
    }
}
