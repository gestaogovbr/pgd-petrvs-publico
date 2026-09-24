<?php

declare(strict_types=1);

namespace App\Repository\DispensaPlanoTrabalho\Eloquent;

use App\Models\DispensaPlanoTrabalho;
use App\Models\DispensaPlanoTrabalhoHistorico;
use App\Repository\DispensaPlanoTrabalho\Contracts\DispensaPlanoTrabalhoWriteRepositoryContract;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;

/**
 * @extends AbstractEloquentWriteRepository<DispensaPlanoTrabalho>
 */
class EloquentDispensaPlanoTrabalhoWriteRepository extends AbstractEloquentWriteRepository implements DispensaPlanoTrabalhoWriteRepositoryContract
{
    public function __construct(DispensaPlanoTrabalho $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): DispensaPlanoTrabalho
    {
        /** @var DispensaPlanoTrabalho $dispensa */
        $dispensa = parent::create($attributes);

        return $dispensa;
    }

    public function atualizar(DispensaPlanoTrabalho $dispensa, array $attributes): DispensaPlanoTrabalho
    {
        $dispensa->fill($attributes);
        $dispensa->save();

        return $dispensa;
    }

    public function createHistorico(array $attributes): DispensaPlanoTrabalhoHistorico
    {
        /** @var DispensaPlanoTrabalhoHistorico $historico */
        $historico = DispensaPlanoTrabalhoHistorico::query()->create($attributes);

        return $historico;
    }
}
