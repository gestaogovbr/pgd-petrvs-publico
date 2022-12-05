<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class EixoTematico extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'eixos_tematicos';

    protected $with = [];

    public $fillable = [ 
        'nome',
    ];
}
