<?php

use App\Exceptions\ForbiddenException;
use App\Models\Usuario;
use App\V2\PainelGerencial\Validators\PainelAuthorizationValidator;

afterEach(function () {
    Mockery::close();
});

describe('PainelAuthorizationValidator', function () {

    test('permite acesso quando usuário possui capacidade MOD_PAINEL_GER', function () {
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->shouldReceive('hasPermissionTo')
            ->with('MOD_PAINEL_GER')
            ->andReturn(true);

        $validator = new PainelAuthorizationValidator();

        // Não deve lançar exceção
        $validator->validar($usuario);
        expect(true)->toBeTrue();
    });

    test('lança ForbiddenException quando usuário não possui capacidade MOD_PAINEL_GER', function () {
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->shouldReceive('hasPermissionTo')
            ->with('MOD_PAINEL_GER')
            ->andReturn(false);

        $validator = new PainelAuthorizationValidator();

        $validator->validar($usuario);
    })->throws(ForbiddenException::class, 'Usuário não possui acesso aos Painéis Gerenciais.');
});
