<?php

namespace App\Models;

use App\Models\ModelBase;

class TipoCurso extends ModelBase
{
  protected $table = 'tipos_cursos';

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'nome', /* varchar(256); NOT NULL; */ // Nome do tipo do curso
    'ativo', /* tinyint; NOT NULL; DEFAULT: '1'; */ // Nome ativo ou inativo
    //'deleted_at', /* timestamp; */
  ];

  // hasMany
  public function cursos()
  {
    return $this->hasMany(Curso::class);
  }
}
