<?php

declare(strict_types=1);

namespace App\V2\EnvioPlanoEntrega;

use App\Repository\EnvioPlanoEntregaRepository;
use App\V2\EnvioPlanoEntrega\DTOs\EnvioPlanoEntregaIndexDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as ConcretePaginator;

class EnvioPlanoEntregaService
{
    public function __construct(
        private readonly EnvioPlanoEntregaRepository $envioPlanoEntregaRepository
    ) {
    }

    public function index(array $data, Request $httpRequest): LengthAwarePaginator
    {
        $dto = EnvioPlanoEntregaIndexDTO::fromValidatedRequest($data);
        $payload = $dto->toEnvioPlanoEntregaQueryPayload();

        $result = $this->envioPlanoEntregaRepository->query($payload);
        $total = (int) ($result['count'] ?? 0);
        $rows = $result['rows'] ?? collect();

        $items = $rows->values()->all();

        return new ConcretePaginator(
            $items,
            $total,
            EnvioPlanoEntregaIndexDTO::PAGE_SIZE,
            $dto->page,
            ['path' => $httpRequest->url(), 'query' => $httpRequest->query()]
        );
    }
}
