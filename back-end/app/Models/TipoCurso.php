<?php

namespace App\Models;

use App\Models\ModelBase;
//use App\Models\Curso;
use App\Traits\AutoDataInicio;


class TipoCurso extends ModelBase
{
    protected $table = 'tipos_cursos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'ativo',
    ];

    // Belongs
    //public function area() { return $this->belongsTo(AreaConhecimento::class,'area_curso_id'); }
    
}
