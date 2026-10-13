<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega;

use App\Repository\RelatorioEntregaRepository;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaIndexDTO;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaIndexFiltersDTO;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaQueryDTO;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaRowDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as ConcretePaginator;
use Illuminate\Support\Collection;

class RelatorioEntregaService
{
    public function __construct(
        private readonly RelatorioEntregaRepository $relatorioEntregaRepository
    ) {
    }

    public function index(RelatorioEntregaIndexDTO $dto, Request $httpRequest): LengthAwarePaginator
    {
        $result = $this->relatorioEntregaRepository->query($dto->toQuery(true));

        return $this->buildPaginator(
            $result['rows'] ?? collect(),
            (int) ($result['count'] ?? 0),
            $dto->page,
            RelatorioEntregaIndexDTO::PAGE_SIZE,
            $httpRequest
        );
    }

    /**
     * @return Collection<int, RelatorioEntregaRowDTO>
     */
    public function exportRows(RelatorioEntregaIndexDTO $dto): Collection
    {
        $result = $this->relatorioEntregaRepository->query($dto->toQuery(false));

        return collect($result['rows'] ?? []);
    }

    /**
     * Consulta paginada para a geração do Excel em segundo plano.
     *
     * @param array{page?: int, limit?: int, filters?: array<string, mixed>, orderBy?: array<int, mixed>} $data
     * @return array{count: int, rows: Collection<int, RelatorioEntregaRowDTO>}
     */
    public function queryForExport(array $data, ?int $knownCount = null): array
    {
        $orderBy = is_array($data['orderBy'] ?? null) ? $data['orderBy'] : [];
        if ($orderBy === []) {
            $orderBy = [['unidadeHierarquia', 'asc'], ['entregaNome', 'asc']];
        }

        $query = new RelatorioEntregaQueryDTO(
            page: max(1, (int) ($data['page'] ?? 1)),
            limit: max(1, (int) ($data['limit'] ?? 1000)),
            filters: RelatorioEntregaIndexFiltersDTO::fromArray(
                is_array($data['filters'] ?? null) ? $data['filters'] : []
            ),
            orderBy: $orderBy,
        );

        $result = $this->relatorioEntregaRepository->query($query);

        if ($knownCount !== null) {
            $result['count'] = $knownCount;
        }

        return $result;
    }

    private function buildPaginator(
        iterable $items,
        int $total,
        int $page,
        int $perPage,
        Request $httpRequest
    ): LengthAwarePaginator {
        return new ConcretePaginator(
            collect($items)->values()->all(),
            $total,
            $perPage,
            $page,
            ['path' => $httpRequest->url(), 'query' => $httpRequest->query()]
        );
    }
}
