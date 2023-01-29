<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Entidade;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use App\Models\PlanejamentoObjetivo;

class Planejamento extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planejamentos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'inicio', /* datetime; NOT NULL; */// Data inicio do planejamento
        'fim', /* datetime; */// Data fim do planejamento
        'nome', /* varchar(256); NOT NULL; */// Nome do planejamento estratégico
        'unidade_id', /* char(36); */
        'entidade_id', /* char(36); NOT NULL; */
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência do registro
        //'data_fim', /* datetime; */// Data fim da vigência do registro
    ];

    // Has
    public function objetivos() { return $this->hasMany(PlanejamentoObjetivo::class); }    
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }
    public function entidade() { return $this->belongsTo(Entidade::class, 'entidade_id'); }
}
