<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;


class GrupoEspecializado extends ModelBase
{
    protected $table = 'grupos_especializados';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'ativo',
    ];

    // Belongs
    //public function centro() { return $this->belongsTo(AreaConhecimento::class,'area_curso_id'); }
    
}
