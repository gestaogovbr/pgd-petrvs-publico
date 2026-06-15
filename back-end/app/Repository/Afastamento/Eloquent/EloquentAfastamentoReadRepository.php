<?php

declare(strict_types=1);

namespace App\Repository\Afastamento\Eloquent;

use App\DTOs\ListResult;
use App\Models\Afastamento;
use App\Models\UnidadeIntegrante;
use App\Repository\Afastamento\Contracts\AfastamentoReadRepositoryContract;
use App\Repository\Eloquent\EloquentListRepositoryTrait;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

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

    /** @param string[] $codigosExcluidos */
    public function findAfastamentosParaDispensa(string $usuarioId, CarbonPeriod $vigencia, array $codigosExcluidos): Collection
    {
        return $this->afastamento->newQuery()
            ->where('usuario_id', $usuarioId)
            ->where('data_fim', '>=', $vigencia->start)
            ->where('data_inicio', '<=', $vigencia->end)
            ->whereHas('tipoMotivoAfastamento', function (Builder $q) use ($codigosExcluidos) {
                $q->whereNotIn('codigo', $codigosExcluidos);
            })
            ->orderBy('data_inicio')
            ->get();
    }

    /** @param list<string> $unidadeIds */
    public function findByUsuarioOuSubordinados(string $usuarioId, array $unidadeIds): Collection
    {
        $query = $this->afastamento->newQuery()
            ->with(['tipoMotivoAfastamento:id,nome,sigla,horas', 'usuario:id,nome']);

        if (empty($unidadeIds)) {
            $query->where('usuario_id', $usuarioId);
        } else {
            $query->where(fn (Builder $q) => $q
                ->where('usuario_id', $usuarioId)
                ->orWhereHas('usuario.unidadesIntegrantes', fn (Builder $sub) => $sub->whereIn('unidade_id', $unidadeIds))
            );
        }

        return $query->orderBy('data_inicio', 'desc')->get();
    }
}
