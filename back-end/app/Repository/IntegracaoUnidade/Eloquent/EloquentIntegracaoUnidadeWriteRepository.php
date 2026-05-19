<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoUnidade\Eloquent;

use App\Models\IntegracaoUnidade;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\IntegracaoUnidade\Contracts\IntegracaoUnidadeWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<IntegracaoUnidade>
 */
class EloquentIntegracaoUnidadeWriteRepository extends AbstractEloquentWriteRepository implements IntegracaoUnidadeWriteRepositoryContract
{
    public function __construct(IntegracaoUnidade $model)
    {
        $this->model = $model;
    }
}