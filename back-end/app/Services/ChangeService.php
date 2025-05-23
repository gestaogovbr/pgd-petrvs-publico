<?php

namespace App\Services;

use App\Services\ServiceBase;
use ReflectionClass;
use App\Models\Usuario;
use App\Models\Change;
use ReflectionMethod;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use OwenIt\Auditing\Models\Audit;


class ChangeService extends ServiceBase
{

    public function query($data)
    {
        $modelId = $data['where'][0][2] ?? null;
        $filters = $data['filters'] ?? [];
        // Processa cláusulas WHERE do payload
        foreach ($data['where'] ?? [] as $condition) {
            [$field, $operator, $value] = $condition;

            // Converte campos date_time para filtros esperados
            if ($field === 'date_time') {
                if ($operator === '>=') $filters['date_from'] = $value;
                if ($operator === '<=') $filters['date_to'] = $value;
            }

            // Se houver filtro por ID do modelo
            if ($field === 'auditable_id' && $operator === '=') {
                $modelId = $value;
            }
        }
        if (!$modelId) {
            return [
                'count' => 0,
                'rows' => [],
                'extra' => ['error' => 'ID do modelo não informado.']
            ];
        }

        $firstAudit = Audit::where('auditable_id', $modelId)->first();

        if (!$firstAudit) {
            return [
                'count' => 0,
                'rows' => [],
                'extra' => ['error' => 'Nenhuma auditoria encontrada.']
            ];
        }

        $modelClass = $firstAudit->auditable_type;
        $modelInstance = $modelClass::find($modelId);

        if (!$modelInstance) {
            return [
                'count' => 0,
                'rows' => [],
                'extra' => ['error' => 'Modelo não encontrado.']
            ];
        }

        // Aplicação de filtros no modelo e relacionados
        $audits = $this->getModelAudits($modelClass, $modelId, $filters);
        $relationAudits = $this->getRelatedAudits($modelInstance, $filters);

        $allAudits = $audits->merge($relationAudits)->sortByDesc('created_at')->values();

        // Paginação
        $page = request('page', 1);
        $perPage = request('per_page', 20);

        $paginator = new \Illuminate\Pagination\LengthAwarePaginator(
            $allAudits->forPage($page, $perPage),
            $allAudits->count(),
            $perPage,
            $page
        );

        return [
            'count' => $paginator->total(),
            'rows' => $paginator->items(),
            'extra' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'model' => class_basename($modelClass),
                'model_id' => $modelId,
                'relacoes' => $this->getModelRelations($modelInstance),
            ],
        ];
    }


    public function proxyRows($rows)
    {

        try {
            if (empty($rows) || !isset($rows[0]['table_name'])) {
                return [];
            }

            $model = Str::singular($rows[0]['table_name']);
            $modelClass = "App\\Models\\" . Str::studly($model);
            $relacoes = [];

            if (class_exists($modelClass)) {
                $relacoes = $this->getModelRelations($modelClass);
            }

            foreach ($rows as $row) {
                $row['_metadata'] = array(
                    'relacoes' => $relacoes,
                    'responsavel' => (DB::table(config('petrvs.schemas.tenant_aplicacao') . '.usuarios')->where('id', $row['user_id'])->first())->nome
                );
            }
            return $rows;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showResponsaveis($usuario_ids)
    {
        $usuario_ids_flat = array_reduce($usuario_ids, 'array_merge', []);
        $usuarios = Usuario::whereIn('id', $usuario_ids_flat)->select('id', 'nome')->get();
        return $usuarios;
    }

    function verificarRelacionamento($modelName, $relationshipMethod)
    {
        try {
            $modelInstance = new $modelName;
            $method = new ReflectionMethod($modelName, $relationshipMethod);
            $ignoreMethods = ['touch', 'push', 'getDateFormat', 'updateTimestamps', 'freshTimestampString', 'restore'];

            if ($method->getNumberOfParameters() === 0 && !in_array($relationshipMethod, $ignoreMethods)) {
                $relation = $modelInstance->$relationshipMethod();
                if (!is_null($relation) && $relation instanceof Relation) {
                    return true;
                }
            }

            return false;
        } catch (\Throwable $th) {
            throw $th;
        }

    }

    protected function getModelAudits(string $modelClass, string $modelId, array $filters = [])
    {
        $query = Audit::where('auditable_type', $modelClass)
            ->where('auditable_id', $modelId);

        if (!empty($filters['event'])) {
            $query->where('event', $filters['event']);
        }

        if (!empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        if (!empty($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('old_values', 'like', "%$search%")
                    ->orWhere('new_values', 'like', "%$search%")
                    ->orWhere('tags', 'like', "%$search%")
                    ->orWhere('url', 'like', "%$search%");
            });
        }

        return $query->orderByDesc('created_at')->get()->map(function ($audit) use ($modelClass) {
            $audit->source = class_basename($modelClass);
            $audit->old_values = json_decode($audit->old_values, true);
            $audit->new_values = json_decode($audit->new_values, true);
            $audit->usuario = optional($audit->user)->nome ?? 'Desconhecido';
            return $audit;
        });
    }

    protected function getRelatedAudits(Model $modelInstance, array $filters = [])
    {
        $audits = collect();
        $relacoes = $this->getModelRelations($modelInstance);

        foreach ($relacoes as $relationName) {
            try {
                $relation = $modelInstance->$relationName();

                if ($relation instanceof Relation) {
                    $related = $relation->getResults();

                    $relatedItems = collect();
                    if ($related instanceof \Illuminate\Support\Collection) {
                        $relatedItems = $related;
                    } elseif ($related instanceof Model) {
                        $relatedItems = collect([$related]);
                    }

                    foreach ($relatedItems as $item) {
                        $query = Audit::where('auditable_type', get_class($item))
                            ->where('auditable_id', $item->id);

                        if (!empty($filters['event'])) {
                            $query->where('event', $filters['event']);
                        }

                        if (!empty($filters['user_id'])) {
                            $query->where('user_id', $filters['user_id']);
                        }

                        if (!empty($filters['date_from'])) {
                            $query->whereDate('created_at', '>=', $filters['date_from']);
                        }

                        if (!empty($filters['date_to'])) {
                            $query->whereDate('created_at', '<=', $filters['date_to']);
                        }

                        if (!empty($filters['search'])) {
                            $search = $filters['search'];
                            $query->where(function ($q) use ($search) {
                                $q->where('old_values', 'like', "%$search%")
                                    ->orWhere('new_values', 'like', "%$search%")
                                    ->orWhere('tags', 'like', "%$search%")
                                    ->orWhere('url', 'like', "%$search%");
                            });
                        }

                        $relatedAudits = $query->orderByDesc('created_at')->get()->map(function ($audit) use ($relationName) {
                            $audit->source = $relationName;
                            $audit->old_values = json_decode($audit->old_values, true);
                            $audit->new_values = json_decode($audit->new_values, true);
                            $audit->usuario = optional($audit->user)->nome ?? 'Desconhecido';
                            return $audit;
                        });

                        $audits = $audits->merge($relatedAudits);
                    }
                }
            } catch (\Throwable $e) {
                continue;
            }
        }

        return $audits;
    }



}
