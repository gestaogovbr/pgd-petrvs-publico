<?php

declare(strict_types=1);

namespace App\Repository\Avaliacao\Eloquent;

use App\Models\Avaliacao;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Avaliacao\Contracts\AvaliacaoReadRepositoryContract;

/**
 * @extends AbstractEloquentReadRepository<Avaliacao>
 */
class EloquentAvaliacaoReadRepository extends AbstractEloquentReadRepository implements AvaliacaoReadRepositoryContract
{
    public function __construct(Avaliacao $model)
    {
        $this->model = $model;
    }

    public function findById(string|int $id): ?Avaliacao
    {
        /** @var Avaliacao|null $avaliacao */
        $avaliacao = $this->query()
            ->with([
                'planoTrabalhoConsolidacao.planoTrabalho',
                'planoTrabalhoConsolidacao.avaliacoes',
            ])
            ->find($id);

        return $avaliacao instanceof Avaliacao ? $avaliacao : null;
    }

    public function findMaisRecenteDaConsolidacao(string $consolidacaoId): ?Avaliacao
    {
        /** @var Avaliacao|null $avaliacao */
        $avaliacao = $this->query()
            ->where('plano_trabalho_consolidacao_id', $consolidacaoId)
            ->orderByDesc('data_avaliacao')
            ->orderByDesc('created_at')
            ->first();

        return $avaliacao instanceof Avaliacao ? $avaliacao : null;
    }
}