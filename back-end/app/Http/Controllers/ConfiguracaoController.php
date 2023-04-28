<?php

namespace App\Http\Controllers;

use App\Models\Configuracao;
use App\Services\ConfiguracaoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

class ConfiguracaoController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}
}
