<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Questionario;
use App\Models\Usuario;
use App\Models\QuestionarioPerguntaResposta;
use App\Casts\AsJson;

class QuestionarioPreenchimento extends ModelBase
{
  protected $table = 'questionarios_preenchimentos';

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'data_preenchimento', /* datetime; NOT NULL; */ // Data e hora do preenchimento do questionário
    'editavel', /* tinyint; NOT NULL; DEFAULT: '1'; */ // Possibilidade de editar as respostas
    'versao', /* integer */ // Versão do questionario
    'usuario_id', /* char(36); */
    'questionario_id', /* char(36); NOT NULL; */
    'resumo_resposta', /* json; ; */
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = ['respostas'];

  protected $casts = [
    'resumo_resposta' => AsJson::class
  ];

  // Belongs
  public function questionario()
  {
    return $this->belongsTo(Questionario::class);
  }
  public function usuario()
  {
    return $this->belongsTo(Usuario::class);
  }
  //hasMany
  public function respostas()
  {
    return $this->hasMany(QuestionarioPerguntaResposta::class);
  }
}
