<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;


class AreaTematica extends ModelBase
{
   
    protected $table = 'areas_tematicas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'ativo' 
    ];

    // Has
    //public function cursos() { return $this->hasMany(CursoGraduacao::class, 'area_curso_id'); }
    
}
