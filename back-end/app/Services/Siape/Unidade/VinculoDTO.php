<?php 
namespace App\Services\Siape\Unidade;

class VinculoDTO {
    public function __construct(
        public readonly ?int $usuarioId,
        public readonly ?int $unidadeId,
        public readonly array $atribuicoes,
        public readonly ?int $perfilId,
        public readonly array $metadata
    ) {}

    public static function fromArray(array $data): self {
        return new self(
            usuarioId: $data['usuario_id'] ?? null,
            unidadeId: $data['unidade_id'] ?? null,
            atribuicoes: $data['atribuicoes'] ?? [],
            perfilId: $data['_metadata']['perfil_id'] ?? null,
            metadata: $data['_metadata'] ?? []
        );
    }
}
