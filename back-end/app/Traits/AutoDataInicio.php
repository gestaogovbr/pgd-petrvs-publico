<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait AutoDataInicio
{
    public static function bootAutoDataInicio()
    {
        static::creating(function ($model) {
            $model->data_inicio = date("Y-m-d H:i:s");
        });
    }
}