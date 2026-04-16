<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoConsolidacao\Eloquent;

use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
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

    public function createAfastamentoVinculo(array $attributes): void
    {
        PlanoTrabalhoConsolidacaoAfastamento::create($attributes);
    }

    public function updateAfastamentoSnapshot(string $afastamentoId, string $snapshot): void
    {
        PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamentoId)
            ->update(['snapshot' => $snapshot]);
    }

    public function deleteAfastamentoVinculos(string $afastamentoId): void
    {
        PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamentoId)->delete();
    }
}
