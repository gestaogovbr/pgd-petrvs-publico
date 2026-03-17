<?php

declare(strict_types=1);

namespace App\Repository\SiapeConsultaDadosPessoais\Eloquent;

use App\Models\SiapeConsultaDadosPessoais;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<SiapeConsultaDadosPessoais>
 */
class EloquentSiapeConsultaDadosPessoaisWriteRepository extends AbstractEloquentWriteRepository implements SiapeConsultaDadosPessoaisWriteRepositoryContract
{
    public function __construct(SiapeConsultaDadosPessoais $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): SiapeConsultaDadosPessoais
    {
        /** @var SiapeConsultaDadosPessoais $model */
        $model = parent::create($attributes);
        return $model;
    }

    public function forceDeleteByCpf(string $cpf): void
    {
        $this->model->newQuery()->withTrashed()->where('cpf', $cpf)->forceDelete();
    }
}
