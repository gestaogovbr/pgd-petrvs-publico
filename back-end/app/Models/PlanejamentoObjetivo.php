<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use App\Models\Planejamento;
use App\Models\EixoTematico;

class PlanejamentoObjetivo extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planejamentos_objetivos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do objetivo
        'planejamento_id', /* char(36); NOT NULL; */
        'eixo_tematico_id', /* char(36); NOT NULL; */
        'objetivo_pai_id', /* char(36); */
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data fim da vigência
        //'fundamentacao', /* varchar(256); NOT NULL; */// Fundamentação
        /*'sequencia',*/// REMOVED
        /*'path',*/// REMOVED
    ];

    // Has
    public function objetivos() { return $this->hasMany(PlanejamentoObjetivo::class, "objetivo_pai_id"); }
    // Belongs
    public function planejamento() { return $this->belongsTo(Planejamento::class, 'planejamento_id'); }
    public function eixoTematico() { return $this->belongsTo(EixoTematico::class, 'eixo_tematico_id'); }
    public function objetivoPai() { return $this->belongsTo(PlanejamentoObjetivo::class, 'objetivo_pai_id'); }
}
