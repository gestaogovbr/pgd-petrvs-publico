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
            ->and($dto->todos)->toBeFalse();
    });

    test('extrai todos os campos corretamente', function () {
        $dto = UnidadeBuscaDTO::fromArray([
            'nome_codigo' => 'Financeiro',
            'todos' => true,
        ]);

        expect($dto->termo)->toBe('Financeiro')
            ->and($dto->todos)->toBeTrue();
    });

    test('converte todos para boolean', function () {
        $dto = UnidadeBuscaDTO::fromArray([
            'todos' => 0,
        ]);

        expect($dto->todos)->toBeFalse();
    });

    test('termo null quando não informado', function () {
        $dto = UnidadeBuscaDTO::fromArray(['todos' => true]);

        expect($dto->termo)->toBeNull();
    });

    test('toArray retorna array com todos os campos', function () {
        $dto = UnidadeBuscaDTO::fromArray([
            'nome_codigo' => 'Coord',
            'todos' => true,
        ]);

        expect($dto->toArray())->toBe([
            'nome_codigo' => 'Coord',
            'todos' => true,
        ]);
    });
});
