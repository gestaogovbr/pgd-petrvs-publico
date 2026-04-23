<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao;

use App\Enums\StatusEnum;
use App\Models\Avaliacao;
use App\Repository\AvaliacaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs\AvaliacaoStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoStoreValidator;
use App\V2\StatusService;

class AvaliacaoService
{
    public function __construct(
        private readonly AvaliacaoAuthorizationValidator $authValidator,
        private readonly AvaliacaoStoreValidator $storeValidator,
        private readonly AvaliacaoRepository $avaliacaoRepository,
        private readonly StatusService $statusService,
    ) {}

    public function store(AvaliacaoStoreDTO $dto): Avaliacao
    {
        $plano = $this->authValidator->validar($dto->planoTrabalhoId, $dto->avaliadorId);
        $consolidacao = $this->storeValidator->validar($plano, $dto);
        $nota = $this->storeValidator->validarNota($plano, $dto);
        $dto = $dto->withNota($nota);

        $isReavaliacao = $consolidacao->avaliacoes->isNotEmpty();

        $avaliacao = $this->avaliacaoRepository->create($dto->toPersistArray());

        $justificativa = $isReavaliacao
            ? 'Período reavaliado pela chefia.'
            : 'Período avaliado pela chefia.';

        $this->statusService->atualizaStatus(
            $consolidacao,
            StatusEnum::AVALIADO->value,
            $justificativa,
        );

        return $avaliacao;
    }
}
