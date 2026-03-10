<?php

declare(strict_types=1);

namespace App\Repository\SiapeBlackListServidor\Eloquent;

use App\Models\SiapeBlackListServidor;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<SiapeBlackListServidor>
 */
class EloquentSiapeBlackListServidorReadRepository extends AbstractEloquentReadRepository implements SiapeBlackListServidorReadRepositoryContract
{
    public function __construct(SiapeBlackListServidor $model)
    {
        $this->model = $model;
    }

    public function exists(string $cpf, string $matricula): bool
    {
        return $this->model->newQuery()
            ->where('cpf', $cpf)
            ->where('matricula', $matricula)
            ->exists();
    }

    public function findByCpfAndOptionalMatricula(string $cpf, ?string $matricula = null): ?SiapeBlackListServidor
    {
        $query = $this->model->newQuery()->where('cpf', $cpf);

        if ($matricula) {
            $query->where('matricula', $matricula);
        }

        /** @var SiapeBlackListServidor|null $model */
        $model = $query->first();

        return $model;
    }
}
