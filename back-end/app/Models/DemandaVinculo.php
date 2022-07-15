<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;

class DemandaVinculo extends ModelBase
{
    public $fillable = [
        'remember_token',
        'tipo',
        'data_hora',
        'demanda_id',
        'demanda_vinculo_id'
    ];

    protected $table = 'demandas_vinculos';

    // Belongs
    public function demanda() { return $this->belongsTo(Demanda::class, 'demanda_id'); }  
    public function demanda_vinculo() { return $this->belongsTo(DemandaVinculo::class, 'demanda_vinculo_id'); }   
}
