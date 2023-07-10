<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanejamentoObjetivo;
use App\Models\PlanoEntregaEntrega;

class PlanoEntregaObjetivo extends ModelBase
{
    protected $table = 'planos_entregas_entregas_objetivos';

    protected $with = [];

    public $fillable = [ // TYPE; NULL?; DEFAULT?; // COMMENT
        'plano_entrega_entrega_id', // char(36); NOT NULL; 
        'objetivo_id', // char(36); NOT NULL; 
        //'data_inicio', // datetime; NOT NULL; // Data inicio da vigência
        //'data_fim', // datetime; // Data fim da vigência
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    // Has
    // public function atividades() { return $this->hasMany(PlanoAtividade::class); }
    // Belongs
    public function objetivo() { return $this->belongsTo(PlanejamentoObjetivo::class, 'objetivo_id'); }
    public function entrega() { return $this->belongsTo(PlanoEntregaEntrega::class, 'entrega_id'); }
}