<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\AreaTematica;
use App\Traits\AutoDataInicio;


class CapacidadeTecnica extends ModelBase
{
   
    protected $table = 'capacidades_tecnicas';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome da capacidade técnica
        'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// capacidade ativo ou inativo
        'area_tematica_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    // Belongs
    public function areaTematica() { return $this->belongsTo(AreaTematica::class); }
    
}
