<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Casts\AsJson;


class Questionario extends ModelBase
{
    protected $table = 'questionarios';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'tipo',
        'nome',
        'codigo',
        'perguntas'       
    ];

    protected $casts = [
        'perguntas' => AsJson::class,
       
    ];

    //public $fillable_changes = ['graduacoes'];

    //public $fillable_relation = [];

    //Has
   // public function graduacoes() { return $this->hasMany(CurriculumGraduacao::class,'curriculum_id'); }

    // Belongs
  
}

