<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\PlanoEntregaEntregaObjetivo;
use App\Models\PlanoEntregaEntregaProcesso;
use App\Models\PlanoEntrega;
use App\Models\Entrega;
use App\Models\Unidade;

class PlanoEntregaEntrega extends ModelBase
{
    protected $table = 'planos_entregas_entregas';

    protected $with = [];

    public $fillable = [ // TYPE; NULL?; DEFAULT?; // COMMENT
        'data_inicio', // datetime; NOT NULL; // Data inicio da vigência
        'data_fim', // datetime; // Data fim da vigência
        'inicio', // datetime; NOT NULL; // Data inicio
        'fim', // datetime; // Data fim
        'descricao', // varchar(256); NOT NULL; // Descrição da entrega
        'homologado', // tinyint; NOT NULL; // Se a entrega foi homologada
        'meta', // json; NOT NULL; // Meta para a entrega
        'realizado', // json; // Valor realizado
        'plano_entrega_id', // char(36); 
        'entrega_id', // char(36); NOT NULL; 
        'entrega_pai_id', // char(36); 
        'progresso_esperado', // decimal(5,2); DEFAULT: '0.00'; // Percentual de progresso do Plano de Entregas esperado
        'progresso_realizado', // decimal(5,2); DEFAULT: '0.00'; // Percentual de progresso do Plano de Entregas realizado
        'unidade_id', // char(36); NOT NULL; 
        'destinatario', // varchar(255); // Destinatário da entrega
        //'cliente', // text; // Cliente da entrega        
    ];

    public $fillable_changes = ['objetivos', 'processos']; 

    // Casting
    protected $casts = [
        'meta' => AsJson::class,
        'realizado' => AsJson::class
    ];

    // HasMany
    public function objetivos() { return $this->hasMany(PlanoEntregaEntregaObjetivo::class, 'plano_entrega_entrega_id'); }
    public function processos() { return $this->hasMany(PlanoEntregaEntregaProcesso::class, 'plano_entrega_entrega_id'); }
    // Belongs
    public function planoEntrega() { return $this->belongsTo(PlanoEntrega::class); }
    public function entrega() { return $this->belongsTo(Entrega::class); }
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function entregaPai() { return $this->belongsTo(PlanoEntregaEntrega::class); }
}