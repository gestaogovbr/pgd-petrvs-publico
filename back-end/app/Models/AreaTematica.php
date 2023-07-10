<?php

namespace App\Models;

use App\Models\ModelBase;

class AreaTematica extends ModelBase
{
   
    protected $table = 'areas_tematicas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome da área temática
        'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Área ativa ou inativa
    ];

    //Has
    public function capacidadesTecnicas() { return $this->hasMany(CapacidadeTecnica::class, 'area_tematica_id'); }
    
}
