<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalhoConsolidacao;

class PlanoTrabalhoConsolidacaoOcorrencia extends ModelBase
{
    protected $table = 'planos_trabalhos_consolidacoes_ocorrencias';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* json; NOT NULL; */// Meta para a entrega
        'data_fim', /* json; */// Valor realizado da meta
        'descricao', /* char(36); NOT NULL; */
        'plano_trabalho_consolidacao_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    // Has
    // Belongs
    public function consolidacao() { return $this->belongsTo(PlanoTrabalhoConsolidacao::class); }
}