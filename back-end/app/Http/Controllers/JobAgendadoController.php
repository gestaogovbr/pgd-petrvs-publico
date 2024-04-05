<?php

namespace App\Http\Controllers;

use App\Services\JobAgendadoService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Jobs\SincronizarPetrvsJob;
use App\Jobs\LogJob;

class JobAgendadoController extends Controller {

    protected $jobAgendadoService;

    public function __construct(JobAgendadoService $jobAgendadoService)
    {
        $this->jobAgendadoService = $jobAgendadoService;
    }

    public function listar(Request $request) {

        try {
            return response()->json([
                'success' => true,
                'data' => $this->jobAgendadoService->listar()
            ]);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        $dados = $request->only(['diario', 'horario', 'expressao_cron', 'ativo']);
        $resultado = $this->service->updateJob($id, $dados);

        try {
            return response()->json($resultado);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function sincronizarPetrvs(Request $request)
    {
     
        $usuario_id = $request->input('usuario_id', '08246b0c-e5ff-11ee-a54a-0242ac130002'); // Exemplo de como pegar o usuario_id    
        SincronizarPetrvsJob::dispatch($usuario_id);

        return response()->json(['message' => 'SincronizarPetrvsJob iniciado com sucesso!']);
    }

    public function logJob()
    { 
        LogJob::dispatch();
        return response()->json(['message' => 'LogJob iniciado com sucesso!']);
    }
}
