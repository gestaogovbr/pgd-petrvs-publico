<?php

namespace App\Services;

use App\Models\Usuario;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class IndicadoresService extends ServiceBase
{
    public function __construct() {}

    // Distribuição das avaliações dos Planos de Trabalho
    public function query($data)
    {
        $filtros = '';
        $params = [];

        $unidadeId = $this->extractWhere($data, "unidade_id");
        $subordinadas = $this->extractWhere($data, "incluir_unidades_subordinadas");

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

            $filtros .= " and pt.unidade_id in ($unidadeIds)";
        }

        $this->applyFiltros($data, $sql, $params);

        $sql = <<<TEXT
            WITH avaliacoes_pt as (
                SELECT a.nota as id, REPLACE(JSON_UNQUOTE(a.nota), '"', '') as nota, count(*) as qtde
                FROM avaliacoes a
                inner join planos_trabalhos_consolidacoes ptc on ptc.avaliacao_id = a.id
                inner join planos_trabalhos pt on pt.id = ptc.plano_trabalho_id
                where a.deleted_at is null
                    and ptc.deleted_at is null
                    and pt.deleted_at is null
                    and pt.status in ('ATIVO','CONCLUIDO','AVALIADO')
                $filtros
                group by a.nota, REPLACE(JSON_UNQUOTE(a.nota), '"', '')
            ),
            notas_validas as (
                SELECT distinct REPLACE(JSON_UNQUOTE(tan.nota), '"', '') as nota, sequencia
                from tipos_avaliacoes_notas tan
                where tan.deleted_at is null
            )
            SELECT nv.nota, COALESCE (avpt.qtde, 0) as qtde
            from notas_validas nv
            left join avaliacoes_pt avpt on avpt.nota = nv.nota
            ORDER BY nv.sequencia asc
        TEXT;

        return DB::select($sql, $params);
    }

    public function applyFiltros($data, &$filtros, &$params)
    {
        $data_inicial = $this->extractWhere($data, "data_inicial");
        if (isset($data_inicial[2])) {
            $filtros .= " and `a`.`data_avaliacao` >= ?";
            $params[] = $data_inicial[2];
        }

        $data_final = $this->extractWhere($data, "data_final");
        if (isset($data_final[2])) {
            $filtros .= " and date(`a`.`data_avaliacao`) <= ?";
            $params[] = $data_final[2];
        }

        $somenteVigentes = $this->extractWhere($data, "somente_vigentes");
        if (isset($somenteVigentes[2])) {
            $filtros .= " and (now() between cast(pt.data_inicio as date) and cast(pt.data_fim as date))";
        }
    }
}
