<?php

use App\Enums\StatusEnum;
use App\Models\PlanoEntrega;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\PlanoEntrega\DataProviders\VigentesPEDataProvider;

function peVigente(string $unidadeId, array $overrides = []): PlanoEntrega
{
    return PlanoEntrega::factory()->create(array_merge([
        'unidade_id' => $unidadeId,
        'status' => StatusEnum::ATIVO->value,
        'data_inicio' => now()->subDays(5),
        'data_fim' => now()->addDays(5),
    ], $overrides));
}

beforeEach(function () {
    $this->provider = app(VigentesPEDataProvider::class);

    $this->unidade = Unidade::factory()->create();

    $this->usuario = Usuario::factory()->create();
    UnidadeIntegranteAtribuicao::factory()->lotado()
        ->paraUsuarioUnidade($this->usuario->id, $this->unidade->id)->create();
});

describe('VigentesPEDataProvider', function () {

    test('buscar retorna PE ATIVO com período contendo hoje na unidade de atribuição direta', function () {
        $pe = peVigente($this->unidade->id);

        $page = $this->provider->buscar($this->usuario->id);

        expect($page->total())->toBe(1);
        expect($page->items()[0]->id)->toBe($pe->id);
    });

    test('NÃO retorna PE com status diferente de ATIVO (ex: INCLUIDO/rascunho)', function () {
        peVigente($this->unidade->id, ['status' => StatusEnum::INCLUIDO->value]);

        expect($this->provider->buscar($this->usuario->id)->total())->toBe(0);
    });

    test('NÃO retorna PE cujo período já terminou (data_fim < hoje)', function () {
        peVigente($this->unidade->id, [
            'data_inicio' => now()->subDays(20),
            'data_fim' => now()->subDays(1),
        ]);

        expect($this->provider->buscar($this->usuario->id)->total())->toBe(0);
    });

    test('NÃO retorna PE cujo período ainda não começou (data_inicio > hoje)', function () {
        peVigente($this->unidade->id, [
            'data_inicio' => now()->addDays(1),
            'data_fim' => now()->addDays(30),
        ]);

        expect($this->provider->buscar($this->usuario->id)->total())->toBe(0);
    });

    test('NÃO retorna PE de unidade sem atribuição direta do usuário', function () {
        $outraUnidade = Unidade::factory()->create();
        peVigente($outraUnidade->id);

        expect($this->provider->buscar($this->usuario->id)->total())->toBe(0);
    });

    test('NÃO inclui subordinadas — apenas unidade de atribuição direta', function () {
        $filha = Unidade::factory()->create(['unidade_pai_id' => $this->unidade->id]);
        peVigente($filha->id);

        expect($this->provider->buscar($this->usuario->id)->total())->toBe(0);
    });

    test('retorna vazio quando usuário não possui nenhuma atribuição', function () {
        $semAtribuicao = Usuario::factory()->create();

        expect($this->provider->buscar($semAtribuicao->id)->total())->toBe(0);
    });

    test('considera atribuição GESTOR como direta', function () {
        $gestorUnidade = Unidade::factory()->create();
        $gestor = Usuario::factory()->create();
        UnidadeIntegranteAtribuicao::factory()->gestor()
            ->paraUsuarioUnidade($gestor->id, $gestorUnidade->id)->create();

        $pe = peVigente($gestorUnidade->id);

        $page = $this->provider->buscar($gestor->id);

        expect($page->total())->toBe(1);
        expect($page->items()[0]->id)->toBe($pe->id);
    });
});
