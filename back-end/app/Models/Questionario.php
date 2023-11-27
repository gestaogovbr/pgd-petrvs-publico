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
        'versao', /* integer - versão do questrionario **/
        //'deleted_at', /* timestamp; */
    ];

    //public $fillable_changes = ['perguntas'];

    //public $fillable_relation = [];

    //Has
    public function questionarioResposta() { return $this->hasOne(QuestionarioResposta::class); }

    // Belongs

  
}

