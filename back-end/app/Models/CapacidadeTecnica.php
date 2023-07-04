<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\AreaTematica;
use App\Traits\AutoDataInicio;


class CapacidadeTecnica extends ModelBase
{
   
    protected $table = 'capacidades_tecnicas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'ativo',
        'area_tematica_id'
    ];

    // Belongs
    public function areaTematica() { return $this->belongsTo(AreaTematica::class); }
    
}
