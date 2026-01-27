<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\AutoUuid;

abstract class AbstractEnvio extends Model
{
    use HasFactory, AutoUuid;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'finished_at' => 'datetime',
    ];

}
