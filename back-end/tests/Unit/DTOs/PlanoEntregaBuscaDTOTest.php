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
        expect($dto->dataInicio)->toBeNull();
        expect($dto->dataFim)->toBeNull();
    });

    test('extrai datas quando informadas', function () {
        $dto = PlanoEntregaBuscaDTO::fromArray([
            'unidade_id' => 'unidade-123',
            'data_inicio' => '2024-03-01',
            'data_fim' => '2024-06-30',
        ]);

        expect($dto->unidadeId)->toBe('unidade-123');
        expect($dto->dataInicio)->toBe('2024-03-01');
        expect($dto->dataFim)->toBe('2024-06-30');
    });

    test('toArray retorna array com todos os campos', function () {
        $dto = PlanoEntregaBuscaDTO::fromArray([
            'unidade_id' => 'unidade-abc',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
        ]);

        expect($dto->toArray())->toBe([
            'unidade_id' => 'unidade-abc',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
        ]);
    });
});
