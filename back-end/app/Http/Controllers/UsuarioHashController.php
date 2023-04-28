<?php

namespace App\Http\Controllers;

use App\Models\UsuarioHash;
use App\Services\UsuarioHashService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

class UsuarioHashController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}
}
