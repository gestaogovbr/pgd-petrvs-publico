<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;


class CentroTreinamento extends ModelBase
{
    protected $table = 'centros_treinamentos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do centro de treinamento
        'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Curso ativo ou inativo
        //'deleted_at', /* timestamp; */
    ];

    // Belongs
    //public function centro() { return $this->belongsTo(AreaConhecimento::class,'area_curso_id'); }
    
}
