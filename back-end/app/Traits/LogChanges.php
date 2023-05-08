<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Services\UtilService;
use App\Models\Change;
use DateTime;

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
                    if(!empty($model->attributes['data_fim'])){
                        static::logChange($model, 'SOFT_DELETE');
                    }else{
                        static::logChange($model, 'EDIT');
                    }
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
        $util = new UtilService();
        if($config["log_changes"]) {
            $valoresAtuais = []; $valoresAnteriores = []; $valoresAlterados = [];
            switch ($action) {
                case 'ADD':
                    $valoresAtuais = $model->getAttributes();
                    break;

                case 'EDIT':
                    $valoresAtuais = $model->getAttributes();     // strings json e '[]'
                    $valoresAnteriores = $model->getOriginal();   // objetos json e arrays
                    $valoresAlterados = $util->differentAttributes($valoresAtuais,$valoresAnteriores);
                    break;
                case 'SOFT_DELETE':
                    $valoresAtuais = $model->getAttributes();
                    $valoresAnteriores = $model->getOriginal();
                    $valoresAlterados = $util->differentAttributes($valoresAtuais,$valoresAnteriores);
                    break;

                case 'DELETE':
                    $valoresAnteriores = $model->getOriginal();
                    break;
            }
            Change::create([
                'date_time' => new DateTime(),
                'user_id' => Auth::check() ? Auth::user()->id : null,
                'table_name' => $model->getTable(),
                'row_id' => $model->attributesToArray()["id"],
                'type' => $action,
                'delta' => json_encode([
                    'versao' => '2.0',
                    'Valores anteriores' => $valoresAnteriores, 
                    'Valores atuais' => $valoresAtuais,
                    'Valores alterados' => $valoresAlterados])
            ]);
        }
    }

    public static function customLogChange($table, $id, $action, $delta) {
        $config = config("log");
        if($config["log_changes"]) {
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