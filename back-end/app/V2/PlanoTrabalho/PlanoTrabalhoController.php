<?php

namespace App\V2\PlanoTrabalho;

use App\Http\Controllers\Controller;
use App\V2\PlanoTrabalho\PlanoTrabalhoValidacoes;
use App\V2\PlanoTrabalho\PlanoTrabalhoService;
use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class PlanoTrabalhoController extends Controller
{
    protected PlanoTrabalhoService $service;

    public function __construct(PlanoTrabalhoService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $data = PlanoTrabalhoValidacoes::index($request);
            $result = $this->service->index($data);
            return response()->json(['success' => true, 'rows' => $result]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $data = PlanoTrabalhoValidacoes::store($request);
            $entity = $this->service->store($data, null);
            return response()->json(['success' => true, 'rows' => [$entity]], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request): JsonResponse
    {
        try {
            $data = PlanoTrabalhoValidacoes::update($request);
            $entity = $this->service->update($data['entity'], null);
            $result = $this->service->getById([
                'id' => $entity->id,
                'with' => $data['with'] ?? [],
            ]);
            return response()->json(['success' => true, 'rows' => [$result]]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getById(Request $request): JsonResponse
    {
        try {
            $data = PlanoTrabalhoValidacoes::getById($request);
            return response()->json(['success' => true, 'data' => $this->service->getById($data)]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function query(Request $request): JsonResponse
    {
        try {
            $data = PlanoTrabalhoValidacoes::query($request);
            $result = $this->service->query($data);
            return response()->json([
                'success' => true,
                'count' => $result['count'],
                'rows' => $result['rows'],
                'extra' => $result['extra'],
            ]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Request $request): JsonResponse
    {
        try {
            $data = PlanoTrabalhoValidacoes::destroy($request);
            return response()->json(['success' => $this->service->destroy($data['id'])]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Throwable $e) {
            Log::error(throwableToArrayLog($e));
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
