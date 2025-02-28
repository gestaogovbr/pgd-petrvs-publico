<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CadeiaValorProcesso;
use App\Models\PlanoEntregaEntrega;

class PlanoEntregaEntregaProcesso extends ModelBase
{
  protected $table = 'planos_entregas_entregas_processos';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'cadeia_processo_id', /* char(36); NOT NULL; */
    'entrega_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = [];

  public $delete_cascade = [];

  // Has
  // Belongs
  public function processo()
  {
    return $this->belongsTo(CadeiaValorProcesso::class, 'cadeia_processo_id');
  }   //ok
  
  public function entrega()
  {
    return $this->belongsTo(PlanoEntregaEntrega::class, 'entrega_id');
  }    //ok
}
