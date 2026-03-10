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
        /** @var Usuario|null $usuario */
        $usuario = $this->query()->find($id);
        return $usuario;
    }

    public function findByCpfOrEmail(string $cpf, string $email, ?string $exceptId = null, bool $withTrashed = false): ?Usuario
    {
        /** @var Builder|Usuario $query */
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

        /** @var Usuario|null $usuario */
        $usuario = $query->first();
        return $usuario;
    }

    public function isParticipanteHabilitado(string $usuarioId, string $programaId): bool
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->query()->find($usuarioId);
        if (!$usuario) return false;

        /** @var \App\Models\ProgramaParticipante|null $participacao */
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

    public function getAtribuicoes(string $usuarioId, string $unidadeId): array
    {
        return UnidadeIntegranteAtribuicao::whereHas('vinculo', function ($q) use ($unidadeId, $usuarioId) {
                $q->where('unidade_id', $unidadeId)
                  ->where('usuario_id', $usuarioId);
            })
            ->pluck('atribuicao')
            ->toArray();
    }

    public function isLotacao(string $usuarioId, string $unidadeId): bool
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->query()->find($usuarioId);
        return $usuario && $usuario->lotacao !== null && $usuario->lotacao->unidade_id == $unidadeId;
    }

    public function findAllSemMatricula(): Collection
    {
        return $this->query()
            ->where(function ($q) {
                $q->whereNull('matricula')
                    ->orWhere('matricula', '');
            })
            ->whereNotNull('cpf')
            ->whereRaw("cpf <> ''")
            ->select('id', 'cpf')
            ->get();
    }

    public function findByCpfAndLotacao(string $cpf, string $unidadeId, string $lotacaoAtribuicao = 'LOTADO'): ?Usuario
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->query()
            ->where('cpf', $cpf)
            ->whereHas('lotacao', function ($q) use ($unidadeId) {
                $q->where('unidade_id', $unidadeId);
            })
            ->orderBy('created_at', 'asc')
            ->first();
            
        return $usuario;
    }

    public function findAllByCpf(string $cpf): Collection
    {
        return $this->query()
            ->with('unidades')
            ->where('cpf', $cpf)
            ->where('situacao_siape', '!=', \App\Enums\UsuarioSituacaoSiape::INATIVO->value)
            ->get();
    }

    public function getUnidadesVinculadas(string $cpf): Collection
    {
        return Unidade::select('unidades.*')
            ->join('unidades_integrantes as ui', 'unidades.id', '=', 'ui.unidade_id')
            ->join('usuarios as us', 'us.id', '=', 'ui.usuario_id')
            ->join('unidades_integrantes_atribuicoes as uia', 'ui.id', '=', 'uia.unidade_integrante_id')
            ->where('us.cpf', $cpf)
            ->where('us.situacao_siape', '!=', \App\Enums\UsuarioSituacaoSiape::INATIVO->value)
            ->whereNull('uia.deleted_at')
            ->distinct()
            ->get();
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

        if (isset($params['orderBy']) && is_array($params['orderBy'])) {
            foreach ($params['orderBy'] as $order) {
                if (!is_array($order)) continue;
                $field = $order[0] ?? null;
                if (!is_string($field) || $field === '' || str_contains($field, '.')) continue;
                $direction = strtolower((string) ($order[1] ?? 'asc'));
                $query->orderBy($field, $direction === 'desc' ? 'desc' : 'asc');
            }
        }
    }
}
