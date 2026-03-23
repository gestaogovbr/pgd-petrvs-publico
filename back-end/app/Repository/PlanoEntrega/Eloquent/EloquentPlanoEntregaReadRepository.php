<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntrega\Eloquent;

use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Enums\StatusEnum;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class EloquentPlanoEntregaReadRepository extends AbstractEloquentReadRepository implements PlanoEntregaReadRepositoryContract
{
    private const DIAS_PENDENCIA_PROGRESSO = 31;
    private const PLANO_ENTREGA_ID_COLUMN = 'planos_entregas_entregas.plano_entrega_id';
    private const PLANO_ENTREGA_PK_COLUMN = 'planos_entregas_entregas.id';
    private const PROGRESSOS_TABLE = 'planos_entregas_entregas_progressos';
    private const PROGRESSO_FK_COLUMN = 'planos_entregas_entregas_progressos.plano_entrega_entrega_id';
    private const TOTAL_SEM_PROGRESSO_ALIAS = 'total_sem_progresso';
    private const PLANO_ENTREGA_SELECT_FIELDS = ['id', 'numero', 'nome'];
    private const STATUS_EXCLUIDOS_EXECUCAO = [
        StatusEnum::SUSPENSO->value,
        StatusEnum::CANCELADO->value,
    ];

    public function __construct(PlanoEntrega $model)
    {
        $this->model = $model;
    }

    public function getPlanosEntregaAvaliacao(array $unidadesIds): Collection
    {
        return $this->query()
            ->where('status', StatusEnum::CONCLUIDO->value)
            ->whereIn('unidade_id', $unidadesIds)
            ->with(['unidade:id,sigla,nome'])
            ->get();
    }

    public function getPlanosEntregaHomologacao(array $unidadesIds): Collection
    {
        return $this->query()
            ->where('status', StatusEnum::HOMOLOGANDO->value)
            ->whereIn('unidade_id', $unidadesIds)
            ->with(['unidade:id,sigla,nome'])
            ->get();
    }

    public function getEntregasPlanoEntregaHomologacao(array $unidadesIds): Collection
    {
        return PlanoEntregaEntrega::where('homologado', false)
            ->where('realizado', '>', 0)
            ->whereHas('planoEntrega', function($q) use ($unidadesIds) {
                $q->whereIn('unidade_id', $unidadesIds)
                  ->where('status', StatusEnum::ATIVO->value);
            })
            ->with(['planoEntrega.unidade:id,sigla,nome', 'entrega:id,nome'])
            ->get();
    }

    public function getEntregasPlanoEntregaExecucao(array $unidadesIds): Collection
    {
        return PlanoEntregaEntrega::query()
            ->whereHas('planoEntrega.unidade', fn ($query) => $query->whereIn('id', $unidadesIds))
            ->whereNotExists(static function ($query): void {
                $query
                    ->selectRaw('1')
                    ->from(self::PROGRESSOS_TABLE)
                    ->whereColumn(self::PROGRESSO_FK_COLUMN, self::PLANO_ENTREGA_PK_COLUMN);
            })
            ->whereHas('planoEntrega', static function ($query): void {
                $query
                    ->whereNotIn('status', self::STATUS_EXCLUIDOS_EXECUCAO)
                    ->where('data_fim', '<=', now()->subDays(self::DIAS_PENDENCIA_PROGRESSO));
            })
            ->selectRaw(
                self::PLANO_ENTREGA_ID_COLUMN . ', COUNT(*) as ' . self::TOTAL_SEM_PROGRESSO_ALIAS
            )
            ->groupBy(self::PLANO_ENTREGA_ID_COLUMN)
            ->with([
                'planoEntrega' => static fn ($query) => $query->select(self::PLANO_ENTREGA_SELECT_FIELDS),
            ])
            ->get();
    }
}
