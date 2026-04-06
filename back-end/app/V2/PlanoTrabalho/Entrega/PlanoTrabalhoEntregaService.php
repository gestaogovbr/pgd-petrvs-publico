<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega;

use App\Models\PlanoTrabalhoEntrega;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\V2\PlanoTrabalho\Documento\TCR\TCRInvalidador;
use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaStoreValidator;

class PlanoTrabalhoEntregaService
{
    public function __construct(
        private readonly PlanoTrabalhoEntregaRepository $repository,
        private readonly PlanoTrabalhoEntregaStoreValidator $storeValidator,
        private readonly TCRInvalidador $tcrInvalidador,
    ) {}

    public function store(PlanoTrabalhoEntregaStoreDTO $dto): PlanoTrabalhoEntrega
    {
        $this->storeValidator->validar($dto);

        $entrega = $this->repository->create($dto->toArray());

        $this->tcrInvalidador->invalidar($dto->planoTrabalhoId);

        return $entrega;
    }

    public function update(string $entregaId, PlanoTrabalhoEntregaStoreDTO $dto): PlanoTrabalhoEntrega
    {
        $this->storeValidator->validar($dto);

        $entrega = $this->repository->update($entregaId, $dto->toArray());

        $this->tcrInvalidador->invalidar($dto->planoTrabalhoId);

        return $entrega->refresh();
    }

    public function destroy(string $planoTrabalhoId, string $entregaId): void
    {
        $this->storeValidator->validarDestroy($planoTrabalhoId);

        $this->repository->delete($entregaId);
        $this->tcrInvalidador->invalidar($planoTrabalhoId);
    }
}
