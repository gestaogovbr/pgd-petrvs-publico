<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;

class Cidade extends ModelBase
{
    protected $table = 'cidades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'codigo_ibge', /* varchar(20); NOT NULL; */// Código IBGE
        'nome', /* varchar(256); NOT NULL; */// Nome
        'tipo', /* set('MUNICIPIO','DISTRITO','CAPITAL'); NOT NULL; */// Data e horário que foi feito o comentário
        'uf', /* varchar(2); NOT NULL; */// Unidade Federativa
        'timezone', /* int; NOT NULL; */// Timezone UTC da cidade
    ];

    // Has
    public function unidades() { return $this->hasMany(Unidade::class); }
    public function entidades() { return $this->hasMany(Entidade::class); }
    
}
