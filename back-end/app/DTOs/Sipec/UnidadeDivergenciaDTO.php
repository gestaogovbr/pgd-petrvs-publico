<?php

declare(strict_types=1);

namespace App\DTOs\Sipec;

/**
 * Representa uma unidade de integracao_unidades com dados para comparação/sincronização
 * com a tabela unidades.
 */
final readonly class UnidadeDivergenciaDTO
{
    public function __construct(
        public ?string $idServo,
        public ?string $paiServo,
        public ?string $nomeuorg,
        public ?string $siglauorg,
        public ?string $municipioIbge,
        public ?string $dataModificacao,
        public ?string $ativa,
        public ?string $unidadeId,
        public ?string $unidadeNomeAtual,
        public ?string $unidadeSiglaAtual,
        public ?string $unidadePaiIdAtual,
        public ?string $unidadeCodigoPaiAtual,
        public ?string $unidadePathAtual,
        public ?string $cidadeId,
        public ?string $cidadeIdAtual,
        public ?string $unidadePaiIdNovo,
        public ?string $unidadePaiPathNovo,
    ) {
    }

    public static function fromStdClass(object $row): self
    {
        return new self(
            idServo: $row->id_servo ?? null,
            paiServo: $row->pai_servo ?? null,
            nomeuorg: $row->nomeuorg ?? null,
            siglauorg: $row->siglauorg ?? null,
            municipioIbge: $row->municipio_ibge ?? null,
            dataModificacao: $row->data_modificacao_siape ?? null,
            ativa: $row->ativa ?? null,
            unidadeId: $row->id ?? null,
            unidadeNomeAtual: $row->nome_antigo ?? null,
            unidadeSiglaAtual: $row->sigla_antiga ?? null,
            unidadePaiIdAtual: $row->id_pai_antigo ?? null,
            unidadeCodigoPaiAtual: $row->codigo_pai_antigo ?? null,
            unidadePathAtual: $row->path_antigo ?? null,
            cidadeId: $row->cidade_id ?? null,
            cidadeIdAtual: $row->cidade_antiga ?? null,
            unidadePaiIdNovo: $row->unidade_pai_id ?? null,
            unidadePaiPathNovo: $row->path_pai ?? null,
        );
    }

    public function isNovaUnidade(): bool
    {
        return $this->unidadeId === null;
    }

    public function isPaiAlterado(): bool
    {
        if ($this->isNovaUnidade()) {
            return false;
        }
        return $this->paiServo !== $this->unidadeCodigoPaiAtual;
    }

    public function isDadosAlterados(): bool
    {
        if ($this->isNovaUnidade()) {
            return false;
        }
        return $this->nomeuorg !== $this->unidadeNomeAtual
            || $this->siglauorg !== $this->unidadeSiglaAtual
            || $this->cidadeId !== $this->cidadeIdAtual;
    }
}
