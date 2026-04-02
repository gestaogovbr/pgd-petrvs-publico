<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;

class ReabrirConsolidacaoValidator
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}

    public function validar(PlanoTrabalho $plano, string $consolidacaoId): PlanoTrabalhoConsolidacao
    {
        if ($plano->status !== StatusEnum::ATIVO->value) {
            throw new ValidateException('O Plano de Trabalho precisa estar com status ATIVO.');
        }

        $consolidacao = $this->consolidacaoRepository->findConsolidacaoById($consolidacaoId);

        if ($consolidacao === null) {
            throw new NotFoundException('Consolidação não encontrada.');
        }

        if ($consolidacao->plano_trabalho_id !== $plano->id) {
            throw new ValidateException('A consolidação não pertence a este Plano de Trabalho.');
        }

        if ($consolidacao->status !== StatusEnum::CONCLUIDO->value) {
            throw new ValidateException('A consolidação precisa estar com status CONCLUIDO para ser reaberta.');
        }

        $avaliacoes = $consolidacao->relationLoaded('avaliacoes')
            ? $consolidacao->avaliacoes
            : $consolidacao->load('avaliacoes')->avaliacoes;

        if ($avaliacoes->isNotEmpty()) {
            throw new ValidateException('Não é possível reabrir uma consolidação que já possui avaliação.');
        }

        return $consolidacao;
    }
}
