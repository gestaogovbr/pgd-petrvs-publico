<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class RelatorioPlanoEntregaService extends ServiceBase
{
    public function __construct()
    {
        parent::__construct("App\Models\ViewRelatorioPlanoEntrega");
    }

    public function proxyQuery($query, &$data)
    {
        $where = $data["where"] ?? [];

        // remove a condições especificadas, pois tem tratamento diferenciado no proxyQuery
        $where = array_values(array_filter($where, function ($item) {
            return ($item[0] !== 'somente_vigentes')
                && ($item[0] !== 'incluir_unidades_subordinadas')
                && ($item[0] !== 'periodoInicio')
                && ($item[0] !== 'periodoFim')
                && ($item[0] !== 'unidade_id');
        }));

        $somenteVigentes = $this->extractWhere($data, "somente_vigentes");
        $subordinadas = $this->extractWhere($data, "incluir_unidades_subordinadas");
        $unidadeId = $this->extractWhere($data, "unidade_id");
        $periodoInicio = $this->extractWhere($data, "periodoInicio");
        $periodoFim = $this->extractWhere($data, "periodoFim");

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
            $where[] = new RawWhere("(CURDATE() BETWEEN dataInicio and dataFim)", []);
        }

         if(isset($periodoInicio[2]) && isset($periodoFim[2])) {
            $where[] = new RawWhere("(
                (? between dataInicio and dataFim)
                    or (? between dataInicio and dataFim)
                    or (dataInicio between ? and ?)
                    or (dataFim between ? and ?)
                )",
                [
                    $periodoInicio[2], $periodoFim[2],
                    $periodoInicio[2], $periodoFim[2],
                    $periodoInicio[2], $periodoFim[2]
                ]
            );
        } else{
            if (isset($periodoInicio[2])) {
                $where[] = new RawWhere("(? between dataInicio and dataFim)",
                    [$periodoInicio[2]]
                );
            }

            if (isset($periodoFim[2])) {
                $where[] =
                    new RawWhere("(? between dataInicio and dataFim)", [$periodoFim[2]])
                ;
            }
        }

        $data["where"] = $where;
    }

    public function proxyRows(&$rows) {
        foreach($rows as $row) {
            $row['nota'] = str_replace('"', '', $row['nota']);
        }

        return $rows;
    }
}
