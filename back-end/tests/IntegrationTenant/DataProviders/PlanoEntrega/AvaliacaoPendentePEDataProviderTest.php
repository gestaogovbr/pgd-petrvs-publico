<?php

use App\Enums\StatusEnum;
use App\Models\PlanoEntrega;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\PlanoEntrega\DataProviders\AvaliacaoPendentePEDataProvider;

function pePendenteAvaliacao(string $unidadeId, string $status, ?\DateTimeInterface $createdAt = null): PlanoEntrega
{
    return PlanoEntrega::factory()->create([
        'unidade_id' => $unidadeId,
        'status' => $status,
        'created_at' => $createdAt ?? now(),
    ]);
}

beforeEach(function () {
    $this->provider = app(AvaliacaoPendentePEDataProvider::class);

    $this->unidadeGerenciada = Unidade::factory()->create();
    $this->filha = Unidade::factory()->create(['unidade_pai_id' => $this->unidadeGerenciada->id]);

    $this->chefe = Usuario::factory()->create();
    UnidadeIntegranteAtribuicao::factory()->gestor()
        ->paraUsuarioUnidade($this->chefe->id, $this->unidadeGerenciada->id)->create();

    $this->depoisDaRegra = \Illuminate\Support\Carbon::parse(PlanoEntrega::DATA_MUDANCA_REGRA_PE)->addDay();
    $this->antesDaRegra = \Illuminate\Support\Carbon::parse(PlanoEntrega::DATA_MUDANCA_REGRA_PE)->subDay();
});

describe('AvaliacaoPendentePEDataProvider', function () {

    test('count e buscar são consistentes para PE CONCLUIDO em unidade filha (após a regra)', function () {
        pePendenteAvaliacao($this->filha->id, StatusEnum::CONCLUIDO->value, $this->depoisDaRegra);

        expect($this->provider->count($this->chefe->id))->toBe(1);
        expect($this->provider->buscar($this->chefe->id)->total())->toBe(1);
    });

    test('NÃO conta PE CONCLUIDO criado antes da mudança de regra', function () {
        pePendenteAvaliacao($this->filha->id, StatusEnum::CONCLUIDO->value, $this->antesDaRegra);

        expect($this->provider->count($this->chefe->id))->toBe(0);
    });

    test('NÃO conta PE da própria unidade gerenciada (compete à chefia do pai)', function () {
        pePendenteAvaliacao($this->unidadeGerenciada->id, StatusEnum::CONCLUIDO->value, $this->depoisDaRegra);

        expect($this->provider->count($this->chefe->id))->toBe(0);
    });

    test('NÃO conta PE que não está CONCLUIDO', function () {
        pePendenteAvaliacao($this->filha->id, StatusEnum::ATIVO->value, $this->depoisDaRegra);

        expect($this->provider->count($this->chefe->id))->toBe(0);
    });

    test('buscar retorna o PE correto', function () {
        $pe = pePendenteAvaliacao($this->filha->id, StatusEnum::CONCLUIDO->value, $this->depoisDaRegra);

        $page = $this->provider->buscar($this->chefe->id, 1, 15);

        expect($page->total())->toBe(1);
        expect($page->items()[0]->id)->toBe($pe->id);
    });
});
