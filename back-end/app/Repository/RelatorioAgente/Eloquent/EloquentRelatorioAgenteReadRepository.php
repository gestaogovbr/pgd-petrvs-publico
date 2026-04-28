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
        $modalidadePlano = ModalidadePgd::sqlLabelExpression('`pt_ultimo_pactuado`.`modalidade_pgd`');

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
        )
        SELECT
            distinct `u`.`id` AS `id`,
            `u`.`nome` AS `nome`,
            `u`.`matricula` AS `matricula`,
            `u`.`nome_jornada` AS `jornada`,
            `u`.`participa_pgd` AS `participaPGD`,
            CASE WHEN `u`.`participa_pgd` = 'não' THEN 'INATIVO' ELSE `u`.`situacao_siape` END AS `situacao`,
            case
                when `u`.`participa_pgd` = 'sim' then {$modalidadeUsuario}
                when `u`.`participa_pgd` = 'não' then '-'
                else 'Não definida'
            end AS `modalidadeSouGov`,
            case
                when  `u`.`situacao_siape` = 'INATIVO' OR `pt_ultimo_pactuado`.`modalidade_pgd` IS NULL OR `u`.`participa_pgd` = 'não' then '-'
                when COALESCE(`u`.`modalidade_pgd`, '') = COALESCE(`pt_ultimo_pactuado`.`modalidade_pgd`, '') then 'IGUAL'
                else 'DIFERENTE'
            end as comparacaoSouGovPetrvs,
            `u`.`perfil_id` AS `perfil_id`,
            `p`.`nome` AS `perfil`,
            `u`.`situacao_funcional` AS `situacao_funcional`,
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
        left join (
            select
                `pt`.`usuario_id` AS `usuario_id`,
                `pt`.`id` AS `id`,
                `pt`.`modalidade_pgd` AS `modalidade_pgd`
            from
                `planos_trabalhos` `pt`
            where
                `pt`.`deleted_at` is null
                and `pt`.`status` in ('ATIVO', 'CONCLUIDO', 'AVALIADO', 'SUSPENSO')
                    and (`pt`.`data_inicio`,
                    `pt`.`id`) = (
                    select
                        `pt2`.`data_inicio`,
                        max(`pt2`.`id`)
                    from
                        `planos_trabalhos` `pt2`
                    where
                        `pt2`.`usuario_id` = `pt`.`usuario_id`
                        and `pt2`.`deleted_at` is null
                        and `pt2`.`status` in ('ATIVO', 'CONCLUIDO', 'AVALIADO', 'SUSPENSO')
                    group by
                        `pt2`.`data_inicio`
                    order by
                        `pt2`.`data_inicio` desc
                    limit 1)) `pt_ultimo_pactuado` on
            (`pt_ultimo_pactuado`.`usuario_id` = `u`.`id`)
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
        $nome = $this->extractWhere($data, 'nome');
        if (isset($nome[2])) {
            $sql .= ' and u.nome like ?';
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

        $jornada = $this->extractWhere($data, 'jornada');
        if (isset($jornada[2])) {
            $sql .= ' and u.nome_jornada = ?';
            $params[] = $jornada[2];
        }

        $perfil_id = $this->extractWhere($data, 'perfil_id');
        if (isset($perfil_id[2])) {
            $sql .= ' and u.perfil_id = ?';
            $params[] = $perfil_id[2];
        }

        $programaNome = $this->extractWhere($data, 'programaNome');
        if (isset($programaNome[2])) {
            $sql .= ' and `programa_ultimo`.`programanome` like ?';
            $params[] = $programaNome[2];
        }

        $modalidade = $this->extractWhere($data, 'modalidadeSouGov');
        if (isset($modalidade[2])) {
            $sql .= ' and `u`.`modalidade_pgd` = ?';
            $params[] = $modalidade[2];
        }

        $modalidadePgd = $this->extractWhere($data, 'modalidade_pgd');
        if (isset($modalidadePgd[2])) {
            $sql .= ' and `u`.`modalidade_pgd` = ?';
            $params[] = $modalidadePgd[2];
        }

        $situacaoSiape = $this->extractWhere($data, 'situacao');
        if (isset($situacaoSiape[2])) {
            $sql .= ' and ( `u`.`situacao_siape` = ? )';
            $params[] = $situacaoSiape[2];
        }

        $comparacaoSouGovPetrvs = $this->extractWhere($data, 'comparacaoSouGovPetrvs');
        if (isset($comparacaoSouGovPetrvs[2])) {
            $operacaoComparacao = $this->getComparacaoSouGov($comparacaoSouGovPetrvs[2]);

            if ($operacaoComparacao == '-') {
                $sql .= " and ( `u`.`situacao_siape` = 'INATIVO' OR `pt_ultimo_pactuado`.`modalidade_pgd` IS NULL OR `u`.`participa_pgd` = 'não' ) ";
            } elseif ($operacaoComparacao != '') {
                $sql .= " and ( `u`.`participa_pgd` = 'sim' and COALESCE(`u`.`modalidade_pgd`, '') $operacaoComparacao COALESCE(`pt_ultimo_pactuado`.`modalidade_pgd`, '') and COALESCE(`pt_ultimo_pactuado`.`modalidade_pgd`, '') != '') ";
            }
        }

        $tipo_modalidade_id = $this->extractWhere($data, 'tipo_modalidade_id');
        if (isset($tipo_modalidade_id[2])) {
            $sql .= ' and `u`.`modalidade_pgd` = ?';
            $params[] = $tipo_modalidade_id[2];
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
