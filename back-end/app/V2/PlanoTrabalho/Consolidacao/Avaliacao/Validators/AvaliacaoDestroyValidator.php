<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Avaliacao;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\AvaliacaoRepository;

class AvaliacaoDestroyValidator
{
    public function __construct(
        private readonly AvaliacaoRepository $avaliacaoRepository,
    ) {}

    public function validar(string $planoTrabalhoId, string $consolidacaoId, string $avaliacaoId, string $usuarioLogadoId): Avaliacao
    {
        $avaliacao = $this->findAvaliacaoOrFail($avaliacaoId);
        $consolidacao = $this->findConsolidacaoOrFail($avaliacao);

        $this->validarPertencimento($consolidacao, $planoTrabalhoId, $consolidacaoId);
        $this->validarAutoria($avaliacao, $usuarioLogadoId);
        $this->validarStatus($consolidacao);
        $this->validarMaisRecente($avaliacao, $consolidacao);

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

        return $consolidacao;
    }

    private function validarPertencimento(PlanoTrabalhoConsolidacao $consolidacao, string $planoTrabalhoId, string $consolidacaoId): void
    {
        $plano = $consolidacao->planoTrabalho;

        if ($plano === null || $plano->id !== $planoTrabalhoId || $consolidacao->id !== $consolidacaoId) {
            throw new ValidateException('A avaliação não pertence a este período avaliativo.');
        }
    }

    private function validarAutoria(Avaliacao $avaliacao, string $usuarioLogadoId): void
    {
        if ($avaliacao->avaliador_id !== $usuarioLogadoId) {
            throw new ForbiddenException('Apenas quem realizou a avaliação pode cancelá-la.');
        }
    }

    private function validarStatus(PlanoTrabalhoConsolidacao $consolidacao): void
    {
        if ($consolidacao->status !== StatusEnum::AVALIADO->value) {
            throw new ValidateException('O período avaliativo precisa estar com status AVALIADO para cancelar a avaliação.');
        }
    }

    private function validarMaisRecente(Avaliacao $avaliacao, PlanoTrabalhoConsolidacao $consolidacao): void
    {
        $maisRecente = $this->avaliacaoRepository->findMaisRecenteDaConsolidacao($consolidacao->id);

        if ($maisRecente?->id !== $avaliacao->id) {
            throw new ValidateException('Apenas a avaliação mais recente pode ser cancelada.');
        }
    }
}
