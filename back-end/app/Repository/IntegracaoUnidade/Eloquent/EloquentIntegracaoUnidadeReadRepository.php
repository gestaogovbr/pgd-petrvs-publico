<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoUnidade\Eloquent;

use App\Models\IntegracaoUnidade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\IntegracaoUnidade\Contracts\IntegracaoUnidadeReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<IntegracaoUnidade>
 */
class EloquentIntegracaoUnidadeReadRepository extends AbstractEloquentReadRepository implements IntegracaoUnidadeReadRepositoryContract
{
    public function __construct(IntegracaoUnidade $model)
    {
        $this->model = $model;
    }
}