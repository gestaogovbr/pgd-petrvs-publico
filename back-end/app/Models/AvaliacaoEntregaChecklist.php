<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\TipoAvaliacao;

class AvaliacaoEntregaChecklist extends ModelBase
{
  protected $table = 'avaliacoes_entregas_checklist';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'checklist', /* json; NOT NULL; */ // Checklist
    'avaliacao_id', /* char(36); NOT NULL; */
    'plano_trabalho_entrega_id', /* char(36); */
    'plano_entrega_entrega_id', /* char(36); */
    //'deleted_at', /* timestamp; */
  ];

  public $delete_cascade = [];

  // Casting
  protected $casts = [
    'checklist' => AsJson::class
  ];

  // Has
  // Belongs
  public function avaliacao()
  {
    return $this->belongsTo(Avaliacao::class);
  }
  public function planoEntregaEntrega()
  {
    return $this->belongsTo(PlanoEntregaEntrega::class);
  }
  public function planoTrabalhoEntrega()
  {
    return $this->belongsTo(PlanoTrabalhoEntrega::class);
  }
}
