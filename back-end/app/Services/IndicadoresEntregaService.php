<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class IndicadoresEntregaService extends ServiceBase
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

        $entregas = $this->queryEntregas($data);

        return [
            'count' => 0,
            'rows' => $entregas
        ];
    }

    public function queryEntregas($data)
    {
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
            WITH entregas as (
                SELECT pt.data_inicio, pt.data_fim, pt.unidade_id, pee.id as plano_entrega_entrega_id
                FROM planos_trabalhos_entregas pte
                INNER JOIN planos_trabalhos pt
                    ON pte.plano_trabalho_id = pt.id
                    and pt.deleted_at is null
                LEFT JOIN planos_entregas_entregas pee
                    ON pte.plano_entrega_entrega_id = pee.id
                    and pte.deleted_at is null
                LEFT JOIN planos_entregas pe
                    on pe.id = pee.plano_entrega_id 
                    and pe.deleted_at is null
                WHERE pte.deleted_at is NULL
                    $filtros
            )
            SELECT 'Vinculadas a Objetivos' as categoria, count(distinct peeo.id) as total
            FROM entregas
            INNER JOIN planos_entregas_entregas_objetivos peeo 
                on peeo.entrega_id = entregas.plano_entrega_entrega_id
                and peeo.deleted_at is NULL 
                            
            UNION
                        
            SELECT 'Vinculadas a Objetivos', count(distinct peep.id) as total
            FROM entregas
            INNER JOIN planos_entregas_entregas_processos peep 
                on peep.entrega_id = entregas.plano_entrega_entrega_id
                and peep.deleted_at is NULL 
                    
            UNION
                        
            SELECT 'Não Vinculadas', count(*)
            FROM entregas  
            WHERE entregas.plano_entrega_entrega_id IS NULL
        TEXT;

        $rows = DB::select($sql, $params);

        return $rows;
    }
}
