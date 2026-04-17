<?php

use App\Models\Atividade;
use App\Models\AtividadePausa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Services\AtividadeService;
use App\Services\UnidadeService;

class SpyUnidadeService
{
    public int $horaCalls = 0;
    public array $horaArgs = [];

    public function hora($unidadeId)
    {
        $this->horaCalls++;
        $this->horaArgs[] = $unidadeId;
        return '2026-01-01 00:00:00';
    }
}

class TestableAtividadeService extends AtividadeService
{
    public object $statusService;

    public function __construct()
    {
        parent::__construct();
        $this->statusService = new class {
            public function atualizaStatus(...$args): void
            {
            }
        };
    }

    public function validateStore($data, $unidade, $action)
    {
    }

    public function validateIniciar($data)
    {
    }

    public function update($data, $unidade, $notify = true)
    {
    }
}

test('iniciar com suspender cria pausas para outras atividades iniciadas e não pausa a atividade atual', function () {
    $unidade = Unidade::factory()->create();
    $usuario = Usuario::factory()->create();

    $atividadeAtual = Atividade::factory()->create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'demandante_id' => $usuario->id,
    ]);

    $outraAtividade1 = Atividade::factory()->create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'demandante_id' => $usuario->id,
        'data_inicio' => '2026-01-01 00:00:00',
        'data_entrega' => null,
    ]);

    $outraAtividade2 = Atividade::factory()->create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'demandante_id' => $usuario->id,
        'data_inicio' => '2026-01-01 00:00:00',
        'data_entrega' => null,
    ]);

    $spyUnidadeService = new SpyUnidadeService();
    app()->instance(UnidadeService::class, $spyUnidadeService);

    $service = new TestableAtividadeService();

    $result = $service->iniciar(
        [
            'id' => $atividadeAtual->id,
            'usuario_id' => $usuario->id,
            'suspender' => true,
        ],
        $unidade
    );

    expect($result)->toBeTrue();

    expect($spyUnidadeService->horaCalls)->toBe(1);
    expect($spyUnidadeService->horaArgs)->toBe([$unidade->id]);

    $this->assertDatabaseHas('atividades_pausas', [
        'atividade_id' => $outraAtividade1->id,
        'data_inicio' => '2026-01-01 00:00:00',
        'data_fim' => null,
    ]);

    $this->assertDatabaseHas('atividades_pausas', [
        'atividade_id' => $outraAtividade2->id,
        'data_inicio' => '2026-01-01 00:00:00',
        'data_fim' => null,
    ]);

    $this->assertDatabaseMissing('atividades_pausas', [
        'atividade_id' => $atividadeAtual->id,
    ]);
});

test('iniciar sem suspender não cria pausas', function () {
    $unidade = Unidade::factory()->create();
    $usuario = Usuario::factory()->create();

    $atividadeAtual = Atividade::factory()->create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'demandante_id' => $usuario->id,
    ]);

    $outraAtividade = Atividade::factory()->create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'demandante_id' => $usuario->id,
        'data_inicio' => '2026-01-01 00:00:00',
        'data_entrega' => null,
    ]);

    $spyUnidadeService = new SpyUnidadeService();
    app()->instance(UnidadeService::class, $spyUnidadeService);

    $service = new TestableAtividadeService();

    $result = $service->iniciar(
        [
            'id' => $atividadeAtual->id,
            'usuario_id' => $usuario->id,
            'suspender' => false,
        ],
        $unidade
    );

    expect($result)->toBeTrue();
    expect($spyUnidadeService->horaCalls)->toBe(0);

    expect(AtividadePausa::query()->where('atividade_id', $outraAtividade->id)->count())->toBe(0);
});
