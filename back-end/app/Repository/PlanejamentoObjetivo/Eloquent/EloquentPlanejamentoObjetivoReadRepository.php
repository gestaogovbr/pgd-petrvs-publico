<?php

declare(strict_types=1);

namespace App\Repository\PlanejamentoObjetivo\Eloquent;

use App\Models\PlanejamentoObjetivo;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;
use Illuminate\Support\Facades\DB;

/**
 * @extends AbstractEloquentReadRepository<PlanejamentoObjetivo>
 */
class EloquentPlanejamentoObjetivoReadRepository extends AbstractEloquentReadRepository implements PlanejamentoObjetivoReadRepositoryContract
{
    public function __construct(PlanejamentoObjetivo $model)
    {
        $this->model = $model;
    }

    /** @return list<string> */
    public function coletarIdsFechamento(string $objetivoId): array
    {
        $seen = [];
        $queue = [$objetivoId];

        while ($queue !== []) {
            $id = array_shift($queue);
            if (isset($seen[$id])) {
                continue;
            }
            $seen[$id] = true;

            $row = DB::selectOne(
                'SELECT objetivo_pai_id, objetivo_superior_id FROM planejamentos_objetivos WHERE id = ? AND deleted_at IS NULL',
                [$id]
            );
            if ($row === null) {
                continue;
            }

            foreach ([$row->objetivo_pai_id, $row->objetivo_superior_id] as $parentId) {
                if (is_string($parentId) && $parentId !== '' && !isset($seen[$parentId])) {
                    $queue[] = $parentId;
                }
            }

            $childRows = DB::select(
                'SELECT id FROM planejamentos_objetivos WHERE deleted_at IS NULL AND (objetivo_pai_id = ? OR objetivo_superior_id = ?)',
                [$id, $id]
            );
            foreach ($childRows as $child) {
                $childId = (string) $child->id;
                if (!isset($seen[$childId])) {
                    $queue[] = $childId;
                }
            }
        }

        return array_keys($seen);
    }

    /**
     * Ids do objetivo e de todos os itens hierarquicamente subordinados
     * (descendentes via objetivo_pai_id ou objetivo_superior_id), sem subir para os pais.
     *
     * @return list<string>
     */
    public function coletarIdsSubordinados(string $objetivoId): array
    {
        $seen = [];
        $queue = [$objetivoId];

        while ($queue !== []) {
            $id = array_shift($queue);
            if (isset($seen[$id])) {
                continue;
            }
            $seen[$id] = true;

            $childRows = DB::select(
                'SELECT id FROM planejamentos_objetivos WHERE deleted_at IS NULL AND (objetivo_pai_id = ? OR objetivo_superior_id = ?)',
                [$id, $id]
            );
            foreach ($childRows as $child) {
                $childId = (string) $child->id;
                if (!isset($seen[$childId])) {
                    $queue[] = $childId;
                }
            }
        }

        return array_keys($seen);
    }

    /**
     * @param  list<string>  $ids
     * @return array<string, string>
     */
    public function lookupNomes(array $ids): array
    {
        $ids = array_values(array_unique(array_filter(array_map('strval', $ids))));
        if ($ids === []) {
            return [];
        }

        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $rows = DB::select(
            "SELECT id, nome FROM planejamentos_objetivos WHERE id IN ({$placeholders}) AND deleted_at IS NULL",
            $ids
        );

        $out = [];
        foreach ($rows as $row) {
            $out[(string) $row->id] = (string) $row->nome;
        }

        return $out;
    }

    public function buscarDadosGeraisPainel(string $objetivoId): ?\stdClass
    {
        return DB::selectOne(<<<SQL
            SELECT
                po.id AS objetivo_id,
                po.nome AS objetivo_nome,
                pla.nome AS planejamento_nome,
                COALESCE(tpo.nome, '') AS tipo_objetivo_nome,
                COALESCE(et.nome, '') AS eixo_tematico_nome
            FROM planejamentos_objetivos po
            INNER JOIN planejamentos pla ON pla.id = po.planejamento_id
            LEFT JOIN planejamentos_tipos_objetivos tpo
                ON tpo.id = po.tipo_objetivo_id AND tpo.deleted_at IS NULL
            INNER JOIN eixos_tematicos et ON et.id = po.eixo_tematico_id
            WHERE po.id = ? AND po.deleted_at IS NULL
        SQL, [$objetivoId]);
    }
}
