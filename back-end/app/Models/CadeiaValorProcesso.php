<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\CadeiaValor;

class CadeiaValorProcesso extends ModelBase
{
    protected $table = 'cadeias_valores_processos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'sequencia', /* int; NOT NULL; */// Sequência do processo dentro do grupo
        'path', /* text; */// Path dos nós pais separados por /, ou NULL caso sejam nós raiz
        'nome', /* varchar(256); NOT NULL; */// Nome do processo
        'cadeia_valor_id', /* char(36); NOT NULL; */
        'processo_pai_id', /* char(36); */
    ];

    public $fillable_changes = [];

    public $fillable_relations = [];

    public $delete_cascade = [];
    // Has
    public function entregasProcessos() { return $this->hasMany(PlanoEntregaEntregaProcesso::class, 'processo_id'); }
    // Belongs
    public function cadeiaValor() { return $this->belongsTo(CadeiaValor::class); }
    public function processoPai() { return $this->belongsTo(CadeiaValorProcesso::class); }
}