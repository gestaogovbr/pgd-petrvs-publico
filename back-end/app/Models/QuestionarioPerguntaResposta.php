<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\QuestionarioPergunta;
use App\Models\QuestionarioPreenchimento;
use App\Casts\AsJson;


class QuestionarioPerguntaResposta extends ModelBase
{
  protected $table = 'questionarios_perguntas_respostas';

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'resposta', /* json resposta do questionario**/
    'questionario_pergunta_id', /* char(36); */
    'questionario_preenchimento_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];

  protected $casts = [
    'resposta' => AsJson::class
  ];

  // Belongs
  public function pergunta()
  {
    return $this->belongsTo(QuestionarioPergunta::class, 'questionario_pergunta_id');
  }
  public function preenchimento()
  {
    return $this->belongsTo(QuestionarioPreenchimento::class, 'questionario_preenchimento_id');
  }
}
