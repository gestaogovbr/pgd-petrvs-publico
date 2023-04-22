<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CursoGraduacao;
use App\Traits\AutoDataInicio;


class CursoGraduacao extends ModelBase
{
    protected $table = 'cursos_graduacoes';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome_curso',
        'area_curso_id'
    ];

    // Belongs
    public function area() { return $this->belongsTo(AreaGraduacao::class); }
    
}
