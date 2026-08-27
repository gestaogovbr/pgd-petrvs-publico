<?php

declare(strict_types=1);

namespace App\Repository\RelatorioLacunaPlanoTrabalho\Eloquent;

use App\Repository\RelatorioLacunaPlanoTrabalho\Contracts\RelatorioLacunaPlanoTrabalhoReadRepositoryContract;
use App\Services\UnidadeService;
use App\V2\Relatorio\LacunaPlanoTrabalho\LacunaPlanoTrabalhoCalculator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class EloquentRelatorioLacunaPlanoTrabalhoReadRepository implements RelatorioLacunaPlanoTrabalhoReadRepositoryContract
{
    public function __construct(
        private readonly LacunaPlanoTrabalhoCalculator $calculator,
    ) {}

    public function query(array $data): array
    {
        $where = $data['where'] ?? [];
        $periodoInicio = $this->extractValue($where, 'periodo_inicio');
        $periodoFim = $this->extractValue($where, 'periodo_fim');
        $unidadeId = $this->extractValue($where, 'unidade_id');
        $incluirSubordinadas = (bool) $this->extractValue($where, 'incluir_unidades_subordinadas');

        if (!$periodoInicio || !$periodoFim || !$unidadeId) {
            return ['count' => 0, 'rows' => []];
        }

        $unidadeIds = [$unidadeId];
        if ($incluirSubordinadas) {
            $subordinadasIds = app(UnidadeService::class)->subordinadas($unidadeId)->pluck('id')->all();
            $unidadeIds = array_values(array_unique(array_merge($unidadeIds, $subordinadasIds)));
        }

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

        $rows = $this->aplicarFiltrosTabela($rows, $where);
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
        $placeholders = implode(',', array_fill(0, count($unidadeIds), '?'));
        $sql = <<<SQL
            SELECT DISTINCT
                u.id,
                u.nome,
                COALESCE(u.nome_social, u.nome) AS nome_exibicao,
                u.matricula,
                uni_lotacao.id AS unidadeLotacao,
                uni_lotacao.sigla AS unidadeNome,
                fn_obter_unidade_hierarquia(uni_lotacao.id) AS unidadeHierarquia
            FROM usuarios u
            INNER JOIN unidades_integrantes ui
                ON ui.usuario_id = u.id AND ui.deleted_at IS NULL
            INNER JOIN unidades_integrantes_atribuicoes uia
                ON uia.unidade_integrante_id = ui.id
                AND uia.deleted_at IS NULL
                AND uia.atribuicao = 'LOTADO'
            INNER JOIN unidades uni_lotacao
                ON uni_lotacao.id = ui.unidade_id AND uni_lotacao.deleted_at IS NULL
            WHERE u.deleted_at IS NULL
              AND u.participa_pgd = 'sim'
              AND uni_lotacao.id IN ($placeholders)
            ORDER BY unidadeHierarquia ASC, nome_exibicao ASC
        SQL;

        return array_map(static fn ($row) => (array) $row, DB::select($sql, $unidadeIds));
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
        $placeholders = implode(',', array_fill(0, count($usuarioIds), '?'));
        $rows = DB::select(<<<SQL
            SELECT usuario_id, data_inicio, data_fim, status, encerrado_at
            FROM planos_trabalhos
            WHERE deleted_at IS NULL
              AND usuario_id IN ($placeholders)
        SQL, $usuarioIds);

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
        $placeholders = implode(',', array_fill(0, count($usuarioIds), '?'));
        $rows = DB::select(<<<SQL
            SELECT usuario_id, data_inicio, data_fim
            FROM dispensas_plano_trabalho
            WHERE deleted_at IS NULL
              AND usuario_id IN ($placeholders)
        SQL, $usuarioIds);

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
        $placeholders = implode(',', array_fill(0, count($usuarioIds), '?'));
        // Amplia busca para capturar ocorrências de lacunas estendidas
        $rows = DB::select(<<<SQL
            SELECT
                a.usuario_id,
                COALESCE(t.nome, 'Ocorrência') AS tipo,
                a.data_inicio,
                a.data_fim
            FROM afastamentos a
            LEFT JOIN tipos_motivos_afastamentos t
                ON t.id = a.tipo_motivo_afastamento_id AND t.deleted_at IS NULL
            WHERE a.deleted_at IS NULL
              AND a.usuario_id IN ($placeholders)
              AND a.data_inicio <= DATE_ADD(?, INTERVAL 1 YEAR)
              AND (a.data_fim IS NULL OR a.data_fim >= DATE_SUB(?, INTERVAL 2 YEAR))
        SQL, [...$usuarioIds, $periodoFim, $periodoInicio]);

        $map = [];
        foreach ($rows as $row) {
            $map[$row->usuario_id][] = [
                'tipo' => (string) $row->tipo,
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
     * @param  array<int, mixed>  $where
     * @return list<object>
     */
    private function aplicarFiltrosTabela(array $rows, array $where): array
    {
        $nome = $this->extractValue($where, 'nome');
        $matricula = $this->extractValue($where, 'matricula');
        $unidadeNome = $this->extractValue($where, 'unidadeHierarquia')
            ?? $this->extractValue($where, 'unidadeNome');
        $qtde = $this->extractValue($where, 'quantidade_dias');
        $lacuna = $this->extractValue($where, 'lacuna');
        $ocorrencias = $this->extractValue($where, 'ocorrencias_texto');

        return array_values(array_filter($rows, function ($row) use ($nome, $matricula, $unidadeNome, $qtde, $lacuna, $ocorrencias) {
            if ($nome && stripos((string) $row->nome_exibicao, trim($nome, '%')) === false
                && stripos((string) $row->nome, trim($nome, '%')) === false) {
                return false;
            }
            if ($matricula && stripos((string) ($row->matricula ?? ''), trim($matricula, '%')) === false) {
                return false;
            }
            if ($unidadeNome && stripos((string) ($row->unidadeHierarquia ?? ''), trim($unidadeNome, '%')) === false) {
                return false;
            }
            if ($qtde !== null && $qtde !== '' && (int) $row->quantidade_dias !== (int) $qtde) {
                return false;
            }
            if ($lacuna && stripos((string) ($row->lacuna ?? ''), trim($lacuna, '%')) === false) {
                return false;
            }
            if ($ocorrencias && stripos((string) ($row->ocorrencias_texto ?? ''), trim($ocorrencias, '%')) === false) {
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
     * @param  array<int, mixed>  $where
     */
    private function extractValue(array &$where, string $field): mixed
    {
        foreach ($where as $i => $condition) {
            if (is_array($condition) && ($condition[0] ?? null) === $field) {
                unset($where[$i]);

                return $condition[2] ?? null;
            }
        }

        return null;
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
