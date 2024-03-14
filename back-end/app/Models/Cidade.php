<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Entidade;
use App\Models\Feriado;

class Cidade extends ModelBase
{
  protected $table = 'cidades';

  protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'codigo_ibge', /* varchar(20); NOT NULL; */// Código IBGE
        'nome', /* varchar(256); NOT NULL; */// Nome
        'tipo', /* set('MUNICIPIO','DISTRITO','CAPITAL'); NOT NULL; */// Tipo da cidade
        'uf', /* varchar(2); NOT NULL; */// Unidade Federativa
        'timezone', /* int; NOT NULL; */// Timezone UTC da cidade
        //'deleted_at', /* timestamp; */
    ];

  // Has
  public function unidades()
  {
    return $this->hasMany(Unidade::class);
  }
  public function entidades()
  {
    return $this->hasMany(Entidade::class);
  }
  public function feriados()
  {
    return $this->hasMany(Feriado::class);
  }
  public function curriculuns()
  {
    return $this->hasMany(Curriculum::class);
  }
}
