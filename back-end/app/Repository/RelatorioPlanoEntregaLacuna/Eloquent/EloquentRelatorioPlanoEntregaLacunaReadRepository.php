<?php

declare(strict_types=1);

namespace App\Repository\RelatorioPlanoEntregaLacuna\Eloquent;

use App\Enums\StatusEnum;
use App\Repository\RelatorioPlanoEntregaLacuna\Contracts\RelatorioPlanoEntregaLacunaReadRepositoryContract;
use App\Services\UnidadeService;
use App\Support\RelatorioPlanoEntregaLacunaCalculator;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class EloquentRelatorioPlanoEntregaLacunaReadRepository implements RelatorioPlanoEntregaLacunaReadRepositoryContract
{
    /** @var list<string> */
    private const COBERTURA_STATUS = [
        StatusEnum::ATIVO->value,
        StatusEnum::CONCLUIDO->value,
        StatusEnum::AVALIADO->value,
    ];

    private const UNIDADES_POR_LOTE = 100;

    private const EXECUTORA = 1;

    /** @var list<array{0: string, 1: string}> */
    private const ORDEM_PADRAO = [
        ['unidadeHierarquia', 'asc'],
        ['data_inicio', 'asc'],
    ];

    public function __construct(
        private readonly RelatorioPlanoEntregaLacunaCalculator $calculator,
        private readonly UnidadeService $unidadeService,
    ) {
    }

    public function query(array $data): array
    {
        $unidadeId = $this->extractWhere($data, 'unidade_id');
        $subordinadas = $this->extractWhere($data, 'incluir_unidades_subordinadas');
        $periodoInicio = $this->extractWhere($data, 'periodo_inicio');
        $periodoFim = $this->extractWhere($data, 'periodo_fim');

        if (! isset($unidadeId[2]) || ! isset($periodoInicio[2]) || ! isset($periodoFim[2])) {
            return ['count' => 0, 'rows' => collect()];
        }

        $consultaInicio = (string) $periodoInicio[2];
        $consultaFim = (string) $periodoFim[2];

        $unidadeIds = $this->resolverUnidades((string) $unidadeId[2], isset($subordinadas[2]));
        if ($unidadeIds === []) {
            return ['count' => 0, 'rows' => collect()];
        }

        $idsOrdenados = $this->buscarUnidadesCandidatas($unidadeIds, $consultaInicio, $consultaFim, $data);
        if ($idsOrdenados === []) {
            return ['count' => 0, 'rows' => collect()];
        }

        $filtrosLacuna = $this->extrairFiltrosLacuna($data);
        $orderBy = $data['orderBy'] ?? self::ORDEM_PADRAO;
        $paginacaoIncremental = $orderBy === self::ORDEM_PADRAO;

        $limit = (int) ($data['limit'] ?? 0);
        $page = max((int) ($data['page'] ?? 1), 1);
        $offset = $limit > 0 ? ($page - 1) * $limit : 0;
        $coletarTodas = $limit <= 0 || ! $paginacaoIncremental;
        $fimJanela = $coletarTodas ? PHP_INT_MAX : $offset + $limit;

        $rows = collect();
        $count = 0;

        foreach (array_chunk($idsOrdenados, self::UNIDADES_POR_LOTE) as $loteIds) {
            foreach ($this->calcularLacunasDoLote($loteIds, $consultaInicio, $consultaFim) as $row) {
                if (! $this->passaFiltrosDeLacuna($row, $filtrosLacuna)) {
                    continue;
                }

                if ($coletarTodas || ($count >= $offset && $count < $fimJanela)) {
                    $rows->push($row);
                }

                $count++;
            }
        }

        if (! $paginacaoIncremental) {
            $rows = $this->ordenar($rows, $orderBy);
            $count = $rows->count();
            if ($limit > 0) {
                $rows = $rows->slice($offset, $limit)->values();
            }
        }

        return [
            'count' => $count,
            'rows' => $rows->values(),
        ];
    }

    /**
     * @param list<string> $unidadeIds
     * @return list<string>
     */
    private function buscarUnidadesCandidatas(
        array $unidadeIds,
        string $consultaInicio,
        string $consultaFim,
        array &$data,
    ): array {
        $query = DB::table('unidades as u')
            ->whereIn('u.id', $unidadeIds)
            ->whereNull('u.deleted_at')
            ->whereExists(function (Builder $historico) use ($consultaInicio, $consultaFim): void {
                $historico->selectRaw('1')
                    ->from('unidades_executora_historico as h')
                    ->whereColumn('h.unidade_id', 'u.id')
                    ->where('h.executora', self::EXECUTORA)
                    ->where('h.data_inicio', '<=', $consultaFim)
                    ->where(function (Builder $periodo) use ($consultaInicio): void {
                        $periodo->whereNull('h.data_fim')
                            ->orWhere('h.data_fim', '>=', $consultaInicio);
                    });
            });

        $this->aplicarFiltrosUnidade($query, $data);

        return $query
            ->orderByRaw('fn_obter_unidade_hierarquia(u.id) asc')
            ->pluck('u.id')
            ->map(static fn (mixed $id): string => (string) $id)
            ->values()
            ->all();
    }

    private function aplicarFiltrosUnidade(Builder $query, array &$data): void
    {
        $unidadeHierarquia = $this->extractWhere($data, 'unidadeHierarquia');
        if (isset($unidadeHierarquia[2])) {
            $query->whereRaw('fn_obter_unidade_hierarquia(u.id) like ?', [(string) $unidadeHierarquia[2]]);
        }

        $nome = $this->extractWhere($data, 'nome');
        if (isset($nome[2])) {
            $query->where('u.nome', 'like', (string) $nome[2]);
        }

        $codigo = $this->extractWhere($data, 'codigo');
        if (isset($codigo[2])) {
            $query->where('u.codigo', 'like', (string) $codigo[2]);
        }
    }

    /**
     * @return array{lacuna: ?string, quantidade_dias: ?string}
     */
    private function extrairFiltrosLacuna(array &$data): array
    {
        $lacuna = $this->extractWhere($data, 'lacuna');
        $quantidadeDias = $this->extractWhere($data, 'quantidade_dias');

        return [
            'lacuna' => isset($lacuna[2]) ? mb_strtolower((string) $lacuna[2]) : null,
            'quantidade_dias' => isset($quantidadeDias[2]) && $quantidadeDias[2] !== ''
                ? (string) $quantidadeDias[2]
                : null,
        ];
    }

    /**
     * @param array{lacuna: ?string, quantidade_dias: ?string} $filtros
     */
    private function passaFiltrosDeLacuna(object $row, array $filtros): bool
    {
        if ($filtros['lacuna'] !== null
            && ! str_contains(mb_strtolower((string) $row->lacuna), $filtros['lacuna'])
        ) {
            return false;
        }

        if ($filtros['quantidade_dias'] !== null
            && (string) $row->quantidade_dias !== $filtros['quantidade_dias']
        ) {
            return false;
        }

        return true;
    }

    /**
     * @param list<string> $loteIds
     * @return list<object>
     */
    private function calcularLacunasDoLote(array $loteIds, string $consultaInicio, string $consultaFim): array
    {
        $unidades = DB::table('unidades as u')
            ->whereIn('u.id', $loteIds)
            ->whereNull('u.deleted_at')
            ->select([
                'u.id',
                'u.sigla',
                'u.nome',
                'u.codigo',
                DB::raw('fn_obter_unidade_hierarquia(u.id) as unidadeHierarquia'),
            ])
            ->get()
            ->keyBy('id');

        $historicos = DB::table('unidades_executora_historico')
            ->whereIn('unidade_id', $loteIds)
            ->orderBy('data_inicio')
            ->get()
            ->groupBy('unidade_id');

        $planos = DB::table('planos_entregas as pe')
            ->whereIn('pe.unidade_id', $loteIds)
            ->whereIn('pe.status', self::COBERTURA_STATUS)
            ->whereNull('pe.deleted_at')
            ->select(['pe.unidade_id', 'pe.data_inicio', 'pe.data_fim'])
            ->get()
            ->groupBy('unidade_id');

        $rows = [];

        foreach ($loteIds as $idUnidade) {
            $unidade = $unidades->get($idUnidade);
            if ($unidade === null) {
                continue;
            }

            $historicoUnidade = $this->mapearHistorico($historicos->get($idUnidade) ?? collect());
            if ($historicoUnidade === []) {
                continue;
            }

            $planosUnidade = $this->mapearPlanos($planos->get($idUnidade) ?? collect());

            $lacunas = $this->calculator->calcular(
                $historicoUnidade,
                $planosUnidade,
                $consultaInicio,
                $consultaFim,
            );

            usort(
                $lacunas,
                static fn (array $a, array $b): int => $a['data_inicio'] <=> $b['data_inicio'],
            );

            foreach ($lacunas as $lacuna) {
                $rows[] = $this->montarRow($idUnidade, $unidade, $lacuna);
            }
        }

        return $rows;
    }

    /**
     * @return list<array{executora: bool, data_inicio: string, data_fim: ?string}>
     */
    private function mapearHistorico(Collection $historico): array
    {
        return $historico
            ->map(static fn ($item): array => [
                'executora' => (bool) $item->executora,
                'data_inicio' => (string) $item->data_inicio,
                'data_fim' => $item->data_fim !== null ? (string) $item->data_fim : null,
            ])
            ->values()
            ->all();
    }

    /**
     * @return list<array{data_inicio: string, data_fim: ?string}>
     */
    private function mapearPlanos(Collection $planos): array
    {
        return $planos
            ->map(static fn ($item): array => [
                'data_inicio' => (string) $item->data_inicio,
                'data_fim' => $item->data_fim !== null ? (string) $item->data_fim : null,
            ])
            ->values()
            ->all();
    }

    /**
     * @param array{data_inicio: string, data_fim: string, quantidade_dias: int} $lacuna
     */
    private function montarRow(string $idUnidade, object $unidade, array $lacuna): object
    {
        return (object) [
            'id' => $idUnidade . ':' . $lacuna['data_inicio'] . ':' . $lacuna['data_fim'],
            'unidade_id' => $idUnidade,
            'unidadeHierarquia' => $unidade->unidadeHierarquia,
            'nome' => $unidade->nome,
            'codigo' => $unidade->codigo,
            'sigla' => $unidade->sigla,
            'data_inicio' => $lacuna['data_inicio'],
            'data_fim' => $lacuna['data_fim'],
            'quantidade_dias' => $lacuna['quantidade_dias'],
            'lacuna' => $lacuna['data_inicio'] . ' a ' . $lacuna['data_fim'],
        ];
    }

    /**
     * @return list<string>
     */
    private function resolverUnidades(string $unidadeId, bool $incluirSubordinadas): array
    {
        $ids = [$unidadeId];

        if ($incluirSubordinadas) {
            $subordinadas = $this->unidadeService
                ->subordinadas($unidadeId)
                ->pluck('id')
                ->toArray();
            $ids = array_merge($ids, $subordinadas);
        }

        return array_values(array_unique($ids));
    }

    /**
     * @param list<array{0: string, 1: string}> $orderBy
     */
    private function ordenar(Collection $rows, array $orderBy): Collection
    {
        if ($orderBy === []) {
            $orderBy = self::ORDEM_PADRAO;
        }

        return $rows->sort(function ($a, $b) use ($orderBy): int {
            foreach ($orderBy as [$campo, $direcao]) {
                $valorA = $a->{$campo} ?? '';
                $valorB = $b->{$campo} ?? '';
                $comparacao = $valorA <=> $valorB;
                if ($comparacao !== 0) {
                    return strtolower($direcao) === 'desc' ? -$comparacao : $comparacao;
                }
            }

            return 0;
        })->values();
    }

    /**
     * @param array{
     *     where?: list<array{0: string, 1: string, 2: mixed}>
     * } $data
     * @return ?array{0: string, 1: string, 2: mixed}
     */
    private function extractWhere(array &$data, string $field): ?array
    {
        $result = null;
        $where = [];

        foreach ($data['where'] ?? [] as $condition) {
            if (is_array($condition) && $condition[0] === $field) {
                $result = $condition;
            } else {
                $where[] = $condition;
            }
        }

        if ($result !== null) {
            $data['where'] = $where;
        }

        return $result;
    }
}
