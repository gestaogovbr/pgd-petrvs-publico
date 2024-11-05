<?php

namespace App\Services\Validador;

use Illuminate\Http\Request;

interface IValidador
{
    public function validar(Request $request) : array;
    
    public function validarRegra(array $data) : array;

    public function setTipo(string $tipo) : void;
    public function getTipo() : string;
    
}
