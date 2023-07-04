<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;


class AreaAtividadeExterna extends ModelBase
{
   
    protected $table = 'areas_atividades_externas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'ativo' 
    ];

    // Has
    //public function cursos() { return $this->hasMany(CursoGraduacao::class, 'area_curso_id'); }
    
}
