<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class IndicadoresEntregaHorasService extends IndicadoresEntregaService
{
    public function query($data)
    {
        $this->prepareQuery($data);

        $filtros = '';

        $sqlUnidades = [];
        if (isset($this->unidadeIds)) {
            foreach(explode(',', $this->unidadeIds) as $unidadeId) {
                $sqlUnidades[] = "SELECT $unidadeId as id";
            }

            $sqlUnidades = implode(' UNION ALL ', $sqlUnidades);
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
            WITH RECURSIVE
                unidades_filtradas AS (
                    $sqlUnidades
                ),
                planos_validos as (
                    select pt.id, pt.usuario_id, pt.data_inicio, pt.data_fim, pt.unidade_id, pt.carga_horaria
                    from planos_trabalhos pt
                    inner join unidades_filtradas uni on uni.id = pt.unidade_id
                    where pt.deleted_at is null
                      and pt.status in ('ATIVO', 'CONCLUIDO', 'AVALIADO')
                    $filtros
                ),
                limites AS (
                    SELECT
                        MIN(DATE(data_inicio)) AS data_min,
                        MAX(DATE(data_fim)) AS data_max,
                        MIN(YEAR(data_inicio)) AS ano_min,
                        MAX(YEAR(data_fim)) AS ano_max
                    FROM planos_validos
                ),
                anos AS (
                    SELECT ano_min AS ano from limites
                    UNION ALL
                    SELECT ano + 1
                    FROM anos
                    WHERE ano < (SELECT MAX(ano_max) from limites)
                ),
                dias AS (
                    SELECT data_min AS data from limites
                    UNION ALL
                    SELECT DATE_ADD(data, INTERVAL 1 DAY)
                    FROM dias
                    WHERE DATE_ADD(data, INTERVAL 1 DAY) <= (SELECT MAX(data_max) FROM limites)
                ),
                feriados_validos AS (
                    SELECT
                        f.tipoDia,
                        f.dia,
                        f.mes,
                        f.ano,
                        f.recorrente,
                        f.abrangencia,
                        CASE
                            WHEN f.recorrente = 1 AND f.tipoDia = 'MES'
                                THEN DATE(CONCAT(a.ano, '-', LPAD(f.mes, 2, '0'), '-', LPAD(f.dia, 2, '0')))
                            WHEN f.recorrente = 0 AND f.tipoDia = 'MES'
                                THEN DATE(CONCAT(f.ano, '-', LPAD(f.mes, 2, '0'), '-', LPAD(f.dia, 2, '0')))
                            ELSE NULL
                        END AS data_feriado
                    FROM feriados f
                    LEFT JOIN anos a ON f.recorrente = 1
                    WHERE
                        (
                            f.abrangencia = 'NACIONAL'
                            OR (
                                f.abrangencia = 'ESTADUAL'
                                AND f.uf in (
                                    SELECT cid.uf
                                    FROM unidades uni
                                    INNER JOIN cidades cid ON cid.id = uni.cidade_id
                                    WHERE uni.id in (select id from unidades_filtradas)
                                )
                            )
                            OR (
                                f.abrangencia = 'MUNICIPAL'
                                AND f.cidade_id in (
                                    SELECT cidade_id
                                    FROM unidades
                                    WHERE id in (select id from unidades_filtradas)
                                )
                            )
                        )
                        AND (
                            f.recorrente = 1
                            OR (f.ano in (SELECT ano from anos))
                        )
                ),
                dias_uteis as (
                    SELECT data
                    FROM dias d
                    WHERE DAYOFWEEK(d.data) NOT IN (1, 7)
                    AND NOT EXISTS (
                        SELECT 1
                        FROM feriados_validos f
                        WHERE
                            (
                                f.tipoDia = 'MES'
                                AND d.data = f.data_feriado
                            )
                            OR (
                                f.tipoDia = 'SEMANA'
                                AND DAYOFWEEK(d.data) = f.dia
                            )
                    )
                ), planos_ch as (
                    select pdu.id,
                        count(*) as dias_uteis,
                        sum(pdu.carga_horaria) as horasTotais
                    from planos_validos pdu
                    inner join dias_uteis du
                        on du.data between pdu.data_inicio and pdu.data_fim
                        and NOT EXISTS (
                            SELECT id
                            FROM afastamentos a
                            WHERE a.usuario_id = pdu.usuario_id
                            and du.data BETWEEN a.data_inicio AND date(a.data_fim)
                            and a.deleted_at is null
                        )
                    group by pdu.id
                ),
                categorias as (
                    SELECT 'Própria Unidade' as nome
                    UNION
                    SELECT 'Outras Unidades' as nome
                    UNION
                    SELECT 'Não vinculadas a entregas'
                ),
                resultado as (
                    SELECT
                        CASE WHEN pte.plano_entrega_entrega_id IS NULL
                            then 'Não vinculadas a entregas'
                            else
                                CASE WHEN pe.unidade_id = pv.unidade_id
                                    THEN 'Própria Unidade'
                                    ELSE 'Outras Unidades'
                                END
                        end as categoria,
                        sum(round(pte.forca_Trabalho * pch.dias_uteis *
                            pv.carga_horaria
                            / 100, 2)
                        ) as horas
                    from planos_validos pv
                    inner join planos_ch pch on pch.id = pv.id
                    inner join planos_trabalhos_entregas pte on pte.plano_trabalho_id = pch.id and pte.deleted_at is null
                    inner join usuarios u on u.id = pv.usuario_id and u.deleted_at is null
                    left join planos_entregas_entregas pee on pee.id = pte.plano_entrega_entrega_id
                    left join planos_entregas pe on pe.id = pee.plano_entrega_id
                    group by categoria
                )
                SELECT c.nome as categoria,
                    coalesce(r.horas, 0) as horas
                FROM categorias c
                LEFT JOIN resultado r on r.categoria = c.nome
                ORDER BY 2 desc
        TEXT;

        $rows = DB::select($sql, $params);

        return $rows;
    }
}
