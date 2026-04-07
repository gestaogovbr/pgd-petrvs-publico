<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao;

use App\Enums\StatusEnum;
use App\Models\Avaliacao;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs\AvaliacaoStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoStoreValidator;
use App\V2\StatusService;

class AvaliacaoService
{
    public function __construct(
        private readonly AvaliacaoAuthorizationValidator $authValidator,
        private readonly AvaliacaoStoreValidator $storeValidator,
        private readonly StatusService $statusService,
    ) {}

    public function store(AvaliacaoStoreDTO $dto): Avaliacao
    {
        $plano = $this->authValidator->validar($dto->planoTrabalhoId, $dto->avaliadorId);
        $consolidacao = $this->storeValidator->validar($plano, $dto);
        $nota = $this->storeValidator->validarNota($plano, $dto);

        $isReavaliacao = $consolidacao->avaliacoes->isNotEmpty();

        // TODO: mover Avaliacao::create para AvaliacaoRepository
        $avaliacao = Avaliacao::create([
            'data_avaliacao' => now()->format('Y-m-d H:i:s'),
            'nota' => $nota->nota,
            'justificativa' => $dto->justificativa,
            'justificativas' => [],
            'avaliador_id' => $dto->avaliadorId,
            'plano_trabalho_consolidacao_id' => $dto->consolidacaoId,
            'tipo_avaliacao_id' => $nota->tipo_avaliacao_id,
            'tipo_avaliacao_nota_id' => $dto->tipoAvaliacaoNotaId,
        ]);

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
