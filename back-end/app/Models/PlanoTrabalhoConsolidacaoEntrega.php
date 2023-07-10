<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;


class PlanoTrabalhoConsolidacaoEntrega extends ModelBase
{
    protected $table = 'planos_trabalhos_consolidacoes_entregas';

    protected $with = [];

    public $fillable = [ // TYPE; NULL?; DEFAULT?; // COMMENT
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    // Has
    // Belongs
    public function consolidacao() { return $this->belongsTo(PlanoTrabalhoConsolidacao::class); }
    public function entrega() { return $this->belongsTo(PlanoTrabalhoEntrega::class, 'entrega_id'); }
}