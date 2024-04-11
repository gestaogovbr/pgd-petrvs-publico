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

class ChangeService extends ServiceBase
{

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
