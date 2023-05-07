<?php

namespace App\Models;

use App\Models\Usuario;
use App\Models\ModelBase;
use App\Traits\AutoDataInicio;


class Curriculum extends ModelBase
{
    protected $table = 'cursos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'apresentacao',
        'telefone',
        'idiomas',
        'ativo',
        'usuario_id',
        'cidade_id'
    ];

    //Has
    public function graduacoes() { return $this->hasMany(CurriculumGraduacao::class,'curriculum_id'); }

    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }
        
}
