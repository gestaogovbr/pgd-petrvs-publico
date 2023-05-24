<?php

namespace App\Models;

use App\Models\Usuario;
use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Casts\AsJson;


class Curriculum extends ModelBase
{
    protected $table = 'curriculums';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'apresentacao',
        'telefone',
        'idiomas',
        'estado_civil',
        'quantidade_filhos',
        'ativo',
        'usuario_id',
        'cidade_id'
        
    ];

    protected $casts = [
        'idiomas' => AsJson::class,
    ];

    //Has
    public function graduacoes() { return $this->hasMany(CurriculumGraduacao::class,'curriculum_id'); }

    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }
        
}
