<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use App\Models\CadeiaValor;

class CadeiaValorProcesso extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'cadeias_valores_processos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência do registro
        //'data_fim', /* datetime; */// Data fim da vigência do registro
        'sequencia', /* int; NOT NULL; */// Sequencia dentro do grupo
        'path', /* text; */// Path dos nós pais separados por /, ou null caso sejam nós raiz
        'nome', /* varchar(256); NOT NULL; */// Nome
        'cadeia_valor_id', /* char(36); NOT NULL; */
        'processo_pai_id', /* char(36); */
    ];

    public $fillable_changes = [];

    public $fillable_relations = [];

    public $delete_cascade = [];

    // Belongs
    public function cadeiaValor() { return $this->belongsTo(CadeiaValor::class, 'cadeia_valor_id'); }
    public function processoPai() { return $this->belongsTo(CadeiaValorProcesso::class, 'processo_pai_id'); }
}
