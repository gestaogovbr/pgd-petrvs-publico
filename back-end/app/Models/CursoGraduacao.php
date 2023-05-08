<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\AreaGraduacao;
use App\Traits\AutoDataInicio;


class Curso extends ModelBase
{
    protected $table = 'cursos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome_curso', /* varchar(256); NOT NULL; */// Nome do curso
        'area_curso_id', /* char(36); NOT NULL; */
        //'titulo', /* varchar(256); NOT NULL; */// Titulação do curso->Graduação, Pos, etc
        //'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Curso ativo ou inativo
    ];

    // Belongs
    public function area() { return $this->belongsTo(AreaGraduacao::class); }
    
}
