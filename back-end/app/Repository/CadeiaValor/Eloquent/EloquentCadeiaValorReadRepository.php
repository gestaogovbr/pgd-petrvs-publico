<?php

declare(strict_types=1);

namespace App\Repository\CadeiaValor\Eloquent;

use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\Planejamento\Objetivo\ObjetivoPainelEsforcoSupport;
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
        $jornadaDivisor = ObjetivoPainelEsforcoSupport::jornadaDivisor();
        $jornadaPadrao = ObjetivoPainelEsforcoSupport::jornadaPadrao();
        $statusPlanejado = ObjetivoPainelEsforcoSupport::ptStatusPlanejadoIn();
        $statusExecutado = ObjetivoPainelEsforcoSupport::ptStatusExecutadoIn();

        $unidadeFilter = $unidadeId ? "AND pee.unidade_id = ?" : '';
        $params = $unidadeId ? [$processoId, $unidadeId] : [$processoId];

        $rows = DB::select(<<<SQL
            SELECT
                -- Esforço
                ROUND(COALESCE(SUM(
                    (COALESCE(pt.carga_horaria, {$jornadaPadrao} / {$jornadaDivisor}))
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                ), 0), 2) AS esforco_disponivel_horas,

                ROUND(COALESCE(SUM(
                    (COALESCE(pt.carga_horaria, {$jornadaPadrao} / {$jornadaDivisor}))
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                    * (pte.forca_trabalho / 100.0)
                ), 0), 2) AS esforco_planejado_horas,

                ROUND(COALESCE(SUM(
                    CASE WHEN pt.status IN ({$statusExecutado})
                    THEN
                        (COALESCE(pt.carga_horaria, {$jornadaPadrao} / {$jornadaDivisor}))
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                        * (pte.forca_trabalho / 100.0)
                    ELSE 0 END
                ), 0), 2) AS esforco_executado_horas,

                -- Flags
                CASE WHEN COUNT(CASE WHEN pt.status IN ({$statusPlanejado}) THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pt_pactuado,
                CASE WHEN COUNT(CASE WHEN pt.status IN ({$statusExecutado}) THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pt_concluido,
                CASE WHEN COUNT(CASE WHEN pe.status IN ('ATIVO', 'CONCLUIDO', 'AVALIADO') THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pe_homologado,

                -- Entregas
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
        $jornadaDivisor = ObjetivoPainelEsforcoSupport::jornadaDivisor();
        $jornadaPadrao = ObjetivoPainelEsforcoSupport::jornadaPadrao();
        $statusPlanejado = ObjetivoPainelEsforcoSupport::ptStatusPlanejadoIn();
        $statusExecutado = ObjetivoPainelEsforcoSupport::ptStatusExecutadoIn();

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
                COALESCE(pee.descricao_entrega, pee.descricao) AS entrega_titulo,
                COALESCE(pee.progresso_esperado, 0) AS progresso_esperado,
                COALESCE(pee.progresso_realizado, 0) AS progresso_realizado,

                -- Registro de execução (último)
                (
                    SELECT a.descricao
                    FROM atividades a
                    INNER JOIN planos_trabalhos_entregas pte_re
                        ON pte_re.id = a.plano_trabalho_entrega_id AND pte_re.deleted_at IS NULL
                    WHERE pte_re.plano_entrega_entrega_id = pee.id AND a.deleted_at IS NULL
                    ORDER BY a.data_distribuicao DESC
                    LIMIT 1
                ) AS registro_execucao,

                -- Esforço (subqueries correlacionadas)
                COALESCE((
                    SELECT ROUND(SUM(
                        (COALESCE(pt.carga_horaria, {$jornadaPadrao} / {$jornadaDivisor}))
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
                        (COALESCE(pt.carga_horaria, {$jornadaPadrao} / {$jornadaDivisor}))
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
                        (COALESCE(pt.carga_horaria, {$jornadaPadrao} / {$jornadaDivisor}))
                        * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                        * (pte.forca_trabalho / 100.0)
                    ), 2)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusExecutado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                ), 0) AS esforco_executado_horas,

                -- Flags
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

                -- Participantes (total)
                COALESCE((
                    SELECT COUNT(DISTINCT pt.usuario_id)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt
                        ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                        AND pt.status IN ({$statusPlanejado})
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                ), 0) AS participantes_total,

                -- Participantes somente unidade própria
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

                -- Participantes somente outras unidades
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

                -- Participantes em ambas
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

    public function calcularEsforcoPorEntrega(string $entregaId): \stdClass
    {
        $jornadaDivisor = ObjetivoPainelEsforcoSupport::jornadaDivisor();
        $jornadaPadrao = ObjetivoPainelEsforcoSupport::jornadaPadrao();
        $statusPlanejado = ObjetivoPainelEsforcoSupport::ptStatusPlanejadoIn();
        $statusExecutado = ObjetivoPainelEsforcoSupport::ptStatusExecutadoIn();

        $rows = DB::select(<<<SQL
            SELECT
                ROUND(COALESCE(SUM(
                    (COALESCE(pt.carga_horaria, {$jornadaPadrao} / {$jornadaDivisor}))
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                ), 0), 2) AS esforco_disponivel,
                ROUND(COALESCE(SUM(
                    (COALESCE(pt.carga_horaria, {$jornadaPadrao} / {$jornadaDivisor}))
                    * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                    * (pte.forca_trabalho / 100.0)
                ), 0), 2) AS esforco_planejado,
                ROUND(COALESCE(SUM(
                    CASE WHEN pt.status IN ({$statusExecutado})
                    THEN
                        (COALESCE(pt.carga_horaria, {$jornadaPadrao} / {$jornadaDivisor}))
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
        $statusPlanejado = ObjetivoPainelEsforcoSupport::ptStatusPlanejadoIn();

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
}
