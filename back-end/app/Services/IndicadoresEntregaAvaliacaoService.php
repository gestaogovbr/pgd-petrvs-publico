<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class IndicadoresEntregaAvaliacaoService extends ServiceBase
{
    private $unidadeId;
    private $unidadeIds;
    private $subordinadas;
    private $unidadeService;

    public function __construct() {}

    public function query($data)
    {
        $this->unidadeId = $this->extractWhere($data, "unidade_id");
        $this->subordinadas = $this->extractWhere($data, "incluir_unidades_subordinadas");

        if (isset($this->unidadeId[2])) {
            $unidadeIds = [$this->unidadeId[2]];

            if (isset($this->subordinadas[2])) {
                $this->unidadeService = new UnidadeService();
                $subordinadasIds = $this->unidadeService->subordinadas(
                    $this->unidadeId[2]
                )->pluck('id')->toArray();
                $unidadeIds = array_merge($unidadeIds, $subordinadasIds);
            }

            $this->unidadeIds = implode(",",
                array_map(function($item) {
                    return "'".$item."'";
                }, $unidadeIds)
            );
        }

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
            SELECT a.nota as id, REPLACE(JSON_UNQUOTE(a.nota), '"', '') as categoria, count(*) as total
            FROM planos_entregas pe
            left join  avaliacoes a on pe.avaliacao_id = a.id and a.deleted_at is null
            where pe.deleted_at is null
              and pe.avaliacao_id is not null
              $filtros
            group by a.nota, REPLACE(JSON_UNQUOTE(a.nota), '"', '')
            order by 3 desc
        TEXT;

        $rows = DB::select($sql, $params);

        return $rows;
    }
}
