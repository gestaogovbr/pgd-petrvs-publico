<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\DTOs;

class MuralAvisoStoreDTO
{
    public function __construct(
        public readonly string $titulo,
        public readonly string $conteudo,
        public readonly string $destinatario,
        public readonly ?string $tenantId,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            titulo: $data['titulo'],
            conteudo: $data['conteudo'],
            destinatario: $data['destinatario'],
            tenantId: $data['tenant_id'] ?? null,
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'titulo' => $this->titulo,
            'conteudo' => $this->conteudo,
            'destinatario' => $this->destinatario,
            'tenant_id' => $this->tenantId,
        ];
    }
}
