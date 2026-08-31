<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\ProgramaRepository;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\AvaliacaoPolicy;
use App\V2\PlanoTrabalho\Consolidacao\Validators\ConcluirConsolidacaoValidator;
use App\V2\PlanoTrabalho\Consolidacao\Validators\ReabrirConsolidacaoValidator;
use App\V2\PlanoTrabalho\Consolidacao\Validators\RecursoValidator;
use App\V2\StatusService;
use App\Repository\UnidadeRepository;
use App\V2\Traits\ValidaAutorizacaoTrait;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PlanoTrabalhoConsolidacaoService
{
    use ValidaAutorizacaoTrait;

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly ProgramaRepository $programaRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly AfastamentoRepository $afastamentoRepository,
        private readonly AtividadeAuthorizationValidator $authValidator,
        private readonly ConcluirConsolidacaoValidator $concluirValidator,
        private readonly ReabrirConsolidacaoValidator $reabrirValidator,
        private readonly RecursoValidator $recursoValidator,
        private readonly StatusService $statusService,
        private readonly AvaliacaoPolicy $avaliacaoPolicy,
        private readonly DispensaAvaliacaoPolicy $dispensa,
    ) {}


    public function index(string $planoTrabalhoId): Collection
    {
        /** @var \App\Models\PlanoTrabalho|null $plano */
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        $consolidacoes = $this->consolidacaoRepository->findAllByPlanoTrabalhoId($planoTrabalhoId);

        if (!$this->isDonoOuChefia($plano, Auth::id(), $plano->unidade_id)) {
            $consolidacoes->each(fn ($c) => $c->unsetRelation('afastamentos'));
        }

        $this->aplicarPodeCancelarAvaliacao($consolidacoes);

        return $consolidacoes;
    }

    public function concluir(string $planoTrabalhoId, string $consolidacaoId): PlanoTrabalhoConsolidacao
    {
        $plano = $this->authValidator->validar($planoTrabalhoId, Auth::id());
        $consolidacao = $this->concluirValidator->validar($plano, $consolidacaoId);

        return DB::transaction(function () use ($consolidacao) {
            $this->consolidacaoRepository->update($consolidacao->id, [
                'data_conclusao' => now(),
            ]);

            $this->statusService->atualizaStatus(
                $consolidacao,
                StatusEnum::CONCLUIDO->value,
                'Período concluído pelo servidor: ' . Auth::user()->nome . '.',
            );

            return $consolidacao->refresh();
        });
    }

    public function reabrir(string $planoTrabalhoId, string $consolidacaoId, string $justificativa): PlanoTrabalhoConsolidacao
    {
        $plano = $this->authValidator->validar($planoTrabalhoId, Auth::id());
        $consolidacao = $this->reabrirValidator->validar($plano, $consolidacaoId);

        return DB::transaction(function () use ($consolidacao, $justificativa) {
            $this->consolidacaoRepository->update($consolidacao->id, [
                'data_conclusao' => null,
            ]);

            $this->statusService->atualizaStatus(
                $consolidacao,
                StatusEnum::INCLUIDO->value,
                'Período reaberto pelo servidor ' . Auth::user()->nome . '. Justificativa: ' . $justificativa,
            );

            return $consolidacao->refresh();
        });
    }

    public function recurso(string $planoTrabalhoId, string $consolidacaoId, string $justificativa): PlanoTrabalhoConsolidacao
    {
        $plano = $this->recursoValidator->validarAutorizacao($planoTrabalhoId, Auth::id());
        $avaliacao = $this->recursoValidator->validar($plano, $consolidacaoId);

        return DB::transaction(function () use ($avaliacao, $justificativa) {
            $avaliacao->update([
                'recurso' => $justificativa,
                'data_recurso' => now()->format('Y-m-d H:i:s'),
            ]);

            $consolidacao = $avaliacao->planoTrabalhoConsolidacao;

            $this->statusService->atualizaStatus(
                $consolidacao,
                StatusEnum::CONCLUIDO->value,
                'Recurso solicitado pelo participante: ' . Auth::user()->nome . '.',
            );

            return $consolidacao;
        });
    }

    /**
     * @return string[] IDs das consolidações dispensadas
     */
    public function dispensas(string $planoTrabalhoId): array
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        $vigencia = CarbonPeriod::create(
            Carbon::parse($plano->getAttribute('data_inicio'))->startOfDay(),
            Carbon::parse($plano->getAttribute('data_fim'))->startOfDay(),
        );

        $consolidacoes = $this->consolidacaoRepository->findAllByPlanoTrabalhoId($planoTrabalhoId);

        return $this->dispensa->consolidacoesDispensadas(
            $plano->getAttribute('usuario_id'),
            $vigencia,
            $consolidacoes,
        );
    }

    public function ocorrencias(string $consolidacaoId): Collection
    {
        $consolidacao = $this->consolidacaoRepository->findConsolidacaoById($consolidacaoId);

        if ($consolidacao === null) {
            throw new NotFoundException('Período avaliativo não encontrado.');
        }

        $plano = $this->planoTrabalhoRepository->findById($consolidacao->plano_trabalho_id);

        $vigencia = CarbonPeriod::create(
            Carbon::parse($consolidacao->data_inicio)->startOfDay(),
            Carbon::parse($consolidacao->data_fim)->startOfDay(),
        );

        return $this->afastamentoRepository->findAfastamentosParaDispensa($plano->usuario_id, $vigencia)
            ->load('tipoMotivoAfastamento:id,nome,sigla,horas');
    }

    public function notasAvaliacao(string $planoTrabalhoId): Collection
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        $programa = $plano->relationLoaded('programa')
            ? $plano->programa
            : $plano->load('programa')->programa;

        return $this->programaRepository->findAllNotasAvaliacao($programa->tipo_avaliacao_plano_trabalho_id);
    }

    private function aplicarPodeCancelarAvaliacao(Collection $consolidacoes): void
    {
        $usuarioId = (string) Auth::id();

        $consolidacoes->each(function (PlanoTrabalhoConsolidacao $consolidacao) use ($usuarioId) {
            $planoTrabalho = $consolidacao->planoTrabalho;
            $consolidacao->avaliacoes->each(function ($avaliacao) use ($consolidacao, $usuarioId, $planoTrabalho) {
                $avaliacao->setAttribute('pode_cancelar', $this->avaliacaoPolicy->podeCancelar($avaliacao, $consolidacao, $usuarioId, $planoTrabalho));
            });
        });
    }
}
