<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Casts\AsJson;
use App\Models\QuestionarioPergunta;
use App\Models\QuestionarioResposta;

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

    public $fillable_changes = ['perguntas'];

    public $delete_cascade = ["questionario_resposta", "perguntas"];

    //public $fillable_relation = [];

    //Has
    public function perguntas() { return $this->hasMany(QuestionarioPergunta::class); }
    public function questionarioPergunta() { return $this->hasMany(QuestionarioPergunta::class); }
    //public function questionariosPerguntas() { return $this->hasMany(QuestionarioPergunta::class); }
    //public function questionarioResposta() { return $this->hasOne(QuestionarioResposta::class); }

    // Belongs

  
}
/*

Questionario
  questionarioResposta - QUESTIONARIO_ID (hasOne)
    questionarioRespostaPergunta - QUESTIONARIO_RESPOSTA_ID (hasMany)
  questionariosPerguntas - QUESTIONARIO_ID (hasMany)
    questionariosRespostasPerguntas - QUESTIONARIO_PERGUNTA_ID (hasMany)

*/
