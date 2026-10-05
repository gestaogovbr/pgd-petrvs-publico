<?php

use App\Enums\PerfilEnum;
use App\Exceptions\ValidateException;
use App\Models\Perfil;
use App\Models\Usuario;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\Home\Validators\HomeAuthorizationValidator;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function mockUsuarioComNivel(?int $nivel): Usuario
{
    $perfil = Mockery::mock(Perfil::class)->makePartial();
    $perfil->nivel = $nivel;

    /** @var Usuario $usuario */
    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->setRelation('perfil', $perfil);

    return $usuario;
}

function dtoSubordinadas(bool $subordinadas): HomeRequestDTO
{
    return new HomeRequestDTO(
        unidadeId: 'unidade-1',
        subordinadas: $subordinadas,
        usuarioId: 'user-1',
    );
}

describe('HomeAuthorizationValidator::validar', function () {

    test('não valida nada quando subordinadas é false', function () {
        $validator = new HomeAuthorizationValidator();

        $validator->validar(dtoSubordinadas(false));

        expect(true)->toBeTrue();
    });

    test('lança ValidateException para perfil Participante', function () {
        Auth::shouldReceive('user')->andReturn(mockUsuarioComNivel(PerfilEnum::PARTICIPANTE->value));

        $validator = new HomeAuthorizationValidator();

        expect(fn () => $validator->validar(dtoSubordinadas(true)))
            ->toThrow(ValidateException::class);
    });

    test('lança ValidateException para perfil Consulta', function () {
        Auth::shouldReceive('user')->andReturn(mockUsuarioComNivel(PerfilEnum::CONSULTA->value));

        $validator = new HomeAuthorizationValidator();

        expect(fn () => $validator->validar(dtoSubordinadas(true)))
            ->toThrow(ValidateException::class);
    });

    test('autoriza demais perfis a agregar subordinadas (RN13) — bug raimundo/COOR-PI', function () {
        Auth::shouldReceive('user')->andReturn(mockUsuarioComNivel(PerfilEnum::UNIDADE->value));

        $validator = new HomeAuthorizationValidator();

        $validator->validar(dtoSubordinadas(true));

        expect(true)->toBeTrue();
    });
});
