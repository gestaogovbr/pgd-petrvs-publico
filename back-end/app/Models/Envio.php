<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\AutoUuid;

class Envio extends Model
{
    use HasFactory, AutoUuid;

    protected $table = 'envios';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'finished_at' => 'datetime',
    ];
}
