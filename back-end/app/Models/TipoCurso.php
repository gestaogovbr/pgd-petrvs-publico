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

    //Belongs
    public function curso() { return $this->belongsTo(Curso::class,'tipo_curso_id'); }
    
}
