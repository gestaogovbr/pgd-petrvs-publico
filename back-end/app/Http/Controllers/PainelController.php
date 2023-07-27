<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class PainelController extends ControllerBase {
    
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        throw new ServerException("ValidatePainel");
    }
    
}
