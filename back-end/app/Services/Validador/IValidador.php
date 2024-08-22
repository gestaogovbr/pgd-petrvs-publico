<?php

namespace App\Services\Validador;

use Illuminate\Http\Request;

interface IValidador
{
    public function validar(Request $request);
}
