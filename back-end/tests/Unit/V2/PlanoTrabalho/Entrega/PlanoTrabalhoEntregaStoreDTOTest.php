<?php

use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;
use Tests\TestCase;

uses(TestCase::class);

describe('PlanoTrabalhoEntregaStoreDTO', function () {

    test('extrai todos os campos corretamente', function () {
        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'plano_entrega_entrega_id' => 'pee-1',
            'forca_trabalho' => 50.5,
            'descricao' => 'Descrição da entrega',
        ], 'plano-1');

        expect($dto->planoTrabalhoId)->toBe('plano-1');
        expect($dto->planoEntregaEntregaId)->toBe('pee-1');
        expect($dto->forcaTrabalho)->toBe(50.5);
        expect($dto->descricao)->toBe('Descrição da entrega');
    });

    test('campos opcionais usam valores padrão quando ausentes', function () {
        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'plano_entrega_entrega_id' => 'pee-1',
        ], 'plano-1');

        expect($dto->forcaTrabalho)->toBe(0.0);
        expect($dto->descricao)->toBe('');
    });

    test('toArray retorna array compatível com o model', function () {
        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'plano_entrega_entrega_id' => 'pee-1',
            'forca_trabalho' => 30,
            'descricao' => 'Teste',
        ], 'plano-1');

        expect($dto->toArray())->toBe([
            'plano_trabalho_id' => 'plano-1',
            'plano_entrega_entrega_id' => 'pee-1',
            'orgao' => null,
            'forca_trabalho' => 30.0,
            'descricao' => 'Teste',
        ]);
    });
});
