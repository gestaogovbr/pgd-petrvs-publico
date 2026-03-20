<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\PlanoTrabalhoConsolidacao;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comparecimento extends ModelBase
{
  protected $table = 'comparecimentos';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'data_comparecimento', /* date; NOT NULL; */ // Data do comparecimento
    'detalhamento', /* varchar(255); NOT NULL; */ // Detalhamento do comparecimento
    'plano_trabalho_consolidacao_id', /* char(36); NOT NULL; */
    'unidade_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];

  // Casting
  protected $casts = [
    'data_comparecimento' => 'date',
  ];

  // Belongs
  public function planoTrabalhoConsolidacao(): BelongsTo
  {
    return $this->belongsTo(PlanoTrabalhoConsolidacao::class);
  }
  public function unidade(): BelongsTo
  {
    return $this->belongsTo(Unidade::class);
  }
}
