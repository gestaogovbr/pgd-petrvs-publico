<?php

declare(strict_types=1);

namespace App\Repository\Usuario\Eloquent;

use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use App\Services\UtilService;
use App\Services\RawWhere;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @extends AbstractEloquentReadRepository<Usuario>
 */
class EloquentUsuarioReadRepository extends AbstractEloquentReadRepository implements UsuarioReadRepositoryContract
{
    public function __construct(Usuario $model)
    {
        $this->model = $model;
    }

    public function findById(string|int $id): ?Usuario
    {
        return $this->query()->find($id);
    }

    public function findByCpfOrEmail(string $cpf, string $email, ?string $exceptId = null, bool $withTrashed = false): ?Usuario
    {
        $query = $this->query();
        
        if ($withTrashed) {
            $query->withTrashed();
        }

        $query->where(function ($q) use ($cpf, $email) {
            $q->where('cpf', UtilService::onlyNumbers($cpf))
              ->orWhere('email', $email);
        });

        if ($exceptId) {
            $query->where('id', '!=', $exceptId);
        }

        return $query->first();
    }

    public function hasLotacao(string $usuarioId, string $unidadeId, bool $subordinadas = true): bool
    {
        $areasTrabalhoWhere = $this->areasTrabalhoWhere($usuarioId, $subordinadas);
        // Using Unidade model here because the original query was on Unidade
        return Unidade::where("id", $unidadeId)
            ->whereRaw($areasTrabalhoWhere)
            ->exists();
    }

    public function isGestorUnidadeRecursivo(string $usuarioId, string $unidadeId): bool
    {
        $result = DB::select("
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

    public function isParticipanteHabilitado(string $usuarioId, string $programaId): bool
    {
        $usuario = $this->query()->find($usuarioId);
        if (!$usuario) return false;

        $participacao = $usuario->participacoesProgramas()
            ->where('programa_id', $programaId)
            ->first();
            
        return $participacao ? (bool) $participacao->habilitado : false;
    }

    public function isIntegrante(string $usuarioId, string $unidadeId, string $atribuicao): bool
    {
        return UnidadeIntegranteAtribuicao::where('atribuicao', $atribuicao)
            ->whereHas('vinculo', function ($q) use ($unidadeId, $usuarioId) {
                $q->where('unidade_id', $unidadeId)
                  ->where('usuario_id', $usuarioId);
            })
            ->exists();
    }

    public function isLotacao(string $usuarioId, string $unidadeId): bool
    {
        $usuario = $this->query()->find($usuarioId);
        return $usuario && $usuario->lotacao !== null && $usuario->lotacao->unidade_id == $unidadeId;
    }

    /**
     * Helper to generate the raw where clause for areas de trabalho
     */
    private function areasTrabalhoWhere(string $usuarioId, bool $subordinadas, string $prefix = ""): string
    {
        $where = [];
        $prefix = empty($prefix) ? "" : $prefix . ".";
        $usuario = $this->query()->find($usuarioId);
        
        if (!$usuario) return "false";

        foreach ($usuario->areasTrabalho as $lotacao) {
            $where[] = $prefix . "id = '" . $lotacao->unidade_id . "'";
            if ($subordinadas)
                $where[] = $prefix . "path like '%" . $lotacao->unidade_id . "%'";
        }
        $result = implode(" OR ", $where);
        return empty($result) ? "false" : "(" . $result . ")";
    }

    public function search(array $params, int $limit = 0)
    {
        $query = $this->query();
        $this->applySearchFilters($query, $params);
        
        if ($limit > 0) {
            return $query->paginate($limit);
        }
        
        return $query->get();
    }

    /**
     * Applies filters similar to proxyQuery
     */
    private function applySearchFilters(Builder $query, array $params): void
    {
        // This is a simplified adaptation of proxyQuery logic.
        // In a full refactor, we should clean up the $params structure.
        // Assuming $params['where'] contains the conditions.

        if (isset($params['where']) && is_array($params['where'])) {
            foreach ($params['where'] as $condition) {
                if (is_array($condition)) {
                     // Handle special conditions
                    if ($condition[0] == "lotacao") {
                        $query->whereHas('areasTrabalho', function (Builder $q) use ($condition) {
                            $q->where('unidade_id', $condition[2]);
                        });
                    } elseif ($condition[0] == "habilitado") {
                         if ($condition[2] == true) {
                            $query->whereHas('participacoesProgramas', function (Builder $q) {
                                $q->where('habilitado', 1);
                            });
                        } elseif ($condition[2] !== null) {
                            $query->whereHas('participacoesProgramas', function (Builder $q) {
                                $q->where('habilitado', 0);
                            });
                        }
                    } elseif ($condition[0] == "atribuicoes") {
                        $query->whereHas('unidadesIntegranteAtribuicoes', function (Builder $q) use ($condition) {
                            $q->whereIn('atribuicao', $condition[2]);
                        });
                    } elseif ($condition[0] == "subordinadas") {
                        // Handled separately or ignored if not relevant for query building
                    } elseif ($condition[0] == "deleted_at") {
                        if ($condition[2] === null) {
                             $query->whereNull('deleted_at');
                        }
                    } else {
                         // Standard where
                         if (count($condition) == 3) {
                             $query->where($condition[0], $condition[1], $condition[2]);
                         }
                    }
                } elseif ($condition instanceof RawWhere) {
                    $query->whereRaw($condition->expression, $condition->params);
                }
            }
        }
        
        // Handle text search if present
        if (isset($params['query']) && !empty($params['query'])) {
             $text = "%" . str_replace(" ", "%", $params['query']) . "%";
             $fields = $params['fields'] ?? ['nome', 'email', 'cpf', 'matricula', 'apelido'];
             
             $query->where(function($q) use ($fields, $text) {
                 foreach ($fields as $field) {
                     $q->orWhere($field, 'like', $text);
                 }
             });
        }
    }
}
