<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalhoConsolidacao;

class PlanoTrabalhoConsolidacaoOcorrencia extends ModelBase
{
    protected $table = 'planos_trabalhos_consolidacoes_ocorrencias';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicial da consolidacão
        'data_fim', /* datetime; NOT NULL; */// Data final da consolidação
        'descricao', /* text; NOT NULL; */// Descrição da ocorrência
        'plano_trabalho_consolidacao_id', /* char(36); NOT NULL; */// Consolidação do Plano de Trabalho à qual está associada esta entrega
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    // Has
    // Belongs
    public function consolidacao() { return $this->belongsTo(PlanoTrabalhoConsolidacao::class); }
}