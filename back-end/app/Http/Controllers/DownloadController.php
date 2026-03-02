<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

class DownloadController extends ControllerBase {
    /**
     * @param string $action
     * @param Request $request
     * @param mixed $service
     * @param mixed $unidade
     * @param mixed $usuario
     * @return void
     */
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}
}
