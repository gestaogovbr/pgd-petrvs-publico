<?php

declare(strict_types=1);

namespace App\Repository\RelatorioEntrega\Eloquent;

use App\Repository\RelatorioEntrega\Contracts\RelatorioEntregaReadRepositoryContract;
use App\Services\UnidadeService;
use App\V2\RelatorioEntrega\Support\RelatorioEntregaMetaHelper;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
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
        'plano_nome' => 'pe.nome',
        'plano_numero' => 'pe.numero',
        'plano_status' => 'pe.status',
        'qtd_participantes' => 'qtd_participantes',
        'qtd_planos_trabalho' => 'qtd_planos_trabalho',
    ];

    public function query(array $data): array
    {
        $query = $this->baseQuery();
        $this->applyFiltros($query, $data);
        $this->applyOrderBy($query, $data);

        $count = (clone $query)->count();

        $limit = (int) ($data['limit'] ?? 0);
        $page = max((int) ($data['page'] ?? 1), 1);
        if ($limit > 0) {
            $query->forPage($page, $limit);
        }

        $rows = collect($query->get())->map(fn ($row) => $this->mapRow($row));

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
                DB::raw('(SELECT COUNT(DISTINCT pt.usuario_id)
                    FROM planos_trabalhos_entregas pte
                    INNER JOIN planos_trabalhos pt ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL) as qtd_participantes'),
                DB::raw('(SELECT COUNT(DISTINCT pte.plano_trabalho_id)
                    FROM planos_trabalhos_entregas pte
                    WHERE pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL) as qtd_planos_trabalho'),
                DB::raw($this->metaNumericoSql('pee.meta', 'e.tipo_indicador').' as meta_planejado'),
                DB::raw($this->metaNumericoSql('pee.realizado', 'e.tipo_indicador').' as meta_alcancado'),
                DB::raw($this->metaPercentualSql('pee.meta', 'pee.realizado', 'e.tipo_indicador').' as meta_percentual'),
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

    private function metaPercentualSql(string $metaColumn, string $realizadoColumn, string $tipoColumn): string
    {
        $planejado = $this->metaNumericoSql($metaColumn, $tipoColumn);
        $alcancado = $this->metaNumericoSql($realizadoColumn, $tipoColumn);

        return "CASE WHEN ({$planejado}) > 0 THEN ROUND(({$alcancado}) / ({$planejado}) * 100, 2) ELSE 0 END";
    }

    private function applyFiltros(Builder $query, array $data): void
    {
        $where = $data['where'] ?? [];
        $unidadeId = null;
        $incluirSubordinadas = false;
        $periodoInicio = null;
        $periodoFim = null;
        $consultaData = null;

        foreach ($where as $condition) {
            if (! is_array($condition) || count($condition) !== 3) {
                continue;
            }

            [$field, $operator, $value] = $condition;

            if ($field === 'unidade_id') {
                $unidadeId = (string) $value;
                continue;
            }

            if ($field === 'incluir_unidades_subordinadas') {
                $incluirSubordinadas = true;
                continue;
            }

            if ($field === 'periodoInicio') {
                $periodoInicio = (string) $value;
                continue;
            }

            if ($field === 'periodoFim') {
                $periodoFim = (string) $value;
                continue;
            }

            if ($field === 'consultaData') {
                $consultaData = (string) $value;
            }
        }

        if ($unidadeId !== null && $unidadeId !== '') {
            $unidadeIds = [$unidadeId];
            if ($incluirSubordinadas) {
                /** @var UnidadeService $unidadeService */
                $unidadeService = app(UnidadeService::class);
                $subordinadasIds = $unidadeService->subordinadas($unidadeId)->pluck('id')->toArray();
                $unidadeIds = array_values(array_unique(array_merge($unidadeIds, $subordinadasIds)));
            }
            $query->whereIn('pee.unidade_id', $unidadeIds);
        }

        if ($periodoInicio !== null && $periodoFim !== null) {
            $this->applyIntersecaoPeriodo($query, $periodoInicio, $periodoFim);
        } elseif ($consultaData !== null) {
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

    private function applyOrderBy(Builder $query, array $data): void
    {
        $orderBy = $data['orderBy'] ?? [['unidadeHierarquia', 'asc'], ['entregaNome', 'asc']];
        $applied = false;

        foreach ($orderBy as $order) {
            if (! is_array($order) || count($order) !== 2) {
                continue;
            }
            [$column, $direction] = $order;
            $sqlColumn = self::SORTABLE_COLUMNS[$column] ?? null;
            if ($sqlColumn === null) {
                continue;
            }
            $dir = strtolower((string) $direction) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sqlColumn, $dir);
            $applied = true;
        }

        if (! $applied) {
            $query->orderBy('unidade_hierarquia', 'asc')->orderBy('entrega_nome', 'asc');
        }
    }

    private function mapRow(object $row): object
    {
        $tipoIndicador = $row->tipo_indicador ?? null;
        $row->meta_planejado = (float) ($row->meta_planejado ?? RelatorioEntregaMetaHelper::valorNumericoAbsoluto($row->meta ?? null, $tipoIndicador));
        $row->meta_alcancado = (float) ($row->meta_alcancado ?? RelatorioEntregaMetaHelper::valorNumericoAbsoluto($row->realizado ?? null, $tipoIndicador));
        $row->unidadeHierarquia = $row->unidade_hierarquia ?? '';
        $row->entregaNome = $row->entrega_nome ?? '';
        $row->qtd_planejamento_institucional = (int) ($row->qtd_planejamento_institucional ?? 0);
        $row->qtd_cadeia_valor = (int) ($row->qtd_cadeia_valor ?? 0);
        $row->qtd_participantes = (int) ($row->qtd_participantes ?? 0);
        $row->qtd_planos_trabalho = (int) ($row->qtd_planos_trabalho ?? 0);
        $row->meta_percentual = (float) ($row->meta_percentual ?? 0);
        $row->plano_rotulo = $this->formatPlanoRotulo(
            (string) ($row->plano_nome ?? ''),
            $row->plano_data_inicio ?? null,
            $row->plano_data_fim ?? null,
        );

        return $row;
    }

    private function formatPlanoRotulo(string $nome, mixed $dataInicio, mixed $dataFim): string
    {
        $nome = trim($nome);
        $inicio = $this->formatDateBr($dataInicio);
        $fim = $this->formatDateBr($dataFim);

        if ($nome === '') {
            return '-';
        }

        if ($inicio === '' && $fim === '') {
            return $nome;
        }

        if ($fim === '' || $fim === $inicio) {
            return "{$nome} - {$inicio}";
        }

        return "{$nome} - {$inicio} - {$fim}";
    }

    private function formatDateBr(mixed $value): string
    {
        if ($value === null || $value === '') {
            return '';
        }

        $timestamp = strtotime((string) $value);

        return $timestamp !== false ? date('d/m/Y', $timestamp) : '';
    }
}
