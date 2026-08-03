<?php

namespace Tests\Unit\V2\MuralAviso;

use App\Exceptions\ValidateException;
use App\V2\MuralAviso\Validators\MuralAvisoStoreValidator;
use Tests\TestCase;

uses(TestCase::class);

function criarStoreValidator(): MuralAvisoStoreValidator
{
    return new MuralAvisoStoreValidator();
}

describe('MuralAvisoStoreValidator::validar', function () {

    test('permite órgão central publicar para TODOS', function () {
        $validator = criarStoreValidator();

        $validator->validar('TODOS', null, 1, []);

        expect(true)->toBeTrue();
    });

    test('rejeita usuário não-central publicar para TODOS', function () {
        $validator = criarStoreValidator();

        $validator->validar('TODOS', null, 2, ['tenant-1']);
    })->throws(ValidateException::class, 'Apenas o Órgão Central pode publicar avisos para todos os tenants.');

    test('permite órgão central publicar para TENANT_ESPECIFICO', function () {
        $validator = criarStoreValidator();

        $validator->validar('TENANT_ESPECIFICO', 'tenant-1', 1, []);

        expect(true)->toBeTrue();
    });

    test('permite usuário publicar para tenant ao qual está vinculado', function () {
        $validator = criarStoreValidator();

        $validator->validar('TENANT_ESPECIFICO', 'tenant-1', 2, ['tenant-1', 'tenant-2']);

        expect(true)->toBeTrue();
    });

    test('rejeita TENANT_ESPECIFICO sem tenant_id informado', function () {
        $validator = criarStoreValidator();

        $validator->validar('TENANT_ESPECIFICO', null, 2, ['tenant-1']);
    })->throws(ValidateException::class, 'É necessário informar o tenant destinatário.');

    test('rejeita TENANT_ESPECIFICO com tenant_id vazio', function () {
        $validator = criarStoreValidator();

        $validator->validar('TENANT_ESPECIFICO', '', 2, ['tenant-1']);
    })->throws(ValidateException::class, 'É necessário informar o tenant destinatário.');

    test('rejeita publicação para tenant ao qual não está vinculado', function () {
        $validator = criarStoreValidator();

        $validator->validar('TENANT_ESPECIFICO', 'tenant-3', 2, ['tenant-1', 'tenant-2']);
    })->throws(ValidateException::class, 'Você só pode publicar avisos para tenants aos quais está vinculado.');
});
