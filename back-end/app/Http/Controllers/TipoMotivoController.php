<?php

namespace App\Http\Controllers;

use App\Models\TipoMotivo;
use App\Services\TipoMotivoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

class TipoMotivoController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}
}
