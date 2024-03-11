<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\QuestionarioPergunta;
use App\Models\QuestionarioPreenchimento;

class Questionario extends ModelBase
{
  protected $table = 'questionarios';

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'tipo', /* varchar(256); NOT NULL; */ // Tipo interno | personalizado
    'nome', /* varchar(256); NOT NULL; */ // Nome do questionário
    'codigo', /* varchar(256); NOT NULL; */ // Código do questionario
    'versao', /* integer - versão do questrionario **/
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = ['perguntas'];

  public $delete_cascade = ["preenchimentos", "perguntas"];

  // hasMany
  public function perguntas()
  {
    return $this->hasMany(QuestionarioPergunta::class);
  }
  public function preenchimentos()
  {
    return $this->hasMany(QuestionarioPreenchimento::class);
  }
}

/*
    Relacionamentos

    CLASSE                      ->HASMANY               BELONGSTO<-       CLASSE
    Questionario                  preenchimentos        questionario      QuestionarioPreenchimento
    Questionario                  perguntas             questionario      QuestionarioPergunta
    QuestionarioPergunta          respostas             pergunta          QuestionarioPerguntaResposta
    QuestionarioPreenchimento     respostas             preenchimento     QuestionarioPerguntaResposta
    Usuario                       preenchimentos        usuario           QuestionarioPreenchimento
*/