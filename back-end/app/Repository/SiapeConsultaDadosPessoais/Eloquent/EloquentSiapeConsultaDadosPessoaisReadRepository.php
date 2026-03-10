<?php

declare(strict_types=1);

namespace App\Repository\SiapeConsultaDadosPessoais\Eloquent;

use App\Models\SiapeConsultaDadosPessoais;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<SiapeConsultaDadosPessoais>
 */
class EloquentSiapeConsultaDadosPessoaisReadRepository extends AbstractEloquentReadRepository implements SiapeConsultaDadosPessoaisReadRepositoryContract
{
    public function __construct(SiapeConsultaDadosPessoais $model)
    {
        $this->model = $model;
    }
}