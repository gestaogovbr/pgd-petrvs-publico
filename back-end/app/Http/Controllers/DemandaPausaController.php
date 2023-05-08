<?php

namespace App\Http\Controllers;

use App\Models\DemandaPausa;
use App\Services\DemandaPausaService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

class DemandaPausaController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}
}
