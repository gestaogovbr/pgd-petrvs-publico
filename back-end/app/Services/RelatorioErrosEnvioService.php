<?php

namespace App\Services;

use App\Models\Usuario;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class RelatorioErrosEnvioService extends ServiceBase
{
    public function __construct()
    {
    }

    public function query($data)
    {
        $sql = <<<TEXT
        with lotacoes as (
            select
                `ui`.`usuario_id` AS `usuario_id`,
                `ui`.`unidade_id` AS `unidade_id`
            from `unidades_integrantes` `ui`
            join `unidades_integrantes_atribuicoes` `uia` on
                (`uia`.`unidade_integrante_id` = `ui`.`id`
                and `uia`.`deleted_at` is null)
            where
                `ui`.`deleted_at` is null
                and `uia`.`atribuicao` = 'LOTADO'
            order by `ui`.`usuario_id`
        )
            SELECT
                ei.id,
                COUNT(*) OVER() AS total_rows,
                ei.created_at as data_envio,
                ei.tipo AS categoria,
                e.numero as envioNumero,
                ei.uid,
                CASE
                    WHEN ei.tipo = 'participante' THEN u.matricula
                    WHEN ei.tipo = 'trabalho' THEN pt.numero
                    WHEN ei.tipo = 'entrega' THEN pe.numero
                    ELSE null
                END as numero,
                CASE
                    WHEN ei.tipo = 'participante' THEN lotacoes.unidade_id
                    WHEN ei.tipo = 'trabalho' THEN pt.unidade_id
                    WHEN ei.tipo = 'entrega' THEN pe.unidade_id
                    ELSE null
                END as unidade_id,
                CASE
                    WHEN ei.tipo = 'participante' THEN fn_obter_unidade_hierarquia(lotacoes.unidade_id)
                    WHEN ei.tipo = 'trabalho' THEN fn_obter_unidade_hierarquia(pt.unidade_id)
                    WHEN ei.tipo = 'entrega' THEN fn_obter_unidade_hierarquia(pe.unidade_id)
                    ELSE null
                END AS unidadeHierarquia,
                ei.erros,
                CASE
                    WHEN ei.erros like '%Service Temporarily Unavailable%' then 'Serviço Indisponível'
                    WHEN ei.erros like 'Erro inesperado%'
                    THEN SUBSTRING_INDEX(SUBSTRING_INDEX(ei.erros, '"detail":"', -1), '"', 1)
                    ELSE ei.erros
                END AS motivo
            FROM envio_itens ei
            JOIN envios e on e.id = ei.envio_id
            LEFT JOIN usuarios u ON ei.tipo = 'participante' and u.id = ei.uid and u.deleted_at is null
            left join `lotacoes` on (`lotacoes`.`usuario_id` = `u`.`id`)
            left join planos_trabalhos pt on ei.tipo = 'trabalho' and pt.id = ei.uid and pt.deleted_at is null
            left join planos_entregas pe on ei.tipo = 'entrega' and pe.id = ei.uid and pe.deleted_at is null
            WHERE ei.sucesso = 0
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

            $sql .= " and (CASE
                        WHEN ei.tipo = 'participante' THEN lotacoes.unidade_id
                        WHEN ei.tipo = 'trabalho' THEN pt.unidade_id
                        WHEN ei.tipo = 'entrega' THEN pe.unidade_id
                        ELSE null
                    END in ($unidadeIds))";
        }

       $this->applyFiltros($data, $sql, $params);

        // finalização - order, limit e offset
        $sql .= ' ORDER BY 2 DESC';

        if (!empty($data['limit'])) {
            $sql .= ' LIMIT 100 OFFSET '.(max($data['page'] - 1, 0) * 100);
        }

        $rows = DB::select($sql, $params);

        $this->proxyRows($rows);

        return [
            'count' => $rows[0]->total_rows ?? 0,
            'rows' => collect($rows)
        ];
    }

    public function applyFiltros($data, &$sql, &$params)
    {
        $categoria = $this->extractWhere($data, "categoria");
        if (isset($categoria[2])) {
            $sql .= " and ei.tipo = ?";
            $params[] = $categoria[2];
        }

        $numero = $this->extractWhere($data, "numero");
        if (isset($numero[2])) {
            $sql .= " and CASE
                        WHEN ei.tipo = 'participante' THEN u.matricula
                        WHEN ei.tipo = 'trabalho' THEN pt.numero
                        WHEN ei.tipo = 'entrega' THEN pe.numero
                        ELSE null
                    END like ?";
            $params[] = $numero[2];
        }

        $envioNumero = $this->extractWhere($data, "envioNumero");
        if (isset($envioNumero[2])) {
            $sql .= " and e.numero = ?";
            $params[] = $envioNumero[2];
        }

        $usuarioId = $this->extractWhere($data, "usuario_id");
        if (isset($usuarioId[2])) {
            $sql .= " and (ei.tipo = 'participante' and u.id = ?)";
            $params[] = $usuarioId[2];
        }

        $dataInicio = $this->extractWhere($data, "envio_inicio");
        if (isset($dataInicio[2])) {
            $sql .= " and ei.created_at >= ?";
            $params[] = $dataInicio[2];
        }

        $dataFim = $this->extractWhere($data, "envio_fim");
        if (isset($dataFim[2])) {
            $sql .= " and ei.created_at <= ?";
            $params[] = $dataFim[2] . " 23:59:59";
        }

        $dataEnvio = $this->extractWhere($data, "data_envio");
        if (isset($dataEnvio[2])) {
            $sql .= " and (ei.created_at between ? and ?)";
            $params[] = $dataEnvio[2];
            $params[] = $dataEnvio[2] . " 23:59:59";
        }

        $motivo = $this->extractWhere($data, "motivo");
        if (isset($motivo[2])) {
            $sql .= " and ei.erros like concat('%', ?, '%')";
            $params[] = $motivo[2];
        }

        $id = $this->extractWhere($data, "id");
        if (isset($id[2])) {
            $sql .= " and ei.uid like concat('%', ?, '%')";
            $params[] = $id[2];
        }
    }
}
