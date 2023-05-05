<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CursoGraduacao;
use App\Traits\AutoDataInicio;


class AreaConhecimento extends ModelBase
{
   
    protected $table = 'areas_conhecimentos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome_area', /* varchar(256); NOT NULL; */// Nome da área da graduação
        //'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Área ativa ou inativa
    ];

    // Has
    public function cursos() { return $this->hasMany(CursoGraduacao::class, 'area_curso_id'); }
    
}
