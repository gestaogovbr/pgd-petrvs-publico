<?php

declare(strict_types=1);

namespace App\Repository\CadeiaValor\Contracts;

use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use Illuminate\Database\Eloquent\Collection;

interface CadeiaValorReadRepositoryContract
{
    public function findCadeiaValor(string $id): ?CadeiaValor;

    public function findProcesso(string $processoId, string $cadeiaValorId): ?CadeiaValorProcesso;

    /** @return Collection<int, CadeiaValorProcesso> */
    public function listarProcessosPorCadeia(string $cadeiaValorId): Collection;

    /**
     * @param list<string> $processoIds
     * @return list<\stdClass> Colunas: processo_origem_id, processo_id, processo_nome, cadeia_valor_id, cadeia_valor_nome
     */
    public function buscarVinculosCrossCadeia(array $processoIds, string $cadeiaValorIdAtual): array;

    /**
     * @param list<string> $processoIds
     * @return array<string, int> Mapa processo_id → contagem
     */
    public function contarVinculosPorProcesso(array $processoIds): array;

    /**
     * Retorna dados gerais do processo para o painel: nome e nível.
     *
     * @return \stdClass{processo_id: string, processo_nome: string, nivel: int}
     */
    public function buscarDadosGeraisPainel(string $processoId, string $cadeiaValorId): \stdClass;

    /**
     * Agrega esforço, participantes e entregas numa única query.
     *
     * @return \stdClass Campos: esforco_disponivel_horas, esforco_planejado_horas, esforco_executado_horas,
     *                          tem_pt_pactuado, tem_pt_concluido, tem_pe_homologado,
     *                          participantes_somente_unidade_propria, participantes_somente_outras_unidades,
     *                          participantes_em_ambas, total_entregas, entregas_concluidas
     */
    public function agregarPainelEsforcoPessoasEntregas(string $processoId, ?string $unidadeId = null): \stdClass;

    /**
     * Lista as entregas inline com participantes, esforço e registro de execução para o detalhamento.
     *
     * @param array{unidade_id?: string|null, plano_entrega_entrega_id?: string|null, data_inicio?: string|null, data_fim?: string|null} $filtros
     * @return list<\stdClass>
     */
    public function listarDetalhamentoEntregasPainel(string $processoId, array $filtros = []): array;

    /**
     * Retorna lista de unidades vinculadas ao processo para popular dropdown de filtro.
     *
     * @return list<array{id: string, label: string}>
     */
    public function listarFiltroUnidadesPainel(string $processoId): array;

    /**
     * Retorna lista de entregas vinculadas ao processo para popular dropdown de filtro.
     *
     * @return list<array{id: string, label: string}>
     */
    public function listarFiltroEntregasPainel(string $processoId): array;

    /**
     * @return \stdClass{esforco_disponivel: float, esforco_planejado: float, esforco_executado: float}
     */
    public function calcularEsforcoPorEntrega(string $entregaId): \stdClass;
}
