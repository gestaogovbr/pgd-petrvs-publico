<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CadeiaValorProcesso;
use App\Models\PlanoEntregaEntrega;

class PlanoEntregaEntregaProcesso extends ModelBase
{
    protected $table = 'planos_entregas_entregas_processos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'processo_id', /* char(36); NOT NULL; */
        'plano_entrega_entrega_id', /* char(36); NOT NULL; */
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];
  
    // Has
    // public function atividades() { return $this->hasMany(PlanoAtividade::class); }
    // Belongs
    public function processo() { return $this->belongsTo(CadeiaValorProcesso::class, 'processo_id'); }
    public function entrega() { return $this->belongsTo(PlanoEntregaEntrega::class, 'entrega_id'); }
}
