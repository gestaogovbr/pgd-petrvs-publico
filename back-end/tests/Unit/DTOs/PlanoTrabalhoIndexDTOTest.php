<?php

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\Exceptions\ValidateException;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoIndexDTO', function () {

    test('cria filtro com valores padrão quando array vazio e vigentes=true', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['vigentes' => true]);

        expect($filtro->dataInicio)->toBeNull()
            ->and($filtro->dataFim)->toBeNull()
            ->and($filtro->vigentes)->toBeTrue()
            ->and($filtro->arquivados)->toBeFalse()
            ->and($filtro->usuarioId)->toBeNull()
            ->and($filtro->unidadesId)->toBeNull()
            ->and($filtro->page)->toBe(1)
            ->and($filtro->perPage)->toBe(15);
    });

    test('extrai todos os campos corretamente', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'vigentes' => true,
            'arquivados' => false,
            'usuario_id' => 'user-123',
            'unidade_id' => ['unidade-1', 'unidade-2'],
            'page' => 3,
            'size' => 25,
        ]);

        expect($filtro->dataInicio)->toBe('2024-01-01')
            ->and($filtro->dataFim)->toBe('2024-12-31')
            ->and($filtro->vigentes)->toBeTrue()
            ->and($filtro->arquivados)->toBeFalse()
            ->and($filtro->usuarioId)->toBe('user-123')
            ->and($filtro->unidadesId)->toBe(['unidade-1', 'unidade-2'])
            ->and($filtro->page)->toBe(3)
            ->and($filtro->perPage)->toBe(25);
    });

    test('aceita filtro apenas com data_inicio', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['data_inicio' => '2024-01-01']);

        expect($filtro->dataInicio)->toBe('2024-01-01')
            ->and($filtro->dataFim)->toBeNull();
    });

    test('aceita filtro apenas com data_fim', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['data_fim' => '2024-12-31']);

        expect($filtro->dataFim)->toBe('2024-12-31')
            ->and($filtro->dataInicio)->toBeNull();
    });

    test('lança exceção quando nenhum filtro é informado', function () {
        PlanoTrabalhoIndexDTO::fromArray([]);
    })->throws(ValidateException::class, 'Informe ao menos um filtro para a busca.');

    test('aceita filtro apenas com usuario_id', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['usuario_id' => 'user-1']);

        expect($filtro->usuarioId)->toBe('user-1')
            ->and($filtro->vigentes)->toBeFalse();
    });

    test('aceita filtro apenas com datas preenchidas', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-06-30',
        ]);

        expect($filtro->dataInicio)->toBe('2024-01-01')
            ->and($filtro->dataFim)->toBe('2024-06-30');
    });

    test('converte page e size para inteiro', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'page' => '5',
            'size' => '30',
        ]);

        expect($filtro->page)->toBe(5)
            ->and($filtro->perPage)->toBe(30);
    });

    test('extrai filtro numero corretamente', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'numero' => 42,
        ]);

        expect($filtro->numero)->toBe(42);
    });

    test('numero é null quando não informado', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['vigentes' => true]);

        expect($filtro->numero)->toBeNull();
    });

    test('extrai filtro tipo_modalidade_id corretamente', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'tipo_modalidade_id' => 'modalidade-abc',
        ]);

        expect($filtro->tipoModalidadeId)->toBe('modalidade-abc');
    });

    test('tipo_modalidade_id é null quando não informado', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['vigentes' => true]);

        expect($filtro->tipoModalidadeId)->toBeNull();
    });

    test('extrai filtro status corretamente', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'status' => 'ATIVO',
        ]);

        expect($filtro->status)->toBe('ATIVO');
    });

    test('status é null quando não informado', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['vigentes' => true]);

        expect($filtro->status)->toBeNull();
    });

    test('aceita filtro apenas com numero', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['numero' => 10]);

        expect($filtro->numero)->toBe(10);
    });

    test('aceita filtro apenas com tipo_modalidade_id', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['tipo_modalidade_id' => 'mod-1']);

        expect($filtro->tipoModalidadeId)->toBe('mod-1');
    });

    test('aceita filtro apenas com status', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['status' => 'CONCLUIDO']);

        expect($filtro->status)->toBe('CONCLUIDO');
    });

    test('extrai filtro usuario_nome corretamente', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'usuario_nome' => 'João',
        ]);

        expect($filtro->usuarioNome)->toBe('João');
    });

    test('usuario_nome é null quando não informado', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['vigentes' => true]);

        expect($filtro->usuarioNome)->toBeNull();
    });

    test('extrai filtro unidade_regramento corretamente', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'unidade_regramento' => 'COGEP',
        ]);

        expect($filtro->unidadeRegramento)->toBe('COGEP');
    });

    test('unidade_regramento é null quando não informado', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['vigentes' => true]);

        expect($filtro->unidadeRegramento)->toBeNull();
    });

    test('withUnidadesId preserva usuario_nome e unidade_regramento', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'unidade_id' => 'u-1',
            'usuario_nome' => 'Maria',
            'unidade_regramento' => 'DITIC',
        ]);

        $novo = $filtro->withUnidadesId(['u-1', 'u-2']);

        expect($novo->usuarioNome)->toBe('Maria')
            ->and($novo->unidadeRegramento)->toBe('DITIC')
            ->and($novo->unidadesId)->toBe(['u-1', 'u-2']);
    });

    test('orderBy e orderDir são null quando não informados', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray(['vigentes' => true]);

        expect($filtro->orderBy)->toBeNull()
            ->and($filtro->orderDir)->toBeNull();
    });

    test('extrai orderBy numero e orderDir asc corretamente', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'order_by' => 'numero',
            'order_dir' => 'asc',
        ]);

        expect($filtro->orderBy)->toBe('numero')
            ->and($filtro->orderDir)->toBe('asc');
    });

    test('extrai orderBy usuario_nome e orderDir desc corretamente', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'order_by' => 'usuario_nome',
            'order_dir' => 'desc',
        ]);

        expect($filtro->orderBy)->toBe('usuario_nome')
            ->and($filtro->orderDir)->toBe('desc');
    });

    test('withUnidadesId preserva orderBy e orderDir', function () {
        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'unidade_id' => 'u-1',
            'order_by' => 'numero',
            'order_dir' => 'desc',
        ]);

        $novo = $filtro->withUnidadesId(['u-1', 'u-2']);

        expect($novo->orderBy)->toBe('numero')
            ->and($novo->orderDir)->toBe('desc');
    });
});
