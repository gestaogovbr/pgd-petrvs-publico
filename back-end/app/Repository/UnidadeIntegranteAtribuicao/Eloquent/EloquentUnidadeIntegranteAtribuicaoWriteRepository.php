<?php

declare(strict_types=1);

namespace App\Repository\UnidadeIntegranteAtribuicao\Eloquent;

use App\Models\UnidadeIntegranteAtribuicao;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\UnidadeIntegranteAtribuicao\Contracts\UnidadeIntegranteAtribuicaoWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<UnidadeIntegranteAtribuicao>
 */
class EloquentUnidadeIntegranteAtribuicaoWriteRepository extends AbstractEloquentWriteRepository implements UnidadeIntegranteAtribuicaoWriteRepositoryContract
{
    public function __construct(UnidadeIntegranteAtribuicao $model)
    {
        $this->model = $model;
    }
}