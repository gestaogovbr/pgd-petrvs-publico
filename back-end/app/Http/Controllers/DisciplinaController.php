<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class DisciplinaController extends ControllerBase
{
  public function checkPermissions($action, $request, $service, $unidade, $usuario)
  {
    switch ($action) {
      case 'STORE':
        if (!$usuario->hasPermissionTo('MOD_RX_OUT')) throw new ServerException("CapacidadeStore");
        break;
      case 'EDIT':
        if (!$usuario->hasPermissionTo('MOD_RX_OUT')) throw new ServerException("CapacidadeEdit");
        break;
      case 'DESTROY':
        if (!$usuario->hasPermissionTo('MOD_RX_OUT')) throw new ServerException("CapacidadeDestroy");
        break;
    }
  }
}
