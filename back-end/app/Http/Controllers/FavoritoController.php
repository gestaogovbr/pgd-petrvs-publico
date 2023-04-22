<?php

namespace App\Http\Controllers;

use App\Models\Favorito;
use App\Services\FavoritoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

class FavoritoController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}
}
