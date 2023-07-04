<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Curso;
use App\Models\Area;
use App\Traits\AutoDataInicio;


class Materia extends ModelBase
{
    protected $table = 'materias';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'horas_aula',
        'ativo',
        'curso_id'
    ];

    // Belongs
    //public function area() { return $this->belongsTo(AreaConhecimento::class,'area_materia_id'); }
    public function curso() { return $this->belongsTo(Curso::class,'curso_id'); }
    
}
