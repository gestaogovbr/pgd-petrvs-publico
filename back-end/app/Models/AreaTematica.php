<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;


class AreaTematica extends ModelBase
{
   
    protected $table = 'areas_tematicas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'ativo' 
    ];

    //Has
    public function capacidadesTecnicas() { return $this->hasMany(CapacidadeTecnica::class, 'area_tematica_id'); }
    
}
