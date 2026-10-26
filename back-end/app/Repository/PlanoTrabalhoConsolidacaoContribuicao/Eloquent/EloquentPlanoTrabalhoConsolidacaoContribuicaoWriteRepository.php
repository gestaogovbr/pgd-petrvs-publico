<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoConsolidacaoContribuicao\Eloquent;

use App\Models\PlanoTrabalhoConsolidacaoContribuicao;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicao\Contracts\PlanoTrabalhoConsolidacaoContribuicaoWriteRepositoryContract;
use DateTimeInterface;

/**
 * @extends AbstractEloquentWriteRepository<PlanoTrabalhoConsolidacaoContribuicao>
 */
class EloquentPlanoTrabalhoConsolidacaoContribuicaoWriteRepository extends AbstractEloquentWriteRepository implements PlanoTrabalhoConsolidacaoContribuicaoWriteRepositoryContract
{
    public function __construct(PlanoTrabalhoConsolidacaoContribuicao $model)
    {
        $this->model = $model;
    }

    public function marcarRegistrado(string $id, DateTimeInterface $momento): void
    {
        $this->model->newQuery()
            ->whereKey($id)
            ->whereNull('registrado_at')
            ->update(['registrado_at' => $momento]);
    }

    /**
     * @param array<int, array<string, mixed>> $linhas
     */
    public function inserirEmLote(array $linhas): void
    {
        if ($linhas === []) {
            return;
        }

        $this->model->newQuery()->insert($linhas);
    }
}
