<?php

namespace App\Http\Controllers;

use App\Services\JobAgendadoService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Jobs\SincronizarSiapeJob;
use App\Jobs\LogJob;
use Throwable;

class JobAgendadoController extends Controller {

    protected $jobAgendadoService;

    public function __construct(JobAgendadoService $jobAgendadoService)
    {
        $this->jobAgendadoService = $jobAgendadoService;
    }

    public function listar(Request $request)
    {
        try {
            $tenantId = $request->get('tenant_id');
            $jobs = $this->jobAgendadoService->listar($tenantId);
            return response()->json(['success' => true, 'data' => $jobs]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function createJob(Request $request)
    {
        try {
            $tenantId = $request->get('tenant_id');
            $dados = $request->only(['nome_do_job', 'diario', 'horario', 'expressao_cron', 'ativo','tenant_id','parameters']);
            $result = $this->jobAgendadoService->createJob($dados, $tenantId);
            return response()->json($result);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function removerJob(Request $request, $id)
    {
        try {
            $tenantId = $request->get('tenant_id');
            $result = $this->jobAgendadoService->removerJob($id, $tenantId);
            return response()->json($result);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function sincronizarSiape(Request $request)
    {
        $usuario_id = $request->input('usuario_id', '08246b0c-e5ff-11ee-a54a-0242ac130002');
        SincronizarSiapeJob::dispatch($usuario_id);
        return response()->json(['message' => 'sincronizarSiape iniciado com sucesso!']);
    }

    public function logJob()
    {
        LogJob::dispatch(true);
        return response()->json(['message' => 'LogJob iniciado com sucesso!']);
    }
}
