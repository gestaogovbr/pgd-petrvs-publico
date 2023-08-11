<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;


class PlanoTrabalhoConsolidacaoAtividade extends ModelBase
{
    protected $table = 'planos_trabalhos_consolidacoes_atividades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'esforco', /* json; NOT NULL; */// Meta para a entrega
        'realizado', /* json; */// Valor realizado da meta
        'descricao', /* json; */// Valor realizado da meta
        'plano_trabalho_consolidacao_id', /* char(36); NOT NULL; */
        'plano_trabalho_entrega_id', /* char(36); NOT NULL; */
        'tipo_atividade_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    // Has
    // Belongs
    public function consolidacao() { return $this->belongsTo(PlanoTrabalhoConsolidacao::class); }
    public function entrega() { return $this->belongsTo(PlanoTrabalhoEntrega::class); } 
}