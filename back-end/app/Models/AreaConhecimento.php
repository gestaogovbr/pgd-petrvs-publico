<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Curso;
use App\Traits\AutoDataInicio;


class AreaConhecimento extends ModelBase
{
   
    protected $table = 'areas_conhecimentos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome da área da graduação
        'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Área ativa ou inativa
        //'deleted_at', /* timestamp; */
    ];

    // Has
    public function cursos() { return $this->hasMany(Curso::class, 'area_curso_id'); }
    //public function materia() { return $this->hasMany(Materia::class, 'area_materia_id'); }
    
}
