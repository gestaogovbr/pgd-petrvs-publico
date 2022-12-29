<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;
use App\Traits\AutoDataInicio;

class DemandaPausa extends ModelBase
{
    protected $table = 'demandas_pausas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da pausa
        'data_fim', /* datetime; */// Data de retorno
        'demanda_id', /* char(36); NOT NULL; */
    ];
    
    // Belongs
    public function demanda() { return $this->belongsTo(Demanda::class); }    
}
