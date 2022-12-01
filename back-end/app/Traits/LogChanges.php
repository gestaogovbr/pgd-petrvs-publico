<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\Change;
use DateTime;

trait LogChanges
{

    public static function bootLogChanges()
    {
        static::saved(function (Model $model) {
            if ($model->wasRecentlyCreated) {
                static::logChange($model, 'ADD');
            } elseif ($model->getChanges()) {
                //if($model->attributes['updated_at'] == $model->attributes['data_fim']){
                if(!empty($model->attributes['data_fim'])){
                    static::logChange($model, 'DELETE');
                }else{
                    static::logChange($model, 'EDIT');
                }
            } else {
                static::logChange($model, 'EDIT');
            }
        });

        static::deleted(function (Model $model) {
            static::logChange($model, 'DELETE');
        });
    }

    public static function logChange(Model $model, string $action)
    {
        $config = config("log");
        if($config["log_changes"]) {
            Change::create([
                'date_time' => new DateTime(),
                'user_id' => Auth::check() ? Auth::user()->id : null,
                'table_name' => $model->getTable(),
                'row_id' => $model->attributesToArray()["id"],
                'type' => $action,
                'delta' => json_encode($action == 'ADD' ? $model->getAttributes() : ($action == 'EDIT' ? ['Valores anteriores' => $model->getOriginal(), 'Valores atuais' => $model->getAttributes()] : $model->getOriginal()))
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
