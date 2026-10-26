<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\PlanoEntregaEntrega;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlanoTrabalhoConsolidacaoContribuicao extends ModelBase
{
  protected $table = 'planos_trabalhos_consolidacoes_contribuicoes';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'orgao', /* varchar(256); */ // Órgão externo (quando vinculada a entrega de outro órgão)
    'descricao', /* text; */ // Trabalho executado registrado neste período
    'esforco_executado', /* decimal(5,2); NOT NULL; DEFAULT: '0.00'; */ // Percentual de CHD executado nesta contribuição no período
    'registrado_at', /* datetime; */ // Momento do primeiro registro; null = ainda não registrada
    'plano_trabalho_consolidacao_id', /* char(36); NOT NULL; */
    'plano_trabalho_entrega_id', /* char(36); */ // Rastro de origem (entrega do planejamento)
    'plano_entrega_entrega_id', /* char(36); */
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = [];

  public $delete_cascade = [];

  protected $casts = [
    'esforco_executado' => 'float',
    'registrado_at' => 'datetime',
  ];

  // Belongs
  public function consolidacao(): BelongsTo
  {
    return $this->belongsTo(PlanoTrabalhoConsolidacao::class, 'plano_trabalho_consolidacao_id');
  }
  public function planoTrabalhoEntrega(): BelongsTo
  {
    return $this->belongsTo(PlanoTrabalhoEntrega::class, 'plano_trabalho_entrega_id');
  }    //nullable
  public function planoEntregaEntrega(): BelongsTo
  {
    return $this->belongsTo(PlanoEntregaEntrega::class, 'plano_entrega_entrega_id');
  }    //nullable
}
