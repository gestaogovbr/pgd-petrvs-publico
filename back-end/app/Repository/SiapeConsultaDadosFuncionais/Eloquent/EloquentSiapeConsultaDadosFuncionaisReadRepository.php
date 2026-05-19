<?php

declare(strict_types=1);

namespace App\Repository\SiapeConsultaDadosFuncionais\Eloquent;

use App\Models\SiapeConsultaDadosFuncionais;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SiapeConsultaDadosFuncionais\Contracts\SiapeConsultaDadosFuncionaisReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<SiapeConsultaDadosFuncionais>
 */
class EloquentSiapeConsultaDadosFuncionaisReadRepository extends AbstractEloquentReadRepository implements SiapeConsultaDadosFuncionaisReadRepositoryContract
{
    public function __construct(SiapeConsultaDadosFuncionais $model)
    {
        $this->model = $model;
    }
}