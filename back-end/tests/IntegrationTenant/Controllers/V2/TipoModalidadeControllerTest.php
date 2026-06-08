<?php

use App\V2\TipoModalidade\TipoModalidadeController;
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

    test('retorna 200 com lista de modalidades', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/tipo-modalidade');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');

        expect($data)->toBeArray()
            ->and($data)->not->toBeEmpty();
    });

    test('retorna campos key e value em cada registro', function () {
        $this->actingAs($this->usuario, 'web');

        $data = $this->getJson('/api/__tests/v2/tipo-modalidade')->json('data');

        expect($data[0])->toHaveKeys(['key', 'value']);
    });

    test('contém modalidade presencial', function () {
        $this->actingAs($this->usuario, 'web');

        $data = $this->getJson('/api/__tests/v2/tipo-modalidade')->json('data');
        $keys = collect($data)->pluck('key')->toArray();

        expect($keys)->toContain('presencial');
    });
});
