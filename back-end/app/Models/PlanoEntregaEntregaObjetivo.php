<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanejamentoObjetivo;
use App\Models\PlanoEntregaEntrega;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read PlanoEntregaEntrega|null $entrega
 */
class PlanoEntregaEntregaObjetivo extends ModelBase
{
  protected $table = 'planos_entregas_entregas_objetivos';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'planejamento_objetivo_id', /* char(36); NOT NULL; */
    'entrega_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = [];

  public $delete_cascade = [];

  // Has
  // Belongs
  public function objetivo(): BelongsTo
  {
    return $this->belongsTo(PlanejamentoObjetivo::class, 'planejamento_objetivo_id');
  } //ok
  public function entrega(): BelongsTo
  {
    return $this->belongsTo(PlanoEntregaEntrega::class, 'entrega_id');
  } //ok
}
