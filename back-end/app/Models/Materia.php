<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Curso;

class Materia extends ModelBase
{
    protected $table = 'materias';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do curso
        'horas_aula', /* tinyint; */// Horas aula da matéria
        'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Curso ativo ou inativo
        'curso_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    // Belongs
    //public function area() { return $this->belongsTo(AreaConhecimento::class,'area_materia_id'); }
    public function curso() { return $this->belongsTo(Curso::class,'curso_id'); }
    
}
