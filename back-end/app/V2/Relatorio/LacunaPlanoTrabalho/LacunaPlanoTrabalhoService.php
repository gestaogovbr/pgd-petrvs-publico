<?php

declare(strict_types=1);

namespace App\V2\Relatorio\LacunaPlanoTrabalho;

use App\Exports\RelatorioLacunaPlanoTrabalhoExport;
use App\Repository\RelatorioLacunaPlanoTrabalho\Contracts\RelatorioLacunaPlanoTrabalhoReadRepositoryContract;
use App\V2\Relatorio\LacunaPlanoTrabalho\DTOs\LacunaPlanoTrabalhoIndexDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as ConcretePaginator;
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
}
