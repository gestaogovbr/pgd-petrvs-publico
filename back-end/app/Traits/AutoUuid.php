<?php

namespace App\Traits;

use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\Auth;

trait AutoUuid
{
    public static function bootAutoUuid()
    {
        static::creating(function ($model) {
            $model->id = empty($model->id) ? (string) Uuid::uuid4() : $model->id;
        });
    }
}