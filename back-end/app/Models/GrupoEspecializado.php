<?php

namespace App\Models;

use App\Models\ModelBase;

class GrupoEspecializado extends ModelBase
{
    protected $table = 'grupos_especializados';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do grupo especializado
        'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Nome ativo ou inativo
        //'deleted_at', /* timestamp; */
    ];

    // Belongs
    //public function centro() { return $this->belongsTo(AreaConhecimento::class,'area_curso_id'); }
    
}
