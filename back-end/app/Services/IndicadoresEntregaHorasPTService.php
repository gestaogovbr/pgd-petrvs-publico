<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class IndicadoresEntregaHorasPTService extends IndicadoresEntregaService
{
    public function query($data)
    {
        $this->prepareQuery($data);

        $filtros = '';

        if (isset($this->unidadeIds)) {
            $filtros .= " and pt.unidade_id in ($this->unidadeIds)";
        }

        $params = [];

        $data_inicial = $this->extractWhere($data, "data_inicial");
        if (isset($data_inicial[2])) {
            $filtros .= " and `pt`.`data_inicio` >= ?";
            $params[] = $data_inicial[2];
        }

        $data_final = $this->extractWhere($data, "data_final");
        if (isset($data_final[2])) {
            $filtros .= " and date(`pt`.`data_fim`) <= ?";
            $params[] = $data_final[2];
        }

        $somenteVigentes = $this->extractWhere($data, "somente_vigentes");
        if (isset($somenteVigentes[2])) {
            $filtros .= " and (now() between date(`pt`.`data_inicio`) and date(`pt`.`data_fim`))";
        }

        $sql = <<<TEXT
            SELECT 
                ROUND(AVG(CASE REPLACE(JSON_UNQUOTE(a.nota), '"', '') 
                    WHEN 'Excepcional' then 5
                    WHEN 'Alto desempenho' then 4
                    WHEN 'Adequado' then 3
                    WHEN 'Inadequado' then 2
                    WHEN 'Não executado' then 1
                END), 2) as media
            FROM planos_trabalhos pt
            inner join planos_trabalhos_consolidacoes ptc
               on ptc.plano_trabalho_id  = pt.id
               and ptc.deleted_at is null
            inner join  avaliacoes a
                on a.id = ptc.avaliacao_id
                and a.deleted_at is null
            where pt.deleted_at is null
              $filtros
        TEXT;

        $rows = DB::select($sql, $params);

        return $rows;
    }
}
