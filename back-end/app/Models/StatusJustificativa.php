<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Atividade;

class StatusJustificativa extends ModelBase
{
    protected $table = 'status_justificativas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'codigo',
        'justificativa',
        'plano_entrega_id',
        'plano_trabalho_id',
        'plano_trabalho_consolidacao_id',
        'atividade_id',
        'usuario_id',
    ];
    //Has
    // Belongs
    public function planoEntrega() { return $this->belongsTo(PlanoEntrega::class, "plano_entrega_id"); }   
    public function planoTrabalho() { return $this->belongsTo(PlanoTrabalho::class, "plano_trabalho_id"); }   
    public function planoTrabalhoConsolidacao() { return $this->belongsTo(PlanoTrabalhoConsolidacao::class, "plano_trabalho_consolidacao_id"); }   
    public function atividade() { return $this->belongsTo(Atividade::class, "atividade_id"); }  
    public function usuario() { return $this->belongsTo(Usuario::class, "usuario_id"); }  
}