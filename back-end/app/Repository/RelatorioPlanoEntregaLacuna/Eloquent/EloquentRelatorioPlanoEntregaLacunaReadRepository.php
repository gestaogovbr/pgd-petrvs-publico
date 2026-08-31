<?php

declare(strict_types=1);

namespace App\Repository\RelatorioPlanoEntregaLacuna\Eloquent;

use App\Enums\StatusEnum;
use App\Repository\RelatorioPlanoEntregaLacuna\Contracts\RelatorioPlanoEntregaLacunaReadRepositoryContract;
use App\Support\RelatorioPlanoEntregaLacunaCalculator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class EloquentRelatorioPlanoEntregaLacunaReadRepository implements RelatorioPlanoEntregaLacunaReadRepositoryContract
{
    /** @var list<string> */
    private const COBERTURA_STATUS = [
        StatusEnum::ATIVO->value,
        StatusEnum::CONCLUIDO->value,
    ];

    public function __construct(
        private readonly RelatorioPlanoEntregaLacunaCalculator $calculator
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

        $unidadeIds = $this->resolverUnidades((string) $unidadeId[2], isset($subordinadas[2]));
        if ($unidadeIds === []) {
            return ['count' => 0, 'rows' => collect()];
        }

        $unidades = DB::table('unidades as u')
            ->whereIn('u.id', $unidadeIds)
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
            ->whereIn('unidade_id', $unidadeIds)
            ->orderBy('data_inicio')
            ->get()
            ->groupBy('unidade_id');

        $planos = DB::table('planos_entregas as pe')
            ->whereIn('pe.unidade_id', $unidadeIds)
            ->whereIn('pe.status', self::COBERTURA_STATUS)
            ->whereNull('pe.deleted_at')
            ->select(['pe.unidade_id', 'pe.data_inicio', 'pe.data_fim'])
            ->get()
            ->groupBy('unidade_id');

        $rows = collect();

        foreach ($unidadeIds as $idUnidade) {
            $unidade = $unidades->get($idUnidade);
            if ($unidade === null) {
                continue;
            }

            $historicoUnidade = ($historicos->get($idUnidade) ?? collect())
                ->map(static fn ($item): array => [
                    'executora' => (bool) $item->executora,
                    'data_inicio' => (string) $item->data_inicio,
                    'data_fim' => $item->data_fim !== null ? (string) $item->data_fim : null,
                ])
                ->values()
                ->all();

            if ($this->nuncaFoiExecutora($historicoUnidade)) {
                continue;
            }

            $planosUnidade = ($planos->get($idUnidade) ?? collect())
                ->map(static fn ($item): array => [
                    'data_inicio' => (string) $item->data_inicio,
                    'data_fim' => $item->data_fim !== null ? (string) $item->data_fim : null,
                ])
                ->values()
                ->all();

            $lacunas = $this->calculator->calcular(
                $historicoUnidade,
                $planosUnidade,
                (string) $periodoInicio[2],
                (string) $periodoFim[2],
            );

            foreach ($lacunas as $lacuna) {
                $rows->push((object) [
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
                ]);
            }
        }

        $rows = $this->aplicarFiltrosColuna($rows, $data);
        $rows = $this->ordenar($rows, $data['orderBy'] ?? [['unidadeHierarquia', 'asc']]);

        $count = $rows->count();
        $limit = (int) ($data['limit'] ?? 0);
        $page = max((int) ($data['page'] ?? 1), 1);

        if ($limit > 0) {
            $offset = ($page - 1) * $limit;
            $rows = $rows->slice($offset, $limit)->values();
        }

        return [
            'count' => $count,
            'rows' => $rows,
        ];
    }

    /**
     * @param list<array{executora: bool, data_inicio: string, data_fim: ?string}> $historico
     */
    private function nuncaFoiExecutora(array $historico): bool
    {
        foreach ($historico as $periodo) {
            if ($periodo['executora']) {
                return false;
            }
        }

        return true;
    }

    /**
     * @return list<string>
     */
    private function resolverUnidades(string $unidadeId, bool $incluirSubordinadas): array
    {
        $ids = [$unidadeId];

        if ($incluirSubordinadas) {
            $subordinadas = app(\App\Services\UnidadeService::class)
                ->subordinadas($unidadeId)
                ->pluck('id')
                ->toArray();
            $ids = array_merge($ids, $subordinadas);
        }

        return array_values(array_unique($ids));
    }

    private function aplicarFiltrosColuna(Collection $rows, array $data): Collection
    {
        $unidadeHierarquia = $this->extractWhere($data, 'unidadeHierarquia');
        if (isset($unidadeHierarquia[2])) {
            $filtro = '%' . $unidadeHierarquia[2] . '%';
            $rows = $rows->filter(static fn ($row): bool => str_contains((string) $row->unidadeHierarquia, trim($filtro, '%')));
        }

        $nome = $this->extractWhere($data, 'nome');
        if (isset($nome[2])) {
            $filtro = '%' . $nome[2] . '%';
            $rows = $rows->filter(static fn ($row): bool => str_contains(mb_strtolower((string) $row->nome), mb_strtolower(trim($filtro, '%'))));
        }

        $codigo = $this->extractWhere($data, 'codigo');
        if (isset($codigo[2])) {
            $filtro = '%' . $codigo[2] . '%';
            $rows = $rows->filter(static fn ($row): bool => str_contains((string) $row->codigo, trim($filtro, '%')));
        }

        $lacuna = $this->extractWhere($data, 'lacuna');
        if (isset($lacuna[2])) {
            $filtro = mb_strtolower((string) $lacuna[2]);
            $rows = $rows->filter(static fn ($row): bool => str_contains(mb_strtolower((string) $row->lacuna), $filtro));
        }

        $quantidadeDias = $this->extractWhere($data, 'quantidade_dias');
        if (isset($quantidadeDias[2]) && $quantidadeDias[2] !== '') {
            $rows = $rows->filter(static fn ($row): bool => (string) $row->quantidade_dias === (string) $quantidadeDias[2]);
        }

        return $rows->values();
    }

    /**
     * @param list<array{0: string, 1: string}> $orderBy
     */
    private function ordenar(Collection $rows, array $orderBy): Collection
    {
        if ($orderBy === []) {
            $orderBy = [['unidadeHierarquia', 'asc']];
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
