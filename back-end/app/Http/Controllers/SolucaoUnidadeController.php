<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SolucaoUnidadeController extends ControllerBase
{
    public function __construct() {
        array_push($this->updatable, 'status');
        parent::__construct();
        $this->middleware('curador')->only(['update']);
    }
    
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
    }

}
