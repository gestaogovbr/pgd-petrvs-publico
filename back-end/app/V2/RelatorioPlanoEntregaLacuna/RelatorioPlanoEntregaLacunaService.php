<?php

declare(strict_types=1);

namespace App\V2\RelatorioPlanoEntregaLacuna;

use App\Repository\RelatorioPlanoEntregaLacuna\RelatorioPlanoEntregaLacunaRepository;
use App\V2\RelatorioPlanoEntregaLacuna\DTOs\RelatorioPlanoEntregaLacunaIndexDTO;
use App\V2\RelatorioPlanoEntregaLacuna\Validators\RelatorioPlanoEntregaLacunaAuthorizationValidator;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as ConcretePaginator;

class RelatorioPlanoEntregaLacunaService
{
    public function __construct(
        private readonly RelatorioPlanoEntregaLacunaRepository $repository,
        private readonly RelatorioPlanoEntregaLacunaAuthorizationValidator $authorizationValidator,
    ) {
    }

    public function index(array $data, Request $httpRequest): LengthAwarePaginator
    {
        $dto = RelatorioPlanoEntregaLacunaIndexDTO::fromValidatedRequest($data);
        $usuario = $httpRequest->user();
        if ($usuario !== null) {
            $this->authorizationValidator->validar($usuario, $dto->filters);
        }

        $result = $this->repository->query($dto->toQueryPayload());
        $total = (int) ($result['count'] ?? 0);
        $rows = $result['rows'] ?? collect();

        return new ConcretePaginator(
            $rows->values()->all(),
            $total,
            RelatorioPlanoEntregaLacunaIndexDTO::PAGE_SIZE,
            $dto->page,
            ['path' => $httpRequest->url(), 'query' => $httpRequest->query()]
        );
    }

    public function export(array $data, Request $httpRequest): array
    {
        $dto = RelatorioPlanoEntregaLacunaIndexDTO::fromValidatedRequest($data);
        $usuario = $httpRequest->user();
        if ($usuario !== null) {
            $this->authorizationValidator->validar($usuario, $dto->filters);
        }

        $result = $this->repository->query($dto->toExportPayload());

        return [
            'count' => (int) ($result['count'] ?? 0),
            'rows' => $result['rows'] ?? collect(),
        ];
    }
}
