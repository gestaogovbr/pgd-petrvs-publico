<?php

declare(strict_types=1);

namespace App\Repository\Afastamento\Eloquent;

use App\DTOs\ListResult;
use App\Models\Afastamento;
use App\Models\UnidadeIntegrante;
use App\Repository\Afastamento\Contracts\AfastamentoReadRepositoryContract;
use App\Repository\Eloquent\EloquentListRepositoryTrait;
use Illuminate\Database\Eloquent\Builder;

class EloquentAfastamentoReadRepository implements AfastamentoReadRepositoryContract
{
    public function __construct(
        private readonly Afastamento $afastamento,
    ) {
    }

    public function findById(string $id): ?Afastamento
    {
        if ($id === '') {
            return null;
        }

        return $this->afastamento->newQuery()->find($id);
    }

    public function usuarioPossuiVinculoEmUnidades(string $usuarioId, array $unidadeIds): bool
    {
        if ($usuarioId === '' || $unidadeIds === []) {
            return false;
        }

        return UnidadeIntegrante::query()
            ->where('usuario_id', $usuarioId)
            ->whereIn('unidade_id', $unidadeIds)
            ->exists();
    }

    public function findAll($params): ListResult
    {
        $query = $this->afastamento->newQuery();
        $query->with(['usuario', 'tipoMotivoAfastamento']);
        $query->orderBy('created_at', 'desc');

        // FILTROS
        foreach ($params['where'] ?? [] as $condition) {
            [$column, $operator, $value] = $condition;

            if ($column == 'usuario_id') {
                $query->where('usuario_id', $value);
            }
            elseif ($column == 'tipo_motivo_afastamento_id') {
                $query->where('tipo_motivo_afastamento_id', $value);
            }
            elseif ($column == 'tipo_motivo_afastamento_id') {
                $query->where('tipo_motivo_afastamento_id', $value);
            }
            elseif ($column == 'usuario_unidade_integrante_ids') {
                // unidade e subordinadas
                $query->whereHas('usuario.unidadesIntegrantes', static function (Builder $sub) use ($value): void {
                    $sub->whereIn('unidades_integrantes.unidade_id', $value);
                });
            }
            elseif ($column == 'data_inicio') {
                $query->where('data_inicio', ">=",$value);
            }
            elseif ($column == 'data_fim') {
                $query->where('data_fim', "<=",$value);
            }
        }

        if ($params['deleted'] ?? false) {
            $query->withTrashed();
        }

        $count = $query->count();

        if (!empty($params['limit'])) {
            $limit = (int) $params['limit'];
            $query->skip(max((int) ($params['page'] ?? 1) - 1, 0) * $limit)->take($limit);
        }

        $rows = $query->get();

        return new ListResult($rows, $count);
    }
}
