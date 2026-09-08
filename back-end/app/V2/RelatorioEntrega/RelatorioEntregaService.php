<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega;

use App\Repository\RelatorioEntregaRepository;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaIndexDTO;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaRowDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as ConcretePaginator;

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
     * @return \Illuminate\Support\Collection<int, RelatorioEntregaRowDTO>
     */
    public function exportRows(RelatorioEntregaIndexDTO $dto): \Illuminate\Support\Collection
    {
        $result = $this->relatorioEntregaRepository->query($dto->toQuery(false));

        return collect($result['rows'] ?? []);
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
