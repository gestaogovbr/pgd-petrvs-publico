<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega;

use App\Repository\RelatorioEntregaRepository;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaIndexDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as ConcretePaginator;

class RelatorioEntregaService
{
    public function __construct(
        private readonly RelatorioEntregaRepository $relatorioEntregaRepository
    ) {
    }

    public function index(array $data, Request $httpRequest): LengthAwarePaginator
    {
        $dto = RelatorioEntregaIndexDTO::fromValidatedRequest($data);
        $payload = $dto->toQueryPayload(true);
        $result = $this->relatorioEntregaRepository->query($payload);

        return $this->buildPaginator(
            $result['rows'] ?? collect(),
            (int) ($result['count'] ?? 0),
            $dto->page,
            RelatorioEntregaIndexDTO::PAGE_SIZE,
            $httpRequest
        );
    }

    /**
     * @return \Illuminate\Support\Collection<int, object>
     */
    public function exportRows(array $data): \Illuminate\Support\Collection
    {
        $dto = RelatorioEntregaIndexDTO::fromValidatedRequest($data);
        $payload = $dto->toQueryPayload(false);
        $result = $this->relatorioEntregaRepository->query($payload);

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
