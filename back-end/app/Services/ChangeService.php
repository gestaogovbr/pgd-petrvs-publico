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
    
        // Primeiro, pega o primeiro audit só pra descobrir a classe do modelo auditado
        $firstAudit = Audit::where('auditable_id', $modelId)->first();
    
        if (!$firstAudit) {
            return [
                'count' => 0,
                'rows' => [],
                'extra' => ['error' => 'Nenhuma auditoria encontrada.']
            ];
        }
    
        $modelClass = $firstAudit->auditable_type;
    
        // Carrega a instância real do modelo
        $modelInstance = new $modelClass;
    
        // Inicia a query de audits com o modelo principal
        $query = Audit::where(function ($q) use ($modelClass, $modelId) {
            $q->where('auditable_type', $modelClass)
              ->where('auditable_id', $modelId);
        });
    
        // Agora tenta incluir todas as relações do modelo
        foreach (get_class_methods($modelInstance) as $method) {
            try {
                $relation = $modelInstance->$method();
    
                if ($relation instanceof Relation) {
                    $related = $relation->getResults();
    
                    if ($related instanceof \Illuminate\Support\Collection) {
                        $relatedIds = $related->pluck('id')->toArray();
                    } elseif ($related) {
                        $relatedIds = [$related->id];
                    } else {
                        continue;
                    }
    
                    $relatedClass = get_class($relation->getRelated());
    
                    $query->orWhere(function ($q) use ($relatedClass, $relatedIds) {
                        $q->where('auditable_type', $relatedClass)
                          ->whereIn('auditable_id', $relatedIds);
                    });
                }
            } catch (\Throwable $e) {
                // Ignora qualquer método que não seja uma relação válida
                continue;
            }
        }
    
        // Agora sim executa a consulta final
        $audits = $query->orderBy('created_at', 'desc')->get();
    
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

    public function getModelRelations($modelName)
    {
        try {

            $reflection = new ReflectionClass($modelName);
            $relationNames = [];
            foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
                $methodName = $this->verificarRelacionamento($modelName, $method->getName());
                if ($methodName) {
                    $relationNames[] = $method->getName();
                }
            }
            return $relationNames;

        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
