<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;

class DemandaVinculo extends ModelBase
{
    protected $table = 'demandas_vinculos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'remember_token', /* varchar(100); */
        'tipo', /* enum('GRUPO','COLATERAL','HIERARQUICO'); NOT NULL; */// Tipo do vinculo
        'data_hora', /* datetime; NOT NULL; */// Data e hora do inicio do relacionamento
        'demanda_id', /* char(36); */
        'demanda_vinculo_id', /* char(36); */
    ];

    // Belongs
    public function demanda() { return $this->belongsTo(Demanda::class, 'demanda_id'); }  
    public function demanda_vinculo() { return $this->belongsTo(DemandaVinculo::class, 'demanda_vinculo_id'); }   
}
