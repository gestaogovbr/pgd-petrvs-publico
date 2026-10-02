<?php

declare(strict_types=1);

namespace App\V2\Usuario\DispensaPlanoTrabalho;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class DispensaPlanoTrabalhoController extends Controller
{
    public function __construct(
        private readonly DispensaPlanoTrabalhoService $service,
        private readonly DispensaPlanoTrabalhoValidator $validator,
    ) {}

    public function show(string $id): JsonResponse
    {
        try {
            $data = $this->service->show($id, $this->ator());

            return response()->json(['success' => true, 'data' => $data]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(string $id, Request $request): JsonResponse
    {
        try {
            $dados = $this->validator->validarFormalizar($request);
            $data = $this->service->formalizarOuAlterar($id, $this->ator(), $dados);

            return response()->json(['success' => true, 'data' => $data]);
        } catch (ValidationException $e) {
            $message = collect($e->errors())->flatten()->first() ?: $e->getMessage();

            return response()->json(['error' => $message], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function encerrar(string $id, Request $request): JsonResponse
    {
        try {
            $this->validator->validarEncerrar($request);
            $data = $this->service->encerrar($id, $this->ator());

            return response()->json(['success' => true, 'data' => $data]);
        } catch (ValidationException $e) {
            $message = collect($e->errors())->flatten()->first() ?: $e->getMessage();

            return response()->json(['error' => $message], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function ator(): Usuario
    {
        /** @var Usuario $user */
        $user = Auth::user();
        $user->loadMissing('perfil');

        return $user;
    }
}
