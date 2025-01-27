<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\PlanoEntregaEntregaObjetivo;
use App\Models\PlanoEntregaEntregaProcesso;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\PlanoEntrega;
use App\Models\Entrega;
use App\Models\Unidade;
use App\Models\Reacao;

class PlanoEntregaEntrega extends ModelBase
{
  protected $table = 'planos_entregas_entregas';
  protected $filhos;

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'data_inicio', /* datetime; NOT NULL; */ // Data inicial da entrega
    'data_fim', /* datetime; */ // Data final da entrega
    'descricao', /* varchar(256); NOT NULL; */ // Descrição da entrega
    'homologado', /* tinyint; NOT NULL; */ // Se a entrega foi ou não homologada
    'meta', /* json; NOT NULL; */ // Meta para a entrega
    'realizado', /* json; */ // Valor realizado da entrega
    'destinatario', /* varchar(255); */ // Destinatário da entrega
    'progresso_esperado', /* decimal(5,2); DEFAULT: '0.00'; */ // Percentual esperado de progresso do Plano de Entregas
    'progresso_realizado', /* decimal(5,2); DEFAULT: '0.00'; */ // Percentual realizado de progresso do Plano de Entregas
    'unidade_id', /* char(36); NOT NULL; */
    'plano_entrega_id', /* char(36); NOT NULL; */
    'entrega_id', /* char(36); */
    'entrega_pai_id', /* char(36); */
    'etiquetas', /* json; */ // Etiquetas da entrega
    'checklist', /* json; */ // Checklist da entrega
    'descricao_meta', /* longtext*/ // Descrição da meta da entrega
    'descricao_entrega', /* longtext*/ // Descrição do título da entrega
    //'deleted_at', /* timestamp; */
  ];

  public $fillable_changes = ['objetivos', 'processos', 'comentarios', 'reacoes', 'produtos'];

  // Casting
  protected $casts = [
    'meta' => AsJson::class,
    'realizado' => AsJson::class,
    'checklist' => AsJson::class,
    'etiquetas' => AsJson::class,
  ];

  public $delete_cascade = ['comentarios', 'reacoes', 'progressos', 'produtos'];

  // HasMany
  public function progressos()
  {
    return $this->hasMany(PlanoEntregaEntregaProgresso::class, 'plano_entrega_entrega_id');
  }
  public function objetivos()
  {
    return $this->hasMany(PlanoEntregaEntregaObjetivo::class, 'entrega_id');
  }  //ok
  public function processos()
  {
    return $this->hasMany(PlanoEntregaEntregaProcesso::class, 'entrega_id');
  }  //ok
  public function comentarios()
  {
    return $this->hasMany(Comentario::class);
  }
  public function entregasPlanoTrabalho()
  {
    return $this->hasMany(PlanoTrabalhoEntrega::class);
  }
  public function reacoes()
  {
    return $this->hasMany(Reacao::class);
  }
  // Belongs
  public function planoEntrega()
  {
    return $this->belongsTo(PlanoEntrega::class);
  }
  public function entrega()
  {
    return $this->belongsTo(Entrega::class);
  }      //nullable
  public function unidade()
  {
    return $this->belongsTo(Unidade::class, 'unidade_id');
  }
  public function entregaPai()
  {
    return $this->belongsTo(PlanoEntregaEntrega::class, 'entrega_pai_id');
  }        //nullable
  
  public function produtos()
  {
    return $this->hasMany(PlanoEntregaEntregaProduto::class, 'entrega_id');
  }
}
