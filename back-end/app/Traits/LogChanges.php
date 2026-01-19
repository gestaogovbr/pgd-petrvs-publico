<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\Change;
use DateTime;
use App\Services\UtilService;
use App\Services\ServiceBase;
use stdClass;

/**
 * @deprecated Não usar mais, pois o pacote de auditoria está sendo utilizado.
 * Trait LogChanges
 * @package App\Traits
 */
trait LogChanges
{
    public static $x = 1;
    public static function bootLogChanges()
    {
        static::saved(function (Model $model) {
            if (static::$x == 1) {   //Só entra se for a primeira vez que está executando.
                static::$x++;
                if ($model->wasRecentlyCreated) {
                    static::logChange($model, 'ADD');
                } elseif ($model->getChanges()) {
                    !empty($model->attributes['deleted_at']) ? static::logChange($model, 'SOFT_DELETE') : static::logChange($model, 'EDIT');
                } else {
                    static::logChange($model, 'EDIT');
                }
            }
        });

        static::deleted(function (Model $model) {
            static::logChange($model, 'DELETE');
        });
    }
    
    public static function logChange(Model $model, string $action)
    {
        $config = config("log");

        $delta = [];
        if ($action == "EDIT" && !empty($config["changes"])) {
            $oldAttributes = $model->getOriginal();
            $newAttributes = $model->getAttributes();

            $delta = UtilService::differentAttributes($newAttributes, $oldAttributes);

        } elseif (($action == "ADD" || $action == "DELETE" || $action == "SOFT_DELETE") && !empty($config["changes"])) {
            $delta = $model->getAttributes();
        }

        if (!empty($delta)) {
            if ($action == "EDIT") {
                $delta = array_map(function ($item) {
                    return [$item[0], $item[2]]; 
                }, $delta);

                $delta = self::converteToJSON($delta);
            }

            Change::create([
                'date_time' => now(),
                'user_id' => Auth::check() ? Auth::user()->id : null,
                'table_name' => $model->getTable(),
                'row_id' => $model->attributesToArray()["id"],
                'type' => $action,
                'delta' => $delta
            ])->save();
        }
    }

    public static function converteToJSON(array $jsonArray)
    {
        $obj = new stdClass();
        foreach ($jsonArray as $item) {
            $key = $item[0];
            $value = $item[1];
            if (strpos($key, '*') !== false) {
                // Se a chave contiver '*', precisamos dividir e criar objetos aninhados
                $parts = explode('*', $key);
                $current = &$obj;
                foreach ($parts as $part) {
                    if (!isset($current->$part)) {
                        $current->$part = new stdClass();
                    }
                    $current = &$current->$part;
                }
                $current = $value;
            } else {
                $obj->$key = $value;
            }
        }

        return $obj;
    }



    public static function customLogChange($table, $id, $action, $delta)
    {
        $config = config("log");
        if (!empty($config["changes"])) {
            Change::create([
                'user_id' => Auth::check() ? Auth::user()->id : null,
                'table_name' => $table,
                'row_id' => $id,
                'type' => $action,
                'delta' => gettype($delta) == "string" ? $delta : json_encode($delta)
            ])->save();
        }
    }
}

/* 
Erro ao salvar registro do traffic:
Incorrect integer value: 'ec6660df-09f6-4814-97a9-16dc5c1a4a17' for column 'id' at row 1 (SQL: insert into `traffic` (`user_id`, `url`, `request`, `response`, `id`) 
values (9465b95b-bc67-46a4-a2a5-4c81effdfb2d, http://localhost/web/login-google-token, {}, {}, ec6660df-09f6-4814-97a9-16dc5c1a4a17))",

*/


/*
 OBSERVAÇÕES:

 - O método getChanges() está trazendo campos que não foram alterados, e traz apenas o valor atual, não traz o valor anterior.
 - O método getDirty() está com o mesmo comportamento do getChanges().
  
*/