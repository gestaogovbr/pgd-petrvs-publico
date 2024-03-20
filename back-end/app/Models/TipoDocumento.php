<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Programa;
use App\Models\Documento;

class TipoDocumento extends ModelBase
{
  protected $table = 'tipos_documentos';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'codigo', /* varchar(50); */ // Código do tipo de documento
    'nome', /* varchar(256); NOT NULL; */ // Tipo do documento da requisição ou da entrega
    'entregavel', /* tinyint; NOT NULL; */ // Se é um documento de entrega
    //'deleted_at', /* timestamp; */
  ];

  // Has
  public function programas()
  {
    return $this->hasMany(Programa::class);
  }
  public function documentos()
  {
    return $this->hasMany(Documento::class);
  }             //nullable
}
