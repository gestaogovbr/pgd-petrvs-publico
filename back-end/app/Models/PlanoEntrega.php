<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\Planejamento;
use App\Models\CadeiaValor;
use App\Models\PlanoEntregaEntrega;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use Illuminate\Support\Facades\DB;

class PlanoEntrega extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planos_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência do registro
        'data_fim', /* datetime; */// Data fim da vigência do registro
        'inicio', /* datetime; NOT NULL; */// Data inicio do planejamento
        'fim', /* datetime; */// Data fim do planejamento
        'nome', /* varchar(256); NOT NULL; */// Nome do plano estratégico/entregas
        'planejamento_id', /* char(36); */
        'cadeia_valor_id', /* char(36); */
        'unidade_id', /* char(36); NOT NULL; */
        'status', /* enum('INCLUINDO','HOMOLOGANDO','ATIVO','CONCLUIDO','AVALIADO','SUSPENSO'); NOT NULL; */// Status do plano de entrega
        'plano_entrega_id', /* char(36); */
        'numero', /* int; NOT NULL; */// Número do plano de entrega (Gerado pelo sistema)
        'data_arquivamento', /* datetime; */// Data de arquivamento do plano de entregas
        'data_cancelamento', /* datetime; */// Data de cancelamento do plano de entregas
        'cancelamento_usuario_id', /* char(36); */
        'programa_id', /* char(36); NOT NULL; */
        //'criacao_usuario_id', /* char(36); */
    ];

    public $fillable_changes = ["entregas"];

    public $delete_cascade = [];

    protected static function booted()
    {
        static::creating(function ($plano) {
            $plano->numero = DB::select("CALL sequence_plano_entrega_numero()")[0]->number;
        });
    }

    // Has
    public function entregas() { return $this->hasMany(PlanoEntregaEntrega::class, 'plano_entrega_id'); }
    // Belongs
    public function planejamento() { return $this->belongsTo(Planejamento::class, 'planejamento_id'); }
    public function cadeiaValor() { return $this->belongsTo(CadeiaValor::class, 'cadeia_valor_id'); }
    public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }
    public function usuario() { return $this->belongsTo(Usuario::class, 'criacao_usuario_id'); }
    public function programa() { return $this->belongsTo(Programa::class, 'programa_id'); }
    public function planoEntregaSuperior() { return $this->belongsTo(PlanoEntrega::class, 'plano_entrega_id'); }
}
  /*
  PROBLEMAS:

  plano_trabalho.id: 3ddb0d3d-7e51-4091-ac01-9f312b8c70b3
  entregas_plano_trabalho.id                plano_entrega_entrega_id                  entrega_id
  7f396cc7-b09f-4b92-bd46-909cc2a8b8fb      54a584f7-0b89-11ee-975a-0242ac120002      NULL
  ba43a0e6-6255-4f99-b09a-e06ccf6c997c      NULL                                      6f76cc53-7088-463f-b854-0c2c826f0317
  dcce5d96-bd78-477c-bc81-a1252ac2de76      9281a3f6-5c61-4ca5-9a84-194eba161c99      NULL
  de955a65-7d01-4a3d-8c29-33a062648db6      5d3546cf-0b89-11ee-975a-0242ac120002      NULL
  fb9cc220-5198-48c4-a7ff-2566cf3f191d      NULL                                      9675f1c5-c4fa-44cc-b8d8-5dda4a550382
  
  */