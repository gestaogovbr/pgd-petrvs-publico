<?php

namespace App\Services;

use App\Models\Curso;
use App\Services\ServiceBase;

class CursoService extends ServiceBase
{

  public function idInstitucional(): string
  {
    return Curso::where('nome', 'Curso Institucional')->id();
  }
}
