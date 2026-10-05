<?php

use App\Enums\StatusEnum;
use App\Models\PlanoEntrega;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\PlanoEntrega\DataProviders\HomologacaoPendentePEDataProvider;

function pePendenteHomologacao(string $unidadeId, string $status): PlanoEntrega
{
    return PlanoEntrega::factory()->create([
        'unidade_id' => $unidadeId,
        'status' => $status,
    ]);
}

beforeEach(function () {
    $this->provider = app(HomologacaoPendentePEDataProvider::class);

    $this->unidadeGerenciada = Unidade::factory()->create();
    $this->filha = Unidade::factory()->create(['unidade_pai_id' => $this->unidadeGerenciada->id]);

    $this->chefe = Usuario::factory()->create();
    UnidadeIntegranteAtribuicao::factory()->gestor()
        ->paraUsuarioUnidade($this->chefe->id, $this->unidadeGerenciada->id)->create();
});

describe('HomologacaoPendentePEDataProvider', function () {

    test('count e buscar são consistentes para PE HOMOLOGANDO em unidade filha', function () {
        pePendenteHomologacao($this->filha->id, StatusEnum::HOMOLOGANDO->value);

        expect($this->provider->count($this->chefe->id))->toBe(1);
        expect($this->provider->buscar($this->chefe->id)->total())->toBe(1);
    });

    test('NÃO conta PE da própria unidade gerenciada (compete à chefia do pai)', function () {
        pePendenteHomologacao($this->unidadeGerenciada->id, StatusEnum::HOMOLOGANDO->value);

        expect($this->provider->count($this->chefe->id))->toBe(0);
    });

    test('NÃO conta PE que não está HOMOLOGANDO', function () {
        pePendenteHomologacao($this->filha->id, StatusEnum::ATIVO->value);

        expect($this->provider->count($this->chefe->id))->toBe(0);
    });

    test('buscar retorna o PE correto', function () {
        $pe = pePendenteHomologacao($this->filha->id, StatusEnum::HOMOLOGANDO->value);

        $page = $this->provider->buscar($this->chefe->id, 1, 15);

        expect($page->total())->toBe(1);
        expect($page->items()[0]->id)->toBe($pe->id);
    });
});
