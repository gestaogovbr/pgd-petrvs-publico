<?php

declare(strict_types=1);

namespace App\Repository\SiapeConsultaDadosFuncionais\Eloquent;

use App\Models\SiapeConsultaDadosFuncionais;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\SiapeConsultaDadosFuncionais\Contracts\SiapeConsultaDadosFuncionaisWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<SiapeConsultaDadosFuncionais>
 */
class EloquentSiapeConsultaDadosFuncionaisWriteRepository extends AbstractEloquentWriteRepository implements SiapeConsultaDadosFuncionaisWriteRepositoryContract
{
    public function __construct(SiapeConsultaDadosFuncionais $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): SiapeConsultaDadosFuncionais
    {
        /** @var SiapeConsultaDadosFuncionais $model */
        $model = parent::create($attributes);
        return $model;
    }

    public function forceDeleteByCpf(string $cpf): void
    {
        $this->model->newQuery()->withTrashed()->where('cpf', $cpf)->forceDelete();
    }
}
