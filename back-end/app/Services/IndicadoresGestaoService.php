<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class IndicadoresGestaoService extends ServiceBase
{
    public function __construct() {}

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
            )
            SELECT
                case when u.participa_pgd = 'sim'
                    then 'Participante'
                    else 'Não Participante'
                end as categoria, count(distinct u.id) as qtde
                FROM usuarios u
                left join `lotacoes` on
                    (`lotacoes`.`usuario_id` = `u`.`id`)
                where u.deleted_at is null
        TEXT;

        $unidadeId = $this->extractWhere($data, "unidade_id");
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

            $sql .= " and lotacoes.unidade_id in ($unidadeIds)";
        }

       $this->applyFiltros($data, $sql, $params);

        $sql .= " GROUP BY case when u.participa_pgd = 'sim'
                    then 'Participante'
                    else 'Não Participante'
                end";

        // contagem
        $total = 2;
        $count = 2;
        $rows = DB::select($sql, $params);

        return [
            'count' => $count,
            'rows' => collect($rows)
        ];
    }

    public function applyFiltros($data, &$sql, &$params)
    {
    }
}
