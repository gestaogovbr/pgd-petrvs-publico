<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DTOs;

class PlanoTrabalhoStoreDTO
{
    public function __construct(
        public readonly string $usuarioId,
        public readonly string $unidadeId,
        public readonly string $programaId,
        public readonly string $dataInicio,
        public readonly string $dataFim,
        public readonly string $modalidadePgd,
        public readonly string $criacaoUsuarioId,
        public readonly ?string $justificativaModalidade = null,
    ) {}

    public function isPlanoCriadoParaSi(): bool
    {
        return $this->usuarioId === $this->criacaoUsuarioId;
    }

    public static function fromArray(array $data, string $criacaoUsuarioId): self
    {
        return new self(
            usuarioId: $data['usuario_id'],
            unidadeId: $data['unidade_id'],
            programaId: $data['programa_id'],
            dataInicio: $data['data_inicio'],
            dataFim: $data['data_fim'],
            modalidadePgd: $data['modalidade_pgd'],
            criacaoUsuarioId: $criacaoUsuarioId,
            justificativaModalidade: $data['justificativa_modalidade'] ?? null,
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'usuario_id' => $this->usuarioId,
            'unidade_id' => $this->unidadeId,
            'programa_id' => $this->programaId,
            'data_inicio' => $this->dataInicio,
            'data_fim' => $this->dataFim,
            'modalidade_pgd' => $this->modalidadePgd,
            'criacao_usuario_id' => $this->criacaoUsuarioId,
            'justificativa_modalidade' => $this->justificativaModalidade,
        ];
    }
}
