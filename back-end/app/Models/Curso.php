<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;


class Curso extends ModelBase
{
    protected $table = 'cursos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'titulo',
        'ativo',
        'area_curso_id',
        'tipo_curso_id'
    ];

    // Belongs
    public function area() { return $this->belongsTo(AreaConhecimento::class,'area_curso_id'); }
    public function tipo() { return $this->belongsTo(TipoCurso::class,'tipo_curso_id'); }

     // Has
    public function materia() { return $this->hasMany(CursoGraduacao::class, 'materia_curso_id'); }
    
}
