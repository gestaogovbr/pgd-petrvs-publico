<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Questionario;
use App\Models\QuestionarioPerguntaResposta;
use App\Casts\AsJson;


class QuestionarioPergunta extends ModelBase
{
  protected $table = 'questionarios_perguntas';

  public $fillable = [
    'codigo', /* tinyint; NOT NULL; */ // sequencia das perguntas
    'sequencia', /* tinyint; NOT NULL; */ // sequencia das perguntas
    'pergunta', /* tinyint; NOT NULL; DEFAULT: '1'; */ // Possibilidade de editar as respostas
    'tipo', /* enum */ // tipo da opção da resposta
    'criado_versao', /* integer */
    'deletado_versao', /* integer */
    'respostas',
    /**JSON respostas */
    'questionario_id',
    'origem_id'
    /**Origem, serve para vincular a mesma pergunta em suas várias versões, caso tenha modificado ou alterado a sequencia, o ID será do registro que foi deletado */
    //'deleted_at', /* timestamp; */
  ];

  protected $casts = [
    'respostas' => AsJson::class
  ];

  public $fillable_changes = ['respostas'];
  public $delete_cascade = ["respostas"];

  // Belongs
  public function questionario()
  {
    return $this->belongsTo(Questionario::class);
  }
  public function perguntaOrigem()
  {
    return $this->belongsTo(QuestionarioPergunta::class, 'origem_id');
  }
  //hasMany
  public function respostas()
  {
    return $this->hasMany(QuestionarioPerguntaResposta::class);
  }
}
