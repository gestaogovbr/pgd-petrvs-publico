<?php

namespace App\Http\Controllers;

use App\Models\TipoAvaliacaoJustificativa;
use App\Services\TipoAvaliacaoJustificativaService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

class TipoAvaliacaoJustificativaController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}
}
