<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class RelatorioPlanoTrabalhoService extends ServiceBase
{
    public function __construct()
    {
        parent::__construct("App\Models\ViewRelatorioPlanoTrabalho");
    }

    public function proxyQuery($query, &$data)
    {
        $where = [];
        $somenteVigentes = $this->extractWhere($data, "somente_vigentes");
        $subordinadas = $this->extractWhere($data, "incluir_unidades_subordinadas");

        $unidadeId = $this->extractWhere($data, "unidade_id");

        if (isset($unidadeId[2])) {
            $unidadeIds = [$unidadeId[2]];
        }

        if (isset($unidadeId[2]) && isset($subordinadas[2])) {
            $unidadeService = new UnidadeService();
            $subordinadasIds = $unidadeService->subordinadas($unidadeId[2])->pluck('id')->toArray();
            $unidadeIds = array_merge($unidadeIds, $subordinadasIds);
        }

        $where[] = ['unidade_id', 'in', $unidadeIds];


        if (isset($somenteVigentes[2])) {
            $where[] = ["dataInicio", "<=", now()];
            $where[] = ["dataFim", ">=", now()];
        }

        $data["where"] = $where;
    }

    public function proxyRows(&$rows) {
        foreach($rows as $row) {
            $row['nota'] = json_decode($row['nota']);
        }

        return $rows;
    }
}
