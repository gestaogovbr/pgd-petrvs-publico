<?php

declare(strict_types=1);

namespace App\Repository\Unidade\Eloquent;

use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use Illuminate\Support\Facades\DB;

/**
 * @extends AbstractEloquentReadRepository<Unidade>
 */
class EloquentUnidadeReadRepository extends AbstractEloquentReadRepository implements UnidadeReadRepositoryContract
{
    public function __construct(Unidade $model)
    {
        $this->model = $model;
    }

    public function hasUsuarioLotacao(string $unidadeId, string $usuarioId, bool $subordinadas = true): bool
    {
        $areasTrabalhoWhere = $this->getAreasTrabalhoWhereClause($usuarioId, $subordinadas);
        return $this->query()->where("id", $unidadeId)
            ->whereRaw($areasTrabalhoWhere)
            ->exists();
    }

    public function isUsuarioGestorRecursivo(string $unidadeId, string $usuarioId): bool
    {

        $result = $this->model->getConnection()->select("
            WITH RECURSIVE unidade_hierarchy AS (
                SELECT id, unidade_pai_id, 0 as level
                FROM unidades 
                WHERE id = ?
                
                UNION ALL
                
                SELECT u.id, u.unidade_pai_id, uh.level + 1
                FROM unidades u
                INNER JOIN unidade_hierarchy uh ON u.id = uh.unidade_pai_id
                WHERE uh.level < 10
            )
            SELECT COUNT(*) as count
            FROM unidade_hierarchy uh
            INNER JOIN unidades_integrantes ui ON ui.unidade_id = uh.id
            INNER JOIN unidades_integrantes_atribuicoes uia ON uia.unidade_integrante_id = ui.id
            WHERE ui.usuario_id = ?
              AND uia.atribuicao IN ('GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO')
              AND ui.deleted_at IS NULL
              AND uia.deleted_at IS NULL
        ", [$unidadeId, $usuarioId]);
        
        return $result[0]->count > 0;
    }

    /**
     * Helper to generate the raw where clause for areas de trabalho
     */
    public function getAreasTrabalhoWhereClause(string $usuarioId, bool $subordinadas, string $prefix = ""): string
    {
        $where = [];
        $prefix = empty($prefix) ? "" : $prefix . ".";
        $usuario = Usuario::find($usuarioId);
        
        if (!$usuario) {
            return "false";
        }

        foreach ($usuario->areasTrabalho as $lotacao) {
            $where[] = $prefix . "id = '" . $lotacao->unidade_id . "'";
            if ($subordinadas)
                $where[] = $prefix . "path like '%" . $lotacao->unidade_id . "%'";
        }
        $result = implode(" OR ", $where);
        return empty($result) ? "false" : "(" . $result . ")";
    }
}
