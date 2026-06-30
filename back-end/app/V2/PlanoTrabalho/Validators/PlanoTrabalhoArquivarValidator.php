<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Enums\PerfilEnum;
use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\PlanoTrabalho\Consolidacao\DispensaAvaliacaoPolicy;
use App\V2\Traits\ValidaAutorizacaoTrait;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class PlanoTrabalhoArquivarValidator
{
    use ValidaAutorizacaoTrait;

    private const PRAZO_RECURSO_DIAS = 30;

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UsuarioRepository $usuarioRepository,
        private readonly DispensaAvaliacaoPolicy $dispensaPolicy,
    ) {}


    public function validar(string $planoId, string $usuarioLogadoId): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findById($planoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        if ($plano->data_arquivamento !== null) {
            throw new ValidateException('Este Plano de Trabalho já está arquivado.');
        }

        $this->validarElegibilidade($plano);
        $this->validarAutorizacao($plano, $usuarioLogadoId);

        return $plano;
    }

    private function validarElegibilidade(PlanoTrabalho $plano): void
    {
        if ($plano->status === StatusEnum::CANCELADO->value) {
            return;
        }

        $resumo = $this->consolidacaoRepository->resumoParaArquivamento(
            $plano->id,
            Carbon::now()->subDays(self::PRAZO_RECURSO_DIAS),
        );

        if ($plano->encerrado_at !== null && !$resumo->possuiPendencias) {
            return;
        }

        if ($plano->status === StatusEnum::CONCLUIDO->value && $resumo->todosAvaliados && !$resumo->avaliacaoRecente) {
            return;
        }

        if ($plano->status === StatusEnum::CONCLUIDO->value && !$resumo->todosAvaliados && !$resumo->avaliacaoRecente) {
            if ($this->naoAvaliadosSaoDispensados($plano)) {
                return;
            }
        }

        throw new ValidateException('Este Plano de Trabalho não atende aos requisitos para arquivamento.');
    }

    private function naoAvaliadosSaoDispensados(PlanoTrabalho $plano): bool
    {
        $vigencia = CarbonPeriod::create(
            Carbon::parse($plano->data_inicio)->startOfDay(),
            Carbon::parse($plano->data_fim)->startOfDay(),
        );

        $consolidacoes = $this->consolidacaoRepository->findConsolidacoesVigentes($plano->id, $plano->encerrado_at);
        $naoAvaliadas = $consolidacoes->filter(
            fn (PlanoTrabalhoConsolidacao $c) => $c->status !== StatusEnum::AVALIADO->value
        );

        if ($naoAvaliadas->isEmpty()) {
            return true;
        }

        $dispensadasIds = $this->dispensaPolicy->consolidacoesDispensadas(
            $plano->usuario_id,
            $vigencia,
            $consolidacoes,
        );

        return $naoAvaliadas->every(
            fn (PlanoTrabalhoConsolidacao $c) => in_array($c->id, $dispensadasIds, true)
        );
    }

    private function validarAutorizacao(PlanoTrabalho $plano, string $usuarioLogadoId): void
    {
        // Já verifica recursivamente a autorização do usuário
        if ($this->isDonoOuChefia($plano, $usuarioLogadoId, $plano->unidade_id)) {
            return;
        }

        $usuario = $this->usuarioRepository->findById($usuarioLogadoId);

        if ($usuario?->perfil?->nivel === PerfilEnum::COLABORADOR->value
            && $this->unidadeRepository->hasUsuarioLotacao($plano->unidade_id, $usuarioLogadoId, true)) {
            return;
        }

        throw new ForbiddenException('Usuário não tem permissão para arquivar este Plano de Trabalho.');
    }
}
