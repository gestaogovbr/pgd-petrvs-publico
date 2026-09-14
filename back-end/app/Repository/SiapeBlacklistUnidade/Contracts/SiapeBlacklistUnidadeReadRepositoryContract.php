<?php

declare(strict_types=1);

namespace App\Repository\SiapeBlacklistUnidade\Contracts;

use App\Models\SiapeBlacklistUnidade;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Collection;

interface SiapeBlacklistUnidadeReadRepositoryContract
{
    public function findActiveByCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): ?SiapeBlacklistUnidade;

    public function findLatestTrashedByCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): ?SiapeBlacklistUnidade;

    public function findAllByCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): Collection;

    public function findAllVencidasByCodigoOrgao(string $codigoOrgao, CarbonInterface $dataLimite): Collection;
}
