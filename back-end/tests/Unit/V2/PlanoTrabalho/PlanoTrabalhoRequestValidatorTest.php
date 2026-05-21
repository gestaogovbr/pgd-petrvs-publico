<?php

use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoRequestValidator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

uses(TestCase::class);

function makeRequest(array $data = [], string $method = 'POST'): Request
{
    $request = Request::create('/', $method, $data);
    $request->setRouteResolver(fn () => new \Illuminate\Routing\Route($method, '/', []));
    return $request;
}

describe('PlanoTrabalhoRequestValidator::index', function () {

    test('aceita request vazio (todos campos opcionais)', function () {
        $result = PlanoTrabalhoRequestValidator::index(makeRequest([], 'GET'));
        expect($result)->toBeArray();
    });

    test('aceita filtros válidos', function () {
        $result = PlanoTrabalhoRequestValidator::index(makeRequest([
            'size' => 10,
            'page' => 1,
            'filters' => [
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-12-31',
                'vigentes' => true,
                'arquivados' => false,
                'usuario_id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                'unidade_id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                'incluir_subordinadas' => true,
                'numero' => 42,
                'modalidade_pgd' => 'presencial',
                'status' => 'ATIVO',
                'hierarquia' => false,
                'usuario_nome' => 'João',
                'unidade_regramento' => 'Regra X',
            ],
            'order_by' => 'numero',
            'order_dir' => 'asc',
        ], 'GET'));

        expect($result['size'])->toBe(10);
        expect($result['filters']['vigentes'])->toBeTrue();
        expect($result['order_by'])->toBe('numero');
    });

    test('rejeita size não inteiro', function () {
        PlanoTrabalhoRequestValidator::index(makeRequest(['size' => 'abc'], 'GET'));
    })->throws(ValidationException::class);

    test('rejeita size menor que 1', function () {
        PlanoTrabalhoRequestValidator::index(makeRequest(['size' => 0], 'GET'));
    })->throws(ValidationException::class);

    test('rejeita order_by fora do enum', function () {
        PlanoTrabalhoRequestValidator::index(makeRequest(['order_by' => 'campo_invalido'], 'GET'));
    })->throws(ValidationException::class);

    test('rejeita order_dir fora do enum', function () {
        PlanoTrabalhoRequestValidator::index(makeRequest(['order_dir' => 'up'], 'GET'));
    })->throws(ValidationException::class);

    test('rejeita usuario_id não uuid', function () {
        PlanoTrabalhoRequestValidator::index(makeRequest([
            'filters' => ['usuario_id' => 'nao-uuid'],
        ], 'GET'));
    })->throws(ValidationException::class);

    test('rejeita data_inicio com formato inválido', function () {
        PlanoTrabalhoRequestValidator::index(makeRequest([
            'filters' => ['data_inicio' => 'nao-data'],
        ], 'GET'));
    })->throws(ValidationException::class);
});

describe('PlanoTrabalhoRequestValidator::store', function () {

    $validPayload = [
        'usuario_id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        'unidade_id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        'programa_id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        'data_inicio' => '2024-01-01',
        'data_fim' => '2024-06-30',
        'modalidade_pgd' => 'presencial',
    ];

    test('aceita payload válido completo', function () use ($validPayload) {
        $result = PlanoTrabalhoRequestValidator::store(makeRequest($validPayload));
        expect($result['usuario_id'])->toBe($validPayload['usuario_id']);
    });

    test('aceita campos opcionais de justificativa', function () use ($validPayload) {
        $result = PlanoTrabalhoRequestValidator::store(makeRequest(array_merge($validPayload, [
            'justificativa' => 'Motivo X',
            'justificativa_modalidade' => 'Motivo Y',
        ])));
        expect($result['justificativa'])->toBe('Motivo X');
    });

    test('rejeita sem usuario_id', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::store(makeRequest(
            array_diff_key($validPayload, ['usuario_id' => ''])
        ));
    })->throws(ValidationException::class);

    test('rejeita sem unidade_id', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::store(makeRequest(
            array_diff_key($validPayload, ['unidade_id' => ''])
        ));
    })->throws(ValidationException::class);

    test('rejeita sem programa_id', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::store(makeRequest(
            array_diff_key($validPayload, ['programa_id' => ''])
        ));
    })->throws(ValidationException::class);

    test('rejeita sem data_inicio', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::store(makeRequest(
            array_diff_key($validPayload, ['data_inicio' => ''])
        ));
    })->throws(ValidationException::class);

    test('rejeita sem data_fim', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::store(makeRequest(
            array_diff_key($validPayload, ['data_fim' => ''])
        ));
    })->throws(ValidationException::class);

    test('rejeita sem modalidade_pgd', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::store(makeRequest(
            array_diff_key($validPayload, ['modalidade_pgd' => ''])
        ));
    })->throws(ValidationException::class);

    test('rejeita modalidade_pgd inválida', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::store(makeRequest(array_merge($validPayload, [
            'modalidade_pgd' => 'inexistente',
        ])));
    })->throws(ValidationException::class);

    test('rejeita data_fim anterior a data_inicio', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::store(makeRequest(array_merge($validPayload, [
            'data_inicio' => '2024-06-30',
            'data_fim' => '2024-01-01',
        ])));
    })->throws(ValidationException::class);

    test('rejeita usuario_id não uuid', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::store(makeRequest(array_merge($validPayload, [
            'usuario_id' => 'nao-uuid',
        ])));
    })->throws(ValidationException::class);

    test('rejeita justificativa acima de 500 caracteres', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::store(makeRequest(array_merge($validPayload, [
            'justificativa' => str_repeat('a', 501),
        ])));
    })->throws(ValidationException::class);

    test('rejeita justificativa_modalidade acima de 500 caracteres', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::store(makeRequest(array_merge($validPayload, [
            'justificativa_modalidade' => str_repeat('a', 501),
        ])));
    })->throws(ValidationException::class);
});

describe('PlanoTrabalhoRequestValidator::update', function () {

    $validPayload = [
        'usuario_id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        'unidade_id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        'programa_id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        'data_inicio' => '2024-01-01',
        'data_fim' => '2024-06-30',
        'modalidade_pgd' => 'presencial',
    ];

    test('aceita payload válido', function () use ($validPayload) {
        $result = PlanoTrabalhoRequestValidator::update(makeRequest(array_merge($validPayload), 'PUT'));
        expect($result['usuario_id'])->toBe($validPayload['usuario_id']);
    });

    test('rejeita sem campos obrigatórios', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::update(makeRequest([], 'PUT'));
    })->throws(ValidationException::class);

    test('rejeita data_fim anterior a data_inicio', function () use ($validPayload) {
        PlanoTrabalhoRequestValidator::update(makeRequest(array_merge($validPayload, [
            'data_inicio' => '2024-06-30',
            'data_fim' => '2024-01-01',
        ]), 'PUT'));
    })->throws(ValidationException::class);
});

describe('PlanoTrabalhoRequestValidator::cancelar', function () {

    test('aceita justificativa válida', function () {
        $result = PlanoTrabalhoRequestValidator::cancelar(makeRequest([
            'justificativa' => 'Motivo do cancelamento',
        ]));
        expect($result['justificativa'])->toBe('Motivo do cancelamento');
    });

    test('rejeita sem justificativa', function () {
        PlanoTrabalhoRequestValidator::cancelar(makeRequest([]));
    })->throws(ValidationException::class);

    test('rejeita justificativa acima de 500 caracteres', function () {
        PlanoTrabalhoRequestValidator::cancelar(makeRequest([
            'justificativa' => str_repeat('a', 501),
        ]));
    })->throws(ValidationException::class);
});

describe('PlanoTrabalhoRequestValidator::encerrar', function () {

    test('aceita justificativa válida', function () {
        $result = PlanoTrabalhoRequestValidator::encerrar(makeRequest([
            'justificativa' => 'Motivo do encerramento',
        ]));
        expect($result['justificativa'])->toBe('Motivo do encerramento');
    });

    test('rejeita sem justificativa', function () {
        PlanoTrabalhoRequestValidator::encerrar(makeRequest([]));
    })->throws(ValidationException::class);

    test('rejeita justificativa acima de 500 caracteres', function () {
        PlanoTrabalhoRequestValidator::encerrar(makeRequest([
            'justificativa' => str_repeat('a', 501),
        ]));
    })->throws(ValidationException::class);
});
