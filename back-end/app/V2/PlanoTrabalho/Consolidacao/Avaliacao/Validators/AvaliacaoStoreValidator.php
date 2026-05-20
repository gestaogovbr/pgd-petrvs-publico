<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\TipoAvaliacaoNota;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs\AvaliacaoStoreDTO;

class AvaliacaoStoreValidator
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}

    public function validar(PlanoTrabalho $plano, AvaliacaoStoreDTO $dto): PlanoTrabalhoConsolidacao
    {
        if (!in_array($plano->status, [StatusEnum::ATIVO->value, StatusEnum::CONCLUIDO->value])) {
            throw new ValidateException('O Plano de Trabalho precisa estar com status ATIVO ou CONCLUÍDO.');
        }

        $consolidacao = $this->consolidacaoRepository->findConsolidacaoById($dto->consolidacaoId);

        if ($consolidacao === null) {
            throw new NotFoundException('Período avaliativo não encontrado.');
        }

        if ($consolidacao->plano_trabalho_id !== $plano->id) {
            throw new ValidateException('O período avaliativo não pertence a este Plano de Trabalho.');
        }

        if ($consolidacao->status !== StatusEnum::CONCLUIDO->value) {
            throw new ValidateException('O período avaliativo precisa estar com status CONCLUIDO para ser avaliado.');
        }

        $avaliacoes = $consolidacao->relationLoaded('avaliacoes')
            ? $consolidacao->avaliacoes
            : $consolidacao->load('avaliacoes')->avaliacoes;

        if ($avaliacoes->isEmpty()) {
            return $consolidacao;
        }

        if ($avaliacoes->count() === 1 && !empty($avaliacoes->first()->recurso)) {
            return $consolidacao;
        }

        $mensagem = $avaliacoes->count() >= 2
            ? 'Este período avaliativo já foi reavaliado. A decisão é definitiva.'
            : 'Este período avaliativo já possui avaliação.';

        throw new ValidateException($mensagem);
    }

    public function validarNota(PlanoTrabalho $plano, AvaliacaoStoreDTO $dto): TipoAvaliacaoNota
    {
        $nota = TipoAvaliacaoNota::find($dto->tipoAvaliacaoNotaId);

        if ($nota === null) {
            throw new NotFoundException('Nota de avaliação não encontrada.');
        }

        $programa = $plano->relationLoaded('programa')
            ? $plano->programa
            : $plano->load('programa')->programa;

        if ($nota->tipo_avaliacao_id !== $programa->tipo_avaliacao_plano_trabalho_id) {
            throw new ValidateException('A nota de avaliação não pertence à escala do regramento deste Plano de Trabalho.');
        }

        if ($nota->justifica && empty($dto->justificativa)) {
            throw new ValidateException('A justificativa é obrigatória para esta nota de avaliação.');
        }

        return $nota;
    }
}
