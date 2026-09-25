<?php

declare(strict_types=1);

namespace App\Repository\Atividade\Eloquent;

use App\Enums\StatusEnum;
use App\Models\Atividade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Atividade\Contracts\AtividadeReadRepositoryContract;
use Illuminate\Support\Collection;

class EloquentAtividadeReadRepository extends AbstractEloquentReadRepository implements AtividadeReadRepositoryContract
{
    public function __construct(Atividade $model)
    {
        $this->model = $model;
    }

    public function entregaIdsComAtividade(string $consolidacaoId): Collection
    {
        return $this->query()
            ->where('plano_trabalho_consolidacao_id', $consolidacaoId)
            ->distinct()
            ->pluck('plano_trabalho_entrega_id');
    }

    public function findWithPlanoTrabalho(string|int $id): ?Atividade
    {
        /** @var Atividade|null $atividade */
        $atividade = $this->query()
            ->with(['planoTrabalho'])
            ->where('id', $id)
            ->first();

        return $atividade;
    }

    public function possuiEmPeriodosFechados(string $planoTrabalhoEntregaId): bool
    {
        return $this->query()
            ->where('plano_trabalho_entrega_id', $planoTrabalhoEntregaId)
            ->whereHas('consolidacao', static fn ($q) => $q
                ->whereIn('status', [StatusEnum::CONCLUIDO->value, StatusEnum::AVALIADO->value]))
            ->exists();
    }

    /**
     * @return list<string>
     */
    public function idsPorEntregaEmPeriodosIncluidos(string $planoTrabalhoEntregaId): array
    {
        return $this->query()
            ->where('plano_trabalho_entrega_id', $planoTrabalhoEntregaId)
            ->whereHas('consolidacao', static fn ($q) => $q
                ->where('status', StatusEnum::INCLUIDO->value))
            ->pluck('id')
            ->all();
    }
}
