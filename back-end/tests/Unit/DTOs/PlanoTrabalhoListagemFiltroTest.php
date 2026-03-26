<?php

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoListagemFiltro;
use App\Exceptions\ServerException;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoListagemFiltro', function () {

    test('cria filtro com valores padrão quando array vazio e vigentes=true', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray(['vigentes' => true]);

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
        $filtro = PlanoTrabalhoListagemFiltro::fromArray([
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

    test('lança exceção quando apenas data_inicio é informada', function () {
        PlanoTrabalhoListagemFiltro::fromArray(['data_inicio' => '2024-01-01']);
    })->throws(ServerException::class, 'As datas de início e fim devem ser preenchidas juntas.');

    test('lança exceção quando apenas data_fim é informada', function () {
        PlanoTrabalhoListagemFiltro::fromArray(['data_fim' => '2024-12-31']);
    })->throws(ServerException::class, 'As datas de início e fim devem ser preenchidas juntas.');

    test('lança exceção quando nenhum filtro é informado', function () {
        PlanoTrabalhoListagemFiltro::fromArray([]);
    })->throws(ServerException::class, 'Informe ao menos um filtro para a busca.');

    test('aceita filtro apenas com usuario_id', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray(['usuario_id' => 'user-1']);

        expect($filtro->usuarioId)->toBe('user-1')
            ->and($filtro->vigentes)->toBeFalse();
    });

    test('aceita filtro apenas com datas preenchidas', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray([
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-06-30',
        ]);

        expect($filtro->dataInicio)->toBe('2024-01-01')
            ->and($filtro->dataFim)->toBe('2024-06-30');
    });

    test('converte page e size para inteiro', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray([
            'vigentes' => true,
            'page' => '5',
            'size' => '30',
        ]);

        expect($filtro->page)->toBe(5)
            ->and($filtro->perPage)->toBe(30);
    });

    test('extrai filtro numero corretamente', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray([
            'vigentes' => true,
            'numero' => 42,
        ]);

        expect($filtro->numero)->toBe(42);
    });

    test('numero é null quando não informado', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray(['vigentes' => true]);

        expect($filtro->numero)->toBeNull();
    });

    test('extrai filtro tipo_modalidade_id corretamente', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray([
            'vigentes' => true,
            'tipo_modalidade_id' => 'modalidade-abc',
        ]);

        expect($filtro->tipoModalidadeId)->toBe('modalidade-abc');
    });

    test('tipo_modalidade_id é null quando não informado', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray(['vigentes' => true]);

        expect($filtro->tipoModalidadeId)->toBeNull();
    });

    test('extrai filtro status corretamente', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray([
            'vigentes' => true,
            'status' => 'ATIVO',
        ]);

        expect($filtro->status)->toBe('ATIVO');
    });

    test('status é null quando não informado', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray(['vigentes' => true]);

        expect($filtro->status)->toBeNull();
    });

    test('aceita filtro apenas com numero', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray(['numero' => 10]);

        expect($filtro->numero)->toBe(10);
    });

    test('aceita filtro apenas com tipo_modalidade_id', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray(['tipo_modalidade_id' => 'mod-1']);

        expect($filtro->tipoModalidadeId)->toBe('mod-1');
    });

    test('aceita filtro apenas com status', function () {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray(['status' => 'CONCLUIDO']);

        expect($filtro->status)->toBe('CONCLUIDO');
    });
});
