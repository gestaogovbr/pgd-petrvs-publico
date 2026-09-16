<?php

namespace App\Services;

use App\Models\Unidade;
use App\Models\ViewRelatorioPlanoTrabalhoDetalhado;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Services\ServiceBase;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class RelatorioPlanoTrabalhoService extends ServiceBase
{
    /** @var array<string, list<string>> */
    private array $unidadeIdsCache = [];

    /** @var array<string, string> */
    private array $hierarquiaCache = [];

    public function __construct()
    {
        parent::__construct("App\Models\ViewRelatorioPlanoTrabalho");
    }

    public function proxyQuery($query, &$data)
    {
        $filtros = $this->extrairFiltrosRelatorioPt($data);
        $data['where'] = $this->whereDaView($filtros);
    }

    /**
     * Consulta paginada para a geração do Excel, sem a view pesada nem COUNT a cada página.
     *
     * @param array{page?: int, limit?: int, where?: array, orderBy?: array} $data
     * @return array{count: int, rows: Collection, extra: null}
     */
    public function queryForExport(array $data, ?int $knownCount = null): array
    {
        $page = max(1, (int) ($data['page'] ?? 1));
        $limit = max(1, (int) ($data['limit'] ?? 500));
        if ($page === 1) {
            $this->unidadeIdsCache = [];
            $this->hierarquiaCache = [];
        }

        $filtros = $this->extrairFiltrosRelatorioPt($data);
        $whereRestante = $filtros['data']['where'] ?? [];
        if ($this->ehConsultaDetalhada()) {
            return $this->queryForExportDetalhado($filtros, $whereRestante, $data['orderBy'] ?? [], $page, $limit, $knownCount);
        }

        return $this->queryForExportResumido($filtros, $whereRestante, $data['orderBy'] ?? [], $page, $limit, $knownCount);
    }

    public function proxyRows(&$rows)
    {
        foreach ($rows as $row) {
            $row['nota'] = str_replace('"', '', json_decode($row['nota']));
            $row['nota_reavaliacao'] = str_replace('"', '', json_decode($row['nota_reavaliacao']));
        }

        return $rows;
    }

    /**
     * @param array<string, mixed> $data
     * @return array{
     *     data: array<string, mixed>,
     *     unidade_ids: list<string>,
     *     somente_vigentes: bool,
     *     periodo_inicio: mixed,
     *     periodo_fim: mixed,
     *     plano_trabalho_ids: list<string>|null
     * }
     */
    protected function extrairFiltrosRelatorioPt(array $data): array
    {
        $where = $data['where'] ?? [];
        $where = array_values(array_filter($where, function ($item) {
            return ! is_array($item)
                || ! isset($item[0])
                || ! in_array($item[0], [
                    'somente_vigentes',
                    'incluir_unidades_subordinadas',
                    'incluir_periodos_avaliativos',
                    'periodoInicio',
                    'periodoFim',
                    'unidade_id',
                    'plano_entrega_entrega_id',
                ], true);
        }));

        $somenteVigentes = $this->extractWhere($data, 'somente_vigentes');
        $subordinadas = $this->extractWhere($data, 'incluir_unidades_subordinadas');
        $unidadeId = $this->extractWhere($data, 'unidade_id');
        $periodoInicio = $this->extractWhere($data, 'periodoInicio');
        $periodoFim = $this->extractWhere($data, 'periodoFim');
        $planoEntregaEntregaId = $this->extractWhere($data, 'plano_entrega_entrega_id');
        $this->extractWhere($data, 'incluir_periodos_avaliativos');

        $unidadeIds = $this->idsUnidadesDoRelatorio(
            isset($unidadeId[2]) ? (string) $unidadeId[2] : null,
            isset($subordinadas[2]),
        );

        $planoTrabalhoIds = null;
        if (isset($planoEntregaEntregaId[2])) {
            $planoTrabalhoIds = app(PlanoTrabalhoEntregaRepository::class)
                ->idsPlanosTrabalhoPorPlanoEntregaEntrega($planoEntregaEntregaId[2]);
        }

        $data['where'] = $where;

        return [
            'data' => $data,
            'unidade_ids' => $unidadeIds,
            'somente_vigentes' => isset($somenteVigentes[2]),
            'periodo_inicio' => $periodoInicio[2] ?? null,
            'periodo_fim' => $periodoFim[2] ?? null,
            'plano_trabalho_ids' => $planoTrabalhoIds,
        ];
    }

    /**
     * @param array<string, mixed> $filtros
     * @return list<mixed>
     */
    protected function whereDaView(array $filtros): array
    {
        $where = $filtros['data']['where'] ?? [];
        $where[] = ['unidade_id', 'in', $filtros['unidade_ids']];

        if ($filtros['somente_vigentes']) {
            $where[] = new RawWhere('(now() between dataInicio and dataFim)', []);
        }

        $periodoInicio = $filtros['periodo_inicio'];
        $periodoFim = $filtros['periodo_fim'];
        if ($periodoInicio && $periodoFim) {
            $where[] = new RawWhere(
                '(
                    (? between dataInicio and dataFim)
                    or (? between dataInicio and dataFim)
                    or (dataInicio between ? and ?)
                    or (dataFim between ? and ?)
                )',
                [
                    $periodoInicio, $periodoFim,
                    $periodoInicio, $periodoFim,
                    $periodoInicio, $periodoFim,
                ]
            );
        } elseif ($periodoInicio) {
            $where[] = new RawWhere('(? between dataInicio and dataFim)', [$periodoInicio]);
        } elseif ($periodoFim) {
            $where[] = new RawWhere('(? between dataInicio and dataFim)', [$periodoFim]);
        }

        if (is_array($filtros['plano_trabalho_ids'])) {
            $where[] = ['id', 'in', $filtros['plano_trabalho_ids']];
        }

        return $where;
    }

    /**
     * @return list<string>
     */
    protected function idsUnidadesDoRelatorio(?string $unidadeId, bool $incluirSubordinadas): array
    {
        if ($unidadeId === null || $unidadeId === '') {
            return [];
        }
        if (! $incluirSubordinadas) {
            return [$unidadeId];
        }

        if (! isset($this->unidadeIdsCache[$unidadeId])) {
            $this->unidadeIdsCache[$unidadeId] = Unidade::query()
                ->where(function ($query) use ($unidadeId) {
                    $query->where('id', $unidadeId)
                        ->orWhere('path', 'like', '%' . $unidadeId . '%');
                })
                ->pluck('id')
                ->all();
        }

        return $this->unidadeIdsCache[$unidadeId];
    }

    /**
     * @param array<string, mixed> $filtros
     * @param list<mixed> $whereRestante
     * @param list<array{0: string, 1: string}> $orderBy
     * @return array{count: int, rows: Collection, extra: null}
     */
    private function queryForExportResumido(array $filtros, array $whereRestante, array $orderBy, int $page, int $limit, ?int $knownCount): array
    {
        $idsQuery = $this->novoQueryPlanosExportacao($filtros, $whereRestante);
        $this->aplicarOrdemExportacao($idsQuery, $orderBy);

        $count = $knownCount ?? (int) (clone $idsQuery)->reorder()->count('pt.id');
        $ids = $idsQuery
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->pluck('pt.id');

        if ($ids->isEmpty()) {
            return ['count' => $count, 'rows' => collect(), 'extra' => null];
        }

        $idList = $ids->all();
        $chdPorPlano = DB::table('planos_trabalhos_entregas')
            ->select('plano_trabalho_id', DB::raw('SUM(COALESCE(forca_trabalho, 0)) as chd'))
            ->whereIn('plano_trabalho_id', $idList)
            ->whereNull('deleted_at')
            ->groupBy('plano_trabalho_id')
            ->pluck('chd', 'plano_trabalho_id');
        $periodosPorPlano = DB::table('planos_trabalhos_consolidacoes')
            ->select('plano_trabalho_id', DB::raw('COUNT(*) as qtde'))
            ->whereIn('plano_trabalho_id', $idList)
            ->whereNull('deleted_at')
            ->groupBy('plano_trabalho_id')
            ->pluck('qtde', 'plano_trabalho_id');

        $rows = DB::table('planos_trabalhos as pt')
            ->join('usuarios as usu', 'usu.id', '=', 'pt.usuario_id')
            ->join('unidades as uni', 'uni.id', '=', 'pt.unidade_id')
            ->whereIn('pt.id', $idList)
            ->get([
                'pt.id',
                'pt.numero',
                'pt.status',
                'pt.unidade_id',
                'pt.data_inicio as dataInicio',
                'pt.data_fim as dataFim',
                'usu.nome as participanteNome',
                DB::raw('DATEDIFF(pt.data_fim, pt.data_inicio) + 1 as duracao'),
            ]);

        $ordem = array_flip($idList);
        $rows = $rows
            ->map(function ($row) use ($chdPorPlano, $periodosPorPlano) {
                $row->chd = (float) ($chdPorPlano[$row->id] ?? 0);
                $row->qtdePeriodosAvaliativos = (int) ($periodosPorPlano[$row->id] ?? 0);
                return $row;
            })
            ->sortBy(fn ($row) => $ordem[$row->id] ?? PHP_INT_MAX)
            ->values();

        $this->preencherHierarquia($rows);

        return ['count' => $count, 'rows' => $rows, 'extra' => null];
    }

    /**
     * @param array<string, mixed> $filtros
     * @param list<mixed> $whereRestante
     * @param list<array{0: string, 1: string}> $orderBy
     * @return array{count: int, rows: Collection, extra: null}
     */
    private function queryForExportDetalhado(array $filtros, array $whereRestante, array $orderBy, int $page, int $limit, ?int $knownCount): array
    {
        $idsQuery = $this->novoQueryPlanosExportacao($filtros, $whereRestante)
            ->leftJoin('planos_trabalhos_consolidacoes as ptc', function ($join) {
                $join->on('ptc.plano_trabalho_id', '=', 'pt.id')
                    ->whereNull('ptc.deleted_at');
            })
            ->select('pt.id as plano_trabalho_id', 'ptc.id as consolidacao_id');
        $this->aplicarOrdemExportacao($idsQuery, $orderBy);
        $idsQuery->orderBy('ptc.data_inicio');

        $count = $knownCount ?? (int) (clone $idsQuery)->reorder()->count('pt.id');
        $pagina = $idsQuery
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        if ($pagina->isEmpty()) {
            return ['count' => $count, 'rows' => collect(), 'extra' => null];
        }

        $consolidacaoIds = $pagina->pluck('consolidacao_id')->filter()->values()->all();
        $planosSemConsolidacao = $pagina->whereNull('consolidacao_id')->pluck('plano_trabalho_id')->all();

        $viewQuery = DB::table('view_relatorio_plano_trabalho_detalhado');
        $viewQuery->where(function ($query) use ($consolidacaoIds, $planosSemConsolidacao) {
            if ($consolidacaoIds !== []) {
                $query->whereIn('id', $consolidacaoIds);
            }
            if ($planosSemConsolidacao !== []) {
                $query->orWhere(function ($orphans) use ($planosSemConsolidacao) {
                    $orphans->whereIn('plano_trabalho_id', $planosSemConsolidacao)
                        ->whereNull('data_inicio_avaliativo');
                });
            }
        });

        $rows = $viewQuery->get();
        $ordem = [];
        foreach ($pagina as $index => $item) {
            $chave = $item->consolidacao_id ?: ('pt:' . $item->plano_trabalho_id);
            $ordem[$chave] = $index;
        }
        $rows = $rows
            ->sortBy(function ($row) use ($ordem) {
                $chave = $row->id ?: ('pt:' . $row->plano_trabalho_id);
                return $ordem[$chave] ?? PHP_INT_MAX;
            })
            ->values();

        return ['count' => $count, 'rows' => $rows, 'extra' => null];
    }

    /**
     * @param array<string, mixed> $filtros
     * @param list<mixed> $whereRestante
     */
    private function novoQueryPlanosExportacao(array $filtros, array $whereRestante)
    {
        $query = DB::table('planos_trabalhos as pt')
            ->join('usuarios as usu', 'usu.id', '=', 'pt.usuario_id')
            ->join('unidades as uni', 'uni.id', '=', 'pt.unidade_id')
            ->whereNull('pt.deleted_at');

        if ($filtros['unidade_ids'] === []) {
            $query->whereRaw('0 = 1');
        } else {
            $query->whereIn('pt.unidade_id', $filtros['unidade_ids']);
        }

        if ($filtros['somente_vigentes']) {
            $query->whereRaw('(now() between pt.data_inicio and pt.data_fim)');
        }

        $periodoInicio = $filtros['periodo_inicio'];
        $periodoFim = $filtros['periodo_fim'];
        if ($periodoInicio && $periodoFim) {
            $query->whereRaw(
                '(
                    (? between pt.data_inicio and pt.data_fim)
                    or (? between pt.data_inicio and pt.data_fim)
                    or (pt.data_inicio between ? and ?)
                    or (pt.data_fim between ? and ?)
                )',
                [
                    $periodoInicio, $periodoFim,
                    $periodoInicio, $periodoFim,
                    $periodoInicio, $periodoFim,
                ]
            );
        } elseif ($periodoInicio) {
            $query->whereRaw('(? between pt.data_inicio and pt.data_fim)', [$periodoInicio]);
        } elseif ($periodoFim) {
            $query->whereRaw('(? between pt.data_inicio and pt.data_fim)', [$periodoFim]);
        }

        if (is_array($filtros['plano_trabalho_ids'])) {
            $query->whereIn('pt.id', $filtros['plano_trabalho_ids'] ?: [null]);
        }

        $this->aplicarWhereExportacao($query, $whereRestante);

        return $query;
    }

    /**
     * @param list<mixed> $where
     */
    private function aplicarWhereExportacao($query, array $where): void
    {
        foreach ($where as $condicao) {
            if (! is_array($condicao) || count($condicao) < 3 || ! is_string($condicao[0] ?? null)) {
                continue;
            }
            [$campo, $operador, $valor] = $condicao;
            $coluna = $this->colunaExportacao($campo);
            if ($coluna === null) {
                continue;
            }
            if ($operador === 'in') {
                $query->whereIn($coluna, (array) $valor);
                continue;
            }
            if ($operador === 'not in') {
                $query->whereNotIn($coluna, (array) $valor);
                continue;
            }
            $query->where($coluna, $this->convertOperator($operador), $valor);
        }
    }

    private function colunaExportacao(string $campo): mixed
    {
        return match ($campo) {
            'numero', 'id' => 'pt.' . ($campo === 'id' ? 'id' : 'numero'),
            'status' => 'pt.status',
            'modalidade_pgd', 'tipo_modalidade_id' => 'pt.modalidade_pgd',
            'participanteNome' => 'usu.nome',
            'dataInicio' => 'pt.data_inicio',
            'dataFim' => 'pt.data_fim',
            'unidadeHierarquia' => DB::raw('fn_obter_unidade_hierarquia(pt.unidade_id)'),
            'chd' => DB::raw('(SELECT COALESCE(SUM(COALESCE(forca_trabalho, 0)), 0) FROM planos_trabalhos_entregas pte WHERE pte.plano_trabalho_id = pt.id AND pte.deleted_at IS NULL)'),
            'duracao' => DB::raw('(DATEDIFF(pt.data_fim, pt.data_inicio) + 1)'),
            'qtdePeriodosAvaliativos' => DB::raw('(SELECT COUNT(*) FROM planos_trabalhos_consolidacoes ptc2 WHERE ptc2.plano_trabalho_id = pt.id AND ptc2.deleted_at IS NULL)'),
            default => null,
        };
    }

    /**
     * @param list<array{0: string, 1: string}> $orderBy
     */
    private function aplicarOrdemExportacao($query, array $orderBy): void
    {
        if ($orderBy === []) {
            $query->orderBy('uni.path')->orderBy('pt.numero');
            return;
        }

        $aplicou = false;
        foreach ($orderBy as $order) {
            if (! is_array($order) || ! isset($order[0])) {
                continue;
            }
            $campo = (string) $order[0];
            $direcao = strtolower((string) ($order[1] ?? 'asc')) === 'desc' ? 'desc' : 'asc';
            $coluna = match ($campo) {
                'unidadeHierarquia' => 'uni.path',
                'numero' => 'pt.numero',
                'participanteNome' => 'usu.nome',
                'status' => 'pt.status',
                'dataInicio' => 'pt.data_inicio',
                'dataFim' => 'pt.data_fim',
                default => null,
            };
            if ($coluna === null) {
                continue;
            }
            $query->orderBy($coluna, $direcao);
            $aplicou = true;
        }

        if (! $aplicou) {
            $query->orderBy('uni.path')->orderBy('pt.numero');
        }
    }

    private function preencherHierarquia(Collection $rows): void
    {
        $unidadeIds = $rows->pluck('unidade_id')->unique()->filter()->values()->all();
        $faltantes = array_values(array_diff($unidadeIds, array_keys($this->hierarquiaCache)));
        if ($faltantes !== []) {
            $placeholders = implode(',', array_fill(0, count($faltantes), '?'));
            $encontrados = DB::select(
                "SELECT id, fn_obter_unidade_hierarquia(id) AS h FROM unidades WHERE id IN ($placeholders)",
                $faltantes
            );
            foreach ($encontrados as $unidade) {
                $this->hierarquiaCache[$unidade->id] = (string) $unidade->h;
            }
        }

        foreach ($rows as $row) {
            $row->unidadeHierarquia = $this->hierarquiaCache[$row->unidade_id] ?? '';
        }
    }

    private function ehConsultaDetalhada(): bool
    {
        $model = $this->getModel();

        return $model instanceof ViewRelatorioPlanoTrabalhoDetalhado
            || ($model !== null && $model->getTable() === 'view_relatorio_plano_trabalho_detalhado');
    }
}
