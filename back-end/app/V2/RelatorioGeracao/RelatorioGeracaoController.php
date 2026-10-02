<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao;

use App\Exceptions\Contracts\IBaseException;
use App\Exceptions\ServerException;
use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Support\AuthenticatedUsuario;
use App\V2\RelatorioGeracao\Validators\RelatorioGeracaoRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Throwable;

class RelatorioGeracaoController extends Controller
{
    public function __construct(
        private readonly RelatorioGeracaoService $service,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $dto = RelatorioGeracaoRequestValidator::index($request);
            $usuario = $this->usuarioAutorizado('MOD_RELATORIOS', 'Acesso negado à geração de relatórios.');

            return response()->json(['success' => true, 'data' => $this->service->index($dto, $usuario, $request)]);
        } catch (ValidationException $e) {
            return response()->json(['error' => collect($e->errors())->flatten()->first() ?? $e->getMessage()], 422);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $this->statusFromException($e));
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function status(Request $request): JsonResponse
    {
        try {
            $dto = RelatorioGeracaoRequestValidator::status($request);
            $usuario = $this->usuarioAutorizado('MOD_RELATORIOS', 'Acesso negado à geração de relatórios.');

            return response()->json(['success' => true, 'data' => $this->service->statusPorIds($dto, $usuario)]);
        } catch (ValidationException $e) {
            return response()->json(['error' => collect($e->errors())->flatten()->first() ?? $e->getMessage()], 422);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $this->statusFromException($e));
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $dto = RelatorioGeracaoRequestValidator::store($request);
            $usuario = $this->usuarioAutorizado($dto->tipo->capacidade(), 'Acesso negado à exportação deste relatório.');

            return response()->json(['success' => true, 'data' => $this->service->store($dto, $usuario)]);
        } catch (ValidationException $e) {
            return response()->json(['error' => collect($e->errors())->flatten()->first() ?? $e->getMessage()], 422);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $this->statusFromException($e));
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado ao solicitar a geração do relatório.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function download(string $id): StreamedResponse|JsonResponse
    {
        try {
            $usuario = $this->usuarioAutorizado('MOD_RELATORIOS', 'Acesso negado ao download do relatório.');

            return $this->service->download($id, $usuario);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $this->statusFromException($e));
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));

            return response()->json(['error' => 'Ocorreu um erro inesperado ao baixar o relatório.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function usuarioAutorizado(string $capacidade, string $mensagem): Usuario
    {
        $usuario = AuthenticatedUsuario::withAreasDeTrabalho();
        if ($usuario === null || ! $usuario->hasPermissionTo($capacidade)) {
            throw new ServerException('RelatorioCapacidade', $mensagem);
        }

        return $usuario;
    }

    private function statusFromException(IBaseException $e): int
    {
        $code = (int) $e->getCode();
        if ($code >= 400 && $code < 600) {
            return $code;
        }

        return Response::HTTP_BAD_REQUEST;
    }
}
