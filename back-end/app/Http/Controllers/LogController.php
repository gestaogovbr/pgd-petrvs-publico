<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Services\LogService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

class LogController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}
}
