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
        'sequencia', /* int; NOT NULL; */// Sequência utilizada para ordenar os objetivos
        'path', /* text; */// IDs dos nós ascendentes separados por /, ou NULL caso seja um nó raiz
        'eixo_tematico_id', /* char(36); NOT NULL; */
        'objetivo_pai_id', /* char(36); */
        'planejamento_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
        'objetivo_superior_id', /* char(36); */
    ];

    public $delete_cascade = ["objetivos"];

    // Has
    public function objetivos() { return $this->hasMany(PlanejamentoObjetivo::class, 'objetivo_superior_id'); }
    public function objetivosFilhos() { return $this->hasMany(PlanejamentoObjetivo::class, 'objetivo_pai_id'); }
    public function objetivosEntrega() { return $this->hasMany(PlanoEntregaEntregaObjetivo::class, 'planejamento_objetivo_id'); }//ok
    // Belongs
    public function planejamento() { return $this->belongsTo(Planejamento::class); }
    public function eixoTematico() { return $this->belongsTo(EixoTematico::class); }
    public function objetivoPai() { return $this->belongsTo(PlanejamentoObjetivo::class); }    //nullable
    public function objetivoSuperior() { return $this->belongsTo(PlanejamentoObjetivo::class); }    //nullable
}