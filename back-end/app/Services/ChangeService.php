<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Usuario;
use ReflectionClass;
use ReflectionMethod;
use Illuminate\Support\Str;


class ChangeService extends ServiceBase {

    // public function getInstanceModel($tableName){
    //     $models = array_map(fn($file) => str_replace(base_path() . '/app/Models/', "", $file), array_filter(glob(base_path() . '/app/Models/*.php'), 'is_file'));
    //     foreach($models as $file) {
    //         $model = file_get_contents(base_path() . '/app/Models/' . $file);
    //         $match = [];
    //         if (preg_match('/protected \$table = [\'"]([\w_\d]+?)[\'"]/', $model, $match)) {
    //             if ($match[1] === $tableName) {
    //                 // Se a tabela correspondente for encontrada, retorne o nome do modelo
    //                 return str_replace('.php', '', $file);
    //             }
    //         }
    //     }
    //     return null; 
    // }
    
    // public function showRelations($targetModelClass, $id){
    //     $targetModel = app($targetModelClass);
    //     $record = $targetModel::withTrashed()->find($id);
    //     if ($record) {
    //         $class = get_class($record);
    //         $reflector = new ReflectionClass($class);
    //         $methods = [];
    
    //         foreach ($reflector->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
    //             if ($method->class === $class) {
    //                 $methods[] = $method->name;
    //             }
    //         }
    
    //         $relations = [];
    
    //         foreach ($methods as $method) {
    //             $relationResult = $record->$method();
    
    //             if (is_a($relationResult, 'Illuminate\Database\Eloquent\Relations\Relation')) {
    //                 $relations[] = $method;
    //             }
    //         }
    
    //         foreach ($relations as $relationName) {
    //             $record->load($relationName);
    //         }
    
    //         return $record;
    //     }
           
    // }

    public function proxyRows($rows){
        if (empty($rows) || !isset($rows[0]['table_name'])) {
            return [];
        }
        
        // $model = $this->getInstanceModel($rows[0]['table_name']);
        // $relations = $this->showRelations("App\Models\\" . $model, $rows[0]['row_id']);

        foreach($rows as $row){
            try {

                $row['responsavel'] = $row['user_id'] == null ? 'Usuário não logado' : Usuario::where('id',$row['user_id'])->first()->nome ?? 'Não encontrado - ID: ' . $row['user_id'];
           
                foreach ($row['delta'] as $column => $value) {
                    if (preg_match('/_id$/', $column)) {
                        $tableName = substr($column, 0, -3);            
                        $className = Str::studly($tableName);            
                        if (class_exists("App\\Models\\$className")) {
                            $relatedRecord = call_user_func("App\\Models\\$className::find", $value);            
                            $row['delta']->$column = $relatedRecord;
                        }
                    }
                }

                
            } catch (\Throwable $e) {
                return response()->json(['error' => $e->getMessage()]);
            }
        }
        return $rows;
    }

    public function showResponsaveis($usuario_ids) {
        $usuarios = Usuario::whereIn('id', $usuario_ids)->get();
        return $usuarios;
    }

}
