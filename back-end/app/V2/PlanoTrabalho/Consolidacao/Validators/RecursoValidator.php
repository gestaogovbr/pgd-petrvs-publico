<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Avaliacao;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use Carbon\Carbon;

class RecursoValidator
{
    private const PRAZO_RECURSO_DIAS = 10;

    private const STATUSES_PERMITE_RECURSO = [
        StatusEnum::ATIVO,
        StatusEnum::CONCLUIDO,
    ];

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}

    public function validarAutorizacao(string $planoTrabalhoId, string $usuarioLogadoId): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        if ($plano->usuario_id !== $usuarioLogadoId) {
            throw new ForbiddenException('Apenas o participante dono do Plano de Trabalho pode solicitar recurso.');
        }

        return $plano;
    }

    public function validar(PlanoTrabalho $plano, string $consolidacaoId): Avaliacao
    {
        $statusPermitidos = array_map(fn (StatusEnum $s) => $s->value, self::STATUSES_PERMITE_RECURSO);

        if (!in_array($plano->status, $statusPermitidos, true)) {
            throw new ValidateException('O Plano de Trabalho precisa estar com status ATIVO ou CONCLUÍDO.');
        }

        $consolidacao = $this->consolidacaoRepository->findConsolidacaoById($consolidacaoId);

        if ($consolidacao === null) {
            throw new NotFoundException('Período avaliativo não encontrado.');
        }

        if ($consolidacao->plano_trabalho_id !== $plano->id) {
            throw new ValidateException('O período avaliativo não pertence a este Plano de Trabalho.');
        }

        if ($consolidacao->status !== StatusEnum::AVALIADO->value) {
            throw new ValidateException('O período avaliativo precisa estar com status AVALIADO para solicitar recurso.');
        }

        $avaliacoes = $consolidacao->load('avaliacoes.tipoAvaliacaoNota')->avaliacoes;

        if ($avaliacoes->count() !== 1) {
            throw new ValidateException('Recurso só pode ser solicitado quando existe exatamente uma avaliação.');
        }

        $avaliacao = $avaliacoes->first();

        if ($avaliacao->tipoAvaliacaoNota->aprova) {
            throw new ValidateException('Recurso só pode ser solicitado para notas que não aprovam (inadequado ou não executado).');
        }

        $prazoLimite = Carbon::parse($avaliacao->data_avaliacao)->addDays(self::PRAZO_RECURSO_DIAS);

        if (Carbon::now()->greaterThan($prazoLimite)) {
            throw new ValidateException('O prazo de ' . self::PRAZO_RECURSO_DIAS . ' dias corridos para solicitar recurso expirou.');
        }

        return $avaliacao;
    }
}
