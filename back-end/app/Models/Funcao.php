<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;


class Funcao extends ModelBase
{
    protected $table = 'funcoes';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'ativo',
    ];

    // Belongs
    //public function centro() { return $this->belongsTo(AreaConhecimento::class,'area_curso_id'); }
    
}
