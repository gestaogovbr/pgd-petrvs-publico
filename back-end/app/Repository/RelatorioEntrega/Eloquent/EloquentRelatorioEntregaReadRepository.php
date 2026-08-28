<?php

declare(strict_types=1);

namespace App\Repository\RelatorioEntrega\Eloquent;

use App\Repository\RelatorioEntrega\Contracts\RelatorioEntregaReadRepositoryContract;
use App\Services\UnidadeService;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaIndexFiltersDTO;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaQueryDTO;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaRowDTO;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;

class EloquentRelatorioEntregaReadRepository implements RelatorioEntregaReadRepositoryContract
{
    /** @var array<string, string> */
    private const SORTABLE_COLUMNS = [
        'unidadeHierarquia' => 'unidade_hierarquia',
        'entregaNome' => 'entrega_nome',
        'data_inicio' => 'pee.data_inicio',
        'data_fim' => 'pee.data_fim',
        'meta_planejado' => 'meta_planejado',
        'meta_alcancado' => 'meta_alcancado',
        'meta_percentual' => 'meta_percentual',
        'plano_rotulo' => 'pe.nome',
        'qtd_planejamento_institucional' => 'qtd_planejamento_institucional',
        'qtd_cadeia_valor' => 'qtd_cadeia_valor',
        'qtd_outras_entregas' => 'qtd_outras_entregas',
        'plano_nome' => 'pe.nome',
        'plano_numero' => 'pe.numero',
        'plano_status' => 'pe.status',
        'qtd_participantes' => 'qtd_participantes',
        'qtd_planos_trabalho' => 'qtd_planos_trabalho',
    ];

    public function query(RelatorioEntregaQueryDTO $data): array
    {
        $query = $this->baseQuery();
        $this->applyFiltros($query, $data->filters);
        $this->applyOrderBy($query, $data->orderBy);

        $count = (clone $query)->count();

        $limit = $data->limit;
        $page = max($data->page, 1);
        if ($limit > 0) {
            $query->forPage($page, $limit);
        }

        $rows = collect($query->get())->map(
            fn ($row) => RelatorioEntregaRowDTO::fromQueryRow($row)
        );

        return [
            'count' => $count,
            'rows' => $rows,
        ];
    }

    private function baseQuery(): Builder
    {
        return DB::table('planos_entregas_entregas as pee')
            ->join('planos_entregas as pe', function ($join): void {
                $join->on('pe.id', '=', 'pee.plano_entrega_id')
                    ->whereNull('pe.deleted_at');
            })
            ->leftJoin('entregas as e', function ($join): void {
                $join->on('e.id', '=', 'pee.entrega_id')
                    ->whereNull('e.deleted_at');
            })
            ->select([
                'pee.id',
                'pee.unidade_id',
                'pee.data_inicio',
                'pee.data_fim',
                'pee.meta',
                'pee.realizado',
                DB::raw('fn_obter_unidade_hierarquia(pee.unidade_id) as unidade_hierarquia'),
                DB::raw("COALESCE(pee.descricao, e.nome, '') as entrega_nome"),
                DB::raw('e.tipo_indicador as tipo_indicador'),
                'pe.id as plano_id',
                'pe.numero as plano_numero',
                'pe.nome as plano_nome',
                'pe.data_inicio as plano_data_inicio',
                'pe.data_fim as plano_data_fim',
                'pe.status as plano_status',
                DB::raw('(SELECT COUNT(*) FROM planos_entregas_entregas_objetivos o
                    WHERE o.entrega_id = pee.id AND o.deleted_at IS NULL) as qtd_planejamento_institucional'),
                DB::raw('(SELECT COUNT(*) FROM planos_entregas_entregas_processos p
                    WHERE p.entrega_id = pee.id AND p.deleted_at IS NULL) as qtd_cadeia_valor'),
                DB::raw('(SELECT COUNT(*) FROM planos_entregas_entregas oe
                    WHERE oe.deleted_at IS NULL
                    AND (oe.entrega_pai_id = pee.id OR oe.id = pee.entrega_pai_id)) as qtd_outras_entregas'),
                DB::raw('(SELECT COUNT(DISTINCT pt.usuario_id)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL) as qtd_participantes'),
                DB::raw('(SELECT COUNT(DISTINCT pte.plano_trabalho_id)
                    FROM planos_trabalhos_entregas pte
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL) as qtd_planos_trabalho'),
                DB::raw($this->metaPlanejadoSql('pee.meta', 'e.tipo_indicador', 'pee.progresso_esperado').' as meta_planejado'),
                DB::raw($this->metaAlcancadoSql('pee.realizado', 'e.tipo_indicador').' as meta_alcancado'),
                DB::raw($this->metaPercentualSql('pee.meta', 'pee.realizado', 'e.tipo_indicador', 'pee.progresso_esperado').' as meta_percentual'),
                DB::raw('(SELECT COUNT(*) FROM planos_entregas_entregas_progressos p
                    WHERE p.plano_entrega_entrega_id = pee.id AND p.deleted_at IS NULL) as qtd_registros_execucao'),
            ])
            ->whereNull('pee.deleted_at');
    }

    private function metaNumericoSql(string $jsonColumn, string $tipoColumn): string
    {
        return "CASE {$tipoColumn}
            WHEN 'PORCENTAGEM' THEN COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT({$jsonColumn}, '$.porcentagem')) AS DECIMAL(20,4)), 0)
            WHEN 'QUANTIDADE' THEN COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT({$jsonColumn}, '$.quantitativo')) AS DECIMAL(20,4)), 0)
            WHEN 'VALOR' THEN COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT({$jsonColumn}, '$.valor')) AS DECIMAL(20,4)), 0)
            ELSE 0 END";
    }

    /** RN18 — Planejado = Meta * Parcela da entrega no plano / 100. */
    private function metaPlanejadoSql(string $metaColumn, string $tipoColumn, string $parcelaColumn): string
    {
        $meta = $this->metaNumericoSql($metaColumn, $tipoColumn);

        return "({$meta}) * COALESCE({$parcelaColumn}, 0) / 100";
    }

    /** RN19.1 — Alcançado = 0 quando não houver registro de execução da entrega. */
    private function metaAlcancadoSql(string $realizadoColumn, string $tipoColumn): string
    {
        $realizado = $this->metaNumericoSql($realizadoColumn, $tipoColumn);
        $temRegistroExecucao = $this->temRegistroExecucaoSql();

        return "CASE WHEN {$temRegistroExecucao} THEN ({$realizado}) ELSE 0 END";
    }

    private function temRegistroExecucaoSql(): string
    {
        return 'EXISTS (
            SELECT 1 FROM planos_entregas_entregas_progressos p
            WHERE p.plano_entrega_entrega_id = pee.id AND p.deleted_at IS NULL
        )';
    }

    /** RN19.2 — Percentual de Alcance = (Valor Planejado / Valor Realizado) x 100. */
    private function metaPercentualSql(
        string $metaColumn,
        string $realizadoColumn,
        string $tipoColumn,
        string $parcelaColumn,
    ): string {
        $planejado = $this->metaPlanejadoSql($metaColumn, $tipoColumn, $parcelaColumn);
        $alcancado = $this->metaAlcancadoSql($realizadoColumn, $tipoColumn);

        return "CASE WHEN ({$alcancado}) > 0 THEN ROUND(({$planejado}) / ({$alcancado}) * 100, 2) ELSE 0 END";
    }

    private function applyFiltros(Builder $query, RelatorioEntregaIndexFiltersDTO $filters): void
    {
        if ($filters->unidadeId !== null && $filters->unidadeId !== '') {
            $unidadeIds = [$filters->unidadeId];
            if ($filters->incluirUnidadesSubordinadas) {
                /** @var UnidadeService $unidadeService */
                $unidadeService = app(UnidadeService::class);
                $subordinadasIds = $unidadeService->subordinadas($filters->unidadeId)->pluck('id')->toArray();
                $unidadeIds = array_values(array_unique(array_merge($unidadeIds, $subordinadasIds)));
            }
            $query->whereIn('pee.unidade_id', $unidadeIds);
        }

        if ($filters->hasPeriodoCompleto()) {
            $this->applyIntersecaoPeriodo($query, $filters->periodoInicio, $filters->periodoFim);
        } elseif ($filters->usaDataConsultaHoje()) {
            $consultaData = now()->toDateString();
            $this->applyIntersecaoPeriodo($query, $consultaData, $consultaData);
        }
    }

    private function applyIntersecaoPeriodo(Builder $query, string $inicio, string $fim): void
    {
        $query->whereRaw(
            '(
                (? between DATE(pee.data_inicio) and DATE(COALESCE(pee.data_fim, pee.data_inicio)))
                or (? between DATE(pee.data_inicio) and DATE(COALESCE(pee.data_fim, pee.data_inicio)))
                or (DATE(pee.data_inicio) between ? and ?)
                or (DATE(COALESCE(pee.data_fim, pee.data_inicio)) between ? and ?)
            )',
            [$inicio, $fim, $inicio, $fim, $inicio, $fim]
        );
    }

    /**
     * @param list<array{0: string, 1: string}> $orderBy
     */
    private function applyOrderBy(Builder $query, array $orderBy): void
    {
        $applied = false;

        foreach ($orderBy as [$column, $direction]) {
            $sqlColumn = self::SORTABLE_COLUMNS[$column] ?? null;
            if ($sqlColumn === null) {
                continue;
            }
            $dir = strtolower($direction) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sqlColumn, $dir);
            $applied = true;
        }

        if (! $applied) {
            $query->orderBy('unidade_hierarquia', 'asc')->orderBy('entrega_nome', 'asc');
        }
    }
}
