<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\Change;

trait LogChanges
{

    public static function bootLogChanges()
    {
        static::saved(function (Model $model) {
            $config = config("log");
            if($config["log_changes"]) {
                if ($model->wasRecentlyCreated) {
                    static::logChange($model, 'ADD');
                } else {
                    if (!$model->getChanges()) {
                        return;
                    }
                    static::logChange($model, 'EDIT');
                }
            }
        });

        static::deleted(function (Model $model) {
            $config = config("log");
            if($config["log_changes"]) {
                static::logChange($model, 'DELETE');
            }
        });
    }

    public static function logChange(Model $model, string $action)
    {
        Change::create([
            'user_id' => Auth::check() ? Auth::user()->id : null,
            'table_name' => $model->getTable(),
            'row_id' => $model->attributesToArray()["id"],
            'type' => $action,
            'delta' => json_encode($action == 'EDIT' ? $model->getOriginal() : ($action == 'DELETE' ? $model->getOriginal() : $model->getAttributes()))
        ]);
    }

}
