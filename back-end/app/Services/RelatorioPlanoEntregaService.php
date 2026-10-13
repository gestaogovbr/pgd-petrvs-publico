<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\ViewRelatorioPlanoEntrega;
use App\Repository\UnidadeRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class RelatorioPlanoEntregaService
{
    /** @var array<string, list<string>> */
    private array $unidadeIdsCache = [];

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {
    }

    /**
     * Consulta paginada da grid.
     *
     * @param array{page?: mixed, limit?: mixed, filters?: array<string, mixed>, orderBy?: array<int, mixed>} $data
     * @return array{count: int, rows: Collection, extra: null}
     */
    public function query(array $data): array
    {
        $filters = is_array($data['filters'] ?? null) ? $data['filters'] : [];

        $query = ViewRelatorioPlanoEntrega::query();
        $this->aplicarFiltros($query, $filters);
        $this->aplicarOrdem($query, is_array($data['orderBy'] ?? null) ? $data['orderBy'] : []);

        $count = (clone $query)->count();
        $this->aplicarPaginacao($query, $data);

        $rows = $query->get();
        $this->proxyRows($rows);

        return [
            'count' => $count,
            'rows' => $rows,
            'extra' => null,
        ];
    }

    /**
     * Consulta paginada para a geração do Excel.
     *
     * @param array{page?: int, limit?: int, filters?: array<string, mixed>, orderBy?: array} $data
     * @return array{count: int, rows: Collection, extra: null}
     */
    public function queryForExport(array $data, ?int $knownCount = null): array
    {
        $page = max(1, (int) ($data['page'] ?? 1));
        if ($page === 1) {
            $this->unidadeIdsCache = [];
        }

        $result = $this->query([
            'page' => $page,
            'limit' => max(1, (int) ($data['limit'] ?? 1000)),
            'filters' => is_array($data['filters'] ?? null) ? $data['filters'] : [],
            'orderBy' => is_array($data['orderBy'] ?? null) ? $data['orderBy'] : [],
        ]);

        if ($knownCount !== null) {
            $result['count'] = $knownCount;
        }

        return $result;
    }

    /**
     * @param Collection<int, mixed> $rows
     * @return Collection<int, mixed>
     */
    private function proxyRows(Collection $rows): Collection
    {
        foreach ($rows as $row) {
            $row['nota'] = $this->limparNota($row['nota'] ?? null);
        }

        return $rows;
    }

    private function limparNota(mixed $valor): string
    {
        if ($valor === null || $valor === '') {
            return '';
        }

        return str_replace('"', '', (string) $valor);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function aplicarFiltros(Builder $query, array $filters): void
    {
        $this->filtrarPorUnidade($query, $filters);
        $this->filtrarPorSomenteVigentes($query, $filters);
        $this->filtrarPorPeriodo($query, $filters);
        $this->filtrarPorDataInicio($query, $filters);
        $this->filtrarPorDataFim($query, $filters);
        $this->filtrarPorNumero($query, $filters);
        $this->filtrarPorEntregaNome($query, $filters);
        $this->filtrarPorUnidadeHierarquia($query, $filters);
        $this->filtrarPorStatus($query, $filters);
        $this->filtrarPorNota($query, $filters);
        $this->filtrarPorDuracao($query, $filters);
        $this->filtrarPorSituacaoAvaliacao($query, $filters);
        $this->filtrarPorSituacaoConclusao($query, $filters);
        $this->filtrarPorDataAvaliacao($query, $filters);
        $this->filtrarPorDataConclusao($query, $filters);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorUnidade(Builder $query, array $filters): void
    {
        $unidadeId = isset($filters['unidade_id']) && $filters['unidade_id'] !== ''
            ? (string) $filters['unidade_id']
            : null;
        $unidadeIds = $this->idsUnidadesDoRelatorio(
            $unidadeId,
            ! empty($filters['incluir_unidades_subordinadas']),
        );

        if ($unidadeIds === []) {
            $query->whereRaw('0 = 1');

            return;
        }

        $query->whereIn('unidade_id', $unidadeIds);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorSomenteVigentes(Builder $query, array $filters): void
    {
        if (empty($filters['somente_vigentes'])) {
            return;
        }

        $query->whereRaw('(CURDATE() BETWEEN dataInicio and dataFim)');
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorPeriodo(Builder $query, array $filters): void
    {
        $periodoInicio = $filters['periodoInicio'] ?? null;
        $periodoFim = $filters['periodoFim'] ?? null;

        if ($periodoInicio && $periodoFim) {
            $query->whereRaw(
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

            return;
        }

        if ($periodoInicio) {
            $query->whereRaw('(? between dataInicio and dataFim)', [$periodoInicio]);

            return;
        }

        if ($periodoFim) {
            $query->whereRaw('(? between dataInicio and dataFim)', [$periodoFim]);
        }
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorDataInicio(Builder $query, array $filters): void
    {
        if (($filters['dataInicio'] ?? null) === null || $filters['dataInicio'] === '') {
            return;
        }

        $query->where('dataInicio', '>=', $filters['dataInicio']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorDataFim(Builder $query, array $filters): void
    {
        if (($filters['dataFim'] ?? null) === null || $filters['dataFim'] === '') {
            return;
        }

        $query->where('dataFim', '<=', $filters['dataFim']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorNumero(Builder $query, array $filters): void
    {
        if (($filters['numero'] ?? null) === null || $filters['numero'] === '') {
            return;
        }

        $query->where('numero', 'like', $this->likeValor((string) $filters['numero']));
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorEntregaNome(Builder $query, array $filters): void
    {
        if (($filters['entregaNome'] ?? null) === null || $filters['entregaNome'] === '') {
            return;
        }

        $query->where('entregaNome', 'like', $this->likeValor((string) $filters['entregaNome']));
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorUnidadeHierarquia(Builder $query, array $filters): void
    {
        if (($filters['unidadeHierarquia'] ?? null) === null || $filters['unidadeHierarquia'] === '') {
            return;
        }

        $query->where('unidadeHierarquia', 'like', $this->likeValor((string) $filters['unidadeHierarquia']));
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorStatus(Builder $query, array $filters): void
    {
        if (($filters['status'] ?? null) === null || $filters['status'] === '') {
            return;
        }

        $query->where('status', '=', $filters['status']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorNota(Builder $query, array $filters): void
    {
        if (($filters['nota'] ?? null) === null || $filters['nota'] === '') {
            return;
        }

        $query->where('nota', '=', $filters['nota']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorDuracao(Builder $query, array $filters): void
    {
        if (($filters['duracao'] ?? null) === null || $filters['duracao'] === '') {
            return;
        }

        $query->where('duracao', '=', $filters['duracao']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorSituacaoAvaliacao(Builder $query, array $filters): void
    {
        if (($filters['situacao_avaliacao'] ?? null) === null || $filters['situacao_avaliacao'] === '') {
            return;
        }

        $query->where('situacao_avaliacao', '=', $filters['situacao_avaliacao']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorSituacaoConclusao(Builder $query, array $filters): void
    {
        if (($filters['situacao_conclusao'] ?? null) === null || $filters['situacao_conclusao'] === '') {
            return;
        }

        $query->where('situacao_conclusao', '=', $filters['situacao_conclusao']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorDataAvaliacao(Builder $query, array $filters): void
    {
        if (($filters['data_avaliacao'] ?? null) === null || $filters['data_avaliacao'] === '') {
            return;
        }

        $query->where('data_avaliacao', '=', $filters['data_avaliacao']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorDataConclusao(Builder $query, array $filters): void
    {
        if (($filters['data_conclusao'] ?? null) === null || $filters['data_conclusao'] === '') {
            return;
        }

        $query->where('data_conclusao', '=', $filters['data_conclusao']);
    }

    /**
     * @return list<string>
     */
    private function idsUnidadesDoRelatorio(?string $unidadeId, bool $incluirSubordinadas): array
    {
        if ($unidadeId === null || $unidadeId === '') {
            return [];
        }
        if (! $incluirSubordinadas) {
            return [$unidadeId];
        }

        if (! isset($this->unidadeIdsCache[$unidadeId])) {
            $this->unidadeIdsCache[$unidadeId] = $this->unidadeRepository->idsNaHierarquiaDe([$unidadeId]);
        }

        return $this->unidadeIdsCache[$unidadeId];
    }

    private function likeValor(string $value): string
    {
        if (str_contains($value, '%')) {
            return $value;
        }

        return '%' . $value . '%';
    }

    /**
     * @param array<int, mixed> $orderBy
     */
    private function aplicarOrdem(Builder $query, array $orderBy): void
    {
        $aplicou = $this->aplicarCampoOrdem($query, $orderBy[0] ?? null);
        $this->aplicarCampoOrdem($query, $orderBy[1] ?? null);

        if (! $aplicou) {
            $query->orderBy('unidadeHierarquia')->orderBy('numero');
        }
    }

    private function aplicarCampoOrdem(Builder $query, mixed $order): bool
    {
        if (! is_array($order) || ! isset($order[0]) || ! is_string($order[0])) {
            return false;
        }

        $campo = $order[0];
        $direcao = strtolower((string) ($order[1] ?? 'asc')) === 'desc' ? 'desc' : 'asc';

        if ($campo === 'unidadeHierarquia') {
            $query->orderBy('unidadeHierarquia', $direcao);

            return true;
        }

        if ($campo === 'numero') {
            $query->orderBy('numero', $direcao);

            return true;
        }

        if ($campo === 'entregaNome') {
            $query->orderBy('entregaNome', $direcao);

            return true;
        }

        if ($campo === 'status') {
            $query->orderBy('status', $direcao);

            return true;
        }

        if ($campo === 'dataInicio') {
            $query->orderBy('dataInicio', $direcao);

            return true;
        }

        if ($campo === 'dataFim') {
            $query->orderBy('dataFim', $direcao);

            return true;
        }

        return false;
    }

    /**
     * @param array{page?: mixed, limit?: mixed} $data
     */
    private function aplicarPaginacao(Builder $query, array $data): void
    {
        $limit = $data['limit'] ?? null;
        if ($limit === null || $limit === '' || (int) $limit <= 0) {
            return;
        }

        $page = max(1, (int) ($data['page'] ?? 1));
        $limit = max(1, (int) $limit);
        $query->skip(($page - 1) * $limit)->take($limit);
    }
}
