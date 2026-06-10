<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class SipecServidor extends ModelBase
{
    use HasFactory;

    protected $table = 'sipec_servidores';

    protected $fillable = [
        'id',
        'cpf',
        'matricula',
        'response',
        'processado',
        'data_modificacao',
    ];

    protected $casts = [
        'processado' => 'boolean',
        'data_modificacao' => 'datetime',
    ];
}
