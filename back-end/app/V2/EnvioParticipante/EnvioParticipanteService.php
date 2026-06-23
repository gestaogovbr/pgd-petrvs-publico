<?php

declare(strict_types=1);

namespace App\V2\EnvioParticipante;

use App\Models\Usuario;
use App\Services\EnvioUsuarioService;
use App\V2\EnvioParticipante\DTOs\EnvioParticipanteIndexDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as ConcretePaginator;

class EnvioParticipanteService
{
    public function __construct(
        private readonly EnvioUsuarioService $envioUsuarioService
    ) {
    }

    public function index(array $data, Usuario $usuario, Request $httpRequest): LengthAwarePaginator
    {
        $dto = EnvioParticipanteIndexDTO::fromValidatedRequest($data);
        $payload = $dto->toEnvioUsuarioQueryPayload();

        $result = $this->envioUsuarioService->query($payload, $usuario);
        $total = (int) ($result['count'] ?? 0);
        $rows = $result['rows'] ?? collect();

        $items = $rows->values()->all();

        return new ConcretePaginator(
            $items,
            $total,
            EnvioParticipanteIndexDTO::PAGE_SIZE,
            $dto->page,
            ['path' => $httpRequest->url(), 'query' => $httpRequest->query()]
        );
    }
}
