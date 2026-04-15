<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\ProgramaRepository;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Validators\ConcluirConsolidacaoValidator;
use App\V2\PlanoTrabalho\Consolidacao\Validators\ReabrirConsolidacaoValidator;
use App\V2\PlanoTrabalho\Consolidacao\Validators\RecursoValidator;
use App\V2\StatusService;
use App\V2\PlanoTrabalho\PlanoTrabalhoService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class PlanoTrabalhoConsolidacaoService
{
    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly ProgramaRepository $programaRepository,
        private readonly PlanoTrabalhoService $planoTrabalhoService,
        private readonly AtividadeAuthorizationValidator $authValidator,
        private readonly ConcluirConsolidacaoValidator $concluirValidator,
        private readonly ReabrirConsolidacaoValidator $reabrirValidator,
        private readonly RecursoValidator $recursoValidator,
        private readonly StatusService $statusService,
    ) {}

    public function index(string $planoTrabalhoId): Collection
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        $consolidacoes = $this->consolidacaoRepository->findByPlanoTrabalhoId($planoTrabalhoId);

        if (!$this->planoTrabalhoService->isDonoOuChefia($plano, Auth::id())) {
            $consolidacoes->each(fn ($c) => $c->unsetRelation('afastamentos'));
        }

        return $consolidacoes;
    }

    public function concluir(string $planoTrabalhoId, string $consolidacaoId): PlanoTrabalhoConsolidacao
    {
        $plano = $this->authValidator->validar($planoTrabalhoId, Auth::id());
        $consolidacao = $this->concluirValidator->validar($plano, $consolidacaoId);

        $this->statusService->atualizaStatus(
            $consolidacao,
            StatusEnum::CONCLUIDO->value,
            'Período concluído pelo servidor: ' . Auth::user()->nome . '.',
        );

        return $consolidacao;
    }

    public function reabrir(string $planoTrabalhoId, string $consolidacaoId, string $justificativa): PlanoTrabalhoConsolidacao
    {
        $plano = $this->authValidator->validar($planoTrabalhoId, Auth::id());
        $consolidacao = $this->reabrirValidator->validar($plano, $consolidacaoId);

        $this->statusService->atualizaStatus(
            $consolidacao,
            StatusEnum::INCLUIDO->value,
            'Período reaberto pelo servidor ' . Auth::user()->nome . '. Justificativa: ' . $justificativa,
        );

        return $consolidacao;
    }

    public function recurso(string $planoTrabalhoId, string $consolidacaoId, string $justificativa): PlanoTrabalhoConsolidacao
    {
        $plano = $this->recursoValidator->validarAutorizacao($planoTrabalhoId, Auth::id());
        $avaliacao = $this->recursoValidator->validar($plano, $consolidacaoId);

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

        return $this->programaRepository->findNotasAvaliacao($programa->tipo_avaliacao_plano_trabalho_id);
    }
}
