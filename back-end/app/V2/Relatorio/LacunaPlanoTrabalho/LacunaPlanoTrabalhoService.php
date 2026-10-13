<?php

declare(strict_types=1);

namespace App\V2\Relatorio\LacunaPlanoTrabalho;

use App\Exports\RelatorioLacunaPlanoTrabalhoExport;
use App\Repository\RelatorioLacunaPlanoTrabalho\Contracts\RelatorioLacunaPlanoTrabalhoReadRepositoryContract;
use App\Services\RelatorioGeracao\RelatorioLacunaPlanoTrabalhoExcelGerador;
use App\V2\Relatorio\LacunaPlanoTrabalho\DTOs\LacunaPlanoTrabalhoIndexDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as ConcretePaginator;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class LacunaPlanoTrabalhoService
{
    public function __construct(
        private readonly RelatorioLacunaPlanoTrabalhoReadRepositoryContract $repository,
    ) {}

    public function index(array $validated, Request $httpRequest): LengthAwarePaginator
    {
        $dto = LacunaPlanoTrabalhoIndexDTO::fromValidatedRequest($validated);
        $result = $this->repository->query($dto->toQueryPayload());
        $total = (int) ($result['count'] ?? 0);
        $rows = $result['rows'] ?? [];
        $items = is_array($rows) ? array_values($rows) : collect($rows)->values()->all();

        return new ConcretePaginator(
            $items,
            $total,
            LacunaPlanoTrabalhoIndexDTO::PAGE_SIZE,
            $dto->page,
            ['path' => $httpRequest->url(), 'query' => $httpRequest->query()]
        );
    }

    public function export(array $validated): BinaryFileResponse
    {
        $dto = LacunaPlanoTrabalhoIndexDTO::fromValidatedRequest($validated, paginate: false);
        $result = $this->repository->query($dto->toQueryPayload());

        return Excel::download(
            new RelatorioLacunaPlanoTrabalhoExport($result['rows'] ?? []),
            'relatorio-lacunas-plano-trabalho.xlsx'
        );
    }

    /**
     * Consulta paginada para a geração do Excel em segundo plano.
     *
     * @param array{page?: int, limit?: int, filters?: array<string, mixed>, orderBy?: array<int, mixed>} $data
     * @return array{count: int, rows: Collection<int, mixed>}
     */
    public function queryForExport(array $data, ?int $knownCount = null): array
    {
        $filters = is_array($data['filters'] ?? null) ? $data['filters'] : [];
        $orderBy = is_array($data['orderBy'] ?? null) ? $data['orderBy'] : [];

        $result = $this->repository->query([
            'page' => max(1, (int) ($data['page'] ?? 1)),
            'limit' => max(1, (int) ($data['limit'] ?? RelatorioLacunaPlanoTrabalhoExcelGerador::PAGE_SIZE)),
            'filters' => $filters,
            'orderBy' => $orderBy,
        ]);

        if ($knownCount !== null) {
            $result['count'] = $knownCount;
        }

        $result['rows'] = collect($result['rows'] ?? []);

        return $result;
    }
}
