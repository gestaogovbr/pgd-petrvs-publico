<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;
use App\V2\PlanoTrabalho\Authorization\PlanoTrabalhoAuthorization;
use App\V2\PlanoTrabalho\Consolidacao\DispensaAvaliacaoPolicy;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class PlanoTrabalhoArquivarValidator
{
    private const PRAZO_RECURSO_DIAS = 30;

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoAuthorization $authorization,
        private readonly UsuarioRepository $usuarioRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
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

        if (!$this->isElegivelParaArquivamento($plano)) {
            throw new ValidateException('Este Plano de Trabalho não atende aos requisitos para arquivamento.');
        }

        $usuario = $this->usuarioRepository->findByIdComAreasTrabalho($usuarioLogadoId);

        if ($usuario === null) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        $usuario->loadMissing('perfil');

        if (!$this->authorization->isAutorizadoArquivar($plano, $usuario)) {
            throw new ForbiddenException('Usuário não tem permissão para arquivar este Plano de Trabalho.');
        }

        return $plano;
    }

    public function isElegivelParaArquivamento(PlanoTrabalho $plano): bool
    {
        if ($plano->status === StatusEnum::CANCELADO->value) {
            return true;
        }

        $resumo = $this->consolidacaoRepository->resumoParaArquivamento(
            $plano->id,
            Carbon::now()->subDays(self::PRAZO_RECURSO_DIAS),
        );

        if ($resumo->isAguardandoReavaliacao) {
            return false;
        }

        if ($plano->encerrado_at !== null && !$resumo->possuiPendencias) {
            return true;
        }

        if ($plano->status === StatusEnum::CONCLUIDO->value && $resumo->todosAvaliados && !$resumo->avaliacaoRecente) {
            return true;
        }

        if ($plano->status === StatusEnum::CONCLUIDO->value && !$resumo->todosAvaliados && !$resumo->avaliacaoRecente) {
            if ($this->naoAvaliadosSaoDispensados($plano)) {
                return true;
            }
        }

        return false;
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
}
