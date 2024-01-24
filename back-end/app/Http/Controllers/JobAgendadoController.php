<?php

namespace App\Http\Controllers;

use App\Services\JobAgendadoService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class JobAgendadoController extends Controller {

    protected $jobAgendadoService;

    public function __construct(JobAgendadoService $jobAgendadoService)
    {
        $this->jobAgendadoService = $jobAgendadoService;
    }

    public function listar(Request $request) {

        dd("listar");

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
}
