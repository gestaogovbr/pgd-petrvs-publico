<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega;

use App\Models\PlanoTrabalhoEntrega;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaStoreValidator;

class PlanoTrabalhoEntregaService
{
    public function __construct(
        private readonly PlanoTrabalhoEntregaRepository $repository,
        private readonly PlanoTrabalhoEntregaStoreValidator $storeValidator,
    ) {}

    public function store(string $planoTrabalhoId, array $data): PlanoTrabalhoEntrega
    {
        $this->storeValidator->validar($planoTrabalhoId);

        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray($data, $planoTrabalhoId);

        return $this->repository->create($dto->toArray());
    }
}
