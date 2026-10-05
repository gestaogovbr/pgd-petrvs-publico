<?php

use App\Enums\StatusEnum;
use App\Models\PlanoEntrega;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\PlanoEntrega\DataProviders\VigentesPEDataProvider;
use App\V2\PlanoEntrega\PlanoEntregaController;
use Illuminate\Support\Facades\Route;

function pePlanoVigente(string $unidadeId, array $overrides = []): PlanoEntrega
{
    return PlanoEntrega::factory()->create(array_merge([
        'unidade_id' => $unidadeId,
        'status' => StatusEnum::ATIVO->value,
        'data_inicio' => now()->subDays(5),
        'data_fim' => now()->addDays(5),
    ], $overrides));
}

beforeEach(function () {
    if (!Route::has('__tests.v2.plano-entrega.vigentes')) {
        Route::middleware(['api'])->get('/api/__tests/v2/plano-entrega/vigentes', [PlanoEntregaController::class, 'vigentes'])
            ->name('__tests.v2.plano-entrega.vigentes');
    }

    $this->unidade = Unidade::factory()->create();
    $this->usuario = Usuario::factory()->create();
    UnidadeIntegranteAtribuicao::factory()->lotado()
        ->paraUsuarioUnidade($this->usuario->id, $this->unidade->id)->create();
});

afterEach(function () {
    \Mockery::close();
});

describe('GET /api/v2/plano-entrega/vigentes (happy path)', function () {

    test('retorna 200 com os PEs vigentes do usuário', function () {
        $this->actingAs($this->usuario, 'web');

        $pe = pePlanoVigente($this->unidade->id);

        $response = $this->getJson('/api/__tests/v2/plano-entrega/vigentes');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        expect(collect($response->json('data.data'))->pluck('id'))->toContain($pe->id);
    });

    test('exclui PE INCLUIDO (rascunho)', function () {
        $this->actingAs($this->usuario, 'web');

        pePlanoVigente($this->unidade->id, ['status' => StatusEnum::INCLUIDO->value]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega/vigentes');

        $response->assertStatus(200);
        expect($response->json('data.data'))->toBeEmpty();
    });

    test('exclui PE com datas fora do intervalo de vigência', function () {
        $this->actingAs($this->usuario, 'web');

        pePlanoVigente($this->unidade->id, [
            'data_inicio' => now()->subDays(40),
            'data_fim' => now()->subDays(10),
        ]);
        pePlanoVigente($this->unidade->id, [
            'data_inicio' => now()->addDays(10),
            'data_fim' => now()->addDays(40),
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega/vigentes');

        $response->assertStatus(200);
        expect($response->json('data.data'))->toBeEmpty();
    });

    test('exclui PE de unidade sem atribuição direta', function () {
        $this->actingAs($this->usuario, 'web');

        $outraUnidade = Unidade::factory()->create();
        pePlanoVigente($outraUnidade->id);

        $response = $this->getJson('/api/__tests/v2/plano-entrega/vigentes');

        $response->assertStatus(200);
        expect($response->json('data.data'))->toBeEmpty();
    });
});

describe('GET /api/v2/plano-entrega/vigentes (erros)', function () {

    test('retorna 500 quando o data provider lança exceção inesperada', function () {
        $this->actingAs($this->usuario, 'web');

        $this->mock(VigentesPEDataProvider::class, function ($mock) {
            $mock->shouldReceive('buscar')
                ->andThrow(new \RuntimeException('Erro de conexão'));
        });

        $response = $this->getJson('/api/__tests/v2/plano-entrega/vigentes');

        $response->assertStatus(500)
            ->assertJsonPath('error', 'Ocorreu um erro inesperado.');
    });
});
