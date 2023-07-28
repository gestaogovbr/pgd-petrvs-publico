<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;

class AtividadeTarefaController extends ControllerBase {
    public $updatable = ["concluido", "comentarios"];

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}
}
