<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Planejamento;
use App\Models\EixoTematico;
use App\Models\PlanoEntregaEntregaObjetivo;

class PlanejamentoObjetivo extends ModelBase
{
    protected $table = 'planejamentos_objetivos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do objetivo
        'fundamentacao', /* varchar(256); NOT NULL; */// Fundamentação do objetivo
        'planejamento_id', /* char(36); NOT NULL; */
        'sequencia', /* int; NOT NULL; */// Sequência utilizada para ordenar os objetivos
        'eixo_tematico_id', /* char(36); NOT NULL; */
        'path', /* text; */// Path dos nós pais separados por /, ou NULL caso sejam nós raiz
        'objetivo_pai_id', /* char(36); */
        //'deleted_at', /* timestamp; */
    ];

    public $delete_cascade = ["objetivos"];

    // Has
    public function objetivos() { return $this->hasMany(PlanejamentoObjetivo::class, 'objetivo_pai_id'); }
    public function entregasObjetivos() { return $this->hasMany(PlanoEntregaEntregaObjetivo::class, 'objetivo_id'); }
    // Belongs
    public function planejamento() { return $this->belongsTo(Planejamento::class); }
    public function eixoTematico() { return $this->belongsTo(EixoTematico::class); }
    public function objetivoPai() { return $this->belongsTo(PlanejamentoObjetivo::class); }
}