<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalho;
use App\Models\Entrega;
use App\Models\PlanoEntregaEntrega;

class PlanoTrabalhoEntrega extends ModelBase
{
    protected $table = 'planos_trabalhos_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'plano_entrega_entrega_id', /* char(36); */
        'entrega_id', /* char(36); */
        'descricao', /* varchar(256); NOT NULL; */// Detalhamento da entrega
        'forca_trabalho', /* decimal(5,2); NOT NULL; DEFAULT: '0.00'; */// Percentual da força de trabalho associado a esta entrega
        //'deleted_at', /* timestamp; */
        //'plano_trabalho_id', /* char(36); NOT NULL; */
    ];

    public $delete_cascade = [];

    // Has
    public function atividades() { return $this->hasMany(Atividade::class); } //OK//
    public function entregasConsolidacao() { return $this->hasMany(PlanoTrabalhoConsolidacaoEntrega::class, 'entrega_id'); } //OK//
    // Belongs
    public function planoTrabalho() { return $this->belongsTo(PlanoTrabalho::class); }//OK//
    public function planoEntregaEntrega() { return $this->belongsTo(PlanoEntregaEntrega::class); }//OK//    //nullable
    public function entrega() { return $this->belongsTo(Entrega::class); }//OK//    //nullable
}
