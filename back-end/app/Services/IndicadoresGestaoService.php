<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class IndicadoresGestaoService extends ServiceBase
{
    private $unidadeId;
    private $unidadeIds;
    private $subordinadas;
    private $unidadeService;

    public function __construct() {}

    // Taxa de cobertura do PGD entre os agentes públicos
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

        $usuarios = $this->queryUsuarios($data);
        $unidades = $this->queryUnidades($data);

        return [
            'count' => 0,
            'rows' => [
                [
                    'totalParticipantes' => (int) $usuarios->totalParticipantes ?? 0,
                    'totalUsuarios' => (int)$usuarios->totalUsuarios ?? 0,
                    'totalUnidadesPE' => (int)$unidades->totalUnidadesPE ?? 0,
                    'totalUnidades' =>(int) $unidades->totalUnidades     ?? 0,
                ]
            ]
        ];
    }

    // quantos usuarios participam de PGD
    public function queryUsuarios($data)
    {
        $sql = "";
        $params = [];

        if (isset($this->unidadeIds)) {
            $sql .= " and ui.unidade_id in ($this->unidadeIds)";
        }

       $this->applyFiltros($data, $sql, $params);

        $sql = <<<TEXT
           with lotacoes as (
                select distinct
                    `ui`.`usuario_id` AS `usuario_id`
                from
                    (`unidades_integrantes` `ui`
                join `unidades_integrantes_atribuicoes` `uia` on
                    (`uia`.`unidade_integrante_id` = `ui`.`id`
                        and `uia`.`deleted_at` is null))
                where
                    `ui`.`deleted_at` is null
                    and `uia`.`atribuicao` = 'LOTADO'
                    $sql
                order by
                    `ui`.`usuario_id`
            )
            SELECT
                SUM(
                    case when u.participa_pgd = 'sim'
                        then 1
                        else 0
                    end
                ) as totalParticipantes,
                count(distinct u.id) as totalUsuarios
            FROM usuarios u
            inner join `lotacoes` on (`lotacoes`.`usuario_id` = `u`.`id`)
            where u.deleted_at is null
        TEXT;

        $rows = DB::select($sql, $params);

        return $rows[0];
    }

    // quantos unidades possuem PE
    public function queryUnidades($data)
    {
        $sql = "SELECT pe.id
                FROM planos_entregas pe
                WHERE pe.unidade_id = uni.id
                and pe.deleted_at is null
                and pe.status not in ('CANCELADO')";

        $params = [];

        $data_inicial = $this->extractWhere($data, "data_inicial");
        if (isset($data_inicial[2])) {
            $sql .= " and `pe`.`data_inicio` >= ?";
            $params[] = $data_inicial[2];
        }

        $data_final = $this->extractWhere($data, "data_final");
        if (isset($data_final[2])) {
            $sql .= " and date(`pe`.`data_fim`) <= ?";
            $params[] = $data_final[2];
        }

        $somenteVigentes = $this->extractWhere($data, "somente_vigentes");
        if (isset($somenteVigentes[2])) {
            $where[] = new RawWhere("(now() between date(`pe`.`data_inicio`) and date(`pe`.`data_fim`))", []);
        }

        $sql = <<<TEXT
           select
                sum(
                    case when exists(
                        $sql
                        limit 1
                    )
                    then 1
                    else 0
                end) as totalUnidadesPE,
                count(*) as totalUnidades
            from unidades uni
            where uni.deleted_at is null
        TEXT;

        if (isset($this->unidadeIds)) {
            $sql .= " and uni.id in ($this->unidadeIds)";
        }

        $rows = DB::select($sql, $params);

        return $rows[0];
    }

    public function applyFiltros($data, &$sql, &$params)
    {
        $data_inicial = $this->extractWhere($data, "data_inicial");
        if (isset($data_inicial[2])) {
            $sql .= " and `uia`.`created_at` >= ?";
            $params[] = $data_inicial[2];
        }

        $data_final = $this->extractWhere($data, "data_final");
        if (isset($data_final[2])) {
            $sql .= " and date(`uia`.`created_at`) <= ?";
            $params[] = $data_final[2];
        }
    }
}
