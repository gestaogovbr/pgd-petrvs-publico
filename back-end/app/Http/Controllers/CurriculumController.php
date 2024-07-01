<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Log;
use Throwable;

class CurriculumController extends ControllerBase
{
  public function checkPermissions($action, $request, $service, $unidade, $usuario)
  {
    switch ($action) {
      case 'STORE':
        if (!$usuario->hasPermissionTo('MOD_RX_CURR_INCL')) throw new ServerException("CapacidadeStore");
        break;
      case 'EDIT':
        if (!$usuario->hasPermissionTo('MOD_RX_CURR_EDT')) throw new ServerException("CapacidadeEdit");
        break;
      case 'DESTROY':
        if (!$usuario->hasPermissionTo('MOD_RX_CURR_EXCL')) throw new ServerException("CapacidadeDestroy");
        break;
      case 'QUERY':
        if (!$usuario->hasPermissionTo('MOD_RX_CURR')) throw new ServerException("CapacidadeDestroy");
        break;
    }
  }

  public function lookupsCurriculum(Request $request)
  {
    try {
      //$this->checkPermissions('QUERY', $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
      $result = response()->json([
        'success' => true,
        'lookups' => $this->service->lookupsCurriculum()
      ]);
      return $result;
    }  catch (IBaseException $e) {
      return response()->json(['error' => $e->getMessage()]);
  }
  catch (Throwable $e) {
      $dataError = throwableToArrayLog($e);
      Log::error($dataError);
      return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
  }
  }
}
