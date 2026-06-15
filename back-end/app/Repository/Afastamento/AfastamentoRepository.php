<?php

declare(strict_types=1);

namespace App\Repository\Afastamento;

use App\DTOs\ListResult;
use App\Models\Afastamento;
use App\Repository\Afastamento\Contracts\AfastamentoReadRepositoryContract;
use App\Repository\Afastamento\Contracts\AfastamentoWriteRepositoryContract;
use Carbon\CarbonPeriod;
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
    
    /**
     * @param string[] $codigosExcluidos
     */
    public function findAfastamentosParaDispensa(string $usuarioId, CarbonPeriod $vigencia, array $codigosExcluidos): Collection
    {
        return $this->readRepository->findAfastamentosParaDispensa($usuarioId, $vigencia, $codigosExcluidos);
    }

    /**
     * @param list<string> $unidadeIds
     */
    public function findByUsuarioOuSubordinados(string $usuarioId, array $unidadeIds): \Illuminate\Database\Eloquent\Collection
    {
        return $this->readRepository->findByUsuarioOuSubordinados($usuarioId, $unidadeIds);
    }
}
