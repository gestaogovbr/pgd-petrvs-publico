<?php

use App\V2\TipoModalidade\TipoModalidadeController;
use App\Models\TipoModalidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    if (!Route::has('__tests.v2.tipo-modalidade.index')) {
        Route::middleware(['api'])->get('/api/__tests/v2/tipo-modalidade', [TipoModalidadeController::class, 'index'])
            ->name('__tests.v2.tipo-modalidade.index');
    }

    $this->usuario = Usuario::factory()->create();
});

afterEach(function () {
    Mockery::close();
});

describe('GET /api/v2/tipo-modalidade', function () {

    test('retorna 200 com lista de tipos modalidade', function () {
        $this->actingAs($this->usuario, 'web');

        $modalidade = TipoModalidade::factory()->create(['nome' => 'Teletrabalho']);

        $response = $this->getJson('/api/__tests/v2/tipo-modalidade');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');

        expect($data)->toBeArray()
            ->and(collect($data)->pluck('id'))->toContain($modalidade->id);
    });

    test('retorna apenas registros não deletados', function () {
        $this->actingAs($this->usuario, 'web');

        $ativo = TipoModalidade::factory()->create(['nome' => 'Presencial']);
        $deletado = TipoModalidade::factory()->create(['nome' => 'Removido']);
        $deletado->delete();

        $data = $this->getJson('/api/__tests/v2/tipo-modalidade')->json('data');
        $ids = collect($data)->pluck('id')->toArray();

        expect($ids)->toContain($ativo->id)
            ->and($ids)->not->toContain($deletado->id);
    });

    test('retorna campos esperados em cada registro', function () {
        $this->actingAs($this->usuario, 'web');

        TipoModalidade::factory()->create();

        $data = $this->getJson('/api/__tests/v2/tipo-modalidade')->json('data');

        expect($data[0])->toHaveKeys([
            'id',
            'nome',
            'exige_pedagio',
            'plano_trabalho_calcula_horas',
            'atividade_tempo_despendido',
            'atividade_esforco',
        ]);
    });
});
