<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class IndicadoresEntregaAvaliacaoService extends IndicadoresEntregaService
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
            WITH avaliacoes_pe as (
                SELECT a.nota as id, REPLACE(JSON_UNQUOTE(a.nota), '"', '') as nota, count(*) as total
                FROM planos_entregas pe
                left join avaliacoes a on pe.avaliacao_id = a.id and a.deleted_at is null
                where pe.deleted_at is null
                and pe.avaliacao_id is not null
                and pe.status in ('ATIVO','CONCLUIDO','AVALIADO')
                $filtros
                group by a.nota, REPLACE(JSON_UNQUOTE(a.nota), '"', '')
            ),
             notas_validas as (
                SELECT distinct REPLACE(JSON_UNQUOTE(tan.nota), '"', '') as nota, sequencia
                from tipos_avaliacoes_notas tan
                where tan.deleted_at is null
            )
            SELECT nv.nota as categoria, COALESCE (avpe.total, 0) as total
            from notas_validas nv
            left join avaliacoes_pe avpe on avpe.nota = nv.nota
            ORDER BY nv.sequencia asc
        TEXT;

        $rows = DB::select($sql, $params);

        return $rows;
    }
}
