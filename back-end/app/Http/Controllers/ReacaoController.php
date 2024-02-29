<?php

namespace App\Http\Controllers;

use App\Models\Reacao;
use App\Services\ReacaoService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;

class ReacaoController extends ControllerBase {
    public $updatable = ["tipo"];
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {}
}
