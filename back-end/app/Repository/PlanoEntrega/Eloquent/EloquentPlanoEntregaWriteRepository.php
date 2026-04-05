<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntrega\Eloquent;

use App\Models\PlanoEntrega;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Eloquent\EnvioTrait;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaWriteRepositoryContract;
use Illuminate\Database\Eloquent\Model;

/**
 * @extends AbstractEloquentWriteRepository<PlanoEntrega>
 */
class EloquentPlanoEntregaWriteRepository extends AbstractEloquentWriteRepository implements PlanoEntregaWriteRepositoryContract
{
    use EnvioTrait;

    public function __construct(PlanoEntrega $model)
    {
        $this->model = $model;
    }

    protected function aplicarLogEnvioAposSucesso(Model $model): void
    {
        $model->log_envio = null;
    }
}
