<?php

namespace App\Models;

use App\Models\ModelBase;
//use App\Models\Curso;
use App\Traits\AutoDataInicio;


class TipoCurso extends ModelBase
{
    protected $table = 'tipos_cursos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do tipo do curso
        'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Nome ativo ou inativo
        //'deleted_at', /* timestamp; */
    ];

    //Belongs
    public function curso() { return $this->belongsTo(Curso::class,'tipo_curso_id'); }
    
}
