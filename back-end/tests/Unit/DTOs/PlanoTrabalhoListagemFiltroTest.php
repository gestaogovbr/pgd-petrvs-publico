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
});
