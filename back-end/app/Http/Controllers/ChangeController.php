<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Log;
use Throwable;

class ChangeController extends ControllerBase {
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'QUERY':
                if (!$usuario->hasPermissionTo('MOD_AUDIT_LOG')) throw new ServerException("CapacidadeSearchText", "Consulta não realizada");
                break;
            case 'GETBYID':
                if (!$usuario->hasPermissionTo('MOD_AUDIT_LOG')) throw new ServerException("CapacidadeSearchText", "Consulta não realizada");
                break;
        }
    }

    public function showResponsaveis(Request $request) {
        try {
            $usuario_ids = $request->validate([
                'usuario_ids' => ['array']
            ]);
            $this->checkPermissions("QUERY", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            return response()->json(['success' => true, 'responsaveis' => $this->service->showResponsaveis($usuario_ids)]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function loadModels() {
        return response()->json([
            'success' => true,
            'models' => collect(scandir(app_path('Models')))
                ->filter(fn($file) => str_ends_with($file, '.php'))
                ->map(function ($file) {
                    $class = 'App\\Models\\' . str_replace('.php', '', $file);
                    if (is_subclass_of($class, \Illuminate\Database\Eloquent\Model::class)) {
                        return [
                            'key' => ($class),
                            'value' =>  class_basename($class),
                        ];
                    }
                    return null;
                })
                ->filter()
                ->values()
                ->toArray()
        ]);
    }
}
