<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\TipoMotivoAfastamento;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;

class Afastamento extends ModelBase
{
  protected $table = 'afastamentos';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'observacoes', /* text; */ // Observação sobre o afastamento
    'data_inicio', /* datetime; NOT NULL; */ // Inicio do afastamento
    'data_fim', /* datetime; NOT NULL; */ // Fim do afastamento
    'horas', /* integer; NULL; */ // Horas de compensação
    'usuario_id', /* char(36); NOT NULL; */
    'tipo_motivo_afastamento_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];

  // Has
  public function consolidacoes()
  {
    return $this->hasMany(PlanoTrabalhoConsolidacaoAfastamento::class);
  }
  // Belongs
  public function usuario()
  {
    return $this->belongsTo(Usuario::class);
  }
  public function tipoMotivoAfastamento()
  {
    return $this->belongsTo(TipoMotivoAfastamento::class);
  }
}
