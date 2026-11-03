<?php

declare(strict_types=1);

namespace Tests\IntegrationTenant\Repository;

use App\Enums\StatusEnum;
use App\Models\Perfil;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoArquivarValidator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Bus;

/**
 * Cobre o deadlock de arquivamento de Planos de Trabalho encerrados antecipadamente.
 *
 * O encerramento antecipado marca como CONCLUIDO todos os períodos com data_inicio
 * posterior a encerrado_at, mas esses períodos nunca podem ser avaliados. Sem filtrar
 * por encerrado_at, o resumo os contava como pendência e o plano nunca era arquivável.
 */
beforeEach(function () {
    Bus::fake();

    $this->repository = app(PlanoTrabalhoConsolidacaoRepository::class);
    $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão'])->id;
    $this->unidade = Unidade::factory()->create();
    $this->usuario = Usuario::factory()->create(['perfil_id' => $this->perfilId]);
    $this->programa = Programa::factory()->create();
});

function criarPlanoEncerrado(string $unidadeId, string $usuarioId, string $programaId, string $encerradoAt): PlanoTrabalho
{
    return PlanoTrabalho::factory()->create([
        'unidade_id' => $unidadeId,
        'usuario_id' => $usuarioId,
        'programa_id' => $programaId,
        'status' => StatusEnum::CONCLUIDO->value,
        'data_inicio' => '2025-01-01',
        'data_fim' => $encerradoAt,
        'encerrado_at' => $encerradoAt,
    ]);
}

function criarConsolidacao(string $planoId, string $dataInicio, string $dataFim, string $status): PlanoTrabalhoConsolidacao
{
    return PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $planoId,
        'data_inicio' => $dataInicio,
        'data_fim' => $dataFim,
        'status' => $status,
    ]);
}

describe('resumoParaArquivamento com plano encerrado antecipadamente', function () {

    test('periodos futuros concluidos pelo encerramento nao contam como pendencia', function () {
        $plano = criarPlanoEncerrado(
            $this->unidade->id,
            $this->usuario->id,
            $this->programa->id,
            '2025-03-15',
        );

        // Período vigente até a data do encerramento, já avaliado.
        criarConsolidacao($plano->id, '2025-01-01', '2025-03-15', StatusEnum::AVALIADO->value);
        // Períodos futuros concluídos automaticamente pelo encerramento antecipado.
        criarConsolidacao($plano->id, '2025-04-01', '2025-04-30', StatusEnum::CONCLUIDO->value);
        criarConsolidacao($plano->id, '2025-05-01', '2025-05-31', StatusEnum::CONCLUIDO->value);
        criarConsolidacao($plano->id, '2025-06-01', '2025-06-30', StatusEnum::INCLUIDO->value);

        $resumo = $this->repository->resumoParaArquivamento(
            $plano->id,
            Carbon::now()->subDays(20),
            $plano->encerrado_at,
        );

        expect($resumo->possuiPendencias)->toBeFalse()
            ->and($resumo->todosAvaliados)->toBeTrue()
            ->and($resumo->avaliacaoRecente)->toBeFalse()
            ->and($resumo->isAguardandoReavaliacao)->toBeFalse();
    });

    test('sem o filtro de encerrado_at os periodos futuros ainda contam como pendencia (regressao documentada)', function () {
        $plano = criarPlanoEncerrado(
            $this->unidade->id,
            $this->usuario->id,
            $this->programa->id,
            '2025-03-15',
        );

        criarConsolidacao($plano->id, '2025-01-01', '2025-03-15', StatusEnum::AVALIADO->value);
        criarConsolidacao($plano->id, '2025-04-01', '2025-04-30', StatusEnum::CONCLUIDO->value);

        $semFiltro = $this->repository->resumoParaArquivamento($plano->id, Carbon::now()->subDays(20));

        expect($semFiltro->possuiPendencias)->toBeTrue();
    });

    test('pendencia real dentro da vigencia continua bloqueando o arquivamento', function () {
        $plano = criarPlanoEncerrado(
            $this->unidade->id,
            $this->usuario->id,
            $this->programa->id,
            '2025-03-15',
        );

        // Período vigente não avaliado: pendência legítima que deve permanecer.
        criarConsolidacao($plano->id, '2025-01-01', '2025-03-15', StatusEnum::CONCLUIDO->value);
        criarConsolidacao($plano->id, '2025-04-01', '2025-04-30', StatusEnum::CONCLUIDO->value);

        $resumo = $this->repository->resumoParaArquivamento(
            $plano->id,
            Carbon::now()->subDays(20),
            $plano->encerrado_at,
        );

        expect($resumo->possuiPendencias)->toBeTrue()
            ->and($resumo->todosAvaliados)->toBeFalse();
    });

    test('plano encerrado antecipadamente sem pendencias vigentes e elegivel para arquivamento', function () {
        $plano = criarPlanoEncerrado(
            $this->unidade->id,
            $this->usuario->id,
            $this->programa->id,
            '2025-03-15',
        );

        criarConsolidacao($plano->id, '2025-01-01', '2025-03-15', StatusEnum::AVALIADO->value);
        criarConsolidacao($plano->id, '2025-04-01', '2025-04-30', StatusEnum::CONCLUIDO->value);

        $validator = app(PlanoTrabalhoArquivarValidator::class);

        expect($validator->motivoImpedimento($plano))->toBeNull()
            ->and($validator->isElegivelParaArquivamento($plano))->toBeTrue();
    });
});
