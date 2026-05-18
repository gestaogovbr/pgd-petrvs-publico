<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao;

use App\Enums\StatusEnum;
use App\Models\Avaliacao;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Repository\AvaliacaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs\AvaliacaoStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoStoreValidator;
use App\V2\StatusService;
use Illuminate\Support\Facades\DB;

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

        return DB::transaction(function () use ($dto, $consolidacao, $isReavaliacao) {
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
        });
    }

    public function destroy(string $planoTrabalhoId, string $consolidacaoId, string $avaliacaoId, string $usuarioLogadoId): PlanoTrabalhoConsolidacao
    {
        $avaliacao = $this->avaliacaoRepository->findById($avaliacaoId);

        if ($avaliacao === null) {
            throw new NotFoundException('Avaliação não encontrada.');
        }

        $consolidacao = $avaliacao->planoTrabalhoConsolidacao;

        if ($consolidacao === null) {
            throw new NotFoundException('Período avaliativo não encontrado.');
        }

        $plano = $consolidacao->planoTrabalho;

        if ($plano === null || $plano->id !== $planoTrabalhoId || $consolidacao->id !== $consolidacaoId) {
            throw new ValidateException('A avaliação não pertence a este período avaliativo.');
        }

        if ($avaliacao->avaliador_id !== $usuarioLogadoId) {
            throw new ForbiddenException('Apenas quem realizou a avaliação pode cancelá-la.');
        }

        if ($consolidacao->status !== StatusEnum::AVALIADO->value) {
            throw new ValidateException('O período avaliativo precisa estar com status AVALIADO para cancelar a avaliação.');
        }

        $avaliacoes = $consolidacao->avaliacoes
            ->sortByDesc(fn (Avaliacao $item) => $item->data_avaliacao ?? $item->created_at)
            ->values();

        if ($avaliacoes->first()?->id !== $avaliacao->id) {
            throw new ValidateException('Apenas a avaliação mais recente pode ser cancelada.');
        }

        return DB::transaction(function () use ($avaliacao, $consolidacao) {
            $this->avaliacaoRepository->delete($avaliacao->id);

            $this->statusService->atualizaStatus(
                $consolidacao,
                StatusEnum::CONCLUIDO->value,
                'Avaliação do período avaliativo cancelada pela chefia.',
            );

            /** @var PlanoTrabalhoConsolidacao $atualizada */
            $atualizada = $consolidacao->refresh()->load(['avaliacoes.avaliador', 'atividades', 'afastamentos.afastamento']);

            return $atualizada;
        });
    }
}
