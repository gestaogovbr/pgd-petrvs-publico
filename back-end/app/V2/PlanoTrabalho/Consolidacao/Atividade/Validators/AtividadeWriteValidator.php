<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Atividade;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\AtividadeRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\IAtividadeWriteDTO;

class AtividadeWriteValidator
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly AtividadeRepository $atividadeRepository,
    ) {}

    public function validar(PlanoTrabalho $plano, IAtividadeWriteDTO $dto): PlanoTrabalhoConsolidacao
    {
        if ($plano->status !== StatusEnum::ATIVO->value) {
            throw new ValidateException('O Plano de Trabalho precisa estar com status ATIVO.');
        }

        $consolidacao = $this->consolidacaoRepository->findConsolidacaoById($dto->consolidacaoId());

        if ($consolidacao === null) {
            throw new NotFoundException('Período avaliativo não encontrado.');
        }

        if ($consolidacao->plano_trabalho_id !== $plano->id) {
            throw new ValidateException('O período avaliativo não pertence a este Plano de Trabalho.');
        }

        if ($consolidacao->status !== StatusEnum::INCLUIDO->value) {
            throw new ValidateException('O período avaliativo precisa estar com status INCLUIDO.');
        }

        $this->validarEntregaPertenceAoPlano($plano, $dto);

        return $consolidacao;
    }

    public function validarExistencia(IAtividadeWriteDTO $dto): Atividade
    {
        $atividadeId = $dto->atividadeId();

        if ($atividadeId === null) {
            throw new ValidateException('O identificador do registro de execução é obrigatório.');
        }

        $atividade = $this->atividadeRepository->findById($atividadeId);

        if ($atividade === null) {
            throw new NotFoundException('Registro de execução não encontrado.');
        }

        if ($atividade->plano_trabalho_consolidacao_id !== $dto->consolidacaoId()) {
            throw new ValidateException('O registro de execução não pertence a este período avaliativo.');
        }

        return $atividade;
    }

    private function validarEntregaPertenceAoPlano(PlanoTrabalho $plano, IAtividadeWriteDTO $dto): void
    {
        $entregaId = $dto->planoTrabalhoEntregaId();

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
