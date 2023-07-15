<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;


class PlanoTrabalhoConsolidacaoEntrega extends ModelBase
{
    protected $table = 'planos_trabalhos_consolidacoes_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        //'deleted_at', /* timestamp; */
        //'meta', /* json; NOT NULL; */// Meta para a entrega
        //'realizado', /* json; */// Valor realizado da meta
        //'consolidacao_id', /* char(36); NOT NULL; */
        //'entrega_id', /* char(36); NOT NULL; */
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    // Has
    // Belongs
    public function consolidacao() { return $this->belongsTo(PlanoTrabalhoConsolidacao::class); }//OK//
    public function entrega() { return $this->belongsTo(PlanoTrabalhoEntrega::class); } //OK//
}