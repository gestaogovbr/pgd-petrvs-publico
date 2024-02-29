<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;

class AtividadeTarefaController extends ControllerBase {
    public $updatable = ["data_conclusao", "comentarios"];

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}
}
