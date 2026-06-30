<?php

declare(strict_types=1);

namespace App\Repository\SipecUnidade\Eloquent;

use App\Models\SipecUnidade;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\SipecUnidade\Contracts\SipecUnidadeWriteRepositoryContract;
use Illuminate\Database\Eloquent\Model;

final class EloquentSipecUnidadeWriteRepository extends AbstractEloquentWriteRepository implements SipecUnidadeWriteRepositoryContract
{
    public function __construct(SipecUnidade $model)
    {
        $this->model = $model;
    }

    /**
     * @return SipecUnidade
     */
    public function updateOrCreateByCodigo(string $codigo, string $response, bool $processado, ?string $dataModificacao): Model
    {
        return $this->model->newQuery()->updateOrCreate(
            ['codigo' => $codigo],
            [
                'response' => $response,
                'processado' => $processado,
                'data_modificacao' => $dataModificacao,
            ]
        );
    }
}
