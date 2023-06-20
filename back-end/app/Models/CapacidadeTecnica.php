<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\areaTematica;
use App\Traits\AutoDataInicio;


class CapacidadeTecnica extends ModelBase
{
   
    protected $table = 'capacidades_tecnicas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'ativo',
        'area_tematica_id '
    ];

    // Has
    public function areaTematica() { return $this->hasMany(areaTematica::class, 'area_tematica_id'); }
    
}
