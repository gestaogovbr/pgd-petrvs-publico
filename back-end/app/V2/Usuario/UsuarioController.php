<?php

namespace App\V2\Usuario;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\V2\Usuario\DTOs\UsuarioAtribuicoesDTO;
use App\V2\Usuario\DTOs\UsuarioDadosPessoaisDTO;
use App\V2\Usuario\DTOs\UsuarioStoreDTO;
use App\V2\Usuario\Validators\UsuarioRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class UsuarioController extends Controller
{
    public function __construct(
        protected UsuarioService $service,
    ) {}

    public function store(Request $request): JsonResponse
    {
        try {
            $data = UsuarioRequestValidator::store($request);
            $dto = UsuarioStoreDTO::fromArray($data);
            $usuario = $this->service->store($dto);

            return response()->json(['success' => true, 'data' => $usuario], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateDadosPessoais(Request $request, string $usuarioId): JsonResponse
    {
        try {
            $data = UsuarioRequestValidator::dadosPessoais($request);
            $dto = UsuarioDadosPessoaisDTO::fromArray($data);
            $usuario = $this->service->updateDadosPessoais($usuarioId, $dto);

            return response()->json(['success' => true, 'data' => $usuario]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateTextoComplementar(Request $request, string $usuarioId): JsonResponse
    {
        try {
            $data = UsuarioRequestValidator::textoComplementar($request);
            $usuario = $this->service->updateTextoComplementar($usuarioId, $data['texto_complementar_plano']);

            return response()->json(['success' => true, 'data' => $usuario]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updatePerfil(Request $request, string $usuarioId): JsonResponse
    {
        try {
            $data = UsuarioRequestValidator::perfil($request);
            $usuario = $this->service->updatePerfil($usuarioId, $data['perfil_id']);

            return response()->json(['success' => true, 'data' => $usuario]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateAtribuicoes(Request $request, string $usuarioId): JsonResponse
    {
        try {
            $data = UsuarioRequestValidator::atribuicoes($request);
            $dto = UsuarioAtribuicoesDTO::fromArray($data, $usuarioId);
            $usuario = $this->service->updateAtribuicoes($dto);

            return response()->json(['success' => true, 'data' => $usuario]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateNomeSocial(Request $request): JsonResponse
    {
        try {
            $data = UsuarioRequestValidator::nomeSocial($request);
            $this->service->updateNomeSocial(Auth::id(), $data['nome_social']);

            return response()->json(['success' => true]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function searchByNomeMatricula(Request $request): JsonResponse
    {
        try {
            $data = UsuarioRequestValidator::searchByNomeMatricula($request);
            $result = $this->service->searchByNomeMatricula(
                $data['nome_matricula'],
                Auth::id(),
            );
            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Request $request, string $usuarioId): JsonResponse
    {
        try {
            UsuarioRequestValidator::show($request, $usuarioId);

            $result = $this->service->show($usuarioId);

            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function unidadesVinculadasPorCpf(Request $request, string $cpf): JsonResponse
    {
        try {
            $data = UsuarioRequestValidator::unidadesVinculadasPorCpf($request, $cpf);
            $result = $this->service->unidadesVinculadasPorCpf($data['cpf']);

            return response()->json(['success' => true, 'data' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
