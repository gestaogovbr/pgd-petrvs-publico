<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\CargaIndividualSiapeRelatorio;
use App\Repository\CargaIndividualSiapeRelatorio\Contracts\CargaIndividualSiapeRelatorioReadRepositoryContract;
use App\Repository\CargaIndividualSiapeRelatorio\Contracts\CargaIndividualSiapeRelatorioWriteRepositoryContract;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Collection;

class CargaIndividualSiapeRelatorioRepository
{
    public function __construct(
        private readonly CargaIndividualSiapeRelatorioReadRepositoryContract $readRepository,
        private readonly CargaIndividualSiapeRelatorioWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findById(string|int $id): ?CargaIndividualSiapeRelatorio
    {
        return $this->readRepository->findById($id);
    }

    public function findByProcessamentoId(string $processamentoId): ?CargaIndividualSiapeRelatorio
    {
        return $this->readRepository->findByProcessamentoId($processamentoId);
    }

    /**
     * @return Collection<int, CargaIndividualSiapeRelatorio>
     */
    public function findRecent(?string $tipo = null, ?string $chave = null, int $limit = 20): Collection
    {
        return $this->readRepository->findRecent($tipo, $chave, $limit);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): CargaIndividualSiapeRelatorio
    {
        return $this->writeRepository->create($attributes);
    }

    public function deleteExpired(CarbonInterface $now): int
    {
        return $this->writeRepository->deleteExpired($now);
    }
}
