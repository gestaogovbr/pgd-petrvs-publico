<?php

declare(strict_types=1);

namespace App\Repository\RelatorioLacunaPlanoTrabalho\Eloquent;

use App\Enums\Atribuicao;
use App\Enums\PerfilEnum;
use App\Repository\RelatorioLacunaPlanoTrabalho\Contracts\RelatorioLacunaPlanoTrabalhoReadRepositoryContract;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use App\V2\Relatorio\LacunaPlanoTrabalho\LacunaPlanoTrabalhoCalculator;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class EloquentRelatorioLacunaPlanoTrabalhoReadRepository implements RelatorioLacunaPlanoTrabalhoReadRepositoryContract
{
    public function __construct(
        private readonly LacunaPlanoTrabalhoCalculator $calculator,
        private readonly UnidadeReadRepositoryContract $unidadeRepository,
    ) {}

    public function query(array $data): array
    {
        $filters = is_array($data['filters'] ?? null) ? $data['filters'] : [];
        $periodoInicio = isset($filters['periodo_inicio']) && $filters['periodo_inicio'] !== ''
            ? (string) $filters['periodo_inicio']
            : null;
        $periodoFim = isset($filters['periodo_fim']) && $filters['periodo_fim'] !== ''
            ? (string) $filters['periodo_fim']
            : null;
        $unidadeId = isset($filters['unidade_id']) && $filters['unidade_id'] !== ''
            ? (string) $filters['unidade_id']
            : null;
        $incluirSubordinadas = ! empty($filters['incluir_unidades_subordinadas']);

        if (! $periodoInicio || ! $periodoFim || ! $unidadeId) {
            return ['count' => 0, 'rows' => []];
        }

        $unidadeIds = $incluirSubordinadas
            ? $this->unidadeRepository->idsNaHierarquiaDe([$unidadeId])
            : [$unidadeId];

        $agentes = $this->buscarAgentesParticipantes($unidadeIds);
        if ($agentes === []) {
            return ['count' => 0, 'rows' => []];
        }

        $usuarioIds = array_column($agentes, 'id');
        $planosPorUsuario = $this->buscarPlanos($usuarioIds);
        $dispensasPorUsuario = $this->buscarDispensas($usuarioIds);
        $ocorrenciasPorUsuario = $this->buscarOcorrencias($usuarioIds, $periodoInicio, $periodoFim);

        $rows = [];
        foreach ($agentes as $agente) {
            $usuarioId = $agente['id'];
            $lacunas = $this->calculator->calcular(
                $periodoInicio,
                $periodoFim,
                $planosPorUsuario[$usuarioId] ?? [],
                $dispensasPorUsuario[$usuarioId] ?? [],
            );

            foreach ($lacunas as $lacuna) {
                $ocorrencias = $this->calculator->ocorrenciasComIntersecao(
                    $lacuna['data_inicio'],
                    $lacuna['data_fim'],
                    $ocorrenciasPorUsuario[$usuarioId] ?? [],
                );

                $rows[] = (object) [
                    'id' => $usuarioId . '|' . $lacuna['data_inicio'] . '|' . $lacuna['data_fim'],
                    'usuario_id' => $usuarioId,
                    'nome' => $agente['nome'],
                    'nome_exibicao' => $agente['nome_exibicao'],
                    'matricula' => $agente['matricula'],
                    'unidadeLotacao' => $agente['unidadeLotacao'],
                    'unidadeNome' => $agente['unidadeNome'],
                    'unidadeHierarquia' => $agente['unidadeHierarquia'],
                    'lacuna_inicio' => $lacuna['data_inicio'],
                    'lacuna_fim' => $lacuna['data_fim'],
                    'lacuna' => $this->formatarPeriodoLacuna($lacuna['data_inicio'], $lacuna['data_fim']),
                    'quantidade_dias' => $lacuna['quantidade_dias'],
                    'ocorrencias' => $ocorrencias,
                    'ocorrencias_texto' => $this->formatarOcorrencias($ocorrencias),
                ];
            }
        }

        $rows = $this->aplicarFiltrosTabela($rows, $filters);
        $rows = $this->aplicarOrdenacao($rows, $data['orderBy'] ?? []);

        $count = count($rows);
        $page = max((int) ($data['page'] ?? 1), 1);
        $limit = (int) ($data['limit'] ?? 0);
        if ($limit > 0) {
            $rows = array_slice($rows, ($page - 1) * $limit, $limit);
        }

        return ['count' => $count, 'rows' => array_values($rows)];
    }

    /**
     * @param  list<string>  $unidadeIds
     * @return list<array<string, mixed>>
     */
    private function buscarAgentesParticipantes(array $unidadeIds): array
    {
        $query = DB::table('usuarios as u')
            ->join('unidades_integrantes as ui', function (JoinClause $join): void {
                $join->on('ui.usuario_id', '=', 'u.id')
                    ->whereNull('ui.deleted_at');
            })
            ->join('unidades_integrantes_atribuicoes as uia', function (JoinClause $join): void {
                $join->on('uia.unidade_integrante_id', '=', 'ui.id')
                    ->whereNull('uia.deleted_at')
                    ->where('uia.atribuicao', Atribuicao::LOTADO->value);
            })
            ->join('unidades as uni_lotacao', function (JoinClause $join): void {
                $join->on('uni_lotacao.id', '=', 'ui.unidade_id')
                    ->whereNull('uni_lotacao.deleted_at');
            })
            ->join('perfis as perfil', function (JoinClause $join): void {
                $join->on('perfil.id', '=', 'u.perfil_id')
                    ->whereNull('perfil.deleted_at')
                    ->where('perfil.nivel', '<', PerfilEnum::COLABORADOR->value);
            })
            ->distinct()
            ->select([
                'u.id',
                'u.nome',
                DB::raw('COALESCE(u.nome_social, u.nome) AS nome_exibicao'),
                'u.matricula',
                'uni_lotacao.id as unidadeLotacao',
                'uni_lotacao.sigla as unidadeNome',
                DB::raw('fn_obter_unidade_hierarquia(uni_lotacao.id) AS unidadeHierarquia'),
            ])
            ->whereNull('u.deleted_at')
            ->where('u.participa_pgd', 'sim')
            ->whereIn('uni_lotacao.id', $unidadeIds);

        $this->excluirChefiaComDispensa($query);

        $rows = $query
            ->orderBy('unidadeHierarquia')
            ->orderBy('nome_exibicao')
            ->get();

        return array_map(static fn ($row) => (array) $row, $rows->all());
    }

    /**
     * Chefia titular (GESTOR) ou substituta (GESTOR_SUBSTITUTO) de qualquer unidade
     * que possua dispensa de Plano de Trabalho formalizada não é contabilizada como
     * tendo lacunas, independentemente do período de vigência da dispensa.
     */
    private function excluirChefiaComDispensa(Builder $query): void
    {
        if (!Schema::hasTable('dispensas_plano_trabalho')) {
            return;
        }

        $query->whereNotExists(function (Builder $sub): void {
            $sub->selectRaw('1')
                ->from('unidades_integrantes as ui_chefia')
                ->join('unidades_integrantes_atribuicoes as uia_chefia', function (JoinClause $join): void {
                    $join->on('uia_chefia.unidade_integrante_id', '=', 'ui_chefia.id')
                        ->whereNull('uia_chefia.deleted_at')
                        ->whereIn('uia_chefia.atribuicao', Atribuicao::chefiaTitularOuSubstituta());
                })
                ->join('dispensas_plano_trabalho as disp', function (JoinClause $join): void {
                    $join->on('disp.usuario_id', '=', 'ui_chefia.usuario_id')
                        ->whereNull('disp.deleted_at');
                })
                ->whereColumn('ui_chefia.usuario_id', 'u.id')
                ->whereNull('ui_chefia.deleted_at');
        });
    }

    /**
     * @param  list<string>  $usuarioIds
     * @return array<string, list<array{data_inicio: string, data_fim: string|null, status: string, encerrado_at: string|null}>>
     */
    private function buscarPlanos(array $usuarioIds): array
    {
        if ($usuarioIds === []) {
            return [];
        }
        $rows = DB::table('planos_trabalhos')
            ->select(['usuario_id', 'data_inicio', 'data_fim', 'status', 'encerrado_at'])
            ->whereNull('deleted_at')
            ->whereIn('usuario_id', $usuarioIds)
            ->get();

        $map = [];
        foreach ($rows as $row) {
            $map[$row->usuario_id][] = [
                'data_inicio' => (string) $row->data_inicio,
                'data_fim' => $row->data_fim !== null ? (string) $row->data_fim : null,
                'status' => (string) $row->status,
                'encerrado_at' => $row->encerrado_at !== null ? (string) $row->encerrado_at : null,
            ];
        }

        return $map;
    }

    /**
     * @param  list<string>  $usuarioIds
     * @return array<string, list<array{data_inicio: string, data_fim: string|null}>>
     */
    private function buscarDispensas(array $usuarioIds): array
    {
        if ($usuarioIds === [] || !Schema::hasTable('dispensas_plano_trabalho')) {
            return [];
        }
        $rows = DB::table('dispensas_plano_trabalho')
            ->select(['usuario_id', 'data_inicio', 'data_fim'])
            ->whereNull('deleted_at')
            ->whereIn('usuario_id', $usuarioIds)
            ->get();

        $map = [];
        foreach ($rows as $row) {
            $map[$row->usuario_id][] = [
                'data_inicio' => (string) $row->data_inicio,
                'data_fim' => $row->data_fim !== null ? (string) $row->data_fim : null,
            ];
        }

        return $map;
    }

    /**
     * @param  list<string>  $usuarioIds
     * @return array<string, list<array{tipo: string, data_inicio: string, data_fim: string|null}>>
     */
    private function buscarOcorrencias(array $usuarioIds, string $periodoInicio, string $periodoFim): array
    {
        if ($usuarioIds === []) {
            return [];
        }
        // Amplia busca para capturar ocorrências de lacunas estendidas
        $maxDataInicio = Carbon::parse($periodoFim)->addYear()->toDateString();
        $minDataFim = Carbon::parse($periodoInicio)->subYears(2)->toDateString();

        $rows = DB::table('afastamentos as a')
            ->leftJoin('tipos_motivos_afastamentos as t', function (JoinClause $join): void {
                $join->on('t.id', '=', 'a.tipo_motivo_afastamento_id')
                    ->whereNull('t.deleted_at');
            })
            ->select(['a.usuario_id', 't.nome as tipo', 'a.data_inicio', 'a.data_fim'])
            ->whereNull('a.deleted_at')
            ->whereIn('a.usuario_id', $usuarioIds)
            ->where('a.data_inicio', '<=', $maxDataInicio)
            ->where(function (Builder $condicao) use ($minDataFim): void {
                $condicao->whereNull('a.data_fim')
                    ->orWhere('a.data_fim', '>=', $minDataFim);
            })
            ->get();

        $map = [];
        foreach ($rows as $row) {
            $map[$row->usuario_id][] = [
                'tipo' => $row->tipo !== null ? (string) $row->tipo : 'Ocorrência',
                'data_inicio' => substr((string) $row->data_inicio, 0, 10),
                'data_fim' => $row->data_fim !== null ? substr((string) $row->data_fim, 0, 10) : null,
            ];
        }

        return $map;
    }

    private function formatarPeriodoLacuna(string $inicio, string $fim): string
    {
        return sprintf(
            '%s a %s',
            CarbonBr::format($inicio),
            CarbonBr::format($fim),
        );
    }

    /**
     * @param  list<array{tipo: string, data_inicio: string, data_fim: string|null}>  $ocorrencias
     */
    private function formatarOcorrencias(array $ocorrencias): string
    {
        if ($ocorrencias === []) {
            return 'Sem ocorrência';
        }
        $parts = [];
        foreach ($ocorrencias as $oc) {
            $fim = $oc['data_fim'] ? CarbonBr::format($oc['data_fim']) : '—';
            $parts[] = sprintf(
                '%s (%s a %s)',
                $oc['tipo'],
                CarbonBr::format($oc['data_inicio']),
                $fim,
            );
        }

        return implode('; ', $parts);
    }

    /**
     * @param  list<object>  $rows
     * @param  array<string, mixed>  $filters
     * @return list<object>
     */
    private function aplicarFiltrosTabela(array $rows, array $filters): array
    {
        $nome = $this->filtroTexto($filters, 'nome');
        $matricula = $this->filtroTexto($filters, 'matricula');
        $unidadeNome = $this->filtroTexto($filters, 'unidadeHierarquia')
            ?? $this->filtroTexto($filters, 'unidadeNome');
        $qtde = $filters['quantidade_dias'] ?? null;
        $lacuna = $this->filtroTexto($filters, 'lacuna');
        $ocorrencias = $this->filtroTexto($filters, 'ocorrencias_texto');

        return array_values(array_filter($rows, function ($row) use ($nome, $matricula, $unidadeNome, $qtde, $lacuna, $ocorrencias) {
            if ($nome !== null
                && stripos((string) $row->nome_exibicao, $nome) === false
                && stripos((string) $row->nome, $nome) === false) {
                return false;
            }
            if ($matricula !== null && stripos((string) ($row->matricula ?? ''), $matricula) === false) {
                return false;
            }
            if ($unidadeNome !== null && stripos((string) ($row->unidadeHierarquia ?? ''), $unidadeNome) === false) {
                return false;
            }
            if ($qtde !== null && $qtde !== '' && (int) $row->quantidade_dias !== (int) $qtde) {
                return false;
            }
            if ($lacuna !== null && stripos((string) ($row->lacuna ?? ''), $lacuna) === false) {
                return false;
            }
            if ($ocorrencias !== null && stripos((string) ($row->ocorrencias_texto ?? ''), $ocorrencias) === false) {
                return false;
            }

            return true;
        }));
    }

    /**
     * @param  list<object>  $rows
     * @param  array<int, array{0: string, 1: string}>  $orderBy
     * @return list<object>
     */
    private function aplicarOrdenacao(array $rows, array $orderBy): array
    {
        if ($orderBy === []) {
            usort($rows, static function ($a, $b) {
                $h = strcmp((string) ($a->unidadeHierarquia ?? ''), (string) ($b->unidadeHierarquia ?? ''));
                if ($h !== 0) {
                    return $h;
                }
                $n = strcmp((string) ($a->nome_exibicao ?? ''), (string) ($b->nome_exibicao ?? ''));
                if ($n !== 0) {
                    return $n;
                }

                return strcmp((string) $a->lacuna_inicio, (string) $b->lacuna_inicio);
            });

            return $rows;
        }

        [$field, $dir] = $orderBy[0];
        $factor = strtolower((string) $dir) === 'desc' ? -1 : 1;
        usort($rows, static function ($a, $b) use ($field, $factor) {
            $va = $a->{$field} ?? null;
            $vb = $b->{$field} ?? null;

            return $factor * strcmp((string) $va, (string) $vb);
        });

        return $rows;
    }

    /**
     * @param  array<string, mixed>  $filters
     */
    private function filtroTexto(array $filters, string $field): ?string
    {
        $valor = $filters[$field] ?? null;
        if ($valor === null || $valor === '') {
            return null;
        }

        $texto = trim((string) $valor, " \t\n\r\0\x0B%");

        return $texto === '' ? null : $texto;
    }
}

/**
 * @internal helper de formatação BR sem acoplar Carbon facade em strings de view
 */
final class CarbonBr
{
    public static function format(string $ymd): string
    {
        if (preg_match('/^(\d{4})-(\d{2})-(\d{2})/', $ymd, $m)) {
            return "{$m[3]}/{$m[2]}/{$m[1]}";
        }

        return $ymd;
    }
}
