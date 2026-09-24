<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class SipecUnidade extends ModelBase
{
    use HasFactory;

    protected $table = 'sipec_unidades';

    protected $fillable = [
        'id',
        'codigo',
        'response',
        'processado',
        'data_modificacao',
    ];

    protected $casts = [
        'processado' => 'boolean',
        'data_modificacao' => 'datetime',
    ];
}
