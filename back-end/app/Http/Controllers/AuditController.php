<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\ControllerBase;
use App\Models\Tenant;
use App\Services\AuditService;
use App\Services\JobScheduleService;
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
            $search = $request->get('search');
            tenancy()->initialize(Tenant::find($tenantId));
            $dados = $this->auditService->listar($search);
            return response()->json($dados);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($e);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }
}
