<?php

namespace App\Models;

use App\Models\ModelBase;
//use App\Models\Curso;
use App\Traits\AutoDataInicio;


class Cargo extends ModelBase
{
    protected $table = 'cargos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome',
        'das',
        'codigo',
        'ativo'
        
    ];

    // Belongs
  
    
}
