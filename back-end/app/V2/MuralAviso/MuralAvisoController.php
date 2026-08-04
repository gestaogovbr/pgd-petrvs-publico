<?php

declare(strict_types=1);

namespace App\V2\MuralAviso;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\Controller;
use App\Models\PainelUsuario;
use App\V2\MuralAviso\DTOs\MuralAvisoStoreDTO;
use App\V2\MuralAviso\Validators\MuralAvisoRequestValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class MuralAvisoController extends Controller
{
    private const DEFAULT_PER_PAGE = 15;

    public function __construct(
        private readonly MuralAvisoService $service,
    ) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $data = MuralAvisoRequestValidator::query($request);
            $user = $this->getUser();
            $perPage = (int) ($data['per_page'] ?? self::DEFAULT_PER_PAGE);

            $result = $this->service->query(
                $this->getTenantIds($user),
                $user->nivel,
                $perPage,
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

    public function show(string $id): JsonResponse
    {
        try {
            $aviso = $this->service->show($id);

            return response()->json(['success' => true, 'data' => $aviso]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $data = MuralAvisoRequestValidator::store($request);
            $user = $this->getUser();
            $dto = MuralAvisoStoreDTO::fromArray($data);

            $entity = $this->service->store(
                $dto,
                (string) $user->id,
                $user->nivel,
                $this->getTenantIds($user),
            );

            return response()->json(['success' => true, 'data' => $entity], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $data = MuralAvisoRequestValidator::update($request);
            $user = $this->getUser();
            $dto = MuralAvisoStoreDTO::fromArray($data);

            $entity = $this->service->update(
                $id,
                $dto,
                $user->nivel,
                $this->getTenantIds($user),
            );

            return response()->json(['success' => true, 'data' => $entity]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], $e->status);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $user = $this->getUser();

            $this->service->destroy(
                $id,
                $user->nivel,
                $this->getTenantIds($user),
            );

            return response()->json(['success' => true]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function pendentes(Request $request): JsonResponse
    {
        try {
            $usuarioId = (string) $request->user()->id;
            $tenantId = tenant('id');

            $avisos = $this->service->pendentes($usuarioId, $tenantId);
            $data = array_map(fn ($dto) => $dto->toArray(), $avisos);

            return response()->json(['success' => true, 'data' => $data]);
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function confirmar(Request $request): JsonResponse
    {
        try {
            $usuarioId = (string) $request->user()->id;

            $this->service->confirmarLeitura($usuarioId);

            return response()->json(['success' => true]);
        } catch (Throwable $e) {
            report($e);
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function getUser(): PainelUsuario
    {
        /** @var PainelUsuario */
        return Auth::guard('painel')->user();
    }

    /**
     * @return list<string>
     */
    private function getTenantIds(PainelUsuario $user): array
    {
        return $user->tenants->pluck('id')->toArray();
    }
}
