<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\Documento;
use App\Models\TipoModalidade;
use App\Models\PlanoAtividade;
use Illuminate\Support\Facades\DB;

class PlanoEntregaObjetivo extends ModelBase
{
    protected $table = 'planos_entregas_entregas_objetivos';

    protected $with = [];

    public $fillable = [ // TYPE; NULL?; DEFAULT?; // COMMENT

    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    // Has
    // public function atividades() { return $this->hasMany(PlanoAtividade::class); }
    // Belongs
    public function objetivo() { return $this->belongsTo(PlanejamentoObjetivo::class); }
    public function entrega() { return $this->belongsTo(PlanoEntregaEntrega::class, 'plano_entrega_entrega_id'); }
}

/*
        'plano_entrega_entrega_id', // char(36); NOT NULL; 
        'objetivo_id', // char(36); NOT NULL; 
        //'data_inicio', // datetime; NOT NULL; // Data inicio da vigência
        //'data_fim', // datetime; // Data fim da vigência
*/