<?php

use App\V2\Unidade\DTOs\UnidadeBuscaDTO;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('UnidadeBuscaDTO', function () {

    test('cria com valores padrão quando array vazio', function () {
        $dto = UnidadeBuscaDTO::fromArray([]);

        expect($dto->termo)->toBeNull()
            ->and($dto->hierarquia)->toBeTrue()
            ->and($dto->todos)->toBeFalse();
    });

    test('extrai todos os campos corretamente', function () {
        $dto = UnidadeBuscaDTO::fromArray([
            'termo' => 'Financeiro',
            'hierarquia' => false,
            'todos' => true,
        ]);

        expect($dto->termo)->toBe('Financeiro')
            ->and($dto->hierarquia)->toBeFalse()
            ->and($dto->todos)->toBeTrue();
    });

    test('converte hierarquia e todos para boolean', function () {
        $dto = UnidadeBuscaDTO::fromArray([
            'hierarquia' => 1,
            'todos' => 0,
        ]);

        expect($dto->hierarquia)->toBeTrue()
            ->and($dto->todos)->toBeFalse();
    });

    test('termo null quando não informado', function () {
        $dto = UnidadeBuscaDTO::fromArray(['hierarquia' => true]);

        expect($dto->termo)->toBeNull();
    });

    test('toArray retorna array com todos os campos', function () {
        $dto = UnidadeBuscaDTO::fromArray([
            'termo' => 'Coord',
            'hierarquia' => false,
            'todos' => true,
        ]);

        expect($dto->toArray())->toBe([
            'termo' => 'Coord',
            'hierarquia' => false,
            'todos' => true,
        ]);
    });
});
