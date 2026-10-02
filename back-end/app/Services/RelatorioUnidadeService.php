<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\ViewRelatorioUnidade;
use App\Repository\UnidadeRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class RelatorioUnidadeService
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
     * @param array{page?: mixed, limit?: mixed, filters?: array<string, mixed>, where?: array<int, mixed>, orderBy?: array<int, mixed>} $data
     * @return array{count: int, rows: Collection, extra: null}
     */
    public function query(array $data): array
    {
        $filters = $this->resolverFilters($data);

        $query = ViewRelatorioUnidade::query();
        $this->aplicarFiltros($query, $filters);
        $this->aplicarOrdem($query, is_array($data['orderBy'] ?? null) ? $data['orderBy'] : []);

        $count = (clone $query)->count();
        $this->aplicarPaginacao($query, $data);

        $rows = $query->get();

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
     * @param array{page?: mixed, limit?: mixed, filters?: array<string, mixed>, where?: array<int, mixed>} $data
     * @return array<string, mixed>
     */
    private function resolverFilters(array $data): array
    {
        if (is_array($data['filters'] ?? null) && $data['filters'] !== []) {
            return $data['filters'];
        }

        return $this->filtersFromWhere(is_array($data['where'] ?? null) ? $data['where'] : []);
    }

    /**
     * Compatibilidade com a grid legada que ainda envia triplas where.
     *
     * @param array<int, mixed> $where
     * @return array<string, mixed>
     */
    private function filtersFromWhere(array $where): array
    {
        $filters = [];

        $unidadeId = $this->valorWhere($where, 'unidade_id');
        if ($unidadeId !== null && $unidadeId !== '') {
            $filters['unidade_id'] = $unidadeId;
        }

        if ($this->temWhere($where, 'incluir_unidades_subordinadas')) {
            $filters['incluir_unidades_subordinadas'] = (bool) $this->valorWhere($where, 'incluir_unidades_subordinadas');
        }

        $nome = $this->likeWhere($where, 'nome');
        if ($nome !== null) {
            $filters['nome'] = $nome;
        }

        $unidadeHierarquia = $this->likeWhere($where, 'unidadeHierarquia');
        if ($unidadeHierarquia !== null) {
            $filters['unidadeHierarquia'] = $unidadeHierarquia;
        }

        $codigo = $this->likeWhere($where, 'codigo');
        if ($codigo !== null) {
            $filters['codigo'] = $codigo;
        }

        $instituidora = $this->valorWhere($where, 'instituidora');
        if ($instituidora !== null && $instituidora !== '') {
            $filters['instituidora'] = $instituidora;
        }

        $executora = $this->valorWhere($where, 'executora');
        if ($executora !== null && $executora !== '') {
            $filters['executora'] = $executora;
        }

        $peVigenteNome = $this->likeWhere($where, 'peVigenteNome');
        if ($peVigenteNome !== null) {
            $filters['peVigenteNome'] = $peVigenteNome;
        }

        $chefiaNome = $this->likeWhere($where, 'chefiaNome');
        if ($chefiaNome !== null) {
            $filters['chefiaNome'] = $chefiaNome;
        }

        $totalVinculados = $this->valorWhere($where, 'totalVinculados');
        if ($totalVinculados !== null && $totalVinculados !== '') {
            $filters['totalVinculados'] = $totalVinculados;
        }

        $totalSubstitutos = $this->valorWhere($where, 'totalSubstitutos');
        if ($totalSubstitutos !== null && $totalSubstitutos !== '') {
            $filters['totalSubstitutos'] = $totalSubstitutos;
        }

        $totalDelegados = $this->valorWhere($where, 'totalDelegados');
        if ($totalDelegados !== null && $totalDelegados !== '') {
            $filters['totalDelegados'] = $totalDelegados;
        }

        return $filters;
    }

    /**
     * @param array<int, mixed> $where
     */
    private function valorWhere(array $where, string $campo): mixed
    {
        foreach ($where as $condition) {
            if (! is_array($condition) || ! isset($condition[0])) {
                continue;
            }

            if ((string) $condition[0] === $campo) {
                return $condition[2] ?? null;
            }
        }

        return null;
    }

    /**
     * @param array<int, mixed> $where
     */
    private function temWhere(array $where, string $campo): bool
    {
        foreach ($where as $condition) {
            if (! is_array($condition) || ! isset($condition[0])) {
                continue;
            }

            if ((string) $condition[0] === $campo) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param array<int, mixed> $where
     */
    private function likeWhere(array $where, string $campo): ?string
    {
        $value = $this->valorWhere($where, $campo);
        if (! is_string($value)) {
            return null;
        }

        $stripped = trim($value, '%');

        return $stripped === '' ? null : $stripped;
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function aplicarFiltros(Builder $query, array $filters): void
    {
        $this->filtrarPorUnidade($query, $filters);
        $this->filtrarPorNome($query, $filters);
        $this->filtrarPorUnidadeHierarquia($query, $filters);
        $this->filtrarPorCodigo($query, $filters);
        $this->filtrarPorInstituidora($query, $filters);
        $this->filtrarPorExecutora($query, $filters);
        $this->filtrarPorPeVigenteNome($query, $filters);
        $this->filtrarPorChefiaNome($query, $filters);
        $this->filtrarPorTotalVinculados($query, $filters);
        $this->filtrarPorTotalSubstitutos($query, $filters);
        $this->filtrarPorTotalDelegados($query, $filters);
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
    private function filtrarPorNome(Builder $query, array $filters): void
    {
        if (($filters['nome'] ?? null) === null || $filters['nome'] === '') {
            return;
        }

        $query->where('nome', 'like', $this->likeValor((string) $filters['nome']));
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
    private function filtrarPorCodigo(Builder $query, array $filters): void
    {
        if (($filters['codigo'] ?? null) === null || $filters['codigo'] === '') {
            return;
        }

        $query->where('codigo', 'like', $this->likeValor((string) $filters['codigo']));
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorInstituidora(Builder $query, array $filters): void
    {
        if (($filters['instituidora'] ?? null) === null || $filters['instituidora'] === '') {
            return;
        }

        $query->where('instituidora', '=', $filters['instituidora']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorExecutora(Builder $query, array $filters): void
    {
        if (($filters['executora'] ?? null) === null || $filters['executora'] === '') {
            return;
        }

        $query->where('executora', '=', $filters['executora']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorPeVigenteNome(Builder $query, array $filters): void
    {
        if (($filters['peVigenteNome'] ?? null) === null || $filters['peVigenteNome'] === '') {
            return;
        }

        $query->where('peVigenteNome', 'like', $this->likeValor((string) $filters['peVigenteNome']));
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorChefiaNome(Builder $query, array $filters): void
    {
        if (($filters['chefiaNome'] ?? null) === null || $filters['chefiaNome'] === '') {
            return;
        }

        $query->where('chefiaNome', 'like', $this->likeValor((string) $filters['chefiaNome']));
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorTotalVinculados(Builder $query, array $filters): void
    {
        if (($filters['totalVinculados'] ?? null) === null || $filters['totalVinculados'] === '') {
            return;
        }

        $query->where('totalVinculados', '=', $filters['totalVinculados']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorTotalSubstitutos(Builder $query, array $filters): void
    {
        if (($filters['totalSubstitutos'] ?? null) === null || $filters['totalSubstitutos'] === '') {
            return;
        }

        $query->where('totalSubstitutos', '=', $filters['totalSubstitutos']);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function filtrarPorTotalDelegados(Builder $query, array $filters): void
    {
        if (($filters['totalDelegados'] ?? null) === null || $filters['totalDelegados'] === '') {
            return;
        }

        $query->where('totalDelegados', '=', $filters['totalDelegados']);
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
            $query->orderBy('unidadeHierarquia')->orderBy('sigla');
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

        if ($campo === 'sigla') {
            $query->orderBy('sigla', $direcao);

            return true;
        }

        if ($campo === 'nome') {
            $query->orderBy('nome', $direcao);

            return true;
        }

        if ($campo === 'codigo') {
            $query->orderBy('codigo', $direcao);

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
