<?php

declare(strict_types=1);

namespace App\Repository\RelatorioAgente\Eloquent;

use App\Repository\RelatorioAgente\Contracts\RelatorioAgenteReadRepositoryContract;
use App\Services\UnidadeService;
use App\Support\ModalidadePgd;
use Illuminate\Support\Facades\DB;

class EloquentRelatorioAgenteReadRepository implements RelatorioAgenteReadRepositoryContract
{
    public function query(array $data): array
    {
        $modalidadeUsuario = ModalidadePgd::sqlLabelExpression('`u`.`modalidade_pgd`');
        $modalidadePlano = ModalidadePgd::sqlLabelExpression('`pt_do_dia`.`modalidade_pgd`');
        $modalidadeUsuarioNormalizada = ModalidadePgd::sqlNormalizeExpression('`u`.`modalidade_pgd`');
        $modalidadePlanoNormalizada = ModalidadePgd::sqlNormalizeExpression('`pt_do_dia`.`modalidade_pgd`');

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
                and `uia`.`atribuicao` = 'LOTADO'
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
            `u`.`tipo_pedagio` AS `tipo_pedagio`
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
        where
            `u`.`deleted_at` is null
            and `uia`.`atribuicao` is not null
TEXT;

        $unidadeId = $this->extractWhere($data, 'unidade_id');
        $atribuicao = $this->extractWhere($data, 'atribuicao');
        $subordinadas = $this->extractWhere($data, 'incluir_unidades_subordinadas');

        $params = [];

        if (isset($unidadeId[2])) {
            $unidadeIds = [$unidadeId[2]];

            if (isset($subordinadas[2])) {
                $unidadeService = app(UnidadeService::class);
                $subordinadasIds = $unidadeService->subordinadas($unidadeId[2])->pluck('id')->toArray();
                $unidadeIds = array_merge($unidadeIds, $subordinadasIds);
            }

            $unidadeIds = implode(
                ',',
                array_map(static function ($item) {
                    return "'" . $item . "'";
                }, $unidadeIds)
            );

            if (isset($atribuicao[2])) {
                $sql .= " and ui.unidade_id in ($unidadeIds)";
            } else {
                $sql .= " and `uni_lotacao`.`id` in ($unidadeIds)";
            }
        }

        if (!isset($atribuicao[2])) {
            $sql .= " and uia.atribuicao = 'LOTADO'";
        } else {
            $sql .= ' and uia.atribuicao = ?';
            $params[] = $atribuicao[2];
        }

        $this->applyFiltros($data, $sql, $params);

        $total = DB::select("SELECT count(*) as total from ($sql) z", $params);
        $count = $total[0]->total;

        $sql .= ' ORDER BY u.nome ASC';

        if (!empty($data['limit'])) {
            $sql .= ' LIMIT 10 OFFSET ' . (max($data['page'] - 1, 0) * 10);
        }

        $rows = DB::select($sql, $params);

        return [
            'count' => $count,
            'rows' => collect($rows),
        ];
    }

    private function applyFiltros(array &$data, string &$sql, array &$params): void
    {
        $usuarioId = $this->extractWhere($data, 'usuario_id');
        if (isset($usuarioId[2])) {
            $sql .= ' and u.id = ?';
            $params[] = $usuarioId[2];
        }

        $nome = $this->extractWhere($data, 'nome');
        if (isset($nome[2])) {
            $sql .= ' and COALESCE(`u`.`nome_social`, `u`.`nome`) like ?';
            $params[] = $nome[2];
        }

        $unidadeHierarquia = $this->extractWhere($data, 'unidadeHierarquia');
        if (isset($unidadeHierarquia[2])) {
            $sql .= ' and fn_obter_unidade_hierarquia(`uni_lotacao`.`id`) like ?';
            $params[] = $unidadeHierarquia[2];
        }

        $matricula = $this->extractWhere($data, 'matricula');
        if (isset($matricula[2])) {
            $sql .= ' and u.matricula like ?';
            $params[] = $matricula[2];
        }

        $programaNome = $this->extractWhere($data, 'programaNome');
        if (isset($programaNome[2])) {
            $sql .= ' and `programa_ultimo`.`programanome` like ?';
            $params[] = $programaNome[2];
        }

        $modalidade = $this->extractWhere($data, 'modalidadeSouGov');
        if (isset($modalidade[2])) {
            $sql .= ' and ' . ModalidadePgd::sqlNormalizeExpression('`u`.`modalidade_pgd`') . ' = ?';
            $params[] = ModalidadePgd::normalize($modalidade[2]);
        }

        $modalidadePgd = $this->extractWhere($data, 'modalidade_pgd');
        if (isset($modalidadePgd[2])) {
            $sql .= ' and ' . ModalidadePgd::sqlNormalizeExpression('`u`.`modalidade_pgd`') . ' = ?';
            $params[] = ModalidadePgd::normalize($modalidadePgd[2]);
        }

        $situacaoSiape = $this->extractWhere($data, 'situacao');
        if (isset($situacaoSiape[2])) {
            $sql .= " and (CASE WHEN `u`.`participa_pgd` = 'não' THEN 'INATIVO' ELSE `u`.`situacao_siape` END) = ?";
            $params[] = $situacaoSiape[2];
        }

        $comparacaoSouGovPetrvs = $this->extractWhere($data, 'comparacaoSouGovPetrvs');
        if (isset($comparacaoSouGovPetrvs[2])) {
            $operacaoComparacao = $this->getComparacaoSouGov($comparacaoSouGovPetrvs[2]);

            if ($operacaoComparacao == '-') {
                $sql .= " and ( `u`.`situacao_siape` = 'INATIVO' OR `pt_do_dia`.`modalidade_pgd` IS NULL OR `u`.`participa_pgd` = 'não' ) ";
            } elseif ($operacaoComparacao != '') {
                $modalidadeUsuarioNormalizada = ModalidadePgd::sqlNormalizeExpression('`u`.`modalidade_pgd`');
                $modalidadePlanoNormalizada = ModalidadePgd::sqlNormalizeExpression('`pt_do_dia`.`modalidade_pgd`');
                $sql .= " and ( `u`.`participa_pgd` = 'sim' and COALESCE({$modalidadeUsuarioNormalizada}, '') $operacaoComparacao COALESCE({$modalidadePlanoNormalizada}, '') and COALESCE({$modalidadePlanoNormalizada}, '') != '') ";
            }
        }

        $tipo_modalidade_id = $this->extractWhere($data, 'tipo_modalidade_id');
        if (isset($tipo_modalidade_id[2])) {
            $sql .= ' and ' . ModalidadePgd::sqlNormalizeExpression('`u`.`modalidade_pgd`') . ' = ?';
            $params[] = ModalidadePgd::normalize($tipo_modalidade_id[2]);
        }

        $tipo_pedagio = $this->extractWhere($data, 'tipo_pedagio');
        if (isset($tipo_pedagio[2])) {
            $sql .= ' and `u`.`tipo_pedagio` = ?';
            $params[] = $tipo_pedagio[2];
        }

        $data_inicial_pedagio = $this->extractWhere($data, 'data_inicial_pedagio');
        if (isset($data_inicial_pedagio[2])) {
            $sql .= ' and `u`.`data_inicial_pedagio` = ?';
            $params[] = $data_inicial_pedagio[2];
        }

        $data_final_pedagio = $this->extractWhere($data, 'data_final_pedagio');
        if (isset($data_final_pedagio[2])) {
            $sql .= ' and `u`.`data_final_pedagio` = ?';
            $params[] = $data_final_pedagio[2];
        }
    }

    private function extractWhere(array &$data, string $field): ?array
    {
        $result = null;
        $where = [];

        foreach ($data['where'] as $condition) {
            if (is_array($condition) && $condition[0] == $field) {
                $result = $condition;
            } else {
                $where[] = $condition;
            }
        }

        if (!empty($result)) {
            $data['where'] = $where;
        }

        return $result;
    }

    private function getComparacaoSouGov(string $comparacaoSouGovPetrvs): string
    {
        $operacaoComparacao = '';
        if ($comparacaoSouGovPetrvs == 'IGUAL') {
            $operacaoComparacao = '=';
        } elseif ($comparacaoSouGovPetrvs == 'DIFERENTE') {
            $operacaoComparacao = '!=';
        } elseif ($comparacaoSouGovPetrvs == '-') {
            $operacaoComparacao = '-';
        }

        return $operacaoComparacao;
    }
}
