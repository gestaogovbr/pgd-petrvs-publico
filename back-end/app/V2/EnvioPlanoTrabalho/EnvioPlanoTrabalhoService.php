<?php

declare(strict_types=1);

namespace App\V2\EnvioPlanoTrabalho;

use App\Repository\EnvioPlanoTrabalhoRepository;
use App\V2\EnvioPlanoTrabalho\DTOs\EnvioPlanoTrabalhoIndexDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as ConcretePaginator;

class EnvioPlanoTrabalhoService
{
    public function __construct(
        private readonly EnvioPlanoTrabalhoRepository $envioPlanoTrabalhoRepository
    ) {
    }

    public function index(array $data, Request $httpRequest): LengthAwarePaginator
    {
        $dto = EnvioPlanoTrabalhoIndexDTO::fromValidatedRequest($data);
        $payload = $dto->toEnvioPlanoTrabalhoQueryPayload();

        $result = $this->envioPlanoTrabalhoRepository->query($payload);
        $total = (int) ($result['count'] ?? 0);
        $rows = $result['rows'] ?? collect();

        $items = $rows->values()->all();

        return new ConcretePaginator(
            $items,
            $total,
            EnvioPlanoTrabalhoIndexDTO::PAGE_SIZE,
            $dto->page,
            ['path' => $httpRequest->url(), 'query' => $httpRequest->query()]
        );
    }
}
