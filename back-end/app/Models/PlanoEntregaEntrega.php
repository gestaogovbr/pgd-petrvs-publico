<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\PlanoEntregaEntregaObjetivo;
use App\Models\PlanoEntregaEntregaProcesso;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\PlanoEntrega;
use App\Models\Entrega;
use App\Models\Unidade;

class PlanoEntregaEntrega extends ModelBase
{
    protected $table = 'planos_entregas_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'inicio', /* datetime; NOT NULL; */// Data inicial da entrega
        'fim', /* datetime; */// Data final da entrega
        'descricao', /* varchar(256); NOT NULL; */// Descrição da entrega
        'homologado', /* tinyint; NOT NULL; */// Se a entrega foi ou não homologada
        'meta', /* json; NOT NULL; */// Meta para a entrega
        'realizado', /* json; */// Valor realizado da entrega
        'destinatario', /* varchar(255); */// Destinatário da entrega
        'progresso_esperado', /* decimal(5,2); DEFAULT: '0.00'; */// Percentual esperado de progresso do Plano de Entregas
        'progresso_realizado', /* decimal(5,2); DEFAULT: '0.00'; */// Percentual realizado de progresso do Plano de Entregas
        'unidade_id', /* char(36); NOT NULL; */// Unidade demandante da entrega
        'plano_entrega_id', /* char(36); NOT NULL; */
        'entrega_id', /* char(36); */// Entrega do Catálogo ao qual está associada esta entrega (opcional)
        'entrega_pai_id', /* char(36); */
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = ['objetivos', 'processos']; 

    // Casting
    protected $casts = [
        'meta' => AsJson::class,
        'realizado' => AsJson::class
    ];

    // HasMany
    public function objetivos() { return $this->hasMany(PlanoEntregaEntregaObjetivo::class); }  
    public function processos() { return $this->hasMany(PlanoEntregaEntregaProcesso::class); }  
    public function entregasPlanoTrabalho() { return $this->hasMany(PlanoTrabalhoEntrega::class); }     
    // Belongs
    public function planoEntrega() { return $this->belongsTo(PlanoEntrega::class); }    
    public function entrega() { return $this->belongsTo(Entrega::class); }      //nullable
    public function unidade() { return $this->belongsTo(Unidade::class); }  
    public function entregaPai() { return $this->belongsTo(PlanoEntregaEntrega::class); }        //nullable
}