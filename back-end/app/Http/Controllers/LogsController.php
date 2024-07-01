<?php

namespace App\Http\Controllers;


use App\Models\Logs;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use App\Exceptions\LogError;
use Throwable;

class LogsController extends ControllerBase {

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        /* Verifica se foi passada a credencial do administrador do sistema */
        if(false) throw new ServerException("CapacidadeStore", "Inserção não realizada");
    }

    public function index(Request $request)
    {

        $query = Logs::query();
    
        // Filtrar por data de criação, se fornecida
        if ($request->has('created_at')) {
            $query->createdAt($request->created_at);
        }
        
        // Filtrar por tenant_id, se fornecido
        if ($request->has('tenant_id') && !empty($request->tenant_id) ) {
            $query->tenantId($request->tenant_id);
        }

        $consoleErrors = $query->get();

        return response()->json(['success' => true, 'data' => $consoleErrors]);
    }


    public function query(Request $request)
    {
        try {
            $data = $request->validate([
                'page' => ['required'],
                'with' => ['array'],
                'limit' => ['required'],
                'orderBy' => ['array'],
                'deleted' => ['nullable'],
                'where' => ['array']
            ]);
            $result = $this->service->query($data);
            return response()->json([
                'success' => true,
                'count' => $result['count'],
                'rows' => $result['rows'],
                'extra' => $result['extra']
            ]);
        } catch (Throwable $e) {
            return LogError::newError("QUERY: exception", $e); //response()->json(['error' => $e->getMessage()]);
        }
    }
}
