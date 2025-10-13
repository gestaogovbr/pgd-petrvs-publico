<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoEntregaEntrega;
use App\Models\Usuario;
use App\Casts\AsJson;

class PlanoEntregaEntregaProgresso extends ModelBase
{
  protected $table = 'planos_entregas_entregas_progressos';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'usuario_id', /* char(36); NOT NULL; */
    'plano_entrega_entrega_id', /* char(36); NOT NULL; */
    'data_progresso', /* datetime; NOT NULL; */ // Data de ajuste do progresso
    'data_inicio', /* datetime; NOT NULL; */ // Data inicial da entrega
    'data_fim', /* datetime; */ // Data final da entrega
    'homologado', /* tinyint; NOT NULL; */ // Se a entrega foi ou não homologada
    'meta', /* json; NOT NULL; */ // Meta para a entrega
    'realizado', /* json; */ // Valor realizado da entrega
    'progresso_esperado', /* decimal(5,2); DEFAULT: '0.00'; */ // Percentual esperado de progresso do Plano de Entregas
    'progresso_realizado', /* decimal(5,2); DEFAULT: '0.00'; */ // Percentual realizado de progresso do Plano de Entregas
    'registro_execucao', /* longtext; */ // Registro de execução da entrega
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = [];

  public $delete_cascade = [];

  protected $casts = [
    'meta' => AsJson::class,
    'realizado' => AsJson::class,
  ];

  // Has
  // Belongs
  public function usuario()
  {
    return $this->belongsTo(Usuario::class, 'usuario_id');
  }
  public function planoEntregaEntrega()
  {
    return $this->belongsTo(PlanoEntregaEntrega::class, 'plano_entrega_entrega_id');
  }
}
