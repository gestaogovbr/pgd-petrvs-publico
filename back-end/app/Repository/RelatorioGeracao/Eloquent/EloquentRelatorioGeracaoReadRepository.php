<?php

declare(strict_types=1);

namespace App\Repository\RelatorioGeracao\Eloquent;

use App\Models\RelatorioGeracao;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\RelatorioGeracao\Contracts\RelatorioGeracaoReadRepositoryContract;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoIndexDTO;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoIndexFiltersDTO;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class EloquentRelatorioGeracaoReadRepository extends AbstractEloquentReadRepository implements RelatorioGeracaoReadRepositoryContract
{
    public function __construct(RelatorioGeracao $model)
    {
        $this->model = $model;
    }

    public function find(string|int $id): ?RelatorioGeracao
    {
        /** @var RelatorioGeracao|null */
        return parent::find($id);
    }

    public function findForUsuario(string $id, string $usuarioId): ?RelatorioGeracao
    {
        /** @var RelatorioGeracao|null */
        return $this->query()
            ->where('id', $id)
            ->where('usuario_id', $usuarioId)
            ->first();
    }

    /**
     * @param list<string> $ids
     * @return Collection<int, RelatorioGeracao>
     */
    public function findByIdsForUsuario(array $ids, string $usuarioId): Collection
    {
        if ($ids === []) {
            return collect();
        }

        /** @var Collection<int, RelatorioGeracao> $rows */
        $rows = $this->query()
            ->where('usuario_id', $usuarioId)
            ->whereIn('id', $ids)
            ->get();

        return $rows;
    }

    /**
     * @return LengthAwarePaginator<RelatorioGeracao>
     */
    public function paginateForUsuario(string $usuarioId, RelatorioGeracaoIndexDTO $dto): LengthAwarePaginator
    {
        $query = $this->query()->where('usuario_id', $usuarioId);
        $this->applyFilters($query, $dto->filters);

        /** @var LengthAwarePaginator<RelatorioGeracao> */
        return $query
            ->orderBy($dto->orderBy, $dto->orderDir)
            ->paginate(
                RelatorioGeracaoIndexDTO::PAGE_SIZE,
                ['*'],
                'page',
                $dto->page,
            );
    }

    /**
     * @param Builder<RelatorioGeracao> $query
     */
    private function applyFilters(Builder $query, RelatorioGeracaoIndexFiltersDTO $filters): void
    {
        $tipos = $filters->tipos();
        if ($tipos !== []) {
            $query->whereIn('tipo', $tipos);
        }

        if ($filters->status !== null) {
            $query->where('status', $filters->status);
        }

        if ($filters->geracaoInicio !== null) {
            $query->where('iniciado_em', '>=', Carbon::parse($filters->geracaoInicio)->startOfDay());
        }

        if ($filters->geracaoFim !== null) {
            $query->where('iniciado_em', '<=', Carbon::parse($filters->geracaoFim)->endOfDay());
        }
    }
}
