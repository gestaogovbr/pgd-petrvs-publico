<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DTOs;

use App\Models\PlanoTrabalho;

class PlanoTrabalhoCloneDTO
{
    public function __construct(
        public readonly string $usuarioId,
        public readonly string $unidadeId,
        public readonly string $programaId,
        public readonly string $tipoModalidadeId,
        public readonly float $cargaHoraria,
        public readonly string $formaContagemCargaHoraria,
        public readonly string $criacaoUsuarioId,
        public readonly string|\DateTime $dataInicio,
        public readonly string|\DateTime $dataFim,
    ) {}

    public static function fromPlanoTrabalho(PlanoTrabalho $plano, string $criacaoUsuarioId): self
    {
        return new self(
            usuarioId: $plano->usuario_id,
            unidadeId: $plano->unidade_id,
            programaId: $plano->programa_id,
            tipoModalidadeId: $plano->tipo_modalidade_id,
            cargaHoraria: (float) $plano->carga_horaria,
            formaContagemCargaHoraria: $plano->forma_contagem_carga_horaria,
            criacaoUsuarioId: $criacaoUsuarioId,
            dataInicio: $plano->data_inicio,
            dataFim: $plano->data_fim,
        );
    }

    public function toArray(): array
    {
        return [
            'usuario_id' => $this->usuarioId,
            'unidade_id' => $this->unidadeId,
            'programa_id' => $this->programaId,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'carga_horaria' => $this->cargaHoraria,
            'forma_contagem_carga_horaria' => $this->formaContagemCargaHoraria,
            'criacao_usuario_id' => $this->criacaoUsuarioId,
            'data_inicio' => $this->dataInicio,
            'data_fim' => $this->dataFim,
        ];
    }
}
