<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\TipoJustificativa;

class TipoAvaliacaoJustificativa extends ModelBase
{
  protected $table = 'tipos_avaliacoes_justificativas';

  protected $with = ["tipoJustificativa"];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'tipo_avaliacao_nota_id', /* char(36); NOT NULL; */
    'tipo_justificativa_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];

  // Belongs
  public function tipoAvaliacaoNota()
  {
    return $this->belongsTo(TipoAvaliacaoNota::class);
  }
  public function tipoJustificativa()
  {
    return $this->belongsTo(TipoJustificativa::class);
  }
}
