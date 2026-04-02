<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;

class AtividadeStoreValidator
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}

    public function validar(PlanoTrabalho $plano, string $consolidacaoId, array $data): PlanoTrabalhoConsolidacao
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

        if ($consolidacao->status !== StatusEnum::INCLUIDO->value) {
            throw new ValidateException('A consolidação precisa estar com status INCLUIDO.');
        }

        $this->validarEntregaPertenceAoPlano($plano, $data);

        return $consolidacao;
    }

    private function validarEntregaPertenceAoPlano(PlanoTrabalho $plano, array $data): void
    {
        $entregaId = $data['plano_trabalho_entrega_id'] ?? null;

        if ($entregaId === null) {
            return;
        }

        $entregas = $plano->relationLoaded('entregas')
            ? $plano->entregas
            : $plano->load('entregas')->entregas;

        if (!$entregas->contains('id', $entregaId)) {
            throw new ValidateException('A entrega informada não pertence a este Plano de Trabalho.');
        }
    }
}
