<?php

namespace App\Services;

use App\Models\Usuario;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;
use OwenIt\Auditing\Models\Audit;
use Illuminate\Database\Eloquent\Model;
use App\Services\ServiceBase;

class ChangeService extends ServiceBase
{
    public function query($data)
    {
        $filters = $this->prepareFilters($data);
        $modelClass = $filters['auditable_type'] ?? null;
        $modelId = $filters['auditable_id'] ?? $filters['row_id'] ?? null;

        if (!$modelClass && $modelId) {
            $modelClass = Audit::where('auditable_id', $modelId)
                ->orderByDesc('created_at')
                ->value('auditable_type');
        }

        $query = Audit::query();

        if ($modelClass) {
            $auditableType = str_replace('\\\\', '\\', $modelClass);
            $query->where('auditable_type', $auditableType);
        }

        if ($modelId) {
            $query->where('auditable_id', $modelId);
        }

        if (filled($filters['type'] ?? null)) {
            $query->where('event', $filters['type']);
        }

        if (filled($filters['user_id'] ?? null)) {
            $query->where('user_id', $filters['user_id']);
        }

        if (filled($filters['date_from'] ?? null)) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (filled($filters['date_to'] ?? null)) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        if (filled($filters['search'] ?? null)) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('old_values', 'like', "%{$search}%")
                    ->orWhere('new_values', 'like', "%{$search}%")
                    ->orWhere('tags', 'like', "%{$search}%")
                    ->orWhere('url', 'like', "%{$search}%");
            });
        }

        $query->with('user');

        $page = request('page', 1);
        $perPage = request('per_page', 20);

        $paginator = $query->orderByDesc('created_at')->paginate($perPage, ['*'], 'page', $page);

        $relatedAudits = collect();
        if ($modelClass && $modelId) {
            $relatedAudits = $this->getRelatedAudits($modelClass,  $modelId, $filters);
        }

        $allAudits = $paginator->getCollection()->concat($relatedAudits)->sortByDesc('created_at');

        $allAudits = $allAudits->map(function ($audit) {
            $audit->old_values = is_string($audit->old_values)
                ? json_decode($audit->old_values, true)
                : $audit->old_values;

            $audit->new_values = is_string($audit->new_values)
                ? json_decode($audit->new_values, true)
                : $audit->new_values;

            $audit->usuario = optional($audit->user)->nome ?? 'Desconhecido';

            $related = null;
            if (class_exists($audit->auditable_type)) {
                $related = $audit->auditable_type::find($audit->auditable_id);
            }

            $audit->relacionado = $related instanceof Model ? $related->toArray() : null;

            return $audit;
        });

        return [
            'count' => $allAudits->count(),
            'rows' => $allAudits->values(),
            'extra' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
            ],
        ];
    }

    private function prepareFilters(array $data): array
    {
        $filters = $data['filters'] ?? [];

        foreach ($data['where'] ?? [] as $condition) {
            [$field, $operator, $value] = $condition;

            switch ($operator) {
                case '>=':
                    if ($field === 'date_time') {
                        $filters['date_from'] = $value;
                    }
                    break;

                case '<=':
                    if ($field === 'date_time') {
                        $filters['date_to'] = $value;
                    }
                    break;

                case '==':
                    $filters[$field] = $value;
                    break;

                case 'in':
                    $filters[$field] = ['in' => $value];
                    break;
            }
        }

        return $filters;
    }

    /**
     * Retorna audits de relacionamentos relacionados ao modelo principal.
     */
    private function getRelatedAudits(string $modelClass, string $modelId, array $filters = []): \Illuminate\Support\Collection
    {
        $relatedAudits = collect();
        $modelInstance = new $modelClass;

        if (!method_exists($modelInstance, 'getAuditRelations')) {
            return $relatedAudits;
        }

        foreach ($modelInstance->getAuditRelations() as $relation) {
            $relatedIds = collect();

            $getModelQuery = function ($model) {
                $query = $model::query();
                if (in_array(\Illuminate\Database\Eloquent\SoftDeletes::class, class_uses_recursive($model))) {
                    $query->withTrashed();
                }
                return $query;
            };

            if (isset($relation['via'])) {
                $viaModel = $relation['via']['model'];
                $viaKey = $relation['via']['foreign_key'];
                $viaQuery = $getModelQuery($viaModel);

                $viaIds = $viaQuery->where($viaKey, $modelId)->pluck('id');
                if ($viaIds->isEmpty()) {
                    continue;
                }

                $relatedQuery = $getModelQuery($relation['model']);
                $relatedIds = $relatedQuery->whereIn($relation['foreign_key'], $viaIds)->pluck('id');
            } else {
                $relatedQuery = $getModelQuery($relation['model']);
                $relatedIds = $relatedQuery->where($relation['foreign_key'], $modelId)->pluck('id');
            }

            if ($relatedIds->isEmpty()) {
                continue;
            }

            $relatedIds->unique()->chunk(500)->each(function ($chunk) use ($relation, &$relatedAudits, $filters) {
                $query = Audit::where('auditable_type', $relation['model'])
                    ->whereIn('auditable_id', $chunk->toArray());

                if (filled($filters['type'] ?? null)) {
                    $query->where('event', $filters['type']);
                }

                if (filled($filters['user_id'] ?? null)) {
                    $query->where('user_id', $filters['user_id']);
                }

                if (filled($filters['date_from'] ?? null)) {
                    $query->whereDate('created_at', '>=', $filters['date_from']);
                }

                if (filled($filters['date_to'] ?? null)) {
                    $query->whereDate('created_at', '<=', $filters['date_to']);
                }

                if (filled($filters['search'] ?? null)) {
                    $search = $filters['search'];
                    $query->where(function ($q) use ($search) {
                        $q->where('old_values', 'like', "%{$search}%")
                            ->orWhere('new_values', 'like', "%{$search}%")
                            ->orWhere('tags', 'like', "%{$search}%")
                            ->orWhere('url', 'like', "%{$search}%");
                    });
                }

                $audits = $query->get();
                $relatedAudits = $relatedAudits->merge($audits);
            });
        }

        return $relatedAudits->unique('id')->sortByDesc('created_at');
    }



}
