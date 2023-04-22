<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CursoGraduacao;
use App\Traits\AutoDataInicio;


class AreaGraduacao extends ModelBase
{
   
    protected $table = 'rx_areas_graduacoes';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome_area', 
    ];

    // Has
    public function cursos() { return $this->hasMany(CursoGraduacao::class, 'area_curso_id'); }
    
}
