<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;


class CentroTreinamento extends ModelBase
{
    protected $table = 'centros_treinamentos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'ativo',
    ];

    // Belongs
    //public function centro() { return $this->belongsTo(AreaConhecimento::class,'area_curso_id'); }
    
}
