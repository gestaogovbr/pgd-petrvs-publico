<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\AtividadeRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;

class ConcluirConsolidacaoValidator
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly AtividadeRepository $atividadeRepository,
    ) {}

    public function validar(PlanoTrabalho $plano, string $consolidacaoId): PlanoTrabalhoConsolidacao
    {
        if (($plano->status !== StatusEnum::ATIVO->value && $plano->encerrado_at === null) ||
            ($plano->status !== StatusEnum::CONCLUIDO->value && $plano->encerrado_at !== null)) {
            throw new ValidateException('O Plano de Trabalho precisa estar com status ATIVO.');
        }

        $consolidacao = $this->consolidacaoRepository->findConsolidacaoById($consolidacaoId);

        if ($consolidacao === null) {
            throw new NotFoundException('Período avaliativo não encontrado.');
        }

        if ($consolidacao->plano_trabalho_id !== $plano->id) {
            throw new ValidateException('O período avaliativo não pertence a este Plano de Trabalho.');
        }

        if ($consolidacao->status !== StatusEnum::INCLUIDO->value) {
            throw new ValidateException('O período avaliativo precisa estar com status INCLUIDO para ser concluído.');
        }

        $this->validarEntregasPreenchidas($plano, $consolidacaoId);

        return $consolidacao;
    }

    private function validarEntregasPreenchidas(PlanoTrabalho $plano, string $consolidacaoId): void
    {
        $entregas = $plano->relationLoaded('entregas')
            ? $plano->entregas
            : $plano->load('entregas')->entregas;

        if ($entregas->isEmpty()) {
            throw new ValidateException('O Plano de Trabalho não possui entregas cadastradas.');
        }

        $entregaIdsDoPlano = $entregas->pluck('id');
        $entregaIdsComAtividade = $this->atividadeRepository->entregaIdsComAtividade($consolidacaoId);

        $entregasSemAtividade = $entregaIdsDoPlano->diff($entregaIdsComAtividade);

        if ($entregasSemAtividade->isNotEmpty()) {
            throw new ValidateException('Todas as entregas devem ter trabalho executado registrado para concluir o período.');
        }
    }
}
