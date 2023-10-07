<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait Version
{
    public static function version($version)
    {
        $connection = env("DB_CONNECTION");
        DB::connection($connection)->update("UPDATE tenants set data = JSON_SET(data, '$.version', ?) WHERE id = ?", [$version, tenant()->id]);
    }
}