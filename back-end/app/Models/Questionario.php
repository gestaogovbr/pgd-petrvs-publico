<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Casts\AsJson;

class Questionario extends ModelBase
{
    protected $table = 'questionarios';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'tipo', /* varchar(256); NOT NULL; */// Tipo interno | personalizado
        'nome', /* varchar(256); NOT NULL; */// Nome do questionário
        'codigo', /* varchar(256); NOT NULL; */// Código do questionario
        'perguntas', /* json; */// Perguntas do questionário
        //'deleted_at', /* timestamp; */
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

