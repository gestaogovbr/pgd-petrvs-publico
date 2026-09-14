<?php

declare(strict_types=1);

namespace App\V2\Usuario\DispensaPlanoTrabalho\DTOs;

final class DispensaPlanoTrabalhoResumoDTO implements \JsonSerializable
{
    /**
     * @param  list<DispensaPlanoTrabalhoHistoricoDTO>  $historico
     */
    public function __construct(
        public readonly string $usuario_id,
        public readonly string $usuario_nome,
        public readonly bool $elegivel,
        public readonly bool $pode_formalizar,
        public readonly bool $vigente,
        public readonly bool $pode_encerrar,
        public readonly ?string $dispensa_id,
        public readonly ?string $data_inicio,
        public readonly ?string $data_fim,
        public readonly ?string $ciencia_em,
        public readonly ?string $responsavel_id,
        public readonly ?string $responsavel_nome,
        public readonly ?string $atualizado_em,
        public readonly array $historico,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'usuario_id' => $this->usuario_id,
            'usuario_nome' => $this->usuario_nome,
            'elegivel' => $this->elegivel,
            'pode_formalizar' => $this->pode_formalizar,
            'vigente' => $this->vigente,
            'pode_encerrar' => $this->pode_encerrar,
            'dispensa_id' => $this->dispensa_id,
            'data_inicio' => $this->data_inicio,
            'data_fim' => $this->data_fim,
            'ciencia_em' => $this->ciencia_em,
            'responsavel_id' => $this->responsavel_id,
            'responsavel_nome' => $this->responsavel_nome,
            'atualizado_em' => $this->atualizado_em,
            'historico' => $this->historico,
        ];
    }
}
