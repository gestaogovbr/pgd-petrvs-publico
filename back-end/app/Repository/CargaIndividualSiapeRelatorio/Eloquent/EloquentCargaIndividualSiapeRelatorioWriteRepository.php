<?php

declare(strict_types=1);

namespace App\Repository\CargaIndividualSiapeRelatorio\Eloquent;

use App\Models\CargaIndividualSiapeRelatorio;
use App\Repository\CargaIndividualSiapeRelatorio\Contracts\CargaIndividualSiapeRelatorioWriteRepositoryContract;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use Carbon\CarbonInterface;

/**
 * @extends AbstractEloquentWriteRepository<CargaIndividualSiapeRelatorio>
 */
class EloquentCargaIndividualSiapeRelatorioWriteRepository extends AbstractEloquentWriteRepository implements CargaIndividualSiapeRelatorioWriteRepositoryContract
{
    public function __construct(CargaIndividualSiapeRelatorio $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): CargaIndividualSiapeRelatorio
    {
        $relatorio = parent::create($attributes);

        return $relatorio instanceof CargaIndividualSiapeRelatorio
            ? $relatorio
            : throw new \RuntimeException('Falha ao criar relatorio de carga individual SIAPE.');
    }

    public function deleteExpired(CarbonInterface $now): int
    {
        return $this->model->newQuery()
            ->whereNotNull('expira_em')
            ->where('expira_em', '<', $now)
            ->forceDelete();
    }
}
