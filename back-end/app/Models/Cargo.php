<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;


class Cargo extends ModelBase
{
    protected $table = 'cargos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'nivel',
        'descricao',
        'siape',
        'cbo',
        'efetivo',
        'ativo'
        
    ];

    // Belongs
  
    
}
