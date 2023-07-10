<?php

namespace App\Models;

use App\Models\ModelBase;

class Cargo extends ModelBase
{
    protected $table = 'cargos';

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do Cargo
        'nivel', /* varchar(256); */// Nível do Cargo
        'descricao', /* varchar(256); */// Descrição do Cargo
        'siape', /* varchar(256); */// código SIAPE do Cargo
        'cbo', /* varchar(256); */// código CBO do Cargo
        'efetivo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Cargo efetivo ou comissionado
        'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */// Cargo ativo ou inativo
    ];

    // Belongs
  
    
}
