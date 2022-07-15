<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;
use App\Traits\AutoDataInicio;

class DemandaPausa extends ModelBase
{
    public $fillable = [
        'data_inicio',
        'data_fim',
        'demanda_id'
    ];
    
    protected $table = 'demandas_pausas';
    // Belongs
    public function demanda() { return $this->belongsTo(Demanda::class); }    
}
