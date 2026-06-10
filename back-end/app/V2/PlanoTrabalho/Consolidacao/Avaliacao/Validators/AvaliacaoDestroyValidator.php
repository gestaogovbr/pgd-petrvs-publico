<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Avaliacao;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\AvaliacaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\AvaliacaoPolicy;

class AvaliacaoDestroyValidator
{
    public function __construct(
        private readonly AvaliacaoRepository $avaliacaoRepository,
        private readonly AvaliacaoPolicy $avaliacaoPolicy,
    ) {}

    public function validar(string $planoTrabalhoId, string $consolidacaoId, string $avaliacaoId, string $usuarioLogadoId): Avaliacao
    {
        $avaliacao = $this->findAvaliacaoOrFail($avaliacaoId);
        $consolidacao = $this->findConsolidacaoOrFail($avaliacao);

        $this->validarPertencimento($consolidacao, $planoTrabalhoId, $consolidacaoId);
        $this->validarPodeCancelar($avaliacao, $consolidacao, $usuarioLogadoId);

        return $avaliacao;
    }

    private function findAvaliacaoOrFail(string $avaliacaoId): Avaliacao
    {
        $avaliacao = $this->avaliacaoRepository->findById($avaliacaoId);

        if ($avaliacao === null) {
            throw new NotFoundException('Avaliação não encontrada.');
        }

        return $avaliacao;
    }

    private function findConsolidacaoOrFail(Avaliacao $avaliacao): PlanoTrabalhoConsolidacao
    {
        $consolidacao = $avaliacao->planoTrabalhoConsolidacao;

        if ($consolidacao === null) {
            throw new NotFoundException('Período avaliativo não encontrado.');
        }

        $consolidacao->loadMissing(['avaliacoes', 'statusHistorico']);

        return $consolidacao;
    }

    private function validarPertencimento(PlanoTrabalhoConsolidacao $consolidacao, string $planoTrabalhoId, string $consolidacaoId): void
    {
        $plano = $consolidacao->planoTrabalho;

        if ($plano === null || $plano->id !== $planoTrabalhoId || $consolidacao->id !== $consolidacaoId) {
            throw new ValidateException('A avaliação não pertence a este período avaliativo.');
        }
    }

    private function validarPodeCancelar(Avaliacao $avaliacao, PlanoTrabalhoConsolidacao $consolidacao, string $usuarioLogadoId): void
    {
        if (!$this->avaliacaoPolicy->isStatusAvaliado($consolidacao)) {
            throw new ValidateException('O período avaliativo precisa estar com status AVALIADO para cancelar a avaliação.');
        }

        if (!$this->avaliacaoPolicy->isAvaliador($avaliacao, $usuarioLogadoId)) {
            throw new ForbiddenException('Apenas quem realizou a avaliação pode cancelá-la.');
        }

        if (!$this->avaliacaoPolicy->isMaisRecente($avaliacao, $consolidacao)) {
            throw new ValidateException('Apenas a avaliação mais recente pode ser cancelada.');
        }

        if (!$this->avaliacaoPolicy->naoTemRecurso($avaliacao)) {
            throw new ValidateException('Não é possível cancelar uma avaliação que possui recurso.');
        }

        if (!$this->avaliacaoPolicy->estaDentroDoPrazo($consolidacao)) {
            throw new ValidateException('O prazo de ' . AvaliacaoPolicy::PRAZO_CANCELAMENTO_DIAS . ' dias para cancelar a avaliação expirou.');
        }
    }
}
