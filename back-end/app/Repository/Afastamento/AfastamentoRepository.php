<?php

declare(strict_types=1);

namespace App\Repository\Afastamento;

use App\DTOs\ListResult;
use App\Models\Afastamento;
use App\Repository\Afastamento\Contracts\AfastamentoReadRepositoryContract;
use App\Repository\Afastamento\Contracts\AfastamentoWriteRepositoryContract;
use App\V2\Ocorrencia\DTOs\OcorrenciaIndexDTO;
use Carbon\CarbonPeriod;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class AfastamentoRepository
{
    public function __construct(
        private readonly AfastamentoReadRepositoryContract $readRepository,
        private readonly AfastamentoWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findById(string $id): ?Afastamento
    {
        return $this->readRepository->findById($id);
    }

    /**
     * @param list<string> $unidadeIds
     */
    public function usuarioPossuiVinculoEmUnidades(string $usuarioId, array $unidadeIds): bool
    {
        return $this->readRepository->usuarioPossuiVinculoEmUnidades($usuarioId, $unidadeIds);
    }

    /**
     * @return ListResult
     */
    public function findAll($params): ListResult
    {
        return $this->readRepository->findAll($params);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function insert(array $attributes): Afastamento
    {
        return $this->writeRepository->create($attributes);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string $id, array $attributes): ?Afastamento
    {
        return $this->writeRepository->update($id, $attributes);
    }

    public function destroy(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }
    
    public function findAfastamentosParaDispensa(string $usuarioId, CarbonPeriod $vigencia): Collection
    {
        return $this->readRepository->findAfastamentosParaDispensa($usuarioId, $vigencia);
    }

    public function buscarOcorrenciasListagem(OcorrenciaIndexDTO $dto): LengthAwarePaginator
    {
        return $this->readRepository->buscarOcorrenciasListagem($dto);
    }
}
