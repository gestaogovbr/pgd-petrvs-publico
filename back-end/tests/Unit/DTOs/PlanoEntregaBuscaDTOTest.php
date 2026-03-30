<?php

use App\V2\PlanoEntrega\DTOs\PlanoEntregaBuscaDTO;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('PlanoEntregaBuscaDTO', function () {

    test('extrai unidade_id corretamente', function () {
        $dto = PlanoEntregaBuscaDTO::fromArray(['unidade_id' => 'unidade-123']);

        expect($dto->unidadeId)->toBe('unidade-123');
    });

    test('toArray retorna array com unidade_id', function () {
        $dto = PlanoEntregaBuscaDTO::fromArray(['unidade_id' => 'unidade-abc']);

        expect($dto->toArray())->toBe([
            'unidade_id' => 'unidade-abc',
        ]);
    });
});
