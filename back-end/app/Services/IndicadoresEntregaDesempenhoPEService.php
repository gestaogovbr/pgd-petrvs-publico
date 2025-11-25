<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class IndicadoresEntregaDesempenhoPEService extends IndicadoresEntregaService
{
    public function query($data)
    {
        $this->prepareQuery($data);

        $filtros = '';

        if (isset($this->unidadeIds)) {
            $filtros .= " and pe.unidade_id in ($this->unidadeIds)";
        }

        $params = [];

        $data_inicial = $this->extractWhere($data, "data_inicial");
        if (isset($data_inicial[2])) {
            $filtros .= " and `pe`.`data_inicio` >= ?";
            $params[] = $data_inicial[2];
        }

        $data_final = $this->extractWhere($data, "data_final");
        if (isset($data_final[2])) {
            $filtros .= " and date(`pe`.`data_fim`) <= ?";
            $params[] = $data_final[2];
        }

        $somenteVigentes = $this->extractWhere($data, "somente_vigentes");
        if (isset($somenteVigentes[2])) {
            $filtros .= " and (now() between date(`pe`.`data_inicio`) and date(`pe`.`data_fim`))";
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
            FROM planos_entregas pe
            left join avaliacoes a on pe.avaliacao_id = a.id and a.deleted_at is null
            where pe.deleted_at is null
              and pe.avaliacao_id is not null
              and pe.status in ('ATIVO','CONCLUIDO','AVALIADO')
              $filtros
        TEXT;

        $rows = DB::select($sql, $params);

        return $rows;
    }
}
