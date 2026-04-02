<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoConsolidacao\Eloquent;

use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\PlanoTrabalhoConsolidacao\Contracts\PlanoTrabalhoConsolidacaoWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<PlanoTrabalhoConsolidacao>
 */
class EloquentPlanoTrabalhoConsolidacaoWriteRepository extends AbstractEloquentWriteRepository implements PlanoTrabalhoConsolidacaoWriteRepositoryContract
{
    public function __construct(PlanoTrabalhoConsolidacao $model)
    {
        $this->model = $model;
    }
}
