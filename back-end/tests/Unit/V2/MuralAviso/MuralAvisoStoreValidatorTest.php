<?php

namespace Tests\Unit\V2\MuralAviso;

use App\Enums\MuralAvisoDestinatario;
use App\Exceptions\ValidateException;
use App\Repository\MuralAviso\MuralAvisoRepository;
use App\V2\MuralAviso\DTOs\MuralAvisoStoreDTO;
use App\V2\MuralAviso\Validators\MuralAvisoStoreValidator;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

/**
 * Cria o validator com um repositório que, por padrão, reporta contagem abaixo
 * do limite mensal (0), isolando as demais regras de negócio.
 */
function criarStoreValidator(?MuralAvisoRepository $repository = null): MuralAvisoStoreValidator
{
    if ($repository === null) {
        $repository = Mockery::mock(MuralAvisoRepository::class);
        $repository->shouldReceive('countByEmissorNoMes')->andReturn(0);
    }

    return new MuralAvisoStoreValidator($repository);
}

function criarDTO(string $destinatario, ?string $tenantId, int $nivelUsuario, array $tenantIds): MuralAvisoStoreDTO
{
    return MuralAvisoStoreDTO::fromArray(
        ['titulo' => 'Teste', 'conteudo' => 'Conteúdo', 'destinatario' => $destinatario, 'tenant_id' => $tenantId, 'data_publicacao' => '2026-08-20', 'data_expiracao' => '2026-09-20'],
        'user-1',
        $nivelUsuario,
        $tenantIds,
    );
}

describe('MuralAvisoStoreValidator::validar', function () {

    test('permite órgão central publicar para TODOS', function () {
        $validator = criarStoreValidator();
        $dto = criarDTO(MuralAvisoDestinatario::TODOS->value, null, 1, []);

        $validator->validar($dto);

        expect(true)->toBeTrue();
    });

    test('rejeita usuário não-central publicar para TODOS', function () {
        $validator = criarStoreValidator();
        $dto = criarDTO(MuralAvisoDestinatario::TODOS->value, null, 2, ['tenant-1']);

        $validator->validar($dto);
    })->throws(ValidateException::class, 'Apenas o Órgão Central pode publicar avisos para todos os tenants.');

    test('permite órgão central publicar para TENANT_ESPECIFICO', function () {
        $validator = criarStoreValidator();
        $dto = criarDTO(MuralAvisoDestinatario::TENANT_ESPECIFICO->value, 'tenant-1', 1, []);

        $validator->validar($dto);

        expect(true)->toBeTrue();
    });

    test('permite usuário publicar para tenant ao qual está vinculado', function () {
        $validator = criarStoreValidator();
        $dto = criarDTO(MuralAvisoDestinatario::TENANT_ESPECIFICO->value, 'tenant-1', 2, ['tenant-1', 'tenant-2']);

        $validator->validar($dto);

        expect(true)->toBeTrue();
    });

    test('rejeita TENANT_ESPECIFICO sem tenant_id informado', function () {
        $validator = criarStoreValidator();
        $dto = criarDTO(MuralAvisoDestinatario::TENANT_ESPECIFICO->value, null, 2, ['tenant-1']);

        $validator->validar($dto);
    })->throws(ValidateException::class, 'É necessário informar o tenant destinatário.');

    test('rejeita TENANT_ESPECIFICO com tenant_id vazio', function () {
        $validator = criarStoreValidator();
        $dto = criarDTO(MuralAvisoDestinatario::TENANT_ESPECIFICO->value, '', 2, ['tenant-1']);

        $validator->validar($dto);
    })->throws(ValidateException::class, 'É necessário informar o tenant destinatário.');

    test('rejeita publicação para tenant ao qual não está vinculado', function () {
        $validator = criarStoreValidator();
        $dto = criarDTO(MuralAvisoDestinatario::TENANT_ESPECIFICO->value, 'tenant-3', 2, ['tenant-1', 'tenant-2']);

        $validator->validar($dto);
    })->throws(ValidateException::class, 'Você só pode publicar avisos para tenants aos quais está vinculado.');
});

describe('MuralAvisoStoreValidator::validar limite mensal', function () {

    test('permite publicar quando emissor está abaixo do limite', function () {
        $repository = Mockery::mock(MuralAvisoRepository::class);
        $repository->shouldReceive('countByEmissorNoMes')
            ->once()
            ->with('ORGAO_CENTRAL', null, 2026, 8, null)
            ->andReturn(2);

        $validator = criarStoreValidator($repository);
        $dto = criarDTO(MuralAvisoDestinatario::TODOS->value, null, 1, []);

        $validator->validar($dto);

        expect(true)->toBeTrue();
    });

    test('rejeita publicação quando emissor atingiu o limite mensal', function () {
        $repository = Mockery::mock(MuralAvisoRepository::class);
        $repository->shouldReceive('countByEmissorNoMes')
            ->once()
            ->with('ORGAO_CENTRAL', null, 2026, 8, null)
            ->andReturn(3);

        $validator = criarStoreValidator($repository);
        $dto = criarDTO(MuralAvisoDestinatario::TODOS->value, null, 1, []);

        $validator->validar($dto);
    })->throws(ValidateException::class, 'Limite de 3 avisos por mês atingido para este emissor.');

    test('conta por emissor TENANT usando remetente_tenant_id', function () {
        $repository = Mockery::mock(MuralAvisoRepository::class);
        $repository->shouldReceive('countByEmissorNoMes')
            ->once()
            ->with('TENANT', 'tenant-1', 2026, 8, null)
            ->andReturn(0);

        $validator = criarStoreValidator($repository);
        $dto = criarDTO(MuralAvisoDestinatario::TENANT_ESPECIFICO->value, 'tenant-1', 2, ['tenant-1']);

        $validator->validar($dto);

        expect(true)->toBeTrue();
    });

    test('desconsidera o próprio aviso na contagem ao editar', function () {
        $repository = Mockery::mock(MuralAvisoRepository::class);
        $repository->shouldReceive('countByEmissorNoMes')
            ->once()
            ->with('ORGAO_CENTRAL', null, 2026, 8, 'aviso-1')
            ->andReturn(2);

        $validator = criarStoreValidator($repository);
        $dto = criarDTO(MuralAvisoDestinatario::TODOS->value, null, 1, []);

        $validator->validar($dto, 'aviso-1');

        expect(true)->toBeTrue();
    });
});
