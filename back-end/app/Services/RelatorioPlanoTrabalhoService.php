<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\ViewRelatorioPlanoTrabalho;
use App\Models\ViewRelatorioPlanoTrabalhoDetalhado;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Repository\UnidadeRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class RelatorioPlanoTrabalhoService
{
    /** @var array<string, list<string>> */
    private array $unidadeIdsCache = [];

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly PlanoTrabalhoEntregaRepository $planoTrabalhoEntregaRepository,
        private readonly bool $detalhado = false,
    ) {
    }

    /**
     * Consulta paginada da grid (view resumida ou detalhada).
     *
     * @param array{page?: mixed, limit?: mixed, filters?: array<string, mixed>, where?: array<int, mixed>, orderBy?: array<int, mixed>} $data
     * @return array{count: int, rows: Collection, extra: null}
     */
    public function query(array $data): array
    {
        $filters = $this->resolverFilters($data);
        $contexto = $this->contextoFiltros($filters);

        $query = $this->novoQueryView();
        $this->aplicarFiltrosEspeciaisNaView($query, $contexto);
        $this->aplicarFiltrosSimples($query, $contexto['filters_restantes']);
        $this->aplicarOrdemNaView($query, is_array($data['orderBy'] ?? null) ? $data['orderBy'] : []);

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
            'limit' => max(1, (int) ($data['limit'] ?? 500)),
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
            $row['nota_reavaliacao'] = $this->limparNota($row['nota_reavaliacao'] ?? null);
        }

        return $rows;
    }

    private function limparNota(mixed $valor): string
    {
        if ($valor === null || $valor === '') {
            return '';
        }

        $decoded = is_string($valor) ? json_decode($valor) : $valor;

        return str_replace('"', '', (string) ($decoded ?? ''));
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

        if ($this->temWhere($where, 'somente_vigentes')) {
            $filters['somente_vigentes'] = (bool) $this->valorWhere($where, 'somente_vigentes');
        }

        if ($this->temWhere($where, 'incluir_periodos_avaliativos')) {
            $filters['incluir_periodos_avaliativos'] = (bool) $this->valorWhere($where, 'incluir_periodos_avaliativos');
        }

        $periodoInicio = $this->valorWhere($where, 'periodoInicio');
        if ($periodoInicio !== null && $periodoInicio !== '') {
            $filters['periodoInicio'] = $periodoInicio;
        }

        $periodoFim = $this->valorWhere($where, 'periodoFim');
        if ($periodoFim !== null && $periodoFim !== '') {
            $filters['periodoFim'] = $periodoFim;
        }

        $planoEntregaEntregaId = $this->valorWhere($where, 'plano_entrega_entrega_id');
        if ($planoEntregaEntregaId !== null && $planoEntregaEntregaId !== '') {
            $filters['plano_entrega_entrega_id'] = $planoEntregaEntregaId;
        }

        $dataInicio = $this->valorWhere($where, 'dataInicio');
        if ($dataInicio !== null && $dataInicio !== '') {
            $filters['dataInicio'] = $dataInicio;
        }

        $dataFim = $this->valorWhere($where, 'dataFim');
        if ($dataFim !== null && $dataFim !== '') {
            $filters['dataFim'] = $dataFim;
        }

        $numero = $this->likeWhere($where, 'numero');
        if ($numero !== null) {
            $filters['numero'] = $numero;
        }

        $participanteNome = $this->likeWhere($where, 'participanteNome');
        if ($participanteNome !== null) {
            $filters['participanteNome'] = $participanteNome;
        }

        $unidadeHierarquia = $this->likeWhere($where, 'unidadeHierarquia');
        if ($unidadeHierarquia !== null) {
            $filters['unidadeHierarquia'] = $unidadeHierarquia;
        }

        $chd = $this->valorWhere($where, 'chd');
        if ($chd !== null && $chd !== '') {
            $filters['chd'] = $chd;
        }

        $status = $this->valorWhere($where, 'status');
        if ($status !== null && $status !== '') {
            $filters['status'] = $status;
        }

        $modalidadePgd = $this->valorWhere($where, 'modalidade_pgd');
        if ($modalidadePgd !== null && $modalidadePgd !== '') {
            $filters['modalidade_pgd'] = $modalidadePgd;
        }

        $nota = $this->valorWhere($where, 'nota');
        if ($nota !== null && $nota !== '') {
            $filters['nota'] = $nota;
        }

        $duracao = $this->valorWhere($where, 'duracao');
        if ($duracao !== null && $duracao !== '') {
            $filters['duracao'] = $duracao;
        }

        $qtdePeriodosAvaliativos = $this->valorWhere($where, 'qtdePeriodosAvaliativos');
        if ($qtdePeriodosAvaliativos !== null && $qtdePeriodosAvaliativos !== '') {
            $filters['qtdePeriodosAvaliativos'] = $qtdePeriodosAvaliativos;
        }

        $notaReavaliacao = $this->valorWhere($where, 'nota_reavaliacao');
        if ($notaReavaliacao !== null && $notaReavaliacao !== '') {
            $filters['nota_reavaliacao'] = $notaReavaliacao;
        }

        $situacaoAvaliacao = $this->valorWhere($where, 'situacao_avaliacao');
        if ($situacaoAvaliacao !== null && $situacaoAvaliacao !== '') {
            $filters['situacao_avaliacao'] = $situacaoAvaliacao;
        }

        $situacaoExecucao = $this->valorWhere($where, 'situacao_execucao');
        if ($situacaoExecucao !== null && $situacaoExecucao !== '') {
            $filters['situacao_execucao'] = $situacaoExecucao;
        }

        $dataInicioAvaliativo = $this->valorWhere($where, 'data_inicio_avaliativo');
        if ($dataInicioAvaliativo !== null && $dataInicioAvaliativo !== '') {
            $filters['data_inicio_avaliativo'] = $dataInicioAvaliativo;
        }

        $dataFimAvaliativo = $this->valorWhere($where, 'data_fim_avaliativo');
        if ($dataFimAvaliativo !== null && $dataFimAvaliativo !== '') {
            $filters['data_fim_avaliativo'] = $dataFimAvaliativo;
        }

        $dataRecurso = $this->valorWhere($where, 'data_recurso');
        if ($dataRecurso !== null && $dataRecurso !== '') {
            $filters['data_recurso'] = $dataRecurso;
        }

        $dataAvaliacao = $this->valorWhere($where, 'data_avaliacao');
        if ($dataAvaliacao !== null && $dataAvaliacao !== '') {
            $filters['data_avaliacao'] = $dataAvaliacao;
        }

        $dataReavaliacao = $this->valorWhere($where, 'data_reavaliacao');
        if ($dataReavaliacao !== null && $dataReavaliacao !== '') {
            $filters['data_reavaliacao'] = $dataReavaliacao;
        }

        $dataConclusao = $this->valorWhere($where, 'data_conclusao');
        if ($dataConclusao !== null && $dataConclusao !== '') {
            $filters['data_conclusao'] = $dataConclusao;
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
     * @return array{
     *     unidade_ids: list<string>,
     *     somente_vigentes: bool,
     *     periodo_inicio: mixed,
     *     periodo_fim: mixed,
     *     plano_trabalho_ids: list<string>|null,
     *     filters_restantes: array<string, mixed>
     * }
     */
    private function contextoFiltros(array $filters): array
    {
        $unidadeId = isset($filters['unidade_id']) && $filters['unidade_id'] !== ''
            ? (string) $filters['unidade_id']
            : null;
        $incluirSubordinadas = ! empty($filters['incluir_unidades_subordinadas']);
        $planoEntregaEntregaId = isset($filters['plano_entrega_entrega_id']) && $filters['plano_entrega_entrega_id'] !== ''
            ? (string) $filters['plano_entrega_entrega_id']
            : null;

        $planoTrabalhoIds = null;
        if ($planoEntregaEntregaId !== null) {
            $planoTrabalhoIds = $this->planoTrabalhoEntregaRepository
                ->idsPlanosTrabalhoPorPlanoEntregaEntrega($planoEntregaEntregaId);
        }

        $especiais = [
            'unidade_id',
            'incluir_unidades_subordinadas',
            'somente_vigentes',
            'incluir_periodos_avaliativos',
            'periodoInicio',
            'periodoFim',
            'plano_entrega_entrega_id',
        ];

        return [
            'unidade_ids' => $this->idsUnidadesDoRelatorio($unidadeId, $incluirSubordinadas),
            'somente_vigentes' => ! empty($filters['somente_vigentes']),
            'periodo_inicio' => $filters['periodoInicio'] ?? null,
            'periodo_fim' => $filters['periodoFim'] ?? null,
            'plano_trabalho_ids' => $planoTrabalhoIds,
            'filters_restantes' => array_diff_key($filters, array_flip($especiais)),
        ];
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

    private function novoQueryView(): Builder
    {
        if ($this->detalhado) {
            return ViewRelatorioPlanoTrabalhoDetalhado::query();
        }

        return ViewRelatorioPlanoTrabalho::query();
    }

    /**
     * @param array{
     *     unidade_ids: list<string>,
     *     somente_vigentes: bool,
     *     periodo_inicio: mixed,
     *     periodo_fim: mixed,
     *     plano_trabalho_ids: list<string>|null
     * } $contexto
     */
    private function aplicarFiltrosEspeciaisNaView(Builder $query, array $contexto): void
    {
        if ($contexto['unidade_ids'] === []) {
            $query->whereRaw('0 = 1');
        } else {
            $query->whereIn('unidade_id', $contexto['unidade_ids']);
        }

        if ($contexto['somente_vigentes']) {
            $query->whereRaw('(now() between dataInicio and dataFim)');
        }

        $periodoInicio = $contexto['periodo_inicio'];
        $periodoFim = $contexto['periodo_fim'];
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
        } elseif ($periodoInicio) {
            $query->whereRaw('(? between dataInicio and dataFim)', [$periodoInicio]);
        } elseif ($periodoFim) {
            $query->whereRaw('(? between dataInicio and dataFim)', [$periodoFim]);
        }

        if (is_array($contexto['plano_trabalho_ids'])) {
            $query->whereIn('id', $contexto['plano_trabalho_ids'] ?: [null]);
        }
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function aplicarFiltrosSimples(Builder $query, array $filters): void
    {
        if (($filters['numero'] ?? null) !== null && $filters['numero'] !== '') {
            $query->where('numero', 'like', $this->likeValor((string) $filters['numero']));
        }

        if (($filters['participanteNome'] ?? null) !== null && $filters['participanteNome'] !== '') {
            $query->where('participanteNome', 'like', $this->likeValor((string) $filters['participanteNome']));
        }

        if (($filters['unidadeHierarquia'] ?? null) !== null && $filters['unidadeHierarquia'] !== '') {
            $query->where('unidadeHierarquia', 'like', $this->likeValor((string) $filters['unidadeHierarquia']));
        }

        if (($filters['dataInicio'] ?? null) !== null && $filters['dataInicio'] !== '') {
            $query->where('dataInicio', '>=', $filters['dataInicio']);
        }

        if (($filters['dataFim'] ?? null) !== null && $filters['dataFim'] !== '') {
            $query->where('dataFim', '<=', $filters['dataFim']);
        }

        if (($filters['status'] ?? null) !== null && $filters['status'] !== '') {
            $query->where('status', '=', $filters['status']);
        }

        if (($filters['modalidade_pgd'] ?? null) !== null && $filters['modalidade_pgd'] !== '') {
            $query->where('modalidade_pgd', '=', $filters['modalidade_pgd']);
        }

        if (($filters['chd'] ?? null) !== null && $filters['chd'] !== '') {
            $query->where('chd', '=', $filters['chd']);
        }

        if (($filters['duracao'] ?? null) !== null && $filters['duracao'] !== '') {
            $query->where('duracao', '=', $filters['duracao']);
        }

        if (($filters['qtdePeriodosAvaliativos'] ?? null) !== null && $filters['qtdePeriodosAvaliativos'] !== '') {
            $query->where('qtdePeriodosAvaliativos', '=', $filters['qtdePeriodosAvaliativos']);
        }

        if (($filters['data_inicio_avaliativo'] ?? null) !== null && $filters['data_inicio_avaliativo'] !== '') {
            $query->where('data_inicio_avaliativo', '>=', $filters['data_inicio_avaliativo']);
        }

        if (($filters['data_fim_avaliativo'] ?? null) !== null && $filters['data_fim_avaliativo'] !== '') {
            $query->where('data_fim_avaliativo', '<=', $filters['data_fim_avaliativo']);
        }

        if (($filters['nota'] ?? null) !== null && $filters['nota'] !== '') {
            $query->where('nota', '=', $filters['nota']);
        }

        if (($filters['nota_reavaliacao'] ?? null) !== null && $filters['nota_reavaliacao'] !== '') {
            $query->where('nota_reavaliacao', '=', $filters['nota_reavaliacao']);
        }

        if (($filters['situacao_avaliacao'] ?? null) !== null && $filters['situacao_avaliacao'] !== '') {
            $query->where('situacao_avaliacao', '=', $filters['situacao_avaliacao']);
        }

        if (($filters['situacao_execucao'] ?? null) !== null && $filters['situacao_execucao'] !== '') {
            $query->where('situacao_execucao', '=', $filters['situacao_execucao']);
        }

        if (($filters['data_recurso'] ?? null) !== null && $filters['data_recurso'] !== '') {
            $query->where('data_recurso', '=', $filters['data_recurso']);
        }

        if (($filters['data_avaliacao'] ?? null) !== null && $filters['data_avaliacao'] !== '') {
            $query->where('data_avaliacao', '=', $filters['data_avaliacao']);
        }

        if (($filters['data_reavaliacao'] ?? null) !== null && $filters['data_reavaliacao'] !== '') {
            $query->where('data_reavaliacao', '=', $filters['data_reavaliacao']);
        }

        if (($filters['data_conclusao'] ?? null) !== null && $filters['data_conclusao'] !== '') {
            $query->where('data_conclusao', '=', $filters['data_conclusao']);
        }
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
    private function aplicarOrdemNaView(Builder $query, array $orderBy): void
    {
        $aplicou = $this->aplicarCampoOrdemNaView($query, $orderBy[0] ?? null);
        $this->aplicarCampoOrdemNaView($query, $orderBy[1] ?? null);

        if (! $aplicou) {
            $query->orderBy('unidadeHierarquia')->orderBy('numero');
        }
    }

    private function aplicarCampoOrdemNaView(Builder $query, mixed $order): bool
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

        if ($campo === 'participanteNome') {
            $query->orderBy('participanteNome', $direcao);

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
