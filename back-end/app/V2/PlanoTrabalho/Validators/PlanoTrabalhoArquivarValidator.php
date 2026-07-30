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

        $motivoImpedimento = $this->motivoImpedimento($plano);

        if ($motivoImpedimento !== null) {
            throw new ValidateException($motivoImpedimento);
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

    public function motivoImpedimento(PlanoTrabalho $plano): ?string
    {
        if ($plano->status === StatusEnum::CANCELADO->value) {
            return null;
        }

        if ($plano->status !== StatusEnum::CONCLUIDO->value) {
            return 'Este plano de trabalho não pode ser arquivado porque ainda está em andamento.';
        }

        $resumo = $this->consolidacaoRepository->resumoParaArquivamento(
            $plano->id,
            Carbon::now()->subDays(self::PRAZO_RECURSO_DIAS),
        );

        if ($resumo->isAguardandoReavaliacao || $resumo->avaliacaoRecente) {
            return 'Este plano de trabalho não pode ser arquivado porque está no prazo para recurso.'
                . ' O arquivamento será liberado automaticamente 30 dias após a data da avaliação.';
        }

        if ($plano->encerrado_at !== null && !$resumo->possuiPendencias) {
            return null;
        }

        if ($plano->encerrado_at !== null) {
            return 'Este plano de trabalho não pode ser arquivado porque possui registros de execução ou avaliações pendentes.';
        }

        if ($resumo->todosAvaliados) {
            return null;
        }

        if ($this->naoAvaliadosSaoDispensados($plano)) {
            return null;
        }

        return 'Este plano de trabalho não pode ser arquivado porque possui períodos avaliativos pendentes de avaliação.';
    }

    public function isElegivelParaArquivamento(PlanoTrabalho $plano): bool
    {
        return $this->motivoImpedimento($plano) === null;
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
