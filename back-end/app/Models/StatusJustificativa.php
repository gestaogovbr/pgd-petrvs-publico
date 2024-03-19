<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Atividade;

class StatusJustificativa extends ModelBase
{
  protected $table = 'status_justificativas';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'codigo', /* enum('ATIVO','AVALIADO','CANCELADO','CONCLUIDO','HOMOLOGANDO','AGUARDANDO_ASSINATURA','INCLUIDO','INICIADO','EM_RECURSO','SUSPENSO'); NOT NULL; */ // Status do artefato (plano de entregas, plano de trabalho ou atividade)
    'justificativa', /* text; NOT NULL; */ // Justificativa da mudança para este status
    'plano_entrega_id', /* char(36); */
    'plano_trabalho_id', /* char(36); */
    'plano_trabalho_consolidacao_id', /* char(36); */
    'atividade_id', /* char(36); */
    'usuario_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];
  //Has
  // Belongs
  public function planoEntrega()
  {
    return $this->belongsTo(PlanoEntrega::class, "plano_entrega_id");
  }
  public function planoTrabalho()
  {
    return $this->belongsTo(PlanoTrabalho::class, "plano_trabalho_id");
  }
  public function planoTrabalhoConsolidacao()
  {
    return $this->belongsTo(PlanoTrabalhoConsolidacao::class, "plano_trabalho_consolidacao_id");
  }
  public function atividade()
  {
    return $this->belongsTo(Atividade::class, "atividade_id");
  }
  public function usuario()
  {
    return $this->belongsTo(Usuario::class, "usuario_id");
  }
}
