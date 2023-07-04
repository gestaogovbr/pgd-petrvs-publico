<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Curso;
use App\Traits\AutoDataInicio;


class AreaConhecimento extends ModelBase
{
   
    protected $table = 'areas_conhecimentos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'ativo' 
    ];

    // Has
    public function cursos() { return $this->hasMany(Curso::class, 'area_curso_id'); }
    //public function materia() { return $this->hasMany(Materia::class, 'area_materia_id'); }
    
}
