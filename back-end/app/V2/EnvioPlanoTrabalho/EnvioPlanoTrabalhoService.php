<?php

declare(strict_types=1);

namespace App\V2\EnvioPlanoTrabalho;

use App\Exceptions\BadRequestException;
use App\Exceptions\NotFoundException;
use App\Repository\EnvioPlanoTrabalhoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use App\V2\EnvioPlanoTrabalho\DTOs\EnvioPlanoTrabalhoIndexDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as ConcretePaginator;

class EnvioPlanoTrabalhoService
{
    private const ORIGEM_ENVIO = 'RelatorioEnvioPlanoTrabalho';

    public function __construct(
        private readonly EnvioPlanoTrabalhoRepository $envioPlanoTrabalhoRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
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

    public function enviar(string $id): void
    {
        $planoTrabalho = $this->planoTrabalhoRepository->findById($id);
        if ($planoTrabalho === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        $agendado = PlanoTrabalhoEnvioService::processar(
            (string) tenant('id'),
            $planoTrabalho,
            self::ORIGEM_ENVIO
        );

        if (! $agendado) {
            $mensagem = $planoTrabalho->fresh()?->log_envio
                ?? 'Não foi possível agendar o envio do plano de trabalho.';

            throw new BadRequestException($mensagem);
        }
    }
}
