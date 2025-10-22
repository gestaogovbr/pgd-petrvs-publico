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

    public function queryUsuarios($data)
    {
        $sql = <<<TEXT
           with lotacoes as (
                select
                    `ui`.`usuario_id` AS `usuario_id`,
                    `ui`.`unidade_id` AS `unidade_id`
                from
                    (`unidades_integrantes` `ui`
                join `unidades_integrantes_atribuicoes` `uia` on
                    (`uia`.`unidade_integrante_id` = `ui`.`id`
                        and `uia`.`deleted_at` is null))
                where
                    `ui`.`deleted_at` is null
                    and `uia`.`atribuicao` = 'LOTADO'
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
            left join `lotacoes` on (`lotacoes`.`usuario_id` = `u`.`id`)
            where u.deleted_at is null
        TEXT;

        $params = [];

        if (isset($this->unidadeIds)) {
            $sql .= " and lotacoes.unidade_id in ($this->unidadeIds)";
        }

       $this->applyFiltros($data, $sql, $params);

        $rows = DB::select($sql, $params);

        return $rows[0];
    }

    public function queryUnidades($data)
    {
        $sql = <<<TEXT
           select
                sum(
                    case when exists(
                        SELECT pe.id
                        FROM planos_entregas pe
                        WHERE pe.unidade_id = uni.id
                        and pe.deleted_at is null
                        and pe.status not in ('CANCELADO')
                        limit 1
                    )
                    then 1
                    else 0
                end) as totalUnidadesPE,
                count(*) as totalUnidades
            from unidades uni
            where uni.deleted_at is null
        TEXT;

        $params = [];

        if (isset($this->unidadeIds)) {
            $sql .= " and uni.id in ($this->unidadeIds)";
        }

        $this->applyFiltros($data, $sql, $params);

        $rows = DB::select($sql, $params);

        return $rows[0];
    }

    public function applyFiltros($data, &$sql, &$params)
    {
    }
}
