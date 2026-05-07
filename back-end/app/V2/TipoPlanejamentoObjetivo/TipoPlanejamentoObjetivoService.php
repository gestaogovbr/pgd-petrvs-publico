<?php

declare(strict_types=1);

namespace App\V2\TipoPlanejamentoObjetivo;

use App\Models\TipoPlanejamentoObjetivo;
use App\Repository\TipoPlanejamentoObjetivoRepository;
use App\V2\TipoPlanejamentoObjetivo\DTOs\TipoPlanejamentoObjetivoStoreDTO;
use App\V2\TipoPlanejamentoObjetivo\DTOs\TipoPlanejamentoObjetivoUpdateDTO;
use App\V2\TipoPlanejamentoObjetivo\Validators\TipoPlanejamentoObjetivoStoreValidator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class TipoPlanejamentoObjetivoService
{
    public function __construct(
        private readonly TipoPlanejamentoObjetivoRepository $repository,
        private readonly TipoPlanejamentoObjetivoStoreValidator $validator,
    ) {}

    /** @return Collection<int, TipoPlanejamentoObjetivo> */
    public function index(): Collection
    {
        return $this->repository->getAll();
    }

    public function store(TipoPlanejamentoObjetivoStoreDTO $dto): TipoPlanejamentoObjetivo
    {
        $this->validator->validar(Auth::id());

        return $this->repository->create($dto->toPersistArray());
    }

    public function update(TipoPlanejamentoObjetivoUpdateDTO $dto): TipoPlanejamentoObjetivo
    {
        $this->validator->validar(Auth::id());
        $tipoObjetivo = $this->validator->validarExistencia($dto->id);

        $this->repository->update($dto->id, $dto->toPersistArray());

        return $tipoObjetivo->refresh();
    }

    public function destroy(string $id): void
    {
        $this->validator->validar(Auth::id());
        $this->validator->validarExistencia($id);

        $this->repository->delete($id);
    }
}
