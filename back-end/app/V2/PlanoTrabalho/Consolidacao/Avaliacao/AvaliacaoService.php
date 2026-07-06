<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao;

use App\Enums\StatusEnum;
use App\Models\Avaliacao;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\AvaliacaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs\AvaliacaoStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoDestroyValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoStoreValidator;
use App\V2\StatusService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AvaliacaoService
{
    public function __construct(
        private readonly AvaliacaoAuthorizationValidator $authValidator,
        private readonly AvaliacaoStoreValidator $storeValidator,
        private readonly AvaliacaoDestroyValidator $destroyValidator,
        private readonly AvaliacaoRepository $avaliacaoRepository,
        private readonly StatusService $statusService,
        private readonly AvaliacaoPolicy $avaliacaoPolicy,
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

            $consolidacao->refresh()->load(['avaliacoes', 'statusHistorico']);
            $planoTrabalho = $consolidacao->planoTrabalho;
            $avaliacao->setAttribute('pode_cancelar', $this->avaliacaoPolicy->podeCancelar($avaliacao, $consolidacao, $dto->avaliadorId, $planoTrabalho));

            return $avaliacao;
        });
    }

    // TODO: avaliar criação de um DestroyDTO ou simplificar parâmetros — pode bastar apenas
    // avaliacaoId, resolvendo o usuário logado via Auth::id() e derivando planoTrabalhoId e
    // consolidacaoId da própria avaliação.
    public function destroy(string $planoTrabalhoId, string $consolidacaoId, string $avaliacaoId, string $usuarioLogadoId): PlanoTrabalhoConsolidacao
    {
        $avaliacao = $this->destroyValidator->validar($planoTrabalhoId, $consolidacaoId, $avaliacaoId, $usuarioLogadoId);
        $consolidacao = $avaliacao->planoTrabalhoConsolidacao;

        return DB::transaction(function () use ($avaliacao, $consolidacao, $usuarioLogadoId) {
            $this->avaliacaoRepository->delete($avaliacao->id);

            $this->statusService->atualizaStatus(
                $consolidacao,
                StatusEnum::CONCLUIDO->value,
                'Avaliação do período avaliativo cancelada pela chefia.',
            );

            $consolidacao = $consolidacao->refresh()->load(['avaliacoes.avaliador', 'atividades', 'afastamentos.afastamento', 'statusHistorico']);

            $planoTrabalho = $consolidacao->planoTrabalho;
            $consolidacao->avaliacoes->each(function ($av) use ($consolidacao, $usuarioLogadoId, $planoTrabalho) {
                $av->setAttribute('pode_cancelar', $this->avaliacaoPolicy->podeCancelar($av, $consolidacao, $usuarioLogadoId, $planoTrabalho));
            });

            return $consolidacao;
        });
    }
}
