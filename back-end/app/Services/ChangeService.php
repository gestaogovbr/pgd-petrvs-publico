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
    $modelId = $data['where'][0][2];

    $firstAudit = Audit::where('auditable_id', $modelId)->first();

    if (!$firstAudit) {
        return [
            'count' => 0,
            'rows' => [],
            'extra' => ['error' => 'Nenhuma auditoria encontrada.']
        ];
    }

    $modelClass = $firstAudit->auditable_type;
    $modelInstance = $modelInstance = $modelClass::find($modelId);


    $audits = collect();

    // Auditorias do modelo principal
    $mainAudits = Audit::where('auditable_type', $modelClass)
        ->where('auditable_id', $modelId)
        ->get()
        ->map(function ($audit) use ($modelClass) {
            $audit->source = class_basename($modelClass); // ou 'principal'
            return $audit;
        });

    $audits = $audits->merge($mainAudits);

    // Auditorias das relações
    $relacoes = $this->getModelRelations($modelInstance);

    foreach ($relacoes as $relationName) {
        try {
            $relation = $modelInstance->$relationName();

            if ($relation instanceof Relation) {
                $related = $relation->getResults();

                if ($related instanceof \Illuminate\Support\Collection) {
                    $relatedItems = $related;
                } elseif ($related) {
                    $relatedItems = collect([$related]);
                } else {
                    continue;
                }

                foreach ($relatedItems as $item) {
                    $relatedAudits = Audit::where('auditable_type', get_class($item))
                        ->where('auditable_id', $item->id)
                        ->get()
                        ->map(function ($audit) use ($relationName) {
                            $audit->source = $relationName;
                            return $audit;
                        });

                    $audits = $audits->merge($relatedAudits);
                }
            }
        } catch (\Throwable $e) {
            continue;
        }
    }

    $audits = $audits->sortByDesc('created_at')->values();

    return [
        'count' => $audits->count(),
        'rows' => $audits,
        'extra' => []
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
                    'responsavel' => (DB::table(config('petrvs.schemas.tenant_aplicacao').'.usuarios')->where('id', $row['user_id'])->first())->nome
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

    protected function getModelRelations($modelInstance)
{
    $relations = [];

    $class = get_class($modelInstance);
    $methods = get_class_methods($modelInstance);

    foreach ($methods as $method) {
        // Ignora métodos herdados do Eloquent base para evitar falsos positivos
        if ((new \ReflectionMethod($class, $method))->class != $class) {
            continue;
        }

        // Ignora métodos com parâmetros obrigatórios
        $reflection = new \ReflectionMethod($class, $method);
        if ($reflection->getNumberOfRequiredParameters() > 0) {
            continue;
        }

        try {
            $return = $modelInstance->$method();

            if ($return instanceof \Illuminate\Database\Eloquent\Relations\Relation) {
                $relations[] = $method;
            }
        } catch (\Throwable $e) {
            // Ignora qualquer erro ao tentar acessar métodos não-relacionais
            continue;
        }
    }

    return $relations;
}

}
