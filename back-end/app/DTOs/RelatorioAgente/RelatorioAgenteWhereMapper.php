<?php

declare(strict_types=1);

namespace App\DTOs\RelatorioAgente;

/**
 * Adapta {@see RelatorioAgenteFiltersDTO} ao formato `where` do repositório legado.
 */
final class RelatorioAgenteWhereMapper
{
    /**
     * @return list<array{0: string, 1: string, 2: mixed}>
     */
    public static function map(RelatorioAgenteFiltersDTO $filters): array
    {
        $where = [];

        if ($filters->unidadeId !== null) {
            $where[] = ['unidade_id', '==', $filters->unidadeId];
        }
        if ($filters->incluirUnidadesSubordinadas) {
            $where[] = ['incluir_unidades_subordinadas', '==', 1];
        }
        if ($filters->usuarioId !== null) {
            $where[] = ['usuario_id', '==', $filters->usuarioId];
        }
        if ($filters->nome !== null) {
            $where[] = ['nome', 'like', '%' . $filters->nome . '%'];
        }
        if ($filters->unidadeHierarquia !== null) {
            $where[] = ['unidadeHierarquia', 'like', '%' . $filters->unidadeHierarquia . '%'];
        }
        if ($filters->matricula !== null) {
            $where[] = ['matricula', 'like', '%' . $filters->matricula . '%'];
        }
        if ($filters->situacao !== null) {
            $where[] = ['situacao', '==', $filters->situacao];
        }
        if ($filters->participantePgd !== null) {
            $where[] = ['participantePGD', '==', $filters->participantePgd];
        }
        if ($filters->programaNome !== null) {
            $where[] = ['programaNome', 'like', '%' . $filters->programaNome . '%'];
        }
        if ($filters->modalidadePgd !== null) {
            $where[] = ['modalidade_pgd', '==', $filters->modalidadePgd];
        }
        if ($filters->modalidadeSouGov !== null) {
            $where[] = ['modalidadeSouGov', '==', $filters->modalidadeSouGov];
        }
        if ($filters->comparacaoSouGovPetrvs !== null) {
            $where[] = ['comparacaoSouGovPetrvs', '==', $filters->comparacaoSouGovPetrvs];
        }
        if ($filters->tipoPedagio !== null) {
            $where[] = ['tipo_pedagio', '==', $filters->tipoPedagio];
        }
        if ($filters->dataInicialPedagio !== null) {
            $where[] = ['data_inicial_pedagio', '==', $filters->dataInicialPedagio];
        }
        if ($filters->dataFinalPedagio !== null) {
            $where[] = ['data_final_pedagio', '==', $filters->dataFinalPedagio];
        }
        if ($filters->dispensaPlanoTrabalho !== null) {
            $where[] = ['dispensa_plano_trabalho', '==', $filters->dispensaPlanoTrabalho];
        }
        if ($filters->dataInicioDispensaPt !== null) {
            $where[] = ['data_inicio_dispensa_pt', '==', $filters->dataInicioDispensaPt];
        }
        if ($filters->dataFimDispensaPt !== null) {
            $where[] = ['data_fim_dispensa_pt', '==', $filters->dataFimDispensaPt];
        }
        if ($filters->atribuicao !== null) {
            $where[] = ['atribuicao', '==', $filters->atribuicao];
        }
        if ($filters->planoEntregaEntregaId !== null) {
            $where[] = ['plano_entrega_entrega_id', '==', $filters->planoEntregaEntregaId];
        }
        if ($filters->somenteVigentes !== null) {
            $where[] = ['somente_vigentes', '==', $filters->somenteVigentes ? 1 : 0];
        }

        return $where;
    }
}
