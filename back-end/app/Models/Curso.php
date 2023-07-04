<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\AreaConhecimento;
use App\Models\TipoCurso;
use App\Models\Materia;
use App\Traits\AutoDataInicio;


class Curso extends ModelBase
{
    protected $table = 'cursos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'titulo',
        'ativo',
        'area_id',
        'tipo_curso_id'
    ];

    // Belongs
    public function area() { return $this->belongsTo(AreaConhecimento::class,'area_id'); }
    public function tipo() { return $this->belongsTo(TipoCurso::class,'tipo_curso_id'); }

     // Has
    public function materias() { return $this->hasMany(Materia::class, 'materia_id'); }
    
}
