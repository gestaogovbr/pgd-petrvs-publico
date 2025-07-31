<?php

namespace App\Services;

use App\Models\Usuario;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class RelatorioAgenteService extends ServiceBase
{
    public function __construct()
    {
        // parent::__construct("App\Models\ViewRelatorioAgente");
    }

    public function query($data)
    {
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
            )select
                distinct `u`.`id` AS `id`,
                `u`.`nome` AS `nome`,
                `u`.`matricula` AS `matricula`,
                `u`.`nome_jornada` AS `jornada`,
                `u`.`perfil_id` AS `perfil_id`,
                `p`.`nome` AS `perfil`,
                `u`.`situacao_funcional` AS `situacao_funcional`,
                `programa_ultimo`.`programanome` AS `programaNome`,
                `uia`.`atribuicao` AS `atribuicao`,
                `fn_obter_unidade_hierarquia`(`uni_lotacao`.`id`) AS `unidadeHierarquia`,
                `uni_lotacao`.`id` AS `unidadeLotacao`,
                `uni_lotacao`.`sigla` AS `unidadeNome`,
                `pt_ultimo_pactuado`.`tipo_modalidade_id` AS `tipo_modalidade_id`,
                `tm`.`nome` AS `tipoModalidadeNome`,
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
                    `pt`.`tipo_modalidade_id` AS `tipo_modalidade_id`
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
            left join `tipos_modalidades` `tm` on
                (`tm`.`id` = `pt_ultimo_pactuado`.`tipo_modalidade_id`)
            where
                `u`.`deleted_at` is null
                and `uia`.`atribuicao` is not null
TEXT;

        $unidadeId = $this->extractWhere($data, "unidade_id");
        $atribuicao = $this->extractWhere($data, "atribuicao");
        $subordinadas = $this->extractWhere($data, "incluir_unidades_subordinadas");

        $params = [];

        if (isset($unidadeId[2])) {
            $unidadeIds = [$unidadeId[2]];

            if (isset($subordinadas[2])) {
                $unidadeService = new UnidadeService();
                $subordinadasIds = $unidadeService->subordinadas($unidadeId[2])->pluck('id')->toArray();
                $unidadeIds = array_merge($unidadeIds, $subordinadasIds);
            }

            $unidadeIds = implode(",",
                array_map(function($item) {
                    return "'".$item."'";
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
            $sql .= " and uia.atribuicao = ?";
            $params[] = $atribuicao[2];
        }

       $this->applyFiltros($data, $sql, $params);

        // contagem
        $total = DB::select("SELECT count(*) as total from ($sql) z", $params);
        $count = $total[0]->total;

        // finalização - order, limit e offset
        $sql .= ' ORDER BY u.nome ASC';

        if (!empty($data['limit'])) {
            $sql .= ' LIMIT 10 OFFSET '.(max($data['page'] - 1, 0) * 10);
        }

        $rows = DB::select($sql, $params);

        $this->proxyRows($rows);

        return [
            'count' => $count,
            'rows' => collect($rows)
        ];
    }

    public function applyFiltros($data, &$sql, &$params) {
        $nome = $this->extractWhere($data, "nome");
        if (isset($nome[2])) {
            $sql .= " and u.nome like ?";
            $params[] = $nome[2];
        }

        $unidadeHierarquia = $this->extractWhere($data, "unidadeHierarquia");
        if (isset($unidadeHierarquia[2])) {
            $sql .= " and fn_obter_unidade_hierarquia(`uni_lotacao`.`id`) like ?";
            $params[] = $unidadeHierarquia[2];
        }

        $matricula = $this->extractWhere($data, "matricula");
        if (isset($matricula[2])) {
            $sql .= " and u.matricula like ?";
            $params[] = $matricula[2];
        }

        $jornada = $this->extractWhere($data, "jornada");
        if (isset($jornada[2])) {
            $sql .= " and u.nome_jornada = ?";
            $params[] = $jornada[2];
        }

        $perfil_id = $this->extractWhere($data, "perfil_id");
        if (isset($perfil_id[2])) {
            $sql .= " and u.perfil_id = ?";
            $params[] = $perfil_id[2];
        }

        $programaNome = $this->extractWhere($data, "programaNome");
        if (isset($programaNome[2])) {
            $sql .= " and `programa_ultimo`.`programanome` like ?";
            $params[] = $programaNome[2];
        }

        $tipo_modalidade_id = $this->extractWhere($data, "tipo_modalidade_id");
        if (isset($tipo_modalidade_id[2])) {
            $sql .= " and `pt_ultimo_pactuado`.`tipo_modalidade_id` = ?";
            $params[] = $tipo_modalidade_id[2];
        }

        $tipo_pedagio = $this->extractWhere($data, "tipo_pedagio");
        if (isset($tipo_pedagio[2])) {
            $sql .= " and `u`.`tipo_pedagio` = ?";
            $params[] = $tipo_pedagio[2];
        }

        $data_inicial_pedagio = $this->extractWhere($data, "data_inicial_pedagio");
        if (isset($data_inicial_pedagio[2])) {
            $sql .= " and `u`.`data_inicial_pedagio` = ?";
            $params[] = $data_inicial_pedagio[2];
        }

        $data_final_pedagio = $this->extractWhere($data, "data_final_pedagio");
        if (isset($data_final_pedagio[2])) {
            $sql .= " and `u`.`data_final_pedagio` = ?";
            $params[] = $data_final_pedagio[2];
        }

    }

    public function proxyQuery($query, &$data)
    {
        $where = $data["where"] ?? [];

        // remove a condições especificadas, pois tem tratamento diferenciado no proxyQuery
        $where = array_values(array_filter($where, function ($item) {
            return ($item[0] !== 'somente_vigentes')
                && ($item[0] !== 'incluir_unidades_subordinadas')
                && ($item[0] !== 'unidade_id');
        }));

        $somenteVigentes = $this->extractWhere($data, "somente_vigentes");
        $subordinadas = $this->extractWhere($data, "incluir_unidades_subordinadas");
        $unidadeId = $this->extractWhere($data, "unidade_id");
        $atribuicao = $this->extractWhere($data, "atribuicao");

        if (isset($unidadeId[2])) {
            $unidadeIds = [$unidadeId[2]];
        }

        if (isset($unidadeId[2]) && isset($subordinadas[2])) {
            $unidadeService = new UnidadeService();
            $subordinadasIds = $unidadeService->subordinadas($unidadeId[2])->pluck('id')->toArray();
            $unidadeIds = array_merge($unidadeIds, $subordinadasIds);
        }

        if (!isset($atribuicao[2])) {
            $where[] = ['atribuicao', '==', 'LOTADO'];
        } else {
            $where[] = ['atribuicao', '==', $atribuicao[2]];
        }

        if (count($unidadeIds) > 0) {
            if (isset($atribuicao[2])) {
                $where[] = ['unidade_id', 'in', $unidadeIds];
            } else {
                $where[] = ['unidadeLotacao', 'in', $unidadeIds];
            }
        }

        $data["where"] = $where;
    }

    public function proxyRows(&$rows) {

        $tipos = Usuario::getTiposIndisponibilidades();

        foreach($rows as $row) {
            $row->tipoPedagio = $tipos[$row->tipo_pedagio] ?? '-';
            $row->perfil = str_replace('Perfil ', '', $row->perfil);
        }

        return $rows;
    }
}
