<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional\DTOs;

/**
 * Linha do detalhamento de entregas — contrato unificado entre Planejamento e Cadeia de Valor.
 */
final class EntregaDetalheLinhaDTO implements \JsonSerializable
{
    /**
     * @param list<array{key: string, value: string, icon?: string|null, color?: string|null}>|null $etiquetas
     * @param mixed $meta Valor estruturado da meta do indicador (JSON)
     * @param mixed $realizado Valor estruturado do realizado do indicador (JSON)
     * @param list<array{key: string, value: string}>|null $lista_qualitativos
     */
    public function __construct(
        public readonly string $plano_entrega_entrega_id,
        public readonly string $unidade_id,
        public readonly string $unidade_sigla,
        public readonly string $unidade_nome,
        public readonly string $plano_entrega_id,
        public readonly string $plano_entrega_nome,
        public readonly string $plano_entrega_status,
        public readonly string $plano_entrega_vigencia_inicio,
        public readonly ?string $plano_entrega_vigencia_fim,
        public readonly string $entrega_titulo,
        public readonly string $entrega_descricao,
        public readonly string $descricao_meta,
        public readonly ?array $etiquetas,
        public readonly float $progresso_esperado,
        public readonly float $progresso_realizado,
        public readonly mixed $meta,
        public readonly mixed $realizado,
        public readonly ?string $tipo_indicador,
        public readonly ?array $lista_qualitativos,
        public readonly ?string $registro_execucao,
        public readonly int $participantes_total,
        public readonly int $participantes_somente_unidade_propria,
        public readonly int $participantes_somente_outras_unidades,
        public readonly int $participantes_em_ambas,
        public readonly float $esforco_disponivel_horas,
        public readonly float $esforco_planejado_horas,
        public readonly float $esforco_executado_horas,
        public readonly bool $mostrar_disponivel,
        public readonly bool $mostrar_planejado,
        public readonly bool $mostrar_executado,
        // Opcional — identifica o nó de origem (relevante quando abrangência inclui subordinados)
        public readonly ?string $no_origem_id = null,
        public readonly ?string $no_origem_nome = null,
    ) {}

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        $data = [
            'plano_entrega_entrega_id' => $this->plano_entrega_entrega_id,
            'unidade_id' => $this->unidade_id,
            'unidade_sigla' => $this->unidade_sigla,
            'unidade_nome' => $this->unidade_nome,
            'plano_entrega_id' => $this->plano_entrega_id,
            'plano_entrega_nome' => $this->plano_entrega_nome,
            'plano_entrega_status' => $this->plano_entrega_status,
            'plano_entrega_vigencia_inicio' => $this->plano_entrega_vigencia_inicio,
            'plano_entrega_vigencia_fim' => $this->plano_entrega_vigencia_fim,
            'entrega_titulo' => $this->entrega_titulo,
            'entrega_descricao' => $this->entrega_descricao,
            'descricao_meta' => $this->descricao_meta,
            'etiquetas' => $this->etiquetas,
            'progresso_esperado' => $this->progresso_esperado,
            'progresso_realizado' => $this->progresso_realizado,
            'meta' => $this->meta,
            'realizado' => $this->realizado,
            'tipo_indicador' => $this->tipo_indicador,
            'lista_qualitativos' => $this->lista_qualitativos,
            'registro_execucao' => $this->registro_execucao,
            'participantes_total' => $this->participantes_total,
            'participantes_somente_unidade_propria' => $this->participantes_somente_unidade_propria,
            'participantes_somente_outras_unidades' => $this->participantes_somente_outras_unidades,
            'participantes_em_ambas' => $this->participantes_em_ambas,
            'esforco_disponivel_horas' => $this->esforco_disponivel_horas,
            'esforco_planejado_horas' => $this->esforco_planejado_horas,
            'esforco_executado_horas' => $this->esforco_executado_horas,
            'mostrar_disponivel' => $this->mostrar_disponivel,
            'mostrar_planejado' => $this->mostrar_planejado,
            'mostrar_executado' => $this->mostrar_executado,
        ];

        if ($this->no_origem_id !== null) {
            $data['no_origem_id'] = $this->no_origem_id;
            $data['no_origem_nome'] = $this->no_origem_nome;
        }

        return $data;
    }
}
