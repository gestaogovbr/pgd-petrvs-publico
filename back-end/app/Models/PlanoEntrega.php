<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\Programa;
use App\Models\Planejamento;
use App\Models\CadeiaValor;
use App\Models\PlanoEntregaEntrega;
use Illuminate\Support\Facades\DB;

class PlanoEntrega extends ModelBase
{
    protected $table = 'planos_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'inicio', /* datetime; NOT NULL; */// Data inicial do plano de entregas
        'fim', /* datetime; */// Data final do plano de entregas
        'nome', /* varchar(256); NOT NULL; */// Nome do plano de entregas
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
        //'deleted_at', /* timestamp; */
        //'criacao_usuario_id', /* char(36); */
        /*'data_inicio',*/// REMOVED
        /*'data_fim',*/// REMOVED
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
    public function entregas() { return $this->hasMany(PlanoEntregaEntrega::class); }
    // Belongs
    public function planejamento() { return $this->belongsTo(Planejamento::class); }
    public function cadeiaValor() { return $this->belongsTo(CadeiaValor::class); }
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function usuario() { return $this->belongsTo(Usuario::class, 'criacao_usuario_id'); }
    public function programa() { return $this->belongsTo(Programa::class); }
    public function planoEntregaSuperior() { return $this->belongsTo(PlanoEntrega::class, 'plano_entrega_id'); }
}