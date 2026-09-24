<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\SiapeBlacklistUnidade;
use App\Repository\SiapeBlacklistUnidade\Contracts\SiapeBlacklistUnidadeReadRepositoryContract;
use App\Repository\SiapeBlacklistUnidade\Contracts\SiapeBlacklistUnidadeWriteRepositoryContract;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Collection;

class SiapeBlacklistUnidadeRepository
{
    public function __construct(
        private readonly SiapeBlacklistUnidadeReadRepositoryContract $readRepository,
        private readonly SiapeBlacklistUnidadeWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findActiveByCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): ?SiapeBlacklistUnidade
    {
        return $this->readRepository->findActiveByCodigoOrgaoCodigo($codigoOrgao, $codigo);
    }

    public function findLatestTrashedByCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): ?SiapeBlacklistUnidade
    {
        return $this->readRepository->findLatestTrashedByCodigoOrgaoCodigo($codigoOrgao, $codigo);
    }

    public function findAllByCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): Collection
    {
        return $this->readRepository->findAllByCodigoOrgaoCodigo($codigoOrgao, $codigo);
    }

    public function findAllVencidasByCodigoOrgao(string $codigoOrgao, CarbonInterface $dataLimite): Collection
    {
        return $this->readRepository->findAllVencidasByCodigoOrgao($codigoOrgao, $dataLimite);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): SiapeBlacklistUnidade
    {
        return $this->writeRepository->create($attributes);
    }

    public function update(string|int $id, array $attributes): ?SiapeBlacklistUnidade
    {
        return $this->writeRepository->update($id, $attributes);
    }

    public function delete(string|int $id): bool
    {
        return $this->writeRepository->delete($id);
    }

    public function restoreAsNovaPendencia(SiapeBlacklistUnidade $blacklist, string $response): SiapeBlacklistUnidade
    {
        return $this->writeRepository->restoreAsNovaPendencia($blacklist, $response);
    }
}
