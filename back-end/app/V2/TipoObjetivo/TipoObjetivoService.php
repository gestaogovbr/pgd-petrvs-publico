<?php

declare(strict_types=1);

namespace App\V2\TipoObjetivo;

use App\Models\TipoObjetivo;
use App\Repository\TipoObjetivoRepository;
use App\V2\TipoObjetivo\DTOs\TipoObjetivoStoreDTO;
use App\V2\TipoObjetivo\DTOs\TipoObjetivoUpdateDTO;
use App\V2\TipoObjetivo\Validators\TipoObjetivoStoreValidator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class TipoObjetivoService
{
    public function __construct(
        private readonly TipoObjetivoRepository $repository,
        private readonly TipoObjetivoStoreValidator $validator,
    ) {}

    /** @return Collection<int, TipoObjetivo> */
    public function index(): Collection
    {
        return $this->repository->getAll();
    }

    public function store(TipoObjetivoStoreDTO $dto): TipoObjetivo
    {
        $this->validator->validar(Auth::id());

        return $this->repository->create($dto->toPersistArray());
    }

    public function update(TipoObjetivoUpdateDTO $dto): TipoObjetivo
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
