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
        $modelId = $filters['auditable_id'] ?? null;

        // Consulta base
        $query = Audit::query();

        if ($modelClass) {
            $query->where('auditable_type', $modelClass);
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

        $paginator->getCollection()->transform(function ($audit) {
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
            'count' => $paginator->total(),
            'rows' => $paginator->items(),
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

                // Adicione mais operadores conforme necessário, como '!=', 'like', etc.
            }
        }

        return $filters;
    }


//    public function showResponsaveis($usuario_ids)
//    {
//        $usuario_ids_flat = array_reduce($usuario_ids, 'array_merge', []);
//        return Usuario::whereIn('id', $usuario_ids_flat)->select('id', 'nome')->get();
//    }
}
