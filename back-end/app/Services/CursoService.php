<?php

namespace App\Services;

use App\Models\Curso;
use App\Services\ServiceBase;

class CursoService extends ServiceBase {

    public function idInstitucional(): string
    {
        $id = Curso::where('nome','Curso Institucional')->id();
        return $id;
    }

}
