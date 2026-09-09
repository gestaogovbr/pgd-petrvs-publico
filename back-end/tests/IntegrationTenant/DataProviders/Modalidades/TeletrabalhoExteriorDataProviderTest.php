<?php

use App\Models\Usuario;
use App\V2\PainelGerencial\Modalidades\DataProviders\TeletrabalhoExteriorDataProvider;

beforeEach(function () {
    $this->provider = app(TeletrabalhoExteriorDataProvider::class);
});

describe('TeletrabalhoExteriorDataProvider - getDataSubstituicao', function () {

    test('retorna taxa zero quando não há participantes no PGD', function () {
        $resultado = $this->provider->getDataSubstituicao();

        expect($resultado['taxa'])->toBe(0.0);
        expect($resultado['limite'])->toBe(10.0);
        expect($resultado['participantes_modalidade'])->toBe(0);
        expect($resultado['total_participantes'])->toBe(0);
    });

    test('retorna limite legal de 10%', function () {
        Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);

        $resultado = $this->provider->getDataSubstituicao();

        expect($resultado['limite'])->toBe(10.0);
    });

    test('calcula taxa correta para modalidade no exterior substituicao', function () {
        Usuario::factory()->count(9)->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'no exterior substituicao']);

        $resultado = $this->provider->getDataSubstituicao();

        expect($resultado['taxa'])->toBe(10.0);
        expect($resultado['participantes_modalidade'])->toBe(1);
        expect($resultado['total_participantes'])->toBe(10);
    });

    test('exclui usuários com participa_pgd não', function () {
        Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'no exterior substituicao']);
        Usuario::factory()->create(['participa_pgd' => 'não', 'modalidade_pgd' => 'no exterior substituicao']);

        $resultado = $this->provider->getDataSubstituicao();

        expect($resultado['participantes_modalidade'])->toBe(1);
        expect($resultado['total_participantes'])->toBe(1);
        expect($resultado['taxa'])->toBe(100.0);
    });

    test('exclui usuários soft-deleted', function () {
        Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'no exterior substituicao']);
        $deletado = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'no exterior substituicao']);
        $deletado->delete();

        $resultado = $this->provider->getDataSubstituicao();

        expect($resultado['participantes_modalidade'])->toBe(1);
        expect($resultado['total_participantes'])->toBe(1);
    });
});

describe('TeletrabalhoExteriorDataProvider - getDataDiscricionario', function () {

    test('retorna taxa zero quando não há participantes no PGD', function () {
        $resultado = $this->provider->getDataDiscricionario();

        expect($resultado['taxa'])->toBe(0.0);
        expect($resultado['limite'])->toBe(2.0);
        expect($resultado['participantes_modalidade'])->toBe(0);
        expect($resultado['total_participantes'])->toBe(0);
    });

    test('retorna limite legal de 2%', function () {
        Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);

        $resultado = $this->provider->getDataDiscricionario();

        expect($resultado['limite'])->toBe(2.0);
    });

    test('calcula taxa correta para modalidade no exterior', function () {
        Usuario::factory()->count(49)->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);
        Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'no exterior']);

        $resultado = $this->provider->getDataDiscricionario();

        expect($resultado['taxa'])->toBe(2.0);
        expect($resultado['participantes_modalidade'])->toBe(1);
        expect($resultado['total_participantes'])->toBe(50);
    });

    test('não conta modalidade no exterior substituicao como discricionário', function () {
        Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'no exterior substituicao']);
        Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'presencial']);

        $resultado = $this->provider->getDataDiscricionario();

        expect($resultado['participantes_modalidade'])->toBe(0);
        expect($resultado['total_participantes'])->toBe(2);
    });

    test('exclui usuários com participa_pgd não', function () {
        Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'no exterior']);
        Usuario::factory()->create(['participa_pgd' => 'não', 'modalidade_pgd' => 'no exterior']);

        $resultado = $this->provider->getDataDiscricionario();

        expect($resultado['participantes_modalidade'])->toBe(1);
        expect($resultado['total_participantes'])->toBe(1);
    });

    test('exclui usuários soft-deleted', function () {
        Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'no exterior']);
        $deletado = Usuario::factory()->create(['participa_pgd' => 'sim', 'modalidade_pgd' => 'no exterior']);
        $deletado->delete();

        $resultado = $this->provider->getDataDiscricionario();

        expect($resultado['participantes_modalidade'])->toBe(1);
        expect($resultado['total_participantes'])->toBe(1);
    });
});
