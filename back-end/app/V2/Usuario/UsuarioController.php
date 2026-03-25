<?php

namespace App\V2\Usuario;

use App\Http\Controllers\Controller;
use App\V2\Usuario\UsuarioValidacoes;
use App\V2\Usuario\UsuarioService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class UsuarioController extends Controller
{
    protected UsuarioService $service;

    public function __construct(UsuarioService $service)
    {
        $this->service = $service;
    }

    public function buscarPorNomeMatricula(Request $request): JsonResponse
    {
        try {
            $data = UsuarioValidacoes::buscarPorNomeMatricula($request);
            $result = $this->service->buscarPorNomeOuMatricula($data['nome_matricula']);
            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
