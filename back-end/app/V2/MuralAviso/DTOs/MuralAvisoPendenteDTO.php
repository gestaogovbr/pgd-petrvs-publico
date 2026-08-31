<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\DTOs;

class MuralAvisoPendenteDTO
{
    public function __construct(
        public readonly string $id,
        public readonly string $titulo,
        public readonly string $conteudo,
        public readonly string $remetente,
        public readonly string $dataPublicacao,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'],
            titulo: $data['titulo'],
            conteudo: $data['conteudo'],
            remetente: $data['remetente'],
            dataPublicacao: $data['data_publicacao'],
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'titulo' => $this->titulo,
            'conteudo' => $this->conteudo,
            'remetente' => $this->remetente,
            'data_publicacao' => $this->dataPublicacao,
        ];
    }
}
