<?php

namespace App\Services;

use App\Models\Usuario;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class IndicadoresService extends ServiceBase
{
    public function __construct() {}

    public function query($data)
    {
        $sql = <<<TEXT
            SELECT a.nota as id, REPLACE(JSON_UNQUOTE(a.nota), '"', '') as nota, count(*) as qtde
            FROM avaliacoes a
            inner join planos_trabalhos_consolidacoes ptc on ptc.avaliacao_id = a.id
            inner join planos_trabalhos pt on pt.id = ptc.plano_trabalho_id
            where a.deleted_at is null
                and ptc.deleted_at is null
                and pt.deleted_at is null
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

            $sql .= " and pt.unidade_id in ($unidadeIds)";
        }

       $this->applyFiltros($data, $sql, $params);

        $sql .= ' GROUP BY a.nota, REPLACE(JSON_UNQUOTE(a.nota), \'"\', \'\')';

        // contagem
        $total = DB::select("SELECT count(*) as total from ($sql) z", $params);
        $count = $total[0]->total;


        // finalização - order, limit e offset
        $sql .= ' ORDER BY a.nota ASC';

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

    public function applyFiltros($data, &$sql, &$params)
    {
        $data_inicial = $this->extractWhere($data, "data_inicial");
        if (isset($data_inicial[2])) {
            $sql .= " and `a`.`data_avaliacao` >= ?";
            $params[] = $data_inicial[2];
        }

        $data_final = $this->extractWhere($data, "data_final");
        if (isset($data_final[2])) {
            $sql .= " and date(`a`.`data_avaliacao`) <= ?";
            $params[] = $data_final[2];
        }

        $somenteVigentes = $this->extractWhere($data, "somente_vigentes");
        if (isset($somenteVigentes[2])) {
            $sql .= " and (now() between cast(pt.data_inicio as date) and cast(pt.data_fim as date))";
        }
    }

    public function proxyRows(&$rows) {

        foreach($rows as $row) {
        }

        return $rows;
    }
}
