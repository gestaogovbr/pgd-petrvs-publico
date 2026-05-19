<?php

declare(strict_types=1);

namespace App\Repository\UnidadeIntegranteAtribuicao\Eloquent;

use App\Models\UnidadeIntegranteAtribuicao;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\UnidadeIntegranteAtribuicao\Contracts\UnidadeIntegranteAtribuicaoReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<UnidadeIntegranteAtribuicao>
 */
class EloquentUnidadeIntegranteAtribuicaoReadRepository extends AbstractEloquentReadRepository implements UnidadeIntegranteAtribuicaoReadRepositoryContract
{
    public function __construct(UnidadeIntegranteAtribuicao $model)
    {
        $this->model = $model;
    }
}