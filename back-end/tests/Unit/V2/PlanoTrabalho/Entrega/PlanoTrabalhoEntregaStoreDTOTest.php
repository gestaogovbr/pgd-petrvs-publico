<?php

use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;
use Tests\TestCase;

uses(TestCase::class);

describe('PlanoTrabalhoEntregaStoreDTO', function () {

    test('tipo PLANO_ENTREGA limpa orgao', function () {
        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'PLANO_ENTREGA',
            'plano_entrega_entrega_id' => 'pee-1',
            'orgao' => 'deveria ser ignorado',
            'forca_trabalho' => 50,
            'descricao' => 'Desc',
        ], 'plano-1');

        expect($dto->origem)->toBe('PLANO_ENTREGA');
        expect($dto->planoEntregaEntregaId)->toBe('pee-1');
        expect($dto->orgao)->toBeNull();
    });

    test('tipo OUTRO_ORGAO limpa plano_entrega_entrega_id', function () {
        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'OUTRO_ORGAO',
            'plano_entrega_entrega_id' => 'deveria ser ignorado',
            'orgao' => 'Órgão externo',
        ], 'plano-1');

        expect($dto->origem)->toBe('OUTRO_ORGAO');
        expect($dto->planoEntregaEntregaId)->toBeNull();
        expect($dto->orgao)->toBe('Órgão externo');
    });

    test('tipo SEM_ENTREGA limpa ambos', function () {
        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'SEM_ENTREGA',
        ], 'plano-1');

        expect($dto->planoEntregaEntregaId)->toBeNull();
        expect($dto->orgao)->toBeNull();
    });

    test('campos opcionais usam valores padrão', function () {
        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'SEM_ENTREGA',
        ], 'plano-1');

        expect($dto->forcaTrabalho)->toBe(0.0);
        expect($dto->descricao)->toBe('');
    });

    test('toArray retorna campos para persistência', function () {
        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'PLANO_ENTREGA',
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
