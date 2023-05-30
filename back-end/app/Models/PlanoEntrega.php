<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
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
        'criacao_usuario_id', /* char(36); */
        //'programa_id', /* char(36); NOT NULL; */
    ];

    //public $fillable_changes = ["entregas"];

    public $delete_cascade = [];

    protected static function booted()
    {
        static::creating(function ($plano) {
            $plano->numero = DB::select("CALL sequence_plano_entrega_numero()")[0]->number;
        });
    }

    // Has
    public function entregas() { return $this->hasMany(PlanoEntregaEntrega::class); }
    // Belongs
    public function planejamento() { return $this->belongsTo(Planejamento::class, 'planejamento_id'); }
    public function cadeiaValor() { return $this->belongsTo(CadeiaValor::class, 'cadeia_valor_id'); }
    public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }
    public function usuario() { return $this->belongsTo(Usuario::class, 'criacao_usuario_id'); }
    public function planoEntregaSuperior() { return $this->belongsTo(PlanoEntrega::class, 'plano_entrega_id'); }
}
