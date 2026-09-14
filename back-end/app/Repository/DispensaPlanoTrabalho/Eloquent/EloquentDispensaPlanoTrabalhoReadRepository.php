<?php

declare(strict_types=1);

namespace App\Repository\DispensaPlanoTrabalho\Eloquent;

use App\Models\DispensaPlanoTrabalho;
use App\Models\DispensaPlanoTrabalhoHistorico;
use App\Repository\DispensaPlanoTrabalho\Contracts\DispensaPlanoTrabalhoReadRepositoryContract;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * @extends AbstractEloquentReadRepository<DispensaPlanoTrabalho>
 */
class EloquentDispensaPlanoTrabalhoReadRepository extends AbstractEloquentReadRepository implements DispensaPlanoTrabalhoReadRepositoryContract
{
    public function __construct(DispensaPlanoTrabalho $model)
    {
        $this->model = $model;
    }

    public function findByUsuarioId(string $usuarioId): ?DispensaPlanoTrabalho
    {
        $dispensa = $this->query()
            ->where('usuario_id', $usuarioId)
            ->first();

        return $dispensa instanceof DispensaPlanoTrabalho ? $dispensa : null;
    }

    public function findByUsuarioIdComResponsavel(string $usuarioId): ?DispensaPlanoTrabalho
    {
        $dispensa = $this->query()
            ->with(['responsavel'])
            ->where('usuario_id', $usuarioId)
            ->first();

        return $dispensa instanceof DispensaPlanoTrabalho ? $dispensa : null;
    }

    public function findHistoricosByDispensaId(string $dispensaId): Collection
    {
        return DispensaPlanoTrabalhoHistorico::query()
            ->with('responsavel')
            ->where('dispensa_id', $dispensaId)
            ->orderByDesc('created_at')
            ->get();
    }
}
