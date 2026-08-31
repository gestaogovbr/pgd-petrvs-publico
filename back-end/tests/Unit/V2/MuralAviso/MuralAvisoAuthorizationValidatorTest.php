<?php

namespace Tests\Unit\V2\MuralAviso;

use App\Enums\MuralAvisoDestinatario;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\MuralAviso;
use App\Repository\MuralAviso\MuralAvisoRepository;
use App\V2\MuralAviso\Validators\MuralAvisoAuthorizationValidator;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarAuthValidator(?MuralAvisoRepository $repo = null): MuralAvisoAuthorizationValidator
{
    return new MuralAvisoAuthorizationValidator(
        $repo ?? Mockery::mock(MuralAvisoRepository::class),
    );
}

describe('MuralAvisoAuthorizationValidator::validar', function () {

    test('lança NotFoundException quando aviso não existe', function () {
        $repo = Mockery::mock(MuralAvisoRepository::class);
        $repo->shouldReceive('findById')->with('aviso-1')->andReturn(null);

        $validator = criarAuthValidator($repo);

        $validator->validar('aviso-1', 2, ['tenant-1']);
    })->throws(NotFoundException::class, 'Aviso não encontrado.');

    test('permite órgão central acessar qualquer aviso', function () {
        $aviso = Mockery::mock(MuralAviso::class)->makePartial();
        $aviso->id = 'aviso-1';
        $aviso->destinatario = MuralAvisoDestinatario::TODOS->value;

        $repo = Mockery::mock(MuralAvisoRepository::class);
        $repo->shouldReceive('findById')->with('aviso-1')->andReturn($aviso);

        $validator = criarAuthValidator($repo);

        $result = $validator->validar('aviso-1', 1, []);

        expect($result->id)->toBe('aviso-1');
    });

    test('permite usuário acessar aviso do seu tenant', function () {
        $aviso = Mockery::mock(MuralAviso::class)->makePartial();
        $aviso->id = 'aviso-1';
        $aviso->destinatario = 'TENANT_ESPECIFICO';
        $aviso->tenant_id = 'tenant-1';

        $repo = Mockery::mock(MuralAvisoRepository::class);
        $repo->shouldReceive('findById')->with('aviso-1')->andReturn($aviso);

        $validator = criarAuthValidator($repo);

        $result = $validator->validar('aviso-1', 2, ['tenant-1']);

        expect($result->id)->toBe('aviso-1');
    });

    test('rejeita usuário não-central ao tentar alterar aviso TODOS', function () {
        $aviso = Mockery::mock(MuralAviso::class)->makePartial();
        $aviso->id = 'aviso-1';
        $aviso->destinatario = MuralAvisoDestinatario::TODOS->value;
        $aviso->tenant_id = null;

        $repo = Mockery::mock(MuralAvisoRepository::class);
        $repo->shouldReceive('findById')->with('aviso-1')->andReturn($aviso);

        $validator = criarAuthValidator($repo);

        $validator->validar('aviso-1', 2, ['tenant-1']);
    })->throws(ForbiddenException::class, 'Você não tem permissão para alterar este aviso.');

    test('rejeita usuário ao tentar alterar aviso de outro tenant', function () {
        $aviso = Mockery::mock(MuralAviso::class)->makePartial();
        $aviso->id = 'aviso-1';
        $aviso->destinatario = 'TENANT_ESPECIFICO';
        $aviso->tenant_id = 'tenant-2';

        $repo = Mockery::mock(MuralAvisoRepository::class);
        $repo->shouldReceive('findById')->with('aviso-1')->andReturn($aviso);

        $validator = criarAuthValidator($repo);

        $validator->validar('aviso-1', 2, ['tenant-1']);
    })->throws(ForbiddenException::class, 'Você não tem permissão para alterar este aviso.');
});
