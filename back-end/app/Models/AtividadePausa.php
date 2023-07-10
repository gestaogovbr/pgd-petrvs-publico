<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;

class AtividadePausa extends ModelBase
{
    protected $table = 'atividades_pausas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da pausa
        'data_fim', /* datetime; */// Data de retorno
    ];
    
    // Belongs
    public function demanda() { return $this->belongsTo(Demanda::class); }    
}
