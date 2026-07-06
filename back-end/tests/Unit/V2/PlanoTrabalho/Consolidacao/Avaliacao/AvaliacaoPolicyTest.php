<?php

use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\AvaliacaoPolicy;
use App\Enums\StatusEnum;
use App\Models\Avaliacao;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\StatusJustificativa;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->policy = new AvaliacaoPolicy();
});

function criarPlanoTrabalho(string $createdAt): PlanoTrabalho
{
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->created_at = Carbon::parse($createdAt);

    return $plano;
}

function criarConsolidacaoComAvaliacao(string $avaliacaoId, string $status, string $avaliadorId, string $dataAvaliacao, ?string $dataConclusao = null): array
{
    $avaliacao = Mockery::mock(Avaliacao::class)->makePartial();
    $avaliacao->id = $avaliacaoId;
    $avaliacao->avaliador_id = $avaliadorId;
    $avaliacao->data_avaliacao = $dataAvaliacao;

    $statusConclusao = Mockery::mock(StatusJustificativa::class)->makePartial();
    $statusConclusao->codigo = StatusEnum::CONCLUIDO->value;
    $statusConclusao->created_at = $dataConclusao ?? now()->toDateTimeString();

    $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
    $consolidacao->id = 'cons-1';
    $consolidacao->status = $status;
    $consolidacao->shouldReceive('getAttribute')->with('avaliacoes')->andReturn(new Collection([$avaliacao]));
    $consolidacao->shouldReceive('getAttribute')->with('statusHistorico')->andReturn(new Collection([$statusConclusao]));

    return [$avaliacao, $consolidacao];
}

afterEach(fn () => Mockery::close());

describe('AvaliacaoPolicy::podeCancelar', function () {

    test('retorna true quando todas as condições são atendidas (PT após data de corte)', function () {
        [$avaliacao, $consolidacao] = criarConsolidacaoComAvaliacao('av-1', StatusEnum::AVALIADO->value, 'user-1', now()->toDateTimeString());
        $plano = criarPlanoTrabalho('2026-06-15');

        expect($this->policy->podeCancelar($avaliacao, $consolidacao, 'user-1', $plano))->toBeTrue();
    });

    test('retorna false quando status não é AVALIADO', function () {
        [$avaliacao, $consolidacao] = criarConsolidacaoComAvaliacao('av-1', StatusEnum::CONCLUIDO->value, 'user-1', now()->toDateTimeString());
        $plano = criarPlanoTrabalho('2026-06-15');

        expect($this->policy->podeCancelar($avaliacao, $consolidacao, 'user-1', $plano))->toBeFalse();
    });

    test('retorna false quando usuário não é o avaliador', function () {
        [$avaliacao, $consolidacao] = criarConsolidacaoComAvaliacao('av-1', StatusEnum::AVALIADO->value, 'outro-user', now()->toDateTimeString());
        $plano = criarPlanoTrabalho('2026-06-15');

        expect($this->policy->podeCancelar($avaliacao, $consolidacao, 'user-1', $plano))->toBeFalse();
    });

    test('retorna false quando não é a avaliação mais recente', function () {
        $avaliacaoAntiga = Mockery::mock(Avaliacao::class)->makePartial();
        $avaliacaoAntiga->id = 'av-1';
        $avaliacaoAntiga->avaliador_id = 'user-1';
        $avaliacaoAntiga->data_avaliacao = now()->subDays(5)->toDateTimeString();

        $avaliacaoRecente = Mockery::mock(Avaliacao::class)->makePartial();
        $avaliacaoRecente->id = 'av-2';
        $avaliacaoRecente->avaliador_id = 'user-1';
        $avaliacaoRecente->data_avaliacao = now()->toDateTimeString();

        $statusConclusao = Mockery::mock(StatusJustificativa::class)->makePartial();
        $statusConclusao->codigo = StatusEnum::CONCLUIDO->value;
        $statusConclusao->created_at = now()->toDateTimeString();

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->id = 'cons-1';
        $consolidacao->status = StatusEnum::AVALIADO->value;
        $consolidacao->shouldReceive('getAttribute')->with('avaliacoes')->andReturn(new Collection([$avaliacaoAntiga, $avaliacaoRecente]));
        $consolidacao->shouldReceive('getAttribute')->with('statusHistorico')->andReturn(new Collection([$statusConclusao]));

        $plano = criarPlanoTrabalho('2026-06-15');

        expect($this->policy->podeCancelar($avaliacaoAntiga, $consolidacao, 'user-1', $plano))->toBeFalse();
    });

    test('retorna false quando prazo de 20 dias após conclusão expirou (PT após data de corte)', function () {
        [$avaliacao, $consolidacao] = criarConsolidacaoComAvaliacao(
            'av-1', StatusEnum::AVALIADO->value, 'user-1', now()->toDateTimeString(), now()->subDays(21)->toDateTimeString()
        );
        $plano = criarPlanoTrabalho('2026-06-15');

        expect($this->policy->podeCancelar($avaliacao, $consolidacao, 'user-1', $plano))->toBeFalse();
    });

    test('retorna true quando está dentro do prazo de 20 dias após conclusão', function () {
        [$avaliacao, $consolidacao] = criarConsolidacaoComAvaliacao(
            'av-1', StatusEnum::AVALIADO->value, 'user-1', now()->toDateTimeString(), now()->subDays(19)->toDateTimeString()
        );
        $plano = criarPlanoTrabalho('2026-06-15');

        expect($this->policy->podeCancelar($avaliacao, $consolidacao, 'user-1', $plano))->toBeTrue();
    });

    test('retorna false quando avaliação possui recurso (PT após data de corte)', function () {
        [$avaliacao, $consolidacao] = criarConsolidacaoComAvaliacao('av-1', StatusEnum::AVALIADO->value, 'user-1', now()->toDateTimeString());
        $avaliacao->recurso = 'Justificativa do recurso';
        $plano = criarPlanoTrabalho('2026-06-15');

        expect($this->policy->podeCancelar($avaliacao, $consolidacao, 'user-1', $plano))->toBeFalse();
    });

    test('retorna false quando não há registro de conclusão (PT após data de corte)', function () {
        $avaliacao = Mockery::mock(Avaliacao::class)->makePartial();
        $avaliacao->id = 'av-1';
        $avaliacao->avaliador_id = 'user-1';
        $avaliacao->data_avaliacao = now()->toDateTimeString();

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->id = 'cons-1';
        $consolidacao->status = StatusEnum::AVALIADO->value;
        $consolidacao->shouldReceive('getAttribute')->with('avaliacoes')->andReturn(new Collection([$avaliacao]));
        $consolidacao->shouldReceive('getAttribute')->with('statusHistorico')->andReturn(new Collection());

        $plano = criarPlanoTrabalho('2026-06-15');

        expect($this->policy->podeCancelar($avaliacao, $consolidacao, 'user-1', $plano))->toBeFalse();
    });

    test('retorna true quando avaliação possui recurso mas PT é anterior à data de corte', function () {
        [$avaliacao, $consolidacao] = criarConsolidacaoComAvaliacao('av-1', StatusEnum::AVALIADO->value, 'user-1', now()->toDateTimeString());
        $avaliacao->recurso = 'Justificativa do recurso';
        $plano = criarPlanoTrabalho('2026-06-01');

        expect($this->policy->podeCancelar($avaliacao, $consolidacao, 'user-1', $plano))->toBeTrue();
    });

    test('retorna true quando prazo expirou mas PT é anterior à data de corte', function () {
        [$avaliacao, $consolidacao] = criarConsolidacaoComAvaliacao(
            'av-1', StatusEnum::AVALIADO->value, 'user-1', now()->toDateTimeString(), now()->subDays(21)->toDateTimeString()
        );
        $plano = criarPlanoTrabalho('2026-06-01');

        expect($this->policy->podeCancelar($avaliacao, $consolidacao, 'user-1', $plano))->toBeTrue();
    });

    test('retorna true quando planoTrabalho não é informado (backward compat)', function () {
        [$avaliacao, $consolidacao] = criarConsolidacaoComAvaliacao('av-1', StatusEnum::AVALIADO->value, 'user-1', now()->toDateTimeString());

        expect($this->policy->podeCancelar($avaliacao, $consolidacao, 'user-1'))->toBeTrue();
    });
});
