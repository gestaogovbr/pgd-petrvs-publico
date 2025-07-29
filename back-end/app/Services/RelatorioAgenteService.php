<?php

namespace App\Services;

use App\Models\Usuario;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class RelatorioAgenteService extends ServiceBase
{
    public function __construct()
    {
        parent::__construct("App\Models\ViewRelatorioAgente");
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

        if (isset($unidadeId[2])) {
            $unidadeIds = [$unidadeId[2]];
        }

        if (isset($unidadeId[2]) && isset($subordinadas[2])) {
            $unidadeService = new UnidadeService();
            $subordinadasIds = $unidadeService->subordinadas($unidadeId[2])->pluck('id')->toArray();
            $unidadeIds = array_merge($unidadeIds, $subordinadasIds);
        }

        $where[] = ['unidade_id', 'in', $unidadeIds];

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
