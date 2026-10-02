<?php

declare(strict_types=1);

namespace App\Repository\RelatorioAgente\Eloquent;

use App\DTOs\RelatorioAgente\RelatorioAgenteFiltersDTO;
use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;
use App\Enums\Atribuicao;
use App\Repository\RelatorioAgente\Contracts\RelatorioAgenteReadRepositoryContract;
use App\Services\UnidadeService;
use App\Support\ModalidadePgd;
use Illuminate\Support\Facades\DB;

class EloquentRelatorioAgenteReadRepository implements RelatorioAgenteReadRepositoryContract
{
    public function query(RelatorioAgenteQueryDTO $dto): array
    {
        $modalidadeUsuario = ModalidadePgd::sqlLabelExpression('`u`.`modalidade_pgd`');
        $modalidadePlano = ModalidadePgd::sqlLabelExpression('`pt_do_dia`.`modalidade_pgd`');
        $modalidadeUsuarioNormalizada = ModalidadePgd::sqlNormalizeExpression('`u`.`modalidade_pgd`');
        $modalidadePlanoNormalizada = ModalidadePgd::sqlNormalizeExpression('`pt_do_dia`.`modalidade_pgd`');

        $atribuicaoLotado = Atribuicao::LOTADO->value;

        $sql = <<<TEXT
        with lotacoes as (
            select
                `ui`.`usuario_id` AS `usuario_id`,
                `ui`.`unidade_id` AS `unidade_id`
            from
                (`unidades_integrantes` `ui`
            join `unidades_integrantes_atribuicoes` `uia` on
                (`uia`.`unidade_integrante_id` = `ui`.`id`
                    and `uia`.`deleted_at` is null))
            where
                `ui`.`deleted_at` is null
                and `uia`.`atribuicao` = '{$atribuicaoLotado}'
            order by
                `ui`.`usuario_id`
        ),
        pt_do_dia_ranked as (
            select
                `pt`.`usuario_id`,
                `pt`.`id` AS `plano_trabalho_id`,
                `pt`.`numero` AS `plano_trabalho_numero`,
                `pt`.`modalidade_pgd`,
                `pt`.`status` AS `plano_trabalho_status`,
                row_number() over (partition by `pt`.`usuario_id` order by `pt`.`data_inicio` desc, `pt`.`created_at` desc) as `rn`
            from `planos_trabalhos` `pt`
            where `pt`.`deleted_at` is null
              and CURDATE() between `pt`.`data_inicio` and `pt`.`data_fim`
        )
        SELECT
            distinct `u`.`id` AS `id`,
            COALESCE(`u`.`nome_social`, `u`.`nome`) AS `nome_exibicao`,
            `u`.`nome` AS `nome`,
            `u`.`matricula` AS `matricula`,
            CASE WHEN `u`.`participa_pgd` = 'sim' THEN 'Sim' ELSE 'Não' END AS `participantePGD`,
            CASE WHEN `u`.`participa_pgd` = 'não' THEN 'INATIVO' ELSE `u`.`situacao_siape` END AS `situacao`,
            case
                when `u`.`participa_pgd` = 'sim' then {$modalidadeUsuario}
                when `u`.`participa_pgd` = 'não' then '-'
                else 'Não definida'
            end AS `modalidadeSouGov`,
            case
                when `u`.`situacao_siape` = 'INATIVO' OR `pt_do_dia`.`modalidade_pgd` IS NULL OR `u`.`participa_pgd` = 'não' then '-'
                when COALESCE({$modalidadeUsuarioNormalizada}, '') = COALESCE({$modalidadePlanoNormalizada}, '') then 'IGUAL'
                else 'DIFERENTE'
            end as comparacaoSouGovPetrvs,
            `u`.`perfil_id` AS `perfil_id`,
            `p`.`nome` AS `perfil`,
            `programa_ultimo`.`programanome` AS `programaNome`,
            `uia`.`atribuicao` AS `atribuicao`,
            `fn_obter_unidade_hierarquia`(`uni_lotacao`.`id`) AS `unidadeHierarquia`,
            `uni_lotacao`.`id` AS `unidadeLotacao`,
            `uni_lotacao`.`sigla` AS `unidadeNome`,
            `u`.`modalidade_pgd` AS `modalidade_pgd`,
            `u`.`modalidade_pgd` AS `tipo_modalidade_id`,
            CASE
                WHEN `u`.`participa_pgd` = 'sim' THEN {$modalidadePlano}
                WHEN `u`.`participa_pgd` = 'não' THEN '-'
                ELSE 'Não definida'
            END AS `tipoModalidadeNome`,
            `pt_do_dia`.`plano_trabalho_id` AS `plano_trabalho_id`,
            `pt_do_dia`.`plano_trabalho_numero` AS `plano_trabalho_numero`,
            `pt_do_dia`.`plano_trabalho_status` AS `plano_trabalho_status`,
            `u`.`data_inicial_pedagio` AS `data_inicial_pedagio`,
            `u`.`data_final_pedagio` AS `data_final_pedagio`,
            `u`.`tipo_pedagio` AS `tipo_pedagio`,
            CASE WHEN `dpt`.`id` IS NOT NULL THEN 'Sim' ELSE 'Não' END AS `dispensa_plano_trabalho`,
            `dpt`.`data_inicio` AS `data_inicio_dispensa_pt`,
            `dpt`.`data_fim` AS `data_fim_dispensa_pt`
        from
            `usuarios` `u`
        left join (
            select
                `pp1`.`usuario_id` AS `usuario_id`,
                `pp1`.`programanome` AS `programanome`,
                `pp1`.`rn` AS `rn`
            from
                (
                select
                    `pp`.`usuario_id` AS `usuario_id`,
                    `p`.`nome` AS `programanome`,
                    row_number() over ( partition by `pp`.`usuario_id`
                order by
                    `pp`.`created_at` desc) AS `rn`
                from
                    (`programas_participantes` `pp`
                join `programas` `p` on
                    (`p`.`id` = `pp`.`programa_id`
                        and `p`.`deleted_at` is null))
                where
                    `pp`.`deleted_at` is null) `pp1`
            where
                `pp1`.`rn` = 1) `programa_ultimo` on
            (`programa_ultimo`.`usuario_id` = `u`.`id`)
        left join `pt_do_dia_ranked` `pt_do_dia` on
            (`pt_do_dia`.`usuario_id` = `u`.`id` and `pt_do_dia`.`rn` = 1)
        left join `unidades_integrantes` `ui` on
            (`ui`.`usuario_id` = `u`.`id`
                and `ui`.`deleted_at` is null)
        left join `unidades_integrantes_atribuicoes` `uia` on
            (`uia`.`unidade_integrante_id` = `ui`.`id`
                and `uia`.`deleted_at` is null)
        left join `lotacoes` on
            (`lotacoes`.`usuario_id` = `u`.`id`)
        left join `unidades` `uni` on
            (`uni`.`id` = `ui`.`unidade_id`
                and `uni`.`deleted_at` is null)
        left join `unidades` `uni_lotacao` on
            (`uni_lotacao`.`id` = `lotacoes`.`unidade_id`)
        left join `perfis` `p` on
            (`p`.`id` = `u`.`perfil_id`)
        left join `dispensas_plano_trabalho` `dpt` on
            (`dpt`.`usuario_id` = `u`.`id`
                and `dpt`.`deleted_at` is null)
        where
            `u`.`deleted_at` is null
            and `uia`.`atribuicao` is not null
TEXT;

        $filters = $dto->filters;
        $params = [];

        $this->aplicarFiltroUnidade($filters, $sql, $params);
        $this->aplicarFiltros($filters, $sql, $params);

        $total = DB::select("SELECT count(*) as total from ($sql) z", $params);
        $count = $total[0]->total;

        $sql .= ' ORDER BY u.nome ASC';
        $this->applyPaginacao($sql, $dto);

        $rows = DB::select($sql, $params);

        return [
            'count' => $count,
            'rows' => collect($rows),
        ];
    }

    private function aplicarFiltroUnidade(RelatorioAgenteFiltersDTO $filters, string &$sql, array &$params): void
    {
        if ($filters->unidadeId !== null) {
            $unidadeIds = [$filters->unidadeId];

            if ($filters->incluirUnidadesSubordinadas) {
                $unidadeService = app(UnidadeService::class);
                $subordinadasIds = $unidadeService->subordinadas($filters->unidadeId)->pluck('id')->toArray();
                $unidadeIds = array_merge($unidadeIds, $subordinadasIds);
            }

            $unidadeIdsSql = implode(
                ',',
                array_map(static function ($item) {
                    return "'" . $item . "'";
                }, $unidadeIds)
            );

            if ($filters->atribuicao !== null) {
                $sql .= " and ui.unidade_id in ($unidadeIdsSql)";
            } else {
                $sql .= " and `uni_lotacao`.`id` in ($unidadeIdsSql)";
            }
        }

        if ($filters->atribuicao === null) {
            $sql .= ' and uia.atribuicao = ?';
            $params[] = Atribuicao::LOTADO->value;
        } else {
            $sql .= ' and uia.atribuicao = ?';
            $params[] = $filters->atribuicao;
        }
    }

    private function applyPaginacao(string &$sql, RelatorioAgenteQueryDTO $dto): void
    {
        if ($dto->limit === null || $dto->limit === '') {
            return;
        }

        $limit = $this->resolverLimit($dto->limit);
        $offset = $this->resolverOffset($dto->page ?? 1, $limit);
        $sql .= ' LIMIT ' . $limit . ' OFFSET ' . $offset;
    }

    private function resolverLimit(mixed $limit): int
    {
        return max(1, (int) $limit);
    }

    private function resolverPage(mixed $page): int
    {
        return max(1, (int) $page);
    }

    private function resolverOffset(mixed $page, int $limit): int
    {
        return ($this->resolverPage($page) - 1) * $limit;
    }

    private function aplicarFiltros(RelatorioAgenteFiltersDTO $filters, string &$sql, array &$params): void
    {
        if ($filters->usuarioId !== null) {
            $sql .= ' and u.id = ?';
            $params[] = $filters->usuarioId;
        }

        if ($filters->nome !== null) {
            $sql .= ' and COALESCE(`u`.`nome_social`, `u`.`nome`) like ?';
            $params[] = $this->like($filters->nome);
        }

        if ($filters->unidadeHierarquia !== null) {
            $sql .= ' and fn_obter_unidade_hierarquia(`uni_lotacao`.`id`) like ?';
            $params[] = $this->like($filters->unidadeHierarquia);
        }

        if ($filters->matricula !== null) {
            $sql .= ' and u.matricula like ?';
            $params[] = $this->like($filters->matricula);
        }

        if ($filters->programaNome !== null) {
            $sql .= ' and `programa_ultimo`.`programanome` like ?';
            $params[] = $this->like($filters->programaNome);
        }

        if ($filters->modalidadeSouGov !== null) {
            $sql .= ' and ' . ModalidadePgd::sqlNormalizeExpression('`u`.`modalidade_pgd`') . ' = ?';
            $params[] = ModalidadePgd::normalize($filters->modalidadeSouGov);
        }

        if ($filters->modalidadePgd !== null) {
            $sql .= ' and ' . ModalidadePgd::sqlNormalizeExpression('`u`.`modalidade_pgd`') . ' = ?';
            $params[] = ModalidadePgd::normalize($filters->modalidadePgd);
        }

        if ($filters->situacao !== null) {
            $sql .= " and (CASE WHEN `u`.`participa_pgd` = 'não' THEN 'INATIVO' ELSE `u`.`situacao_siape` END) = ?";
            $params[] = $filters->situacao;
        }

        if ($filters->participantePgd !== null) {
            $sql .= " and (CASE WHEN `u`.`participa_pgd` = 'sim' THEN 'Sim' ELSE 'Não' END) = ?";
            $params[] = $filters->participantePgd;
        }

        if ($filters->comparacaoSouGovPetrvs !== null) {
            $operacaoComparacao = $this->getComparacaoSouGov($filters->comparacaoSouGovPetrvs);

            if ($operacaoComparacao == '-') {
                $sql .= " and ( `u`.`situacao_siape` = 'INATIVO' OR `pt_do_dia`.`modalidade_pgd` IS NULL OR `u`.`participa_pgd` = 'não' ) ";
            } elseif ($operacaoComparacao != '') {
                $modalidadeUsuarioNormalizada = ModalidadePgd::sqlNormalizeExpression('`u`.`modalidade_pgd`');
                $modalidadePlanoNormalizada = ModalidadePgd::sqlNormalizeExpression('`pt_do_dia`.`modalidade_pgd`');
                $sql .= " and ( `u`.`participa_pgd` = 'sim' and COALESCE({$modalidadeUsuarioNormalizada}, '') $operacaoComparacao COALESCE({$modalidadePlanoNormalizada}, '') and COALESCE({$modalidadePlanoNormalizada}, '') != '') ";
            }
        }

        if ($filters->tipoPedagio !== null) {
            $sql .= ' and `u`.`tipo_pedagio` = ?';
            $params[] = $filters->tipoPedagio;
        }

        if ($filters->planoEntregaEntregaId !== null) {
            $sql .= ' and `u`.`id` in (
                select distinct `pt`.`usuario_id`
                from `planos_trabalhos_entregas` `pte`
                inner join `planos_trabalhos` `pt` on `pt`.`id` = `pte`.`plano_trabalho_id` and `pt`.`deleted_at` is null
                where `pte`.`plano_entrega_entrega_id` = ? and `pte`.`deleted_at` is null
            )';
            $params[] = $filters->planoEntregaEntregaId;
        }

        if ($filters->dataInicialPedagio !== null) {
            $sql .= ' and `u`.`data_inicial_pedagio` = ?';
            $params[] = $filters->dataInicialPedagio;
        }

        if ($filters->dataFinalPedagio !== null) {
            $sql .= ' and `u`.`data_final_pedagio` = ?';
            $params[] = $filters->dataFinalPedagio;
        }

        if ($filters->dispensaPlanoTrabalho !== null) {
            if ($filters->dispensaPlanoTrabalho === 'Sim') {
                $sql .= ' and `dpt`.`id` is not null';
            } elseif ($filters->dispensaPlanoTrabalho === 'Não') {
                $sql .= ' and `dpt`.`id` is null';
            }
        }

        if ($filters->dataInicioDispensaPt !== null) {
            $sql .= ' and `dpt`.`data_inicio` = ?';
            $params[] = $filters->dataInicioDispensaPt;
        }

        if ($filters->dataFimDispensaPt !== null) {
            $sql .= ' and `dpt`.`data_fim` = ?';
            $params[] = $filters->dataFimDispensaPt;
        }
    }

    private function like(string $value): string
    {
        if (str_contains($value, '%')) {
            return $value;
        }

        return '%' . $value . '%';
    }

    private function getComparacaoSouGov(string $comparacaoSouGovPetrvs): string
    {
        if ($comparacaoSouGovPetrvs == 'IGUAL') {
            return '=';
        }
        if ($comparacaoSouGovPetrvs == 'DIFERENTE') {
            return '!=';
        }
        if ($comparacaoSouGovPetrvs == '-') {
            return '-';
        }

        return '';
    }
}
