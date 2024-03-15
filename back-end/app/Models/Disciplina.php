<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Curso;

class Disciplina extends ModelBase
{
  protected $table = 'disciplinas';

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'nome', /* varchar(256); NOT NULL; */ // Nome do curso
    'sigla', /* varchar(20); */
    'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */ // Curso ativo ou inativo
  ];
}
