<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicaoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;

class ConcluirConsolidacaoValidator
{
    private const TOLERANCIA_CARGA_HORARIA = 0.01;

    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly PlanoTrabalhoEntregaRepository $entregaRepository,
        private readonly PlanoTrabalhoConsolidacaoContribuicaoRepository $contribuicaoRepository,
    ) {}

    public function validar(
        PlanoTrabalho $plano,
        string $consolidacaoId,
        ?string $justificativaCargaHoraria = null,
    ): PlanoTrabalhoConsolidacao {
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

        $this->validarContribuicoesRegistradas($consolidacaoId);
        $this->validarCargaHoraria($plano->id, $consolidacaoId, $justificativaCargaHoraria);

        return $consolidacao;
    }

    private function validarContribuicoesRegistradas(string $consolidacaoId): void
    {
        if (!$this->contribuicaoRepository->possuiContribuicoes($consolidacaoId)) {
            throw new ValidateException('O período avaliativo não possui contribuições para registrar.');
        }

        if ($this->contribuicaoRepository->possuiNaoRegistrada($consolidacaoId)) {
            throw new ValidateException('Todas as contribuições devem ter trabalho executado registrado para concluir o período.');
        }
    }

    private function validarCargaHoraria(string $planoTrabalhoId, string $consolidacaoId, ?string $justificativaCargaHoraria): void
    {
        if (!$this->cargaHorariaDiverge($planoTrabalhoId, $consolidacaoId)) {
            return;
        }

        if (trim((string) $justificativaCargaHoraria) === '') {
            throw new ValidateException('A justificativa é obrigatória quando a carga horária executada diverge da planejada.');
        }
    }

    private function cargaHorariaDiverge(string $planoTrabalhoId, string $consolidacaoId): bool
    {
        $planejado = $this->entregaRepository->resumoForcaTrabalhoPorPlano($planoTrabalhoId)->somatorioForcaTrabalho;
        $executado = $this->contribuicaoRepository->totalEsforcoExecutadoPorConsolidacao($consolidacaoId);

        return abs($planejado - $executado) >= self::TOLERANCIA_CARGA_HORARIA;
    }
}
