<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\ControllerBase;
use App\Services\AuditService;
use App\Services\JobAgendadoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class AuditController extends Controller {

    public function __construct(protected AuditService $auditService)
    {
    }
    public function query(Request $request)
    {
        return response()->json(['success' => true,'count'=>0, 'rows' => []]);
    }
    public function listar(Request $request)
    {
        try {
            $tenantId = $request->get('tenant_id');
            $dados = $this->audit->listar($tenantId);
            return response()->json(['success' => true, 'data' => $dados]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }
}
