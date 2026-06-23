<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega;

use App\Models\PlanoTrabalhoEntrega;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\V2\PlanoTrabalho\Documento\TCR\TCRInvalidador;
use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaAuthorizationValidator;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaStoreValidator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PlanoTrabalhoEntregaService
{
    public function __construct(
        private readonly PlanoTrabalhoEntregaRepository $repository,
        private readonly PlanoTrabalhoEntregaStoreValidator $storeValidator,
        private readonly PlanoTrabalhoEntregaAuthorizationValidator $authorizationValidator,
        private readonly TCRInvalidador $tcrInvalidador,
    ) {}

    public function store(PlanoTrabalhoEntregaStoreDTO $dto): PlanoTrabalhoEntrega
    {
        $this->authorizationValidator->validar($dto->planoTrabalhoId, Auth::id());
        $this->storeValidator->validar($dto);

        return DB::transaction(function () use ($dto) {
            $entrega = $this->repository->create($dto->toArray());

            $this->tcrInvalidador->invalidar($dto->planoTrabalhoId);

            return $entrega;
        });
    }

    public function update(string $entregaId, PlanoTrabalhoEntregaStoreDTO $dto): PlanoTrabalhoEntrega
    {
        $this->authorizationValidator->validar($dto->planoTrabalhoId, Auth::id());
        $this->storeValidator->validar($dto);

        return DB::transaction(function () use ($entregaId, $dto) {
            $entrega = $this->repository->update($entregaId, $dto->toArray());

            $this->tcrInvalidador->invalidar($dto->planoTrabalhoId);

            return $entrega->refresh();
        });
    }

    public function destroy(string $planoTrabalhoId, string $entregaId): void
    {
        $this->authorizationValidator->validar($planoTrabalhoId, Auth::id());
        $this->storeValidator->validarDestroy($planoTrabalhoId);

        DB::transaction(function () use ($planoTrabalhoId, $entregaId) {
            $this->repository->delete($entregaId)
                || throw new \RuntimeException('Falha ao remover a entrega.');

            $this->tcrInvalidador->invalidar($planoTrabalhoId);
        });
    }
}
