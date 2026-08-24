<?php

declare(strict_types=1);

namespace App\Repository\CadeiaValor\Eloquent;

use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoSupport;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class EloquentCadeiaValorReadRepository implements CadeiaValorReadRepositoryContract
{
    public function findCadeiaValor(string $id): ?CadeiaValor
    {
        return CadeiaValor::find($id);
    }

    public function findProcesso(string $processoId, string $cadeiaValorId): ?CadeiaValorProcesso
    {
        return CadeiaValorProcesso::where('id', $processoId)
            ->where('cadeia_valor_id', $cadeiaValorId)
            ->first();
    }

    public function listarProcessosPorCadeia(string $cadeiaValorId): Collection
    {
        return CadeiaValorProcesso::where('cadeia_valor_id', $cadeiaValorId)
            ->whereNull('deleted_at')
            ->with('tipoElemento')
            ->get();
    }

    public function buscarVinculosCrossCadeia(array $processoIds, string $cadeiaValorIdAtual): array
    {
        if (empty($processoIds)) {
            return [];
        }

        return DB::table('planos_entregas_entregas_processos as peep1')
            ->join('planos_entregas_entregas_processos as peep2', 'peep2.entrega_id', '=', 'peep1.entrega_id')
            ->join('cadeias_valores_processos as cvp', 'cvp.id', '=', 'peep2.cadeia_processo_id')
            ->join('cadeias_valores as cv', 'cv.id', '=', 'cvp.cadeia_valor_id')
            ->whereIn('peep1.cadeia_processo_id', $processoIds)
            ->where('cvp.cadeia_valor_id', '!=', $cadeiaValorIdAtual)
            ->whereNull('peep1.deleted_at')
            ->whereNull('peep2.deleted_at')
            ->whereNull('cvp.deleted_at')
            ->whereNull('cv.deleted_at')
            ->select([
                'peep1.cadeia_processo_id as processo_origem_id',
                'cvp.id as processo_id',
                'cvp.nome as processo_nome',
                'cv.id as cadeia_valor_id',
                'cv.nome as cadeia_valor_nome',
            ])
            ->distinct()
            ->get()
            ->all();
    }

    public function contarVinculosPorProcesso(array $processoIds): array
    {
        if (empty($processoIds)) {
            return [];
        }

        return DB::table('planos_entregas_entregas_processos')
            ->whereIn('cadeia_processo_id', $processoIds)
            ->whereNull('deleted_at')
            ->groupBy('cadeia_processo_id')
            ->pluck(DB::raw('COUNT(*)'), 'cadeia_processo_id')
            ->all();
    }

    public function buscarDadosGeraisPainel(string $processoId, string $cadeiaValorId): \stdClass
    {
        $processo = $this->findProcesso($processoId, $cadeiaValorId);

        $nivel = 1;
        $atual = $processo;
        while ($atual !== null && $atual->processo_pai_id !== null) {
            $pai = $atual->processoPai;
            if (!$pai instanceof CadeiaValorProcesso) {
                break;
            }
            $nivel++;
            $atual = $pai;
        }

        return (object) [
            'processo_id' => $processoId,
            'processo_nome' => $processo?->nome ?? '',
            'nivel' => $nivel,
        ];
    }

    public function agregarPainelEsforcoPessoasEntregas(string $processoId, ?string $unidadeId = null): \stdClass
    {
        $chdSql = ArvoreInstitucionalEsforcoSupport::chdPtSql();
        $statusPlanejado = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();
        $statusExecutado = ArvoreInstitucionalEsforcoSupport::ptStatusExecutadoIn();

        $unidadeFilter = $unidadeId ? "AND pee.unidade_id = ?" : '';
        $params = $unidadeId ? [$processoId, $unidadeId] : [$processoId];

        $rows = DB::select(<<<SQL
            SELECT
                ROUND(COALESCE(SUM(
                    ({$chdSql})
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                ), 0), 2) AS esforco_disponivel_horas,

                ROUND(COALESCE(SUM(
                    ({$chdSql})
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                    * (pte.forca_trabalho / 100.0)
                ), 0), 2) AS esforco_planejado_horas,

                ROUND(COALESCE(SUM(
                    CASE WHEN pt.status IN ({$statusExecutado})
                    THEN
                        ({$chdSql})
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                        * (pte.forca_trabalho / 100.0)
                    ELSE 0 END
                ), 0), 2) AS esforco_executado_horas,

                CASE WHEN COUNT(CASE WHEN pt.status IN ({$statusPlanejado}) THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pt_pactuado,
                CASE WHEN COUNT(CASE WHEN pt.status IN ({$statusExecutado}) THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pt_concluido,
                CASE WHEN COUNT(CASE WHEN pe.status IN ('ATIVO', 'CONCLUIDO', 'AVALIADO') THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pe_homologado,

                COUNT(DISTINCT pee.id) AS total_entregas,
                COUNT(DISTINCT CASE WHEN pee.progresso_realizado >= 100 THEN pee.id END) AS entregas_concluidas

            FROM planos_entregas_entregas_processos peep
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = peep.entrega_id AND pee.deleted_at IS NULL
            INNER JOIN planos_entregas pe
                ON pe.id = pee.plano_entrega_id AND pe.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                AND pt.status IN ({$statusPlanejado})
            WHERE peep.cadeia_processo_id = ? AND peep.deleted_at IS NULL
            {$unidadeFilter}
        SQL, $params);

        $row = $rows[0] ?? null;

        // Participantes — query separada para calcular categorias corretamente
        $participantes = $this->calcularParticipantesCategorias($processoId, $unidadeId);

        return (object) [
            'esforco_disponivel_horas' => (float) ($row->esforco_disponivel_horas ?? 0),
            'esforco_planejado_horas' => (float) ($row->esforco_planejado_horas ?? 0),
            'esforco_executado_horas' => (float) ($row->esforco_executado_horas ?? 0),
            'tem_pt_pactuado' => (bool) ($row->tem_pt_pactuado ?? false),
            'tem_pt_concluido' => (bool) ($row->tem_pt_concluido ?? false),
            'tem_pe_homologado' => (bool) ($row->tem_pe_homologado ?? false),
            'participantes_somente_unidade_propria' => $participantes['somente_propria'],
            'participantes_somente_outras_unidades' => $participantes['somente_outras'],
            'participantes_em_ambas' => $participantes['em_ambas'],
            'total_entregas' => (int) ($row->total_entregas ?? 0),
            'entregas_concluidas' => (int) ($row->entregas_concluidas ?? 0),
        ];
    }

    public function listarDetalhamentoEntregasPainel(string $processoId, array $filtros = []): array
    {
        $chdSql = ArvoreInstitucionalEsforcoSupport::chdPtSql();
        $statusPlanejado = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();
        $statusExecutado = ArvoreInstitucionalEsforcoSupport::ptStatusExecutadoIn();

        $conditions = '';
        $params = [$processoId];

        if (!empty($filtros['unidade_id'])) {
            $conditions .= ' AND pee.unidade_id = ?';
            $params[] = $filtros['unidade_id'];
        }
        if (!empty($filtros['plano_entrega_entrega_id'])) {
            $conditions .= ' AND pee.id = ?';
            $params[] = $filtros['plano_entrega_entrega_id'];
        }
        if (!empty($filtros['data_inicio'])) {
            $conditions .= ' AND pe.data_fim >= ?';
            $params[] = $filtros['data_inicio'];
        }
        if (!empty($filtros['data_fim'])) {
            $conditions .= ' AND pe.data_inicio <= ?';
            $params[] = $filtros['data_fim'];
        }

        return DB::select(<<<SQL
            SELECT
                pee.id AS plano_entrega_entrega_id,
                u.id AS unidade_id,
                u.sigla AS unidade_sigla,
                u.nome AS unidade_nome,
                pe.id AS plano_entrega_id,
                pe.nome AS plano_entrega_nome,
                pe.status AS plano_entrega_status,
                pe.data_inicio AS plano_entrega_data_inicio,
                pe.data_fim AS plano_entrega_data_fim,
                pee.descricao AS entrega_titulo,
                COALESCE(ultimo_prog.progresso_esperado, pee.progresso_esperado, 0) AS progresso_esperado,
                COALESCE(ultimo_prog.progresso_realizado, pee.progresso_realizado, 0) AS progresso_realizado,
                COALESCE(ultimo_prog.meta, pee.meta) AS meta,
                COALESCE(ultimo_prog.realizado, pee.realizado) AS realizado,
                e.tipo_indicador,
                e.lista_qualitativos,

                (
                    SELECT a.descricao
                    FROM atividades a
                    INNER JOIN planos_trabalhos_entregas pte_re
                        ON pte_re.id = a.plano_trabalho_entrega_id AND pte_re.deleted_at IS NULL
                    WHERE pte_re.plano_entrega_entrega_id = pee.id AND a.deleted_at IS NULL
                    ORDER BY a.data_distribuicao DESC
                    LIMIT 1
                ) AS registro_execucao,

                COALESCE((
                    SELECT ROUND(SUM(
                        ({$chdSql})
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                    ), 2)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                ), 0) AS esforco_disponivel_horas,

                COALESCE((
                    SELECT ROUND(SUM(
                        ({$chdSql})
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                        * (pte.forca_trabalho / 100.0)
                    ), 2)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                ), 0) AS esforco_planejado_horas,

                COALESCE((
                    SELECT ROUND(SUM(
                        ({$chdSql})
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                        * (pte.forca_trabalho / 100.0)
                    ), 2)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusExecutado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                ), 0) AS esforco_executado_horas,

                CASE WHEN EXISTS (
                    SELECT 1 FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                ) THEN 1 ELSE 0 END AS tem_pt_pactuado,

                CASE WHEN EXISTS (
                    SELECT 1 FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                        AND pt.status IN ({$statusExecutado})
                ) THEN 1 ELSE 0 END AS tem_pt_concluido,

                COALESCE((
                    SELECT COUNT(DISTINCT pt.usuario_id)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                ), 0) AS participantes_total,

                COALESCE((
                    SELECT COUNT(DISTINCT pt.usuario_id)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                        AND pt.unidade_id = u.id
                        AND NOT EXISTS (
                            SELECT 1 FROM planos_trabalhos_entregas pte2
                            INNER JOIN planos_trabalhos pt2 ON pt2.id = pte2.plano_trabalho_id AND pt2.deleted_at IS NULL
                                AND pt2.status IN ({$statusPlanejado})
                            WHERE pte2.plano_entrega_entrega_id = pee.id AND pte2.deleted_at IS NULL
                                AND pt2.usuario_id = pt.usuario_id AND pt2.id != pt.id
                                AND pt2.unidade_id != u.id
                        )
                ), 0) AS participantes_somente_unidade_propria,

                COALESCE((
                    SELECT COUNT(DISTINCT pt.usuario_id)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                        AND pt.unidade_id != u.id
                        AND NOT EXISTS (
                            SELECT 1 FROM planos_trabalhos_entregas pte2
                            INNER JOIN planos_trabalhos pt2 ON pt2.id = pte2.plano_trabalho_id AND pt2.deleted_at IS NULL
                                AND pt2.status IN ({$statusPlanejado})
                            WHERE pte2.plano_entrega_entrega_id = pee.id AND pte2.deleted_at IS NULL
                                AND pt2.usuario_id = pt.usuario_id AND pt2.id != pt.id
                                AND pt2.unidade_id = u.id
                        )
                ), 0) AS participantes_somente_outras_unidades,

                COALESCE((
                    SELECT COUNT(DISTINCT pt.usuario_id)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                        AND pt.unidade_id = u.id
                        AND EXISTS (
                            SELECT 1 FROM planos_trabalhos_entregas pte2
                            INNER JOIN planos_trabalhos pt2 ON pt2.id = pte2.plano_trabalho_id AND pt2.deleted_at IS NULL
                                AND pt2.status IN ({$statusPlanejado})
                            WHERE pte2.plano_entrega_entrega_id = pee.id AND pte2.deleted_at IS NULL
                                AND pt2.usuario_id = pt.usuario_id
                                AND pt2.unidade_id != u.id
                        )
                ), 0) AS participantes_em_ambas

            FROM planos_entregas_entregas_processos peep
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = peep.entrega_id AND pee.deleted_at IS NULL
            INNER JOIN planos_entregas pe
                ON pe.id = pee.plano_entrega_id AND pe.deleted_at IS NULL
            INNER JOIN unidades u
                ON u.id = pee.unidade_id AND u.deleted_at IS NULL
            LEFT JOIN entregas e
                ON e.id = pee.entrega_id AND e.deleted_at IS NULL
            LEFT JOIN planos_entregas_entregas_progressos ultimo_prog
                ON ultimo_prog.id = (
                    SELECT p2.id
                    FROM planos_entregas_entregas_progressos p2
                    WHERE p2.plano_entrega_entrega_id = pee.id
                      AND p2.deleted_at IS NULL
                    ORDER BY p2.data_progresso DESC, p2.created_at DESC
                    LIMIT 1
                )
            WHERE peep.cadeia_processo_id = ? AND peep.deleted_at IS NULL
            {$conditions}
            ORDER BY u.nome, pee.descricao
        SQL, $params);
    }

    public function listarFiltroUnidadesPainel(string $processoId): array
    {
        return DB::table('planos_entregas_entregas_processos as peep')
            ->join('planos_entregas_entregas as pee', function ($join) {
                $join->on('pee.id', '=', 'peep.entrega_id')
                    ->whereNull('pee.deleted_at');
            })
            ->join('unidades as u', function ($join) {
                $join->on('u.id', '=', 'pee.unidade_id')
                    ->whereNull('u.deleted_at');
            })
            ->where('peep.cadeia_processo_id', $processoId)
            ->whereNull('peep.deleted_at')
            ->select(['u.id', 'u.sigla', 'u.nome'])
            ->distinct()
            ->orderBy('u.nome')
            ->get()
            ->map(fn (\stdClass $row) => [
                'id' => (string) $row->id,
                'label' => (string) $row->sigla . ' — ' . (string) $row->nome,
            ])
            ->all();
    }

    public function listarFiltroEntregasPainel(string $processoId): array
    {
        return DB::table('planos_entregas_entregas_processos as peep')
            ->join('planos_entregas_entregas as pee', function ($join) {
                $join->on('pee.id', '=', 'peep.entrega_id')
                    ->whereNull('pee.deleted_at');
            })
            ->where('peep.cadeia_processo_id', $processoId)
            ->whereNull('peep.deleted_at')
            ->select([
                'pee.id',
                'pee.descricao as label',
            ])
            ->distinct()
            ->orderBy('label')
            ->get()
            ->map(fn (\stdClass $row) => [
                'id' => (string) $row->id,
                'label' => (string) $row->label,
            ])
            ->all();
    }

    public function calcularEsforcoPorEntrega(string $entregaId): \stdClass
    {
        $chdSql = ArvoreInstitucionalEsforcoSupport::chdPtSql();
        $statusPlanejado = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();
        $statusExecutado = ArvoreInstitucionalEsforcoSupport::ptStatusExecutadoIn();

        $rows = DB::select(<<<SQL
            SELECT
                ROUND(COALESCE(SUM(
                    ({$chdSql})
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                ), 0), 2) AS esforco_disponivel,
                ROUND(COALESCE(SUM(
                    ({$chdSql})
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                    * (pte.forca_trabalho / 100.0)
                ), 0), 2) AS esforco_planejado,
                ROUND(COALESCE(SUM(
                    CASE WHEN pt.status IN ({$statusExecutado})
                    THEN
                        ({$chdSql})
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                        * (pte.forca_trabalho / 100.0)
                    ELSE 0 END
                ), 0), 2) AS esforco_executado
            FROM planos_trabalhos_entregas pte
            INNER JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                AND pt.status IN ({$statusPlanejado})
            WHERE pte.plano_entrega_entrega_id = ? AND pte.deleted_at IS NULL
        SQL, [$entregaId]);

        $row = $rows[0] ?? null;

        return (object) [
            'esforco_disponivel' => (float) ($row->esforco_disponivel ?? 0),
            'esforco_planejado' => (float) ($row->esforco_planejado ?? 0),
            'esforco_executado' => (float) ($row->esforco_executado ?? 0),
        ];
    }

    /**
     * @return array{somente_propria: int, somente_outras: int, em_ambas: int}
     */
    private function calcularParticipantesCategorias(string $processoId, ?string $unidadeId): array
    {
        $statusPlanejado = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();

        $unidadeFilter = $unidadeId ? 'AND pee.unidade_id = ?' : '';
        $params = $unidadeId ? [$processoId, $unidadeId] : [$processoId];

        $rows = DB::select(<<<SQL
            SELECT
                pt.usuario_id,
                MAX(CASE WHEN pt.unidade_id = pee.unidade_id THEN 1 ELSE 0 END) AS em_propria,
                MAX(CASE WHEN pt.unidade_id != pee.unidade_id THEN 1 ELSE 0 END) AS em_outra
            FROM planos_entregas_entregas_processos peep
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = peep.entrega_id AND pee.deleted_at IS NULL
            INNER JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            INNER JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                AND pt.status IN ({$statusPlanejado})
            WHERE peep.cadeia_processo_id = ? AND peep.deleted_at IS NULL
            {$unidadeFilter}
            GROUP BY pt.usuario_id
        SQL, $params);

        $somentePropria = 0;
        $somenteOutras = 0;
        $emAmbas = 0;

        foreach ($rows as $row) {
            $propria = (bool) $row->em_propria;
            $outra = (bool) $row->em_outra;

            if ($propria && $outra) {
                $emAmbas++;
            } elseif ($propria) {
                $somentePropria++;
            } else {
                $somenteOutras++;
            }
        }

        return [
            'somente_propria' => $somentePropria,
            'somente_outras' => $somenteOutras,
            'em_ambas' => $emAmbas,
        ];
    }

    public function loadEsforcoPorProcessosDaCadeia(string $cadeiaValorId): array
    {
        $chdSql = ArvoreInstitucionalEsforcoSupport::chdPtSql();
        $ptPlanejadoIn = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();

        return DB::select(<<<SQL
            SELECT
                cvp.id AS processo_id,
                cvp.nome,
                cvp.processo_pai_id,
                cv.nome AS cadeia_valor_nome,
                COUNT(DISTINCT pee.id) AS total_entregas,
                ROUND(COALESCE(SUM(
                    {$chdSql}
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                ), 0), 2) AS esforco_disponivel_horas,
                ROUND(COALESCE(SUM(CASE
                    WHEN pt.status IN ({$ptPlanejadoIn}) THEN
                        {$chdSql}
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                        * (pte.forca_trabalho / 100.0)
                END), 0), 2) AS esforco_proprio
            FROM cadeias_valores_processos cvp
            INNER JOIN cadeias_valores cv ON cv.id = cvp.cadeia_valor_id
            LEFT JOIN planos_entregas_entregas_processos peep
                ON peep.cadeia_processo_id = cvp.id AND peep.deleted_at IS NULL
            LEFT JOIN planos_entregas_entregas pee
                ON pee.id = peep.entrega_id AND pee.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id
                AND pt.deleted_at IS NULL
                AND pt.status NOT IN ('CANCELADO', 'SUSPENSO')
            WHERE cvp.cadeia_valor_id = ? AND cvp.deleted_at IS NULL
            GROUP BY cvp.id, cvp.nome, cvp.processo_pai_id, cv.nome
            ORDER BY cvp.sequencia
        SQL, [$cadeiaValorId]);
    }

    public function coletarIdsFilhosRecursivo(string $processoId): array
    {
        $rows = DB::select(<<<SQL
            WITH RECURSIVE arvore AS (
                SELECT id
                FROM cadeias_valores_processos
                WHERE id = ?
                  AND deleted_at IS NULL

                UNION ALL

                SELECT cvp.id
                FROM cadeias_valores_processos cvp
                INNER JOIN arvore a ON cvp.processo_pai_id = a.id
                WHERE cvp.deleted_at IS NULL
            )
            SELECT id FROM arvore
        SQL, [$processoId]);

        return array_map(static fn (\stdClass $row): string => (string) $row->id, $rows);
    }

    public function agregarPainelConsolidado(string $processoId, ?string $unidadeId = null): \stdClass
    {
        $ids = $this->coletarIdsFilhosRecursivo($processoId);

        if (empty($ids)) {
            return $this->agregarPainelEsforcoPessoasEntregas($processoId, $unidadeId);
        }

        $chdSql = ArvoreInstitucionalEsforcoSupport::chdPtSql();
        $statusPlanejado = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();
        $statusExecutado = ArvoreInstitucionalEsforcoSupport::ptStatusExecutadoIn();

        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $unidadeFilter = $unidadeId ? 'AND pee.unidade_id = ?' : '';
        $params = $unidadeId ? array_merge($ids, [$unidadeId]) : $ids;

        $rows = DB::select(<<<SQL
            SELECT
                ROUND(COALESCE(SUM(
                    ({$chdSql})
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                ), 0), 2) AS esforco_disponivel_horas,

                ROUND(COALESCE(SUM(
                    ({$chdSql})
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                    * (pte.forca_trabalho / 100.0)
                ), 0), 2) AS esforco_planejado_horas,

                ROUND(COALESCE(SUM(
                    CASE WHEN pt.status IN ({$statusExecutado})
                    THEN
                        ({$chdSql})
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                        * (pte.forca_trabalho / 100.0)
                    ELSE 0 END
                ), 0), 2) AS esforco_executado_horas,

                CASE WHEN COUNT(CASE WHEN pt.status IN ({$statusPlanejado}) THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pt_pactuado,
                CASE WHEN COUNT(CASE WHEN pt.status IN ({$statusExecutado}) THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pt_concluido,
                CASE WHEN COUNT(CASE WHEN pe.status IN ('ATIVO', 'CONCLUIDO', 'AVALIADO') THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pe_homologado,

                COUNT(DISTINCT pee.id) AS total_entregas,
                COUNT(DISTINCT CASE WHEN pee.progresso_realizado >= 100 THEN pee.id END) AS entregas_concluidas

            FROM planos_entregas_entregas_processos peep
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = peep.entrega_id AND pee.deleted_at IS NULL
            INNER JOIN planos_entregas pe
                ON pe.id = pee.plano_entrega_id AND pe.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                AND pt.status IN ({$statusPlanejado})
            WHERE peep.cadeia_processo_id IN ({$placeholders}) AND peep.deleted_at IS NULL
            {$unidadeFilter}
        SQL, $params);

        $row = $rows[0] ?? null;
        $participantes = $this->calcularParticipantesCategoriasMultiplos($ids, $unidadeId);

        return (object) [
            'esforco_disponivel_horas' => (float) ($row->esforco_disponivel_horas ?? 0),
            'esforco_planejado_horas' => (float) ($row->esforco_planejado_horas ?? 0),
            'esforco_executado_horas' => (float) ($row->esforco_executado_horas ?? 0),
            'tem_pt_pactuado' => (bool) ($row->tem_pt_pactuado ?? false),
            'tem_pt_concluido' => (bool) ($row->tem_pt_concluido ?? false),
            'tem_pe_homologado' => (bool) ($row->tem_pe_homologado ?? false),
            'participantes_somente_unidade_propria' => $participantes['somente_propria'],
            'participantes_somente_outras_unidades' => $participantes['somente_outras'],
            'participantes_em_ambas' => $participantes['em_ambas'],
            'total_entregas' => (int) ($row->total_entregas ?? 0),
            'total_entregas_avaliadas' => 0,
            'entregas_concluidas' => (int) ($row->entregas_concluidas ?? 0),
        ];
    }

    public function listarDetalhamentoEntregasPainelMultiplos(array $processoIds, array $filtros = []): array
    {
        if (empty($processoIds)) {
            return [];
        }

        $chdSql = ArvoreInstitucionalEsforcoSupport::chdPtSql();
        $statusPlanejado = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();
        $statusExecutado = ArvoreInstitucionalEsforcoSupport::ptStatusExecutadoIn();

        $placeholders = implode(',', array_fill(0, count($processoIds), '?'));
        $params = $processoIds;
        $conditions = '';

        if (!empty($filtros['unidade_id'])) {
            $conditions .= ' AND pee.unidade_id = ?';
            $params[] = $filtros['unidade_id'];
        }
        if (!empty($filtros['unidade_ids'])) {
            $uPlaceholders = implode(',', array_fill(0, count($filtros['unidade_ids']), '?'));
            $conditions .= " AND pee.unidade_id IN ({$uPlaceholders})";
            $params = array_merge($params, $filtros['unidade_ids']);
        }
        if (!empty($filtros['plano_entrega_entrega_id'])) {
            $conditions .= ' AND pee.id = ?';
            $params[] = $filtros['plano_entrega_entrega_id'];
        }
        if (!empty($filtros['data_inicio'])) {
            $conditions .= ' AND pe.data_fim >= ?';
            $params[] = $filtros['data_inicio'];
        }
        if (!empty($filtros['data_fim'])) {
            $conditions .= ' AND pe.data_inicio <= ?';
            $params[] = $filtros['data_fim'];
        }

        return DB::select(<<<SQL
            SELECT
                pee.id AS plano_entrega_entrega_id,
                u.id AS unidade_id,
                u.sigla AS unidade_sigla,
                u.nome AS unidade_nome,
                pe.id AS plano_entrega_id,
                pe.nome AS plano_entrega_nome,
                pe.status AS plano_entrega_status,
                pe.data_inicio AS plano_entrega_data_inicio,
                pe.data_fim AS plano_entrega_data_fim,
                pee.descricao AS entrega_titulo,
                COALESCE(pee.descricao_entrega, '') AS entrega_descricao,
                COALESCE(pee.descricao_meta, '') AS descricao_meta,
                pee.etiquetas,
                COALESCE(ultimo_prog.progresso_esperado, pee.progresso_esperado, 0) AS progresso_esperado,
                COALESCE(ultimo_prog.progresso_realizado, pee.progresso_realizado, 0) AS progresso_realizado,
                COALESCE(ultimo_prog.meta, pee.meta) AS meta,
                COALESCE(ultimo_prog.realizado, pee.realizado) AS realizado,
                e.tipo_indicador,
                e.lista_qualitativos,

                (
                    SELECT a.descricao
                    FROM atividades a
                    INNER JOIN planos_trabalhos_entregas pte_re
                        ON pte_re.id = a.plano_trabalho_entrega_id AND pte_re.deleted_at IS NULL
                    WHERE pte_re.plano_entrega_entrega_id = pee.id AND a.deleted_at IS NULL
                    ORDER BY a.data_distribuicao DESC
                    LIMIT 1
                ) AS registro_execucao,

                COALESCE((
                    SELECT ROUND(SUM(
                        ({$chdSql})
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                    ), 2)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                ), 0) AS esforco_disponivel_horas,

                COALESCE((
                    SELECT ROUND(SUM(
                        ({$chdSql})
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                        * (pte.forca_trabalho / 100.0)
                    ), 2)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                ), 0) AS esforco_planejado_horas,

                COALESCE((
                    SELECT ROUND(SUM(
                        ({$chdSql})
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                        * (pte.forca_trabalho / 100.0)
                    ), 2)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusExecutado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                ), 0) AS esforco_executado_horas,

                CASE WHEN EXISTS (
                    SELECT 1 FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                ) THEN 1 ELSE 0 END AS tem_pt_pactuado,

                CASE WHEN EXISTS (
                    SELECT 1 FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                        AND pt.status IN ({$statusExecutado})
                ) THEN 1 ELSE 0 END AS tem_pt_concluido,

                COALESCE((
                    SELECT COUNT(DISTINCT pt.usuario_id)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                ), 0) AS participantes_total,

                0 AS participantes_somente_unidade_propria,
                0 AS participantes_somente_outras_unidades,
                0 AS participantes_em_ambas,

                peep.cadeia_processo_id AS no_origem_id,
                cvp_origem.nome AS no_origem_nome

            FROM planos_entregas_entregas_processos peep
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = peep.entrega_id AND pee.deleted_at IS NULL
            INNER JOIN planos_entregas pe
                ON pe.id = pee.plano_entrega_id AND pe.deleted_at IS NULL
            INNER JOIN unidades u
                ON u.id = pee.unidade_id AND u.deleted_at IS NULL
            LEFT JOIN cadeias_valores_processos cvp_origem
                ON cvp_origem.id = peep.cadeia_processo_id AND cvp_origem.deleted_at IS NULL
            LEFT JOIN entregas e
                ON e.id = pee.entrega_id AND e.deleted_at IS NULL
            LEFT JOIN planos_entregas_entregas_progressos ultimo_prog
                ON ultimo_prog.id = (
                    SELECT p2.id
                    FROM planos_entregas_entregas_progressos p2
                    WHERE p2.plano_entrega_entrega_id = pee.id
                      AND p2.deleted_at IS NULL
                    ORDER BY p2.data_progresso DESC, p2.created_at DESC
                    LIMIT 1
                )
            WHERE peep.cadeia_processo_id IN ({$placeholders}) AND peep.deleted_at IS NULL
            {$conditions}
            ORDER BY pe.data_inicio DESC, u.sigla, pee.descricao
        SQL, $params);
    }

    /**
     * Calcula participantes por categoria para múltiplos processos (consolidado).
     *
     * @param list<string> $processoIds
     * @return array{somente_propria: int, somente_outras: int, em_ambas: int}
     */
    private function calcularParticipantesCategoriasMultiplos(array $processoIds, ?string $unidadeId = null): array
    {
        if (empty($processoIds)) {
            return ['somente_propria' => 0, 'somente_outras' => 0, 'em_ambas' => 0];
        }

        $statusPlanejado = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();
        $placeholders = implode(',', array_fill(0, count($processoIds), '?'));
        $unidadeFilter = $unidadeId ? 'AND pee.unidade_id = ?' : '';
        $params = $unidadeId ? array_merge($processoIds, [$unidadeId]) : $processoIds;

        $rows = DB::select(<<<SQL
            SELECT
                pt.usuario_id,
                pt.unidade_id,
                pee.unidade_id AS entrega_unidade_id
            FROM planos_entregas_entregas_processos peep
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = peep.entrega_id AND pee.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                AND pt.status IN ({$statusPlanejado})
            WHERE peep.cadeia_processo_id IN ({$placeholders}) AND peep.deleted_at IS NULL
              AND pt.usuario_id IS NOT NULL
            {$unidadeFilter}
        SQL, $params);

        $usuarios = [];
        foreach ($rows as $row) {
            $uid = (string) $row->usuario_id;
            if (!isset($usuarios[$uid])) {
                $usuarios[$uid] = ['propria' => false, 'outras' => false];
            }
            $entregaUnidade = (string) $row->entrega_unidade_id;
            $ptUnidade = (string) $row->unidade_id;
            if ($ptUnidade === $entregaUnidade) {
                $usuarios[$uid]['propria'] = true;
            } else {
                $usuarios[$uid]['outras'] = true;
            }
        }

        $somentePropria = 0;
        $somenteOutras = 0;
        $emAmbas = 0;
        foreach ($usuarios as $u) {
            if ($u['propria'] && $u['outras']) {
                $emAmbas++;
            } elseif ($u['propria']) {
                $somentePropria++;
            } elseif ($u['outras']) {
                $somenteOutras++;
            }
        }

        return [
            'somente_propria' => $somentePropria,
            'somente_outras' => $somenteOutras,
            'em_ambas' => $emAmbas,
        ];
    }
}
