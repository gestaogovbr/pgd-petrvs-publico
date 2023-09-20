<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Afastamento;

class PlanoTrabalhoConsolidacaoAfastamento extends ModelBase
{
    protected $table = 'planos_trabalhos_consolidacoes_afastamentos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'snapshot', /* datetime; NOT NULL; */// Data inicial da consolidacão
        'data_conclusao', 
        'plano_trabalho_consolidacao_id', /* char(36); NOT NULL; */// Consolidação do Plano de Trabalho à qual está associada esta entrega
        'afastamento_id', /* char(36); NOT NULL; */// Consolidação do Plano de Trabalho à qual está associada esta entrega
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    protected $casts = [
        "data_conclusao" => "datetime",
        "snapshot" => AsJson::class
    ];

    // Has
    // Belongs
    public function consolidacao() { return $this->belongsTo(PlanoTrabalhoConsolidacao::class); }
    public function afastamento() { return $this->belongsTo(Afastamento::class); }
}