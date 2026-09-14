<?php

declare(strict_types=1);

namespace App\Repository\SiapeBlacklistUnidade\Eloquent;

use App\Models\SiapeBlacklistUnidade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SiapeBlacklistUnidade\Contracts\SiapeBlacklistUnidadeReadRepositoryContract;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Collection;

/**
 * @extends AbstractEloquentReadRepository<SiapeBlacklistUnidade>
 */
class EloquentSiapeBlacklistUnidadeReadRepository extends AbstractEloquentReadRepository implements SiapeBlacklistUnidadeReadRepositoryContract
{
    public function __construct(SiapeBlacklistUnidade $model)
    {
        $this->model = $model;
    }

    public function findActiveByCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): ?SiapeBlacklistUnidade
    {
        /** @var SiapeBlacklistUnidade|null $blacklist */
        $blacklist = $this->query()
            ->where('codigo_orgao', $codigoOrgao)
            ->where('codigo', $codigo)
            ->first();

        return $blacklist;
    }

    public function findLatestTrashedByCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): ?SiapeBlacklistUnidade
    {
        /** @var SiapeBlacklistUnidade|null $blacklist */
        $blacklist = $this->model->newQuery()
            ->onlyTrashed()
            ->where('codigo_orgao', $codigoOrgao)
            ->where('codigo', $codigo)
            ->orderByDesc('deleted_at')
            ->first();

        return $blacklist;
    }

    public function findAllByCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): Collection
    {
        return $this->query()
            ->where('codigo_orgao', $codigoOrgao)
            ->where('codigo', $codigo)
            ->get();
    }

    public function findAllVencidasByCodigoOrgao(string $codigoOrgao, CarbonInterface $dataLimite): Collection
    {
        return $this->query()
            ->where('codigo_orgao', $codigoOrgao)
            ->where('inativado', 0)
            ->where('created_at', '<=', $dataLimite)
            ->get();
    }
}
