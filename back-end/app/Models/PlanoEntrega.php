<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\Planejamento;
use App\Models\CadeiaValor;
use App\Models\PlanoEntregaEntrega;
use Illuminate\Support\Facades\DB;

class PlanoEntrega extends ModelBase
{
  protected $table = 'planos_entregas';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'nome', /* varchar(256); NOT NULL; */ // Nome do plano de entregas
    'planejamento_id', /* char(36); */
    'cadeia_valor_id', /* char(36); */
    'unidade_id', /* char(36); NOT NULL; */
    'plano_entrega_id', /* char(36); */
    'data_arquivamento', /* datetime; */ // Data de arquivamento do plano de entregas
    'programa_id', /* char(36); NOT NULL; */
    'criacao_usuario_id', /* char(36); NOT NULL; */
    //'status', /* enum('INCLUIDO','HOMOLOGANDO','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO','CANCELADO'); */// Status atual do plano de entregas
    'data_inicio', /* datetime; NOT NULL; */ // Data inicial do plano de entregas
    'data_fim', /* datetime; */ // Data final do plano de entregas
    //'avaliacao_id',
    //'deleted_at', /* timestamp; */
    //'numero', /* int; NOT NULL; */// Número do plano de entrega (Gerado pelo sistema)
  ];

  public $fillable_changes = ["entregas"];

  public $delete_cascade = [];

  protected static function booted()
  {
    static::creating(function ($planoEntrega) {
      $planoEntrega->numero = DB::select("CALL sequence_plano_entrega_numero()")[0]->number;
    });
  }

  // Has
  public function statusHistorico()
  {
    return $this->hasMany(StatusJustificativa::class, "plano_entrega_id");
  }
  public function latestStatus()
  {
    return $this->hasOne(StatusJustificativa::class, "plano_entrega_id")->latestOfMany();
  }
  public function entregas()
  {
    return $this->hasMany(PlanoEntregaEntrega::class);
  }
  public function planosEntrega()
  {
    return $this->hasMany(PlanoEntrega::class);
  }
  public function planosTrabalho()
  {
    return $this->hasMany(PlanoTrabalho::class);
  }
  public function avaliacoes()
  {
    return $this->hasMany(Avaliacao::class, 'plano_entrega_id');
  }
  // Belongs
  public function planejamento()
  {
    return $this->belongsTo(Planejamento::class);
  }  //nullable
  public function cadeiaValor()
  {
    return $this->belongsTo(CadeiaValor::class);
  }    //nullable
  public function unidade()
  {
    return $this->belongsTo(Unidade::class);
  }
  public function criador()
  {
    return $this->belongsTo(Usuario::class, 'criacao_usuario_id');
  }
  public function programa()
  {
    return $this->belongsTo(Programa::class);
  }
  public function planoEntregaSuperior()
  {
    return $this->belongsTo(PlanoEntrega::class, 'plano_entrega_id');
  } //nullable
  public function avaliacao()
  {
    return $this->belongsTo(Avaliacao::class);
  }  //nullable

}
