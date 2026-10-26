<?php

use App\Enums\StatusEnum;
use App\Exceptions\ServerException;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Programa;
use App\Models\Usuario;
use App\Services\PlanoTrabalhoService;
use App\V2\PlanoTrabalho\Consolidacao\GeradorPeriodosAvaliativos;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    Queue::fake();

    $this->usuario = Usuario::factory()->create();
    $this->actingAs($this->usuario);

    $this->programa = Programa::factory()->create([
        'periodicidade_consolidacao' => 'MENSAL',
        'periodicidade_valor' => 31,
        'data_inicio' => '2026-01-01',
        'data_fim' => '2026-12-31',
    ]);

    $this->plano = PlanoTrabalho::factory()->create([
        'usuario_id' => $this->usuario->id,
        'criacao_usuario_id' => $this->usuario->id,
        'programa_id' => $this->programa->id,
        'unidade_id' => $this->programa->unidade_id,
        'data_inicio' => '2026-10-01',
        'data_fim' => '2026-10-31',
        'status' => StatusEnum::INCLUIDO->value,
    ]);
});

test('issue 2663 - operacoes de escrita da API legada ficam indisponiveis', function () {
    Route::middleware(['api'])->prefix('api')
        ->group(base_path('routes/api_tenant/plano-trabalho.php'));

    $actions = [
        'store', 'update', 'update-json', 'destroy', 'upload', 'delete-file',
        'cancelar-plano', 'cancelar-assinatura', 'cancelar-avaliacao',
        'ativar', 'reativar', 'suspender', 'arquivar', 'enviar-para-assinatura',
    ];

    foreach ($actions as $action) {
        $this->postJson("/api/PlanoTrabalho/{$action}", [
            'id' => $this->plano->id,
            'justificativa' => 'Ação sintética por HTTP',
        ])->assertStatus(410)->assertJsonStructure(['error']);
    }

    expect($this->plano->fresh()->status)->toBe(StatusEnum::INCLUIDO->value)
        ->and($this->plano->consolidacoes()->count())->toBe(0);
});

test('issue 2663 - ativacao legada de plano sem periodos nao deixa execucao sem periodos', function () {
    expect($this->plano->consolidacoes()->count())->toBe(0);

    app(PlanoTrabalhoService::class)->ativar([
        'id' => $this->plano->id,
        'justificativa' => 'Ativação sintética de regressão',
    ], null);

    expect($this->plano->fresh()->status)->toBe(StatusEnum::ATIVO->value)
        ->and($this->plano->consolidacoes()->count())->toBeGreaterThan(0);
});

test('issue 2663 - gerador V2 cria periodo para plano sem consolidacoes', function () {
    expect($this->plano->consolidacoes()->count())->toBe(0);

    app(GeradorPeriodosAvaliativos::class)->gerar($this->plano->load('programa'));

    $periodos = $this->plano->consolidacoes()->get();

    expect($periodos)->toHaveCount(1)
        ->and($periodos->first()->data_inicio)->toBe('2026-10-01')
        ->and($periodos->first()->data_fim)->toBe('2026-10-31');
});

test('issue 2663 - reativacao legada recompõe periodos ausentes', function () {
    $this->plano->update(['status' => StatusEnum::SUSPENSO->value]);

    app(PlanoTrabalhoService::class)->reativar([
        'id' => $this->plano->id,
        'justificativa' => 'Reativação sintética de regressão',
    ], null);

    expect($this->plano->fresh()->status)->toBe(StatusEnum::ATIVO->value)
        ->and($this->plano->consolidacoes()->count())->toBeGreaterThan(0);
});

test('issue 2663 - ativacao preserva periodo avaliativo existente', function () {
    $periodo = PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $this->plano->id,
        'data_inicio' => '2026-10-01',
        'data_fim' => '2026-10-31',
    ]);

    app(PlanoTrabalhoService::class)->ativar([
        'id' => $this->plano->id,
        'justificativa' => 'Ativação com período existente',
    ], null);

    expect($this->plano->fresh()->status)->toBe(StatusEnum::ATIVO->value)
        ->and($this->plano->consolidacoes()->pluck('id')->all())->toBe([$periodo->id]);
});

test('issue 2663 - ativacao recusa periodos com lacuna na vigencia', function () {
    PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $this->plano->id,
        'data_inicio' => '2026-10-01',
        'data_fim' => '2026-10-15',
    ]);

    expect(fn () => app(PlanoTrabalhoService::class)->ativar([
        'id' => $this->plano->id,
        'justificativa' => 'Ativação com lacuna',
    ], null))->toThrow(ServerException::class);

    expect($this->plano->fresh()->status)->toBe(StatusEnum::INCLUIDO->value)
        ->and($this->plano->consolidacoes()->count())->toBe(1);
});

test('issue 2663 - chamadas repetidas nao duplicam periodos', function () {
    $service = app(PlanoTrabalhoService::class);
    $data = [
        'id' => $this->plano->id,
        'justificativa' => 'Ativação repetida',
    ];

    $service->ativar($data, null);
    $periodosIds = $this->plano->consolidacoes()->pluck('id')->all();
    $service->ativar($data, null);

    expect($this->plano->consolidacoes()->pluck('id')->all())->toBe($periodosIds);
});
