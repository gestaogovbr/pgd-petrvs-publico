<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;

class Entrega extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'entregas';

    protected $with = [];

    public $fillable = [ 
        'nome',
        'tipo_indicador',
        'lista_qualitativos',
    ];

    protected $casts = [
        'lista_qualitativos' => AsArrayObject::class,
    ];
}
