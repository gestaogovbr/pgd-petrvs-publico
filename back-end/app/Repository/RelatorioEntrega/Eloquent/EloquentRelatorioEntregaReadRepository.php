<?php

declare(strict_types=1);

namespace App\Repository\RelatorioEntrega\Eloquent;

use App\Repository\RelatorioEntrega\Contracts\RelatorioEntregaReadRepositoryContract;
use App\Services\UnidadeService;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaIndexFiltersDTO;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaQueryDTO;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaRowDTO;
use App\V2\RelatorioEntrega\Support\RelatorioEntregaVinculosLinhas;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class EloquentRelatorioEntregaReadRepository implements RelatorioEntregaReadRepositoryContract
{
    /** @var array<string, string> */
    private const SORTABLE_COLUMNS = [
        'unidadeHierarquia' => 'unidade_hierarquia',
        'demandanteHierarquia' => 'demandante_hierarquia',
        'destinatario' => 'pee.destinatario',
        'entregaNome' => 'entrega_nome',
        'data_inicio' => 'pee.data_inicio',
        'data_fim' => 'pee.data_fim',
        'meta_planejado' => 'meta_planejado',
        'meta_alcancado' => 'meta_alcancado',
        'meta_tipo' => 'e.tipo_indicador',
        'meta_percentual' => 'meta_percentual',
        'situacao' => 'pee.data_inicio',
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

    private const TABELA_VINCULO_OBJETIVO = 'planos_entregas_entregas_objetivos';

    private const TABELA_OBJETIVO = 'planejamentos_objetivos';

    private const COLUNA_OBJETIVO = 'planejamento_objetivo_id';

    private const TABELA_VINCULO_PROCESSO = 'planos_entregas_entregas_processos';

    private const TABELA_PROCESSO = 'cadeias_valores_processos';

    private const COLUNA_PROCESSO = 'cadeia_processo_id';

    private const CHUNK_IDS_VINCULOS = 500;

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

        $rows = $this->expandirVinculos(
            collect($query->get()),
            $data->filters->resolveDataConsulta(),
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
                $join->on('e.id', '=', 'pee.entrega_id');
            })
            ->select([
                'pee.id',
                'pee.unidade_id',
                'pee.destinatario',
                'pee.data_inicio',
                'pee.data_fim',
                'pee.meta as cadastro_meta',
                'pee.realizado as cadastro_realizado',
                'pe.unidade_id as plano_unidade_id',
                DB::raw('fn_obter_unidade_hierarquia(pe.unidade_id) as unidade_hierarquia'),
                DB::raw('fn_obter_unidade_hierarquia(pee.unidade_id) as demandante_hierarquia'),
                DB::raw("COALESCE(pee.descricao, e.nome, '') as entrega_nome"),
                DB::raw('e.tipo_indicador as tipo_indicador'),
                'pe.id as plano_id',
                'pe.numero as plano_numero',
                'pe.nome as plano_nome',
                'pe.data_inicio as plano_data_inicio',
                'pe.data_fim as plano_data_fim',
                'pe.status as plano_status',
                DB::raw('(SELECT COUNT(*) FROM '.self::TABELA_VINCULO_OBJETIVO.' o
                    INNER JOIN '.self::TABELA_OBJETIVO.' item
                        ON item.id = o.'.self::COLUNA_OBJETIVO.' AND item.deleted_at IS NULL
                    WHERE o.entrega_id = pee.id AND o.deleted_at IS NULL) as qtd_planejamento_institucional'),
                DB::raw('(SELECT COUNT(*) FROM '.self::TABELA_VINCULO_PROCESSO.' p
                    INNER JOIN '.self::TABELA_PROCESSO.' item
                        ON item.id = p.'.self::COLUNA_PROCESSO.' AND item.deleted_at IS NULL
                    WHERE p.entrega_id = pee.id AND p.deleted_at IS NULL) as qtd_cadeia_valor'),
                DB::raw('(SELECT COUNT(*) FROM planos_entregas_entregas oe
                    WHERE oe.deleted_at IS NULL
                    AND (oe.entrega_pai_id = pee.id OR oe.id = pee.entrega_pai_id)) as qtd_outras_entregas'),
                DB::raw("(SELECT COUNT(DISTINCT pt.usuario_id)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL AND pt.status <> 'CANCELADO'
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL) as qtd_participantes"),
                DB::raw("(SELECT COUNT(DISTINCT pte.plano_trabalho_id)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL AND pt.status <> 'CANCELADO'
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL) as qtd_planos_trabalho"),
                DB::raw($this->metaNumericoSql('pee.meta', 'e.tipo_indicador').' as meta_planejado'),
                DB::raw($this->metaNumericoSql('pee.realizado', 'e.tipo_indicador').' as meta_alcancado'),
                DB::raw($this->metaPercentualSql(
                    $this->metaNumericoSql('pee.meta', 'e.tipo_indicador'),
                    $this->metaNumericoSql('pee.realizado', 'e.tipo_indicador'),
                ).' as meta_percentual'),
            ])
            ->whereNull('pee.deleted_at');
    }

    private function jsonMetaNormalizadoSql(string $jsonColumn): string
    {
        return "CASE WHEN JSON_TYPE({$jsonColumn}) = 'STRING' THEN JSON_UNQUOTE({$jsonColumn}) ELSE {$jsonColumn} END";
    }

    private function metaNumericoSql(string $jsonColumn, string $tipoColumn): string
    {
        $normalized = $this->jsonMetaNormalizadoSql($jsonColumn);

        return "CASE {$tipoColumn}
            WHEN 'PORCENTAGEM' THEN COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT({$normalized}, '$.porcentagem')) AS DECIMAL(20,4)), 0)
            WHEN 'QUANTIDADE' THEN COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT({$normalized}, '$.quantitativo')) AS DECIMAL(20,4)), 0)
            WHEN 'VALOR' THEN COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT({$normalized}, '$.valor')) AS DECIMAL(20,4)), 0)
            ELSE NULL END";
    }

    /** Percentual de Alcance = (Planejado / Alcançado) x 100; NULL quando não numérico (ex.: qualitativo). */
    private function metaPercentualSql(string $planejadoExpr, string $alcancadoExpr): string
    {
        return "CASE WHEN ({$alcancadoExpr}) > 0 THEN ROUND(({$planejadoExpr}) / ({$alcancadoExpr}) * 100, 2) ELSE NULL END";
    }

    /**
     * @param Collection<int, \stdClass> $rows
     * @return Collection<int, RelatorioEntregaRowDTO>
     */
    private function expandirVinculos(Collection $rows, string $dataConsulta): Collection
    {
        $ids = [];
        foreach ($rows as $row) {
            $id = (string) ($row->id ?? '');
            if ($id !== '') {
                $ids[] = $id;
            }
        }
        $ids = array_values(array_unique($ids));

        $objetivos = $this->nomesVinculadosPorEntrega(
            $ids,
            self::TABELA_VINCULO_OBJETIVO,
            self::TABELA_OBJETIVO,
            self::COLUNA_OBJETIVO,
        );
        $processos = $this->nomesVinculadosPorEntrega(
            $ids,
            self::TABELA_VINCULO_PROCESSO,
            self::TABELA_PROCESSO,
            self::COLUNA_PROCESSO,
        );

        $expandidas = collect();
        foreach ($rows as $row) {
            $dto = RelatorioEntregaRowDTO::fromQueryRow($row, $dataConsulta);
            $id = (string) ($row->id ?? '');
            $linhas = RelatorioEntregaVinculosLinhas::montar(
                $objetivos[$id] ?? [],
                $processos[$id] ?? [],
            );
            foreach ($linhas as $indice => $linha) {
                $expandidas->push($dto->comLinhaVinculo(
                    $linha['planejamento_institucional'],
                    $linha['cadeia_valor'],
                    $indice + RelatorioEntregaVinculosLinhas::LINHA_INICIAL,
                ));
            }
        }

        return $expandidas;
    }

    /**
     * @param list<string> $entregaIds
     * @return array<string, list<string>>
     */
    private function nomesVinculadosPorEntrega(
        array $entregaIds,
        string $tabelaVinculo,
        string $tabelaItem,
        string $colunaItemId,
    ): array {
        if ($entregaIds === []) {
            return [];
        }

        $agrupado = [];
        foreach (array_chunk($entregaIds, self::CHUNK_IDS_VINCULOS) as $chunk) {
            $registros = DB::table($tabelaVinculo.' as vinculo')
                ->join($tabelaItem.' as item', function ($join) use ($colunaItemId): void {
                    $join->on('item.id', '=', 'vinculo.'.$colunaItemId)
                        ->whereNull('item.deleted_at');
                })
                ->whereIn('vinculo.entrega_id', $chunk)
                ->whereNull('vinculo.deleted_at')
                ->orderBy('item.nome')
                ->orderBy('vinculo.id')
                ->get(['vinculo.entrega_id', 'item.nome']);

            foreach ($registros as $registro) {
                $nome = trim((string) $registro->nome);
                if ($nome === '') {
                    continue;
                }
                $agrupado[(string) $registro->entrega_id][] = $nome;
            }
        }

        return $agrupado;
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
            // Unidade executora do Plano de Entrega (unidade do plano), não a unidade demandante da entrega.
            $query->whereIn('pe.unidade_id', $unidadeIds);
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
