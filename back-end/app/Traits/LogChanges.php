<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\Change;
use DateTime;
use App\Services\UtilService;

trait LogChanges
{
    public static $x = 1;
    public static function bootLogChanges()
    {
        static::saved(function (Model $model) {
            if(static::$x == 1){   //Só entra se for a primeira vez que está executando.
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
        $util = new UtilService();
        $config = config("log");
        if(!empty($config["changes"])) {
            $delta = $action == "ADD" ? $model->getAttributes() : ($action == "EDIT" ? $model->getAttributes() : ($action == "DELETE" || $action == "SOFT_DELETE" ? $model->getAttributes() : $util->differentAttributes($model->getAttributes(),$model->getOriginal())));
            Change::create([
                'date_time' => new DateTime(),
                'user_id' => Auth::check() ? Auth::user()->id : null,
                'table_name' => $model->getTable(),
                'row_id' => $model->attributesToArray()["id"],
                'type' => $action,
                'delta' => $delta
            ]);
        }
    }

    public static function customLogChange($table, $id, $action, $delta) {
        $config = config("log");
        if(!empty($config["changes"])) {
            Change::create([
                'user_id' => Auth::check() ? Auth::user()->id : null,
                'table_name' => $table,
                'row_id' => $id,
                'type' => $action,
                'delta' => gettype($delta) == "string" ? $delta : json_encode($delta)
            ]);
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