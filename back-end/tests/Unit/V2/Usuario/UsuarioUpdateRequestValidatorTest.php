<?php

use App\V2\Usuario\Validators\UsuarioRequestValidator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

uses(TestCase::class);

function makeReq(array $data = [], string $method = 'PATCH'): Request
{
    $request = Request::create('/api/v2/usuario/uuid/action', $method, $data);
    $request->setRouteResolver(fn () => new \Illuminate\Routing\Route($method, '/', []));
    return $request;
}

describe('UsuarioRequestValidator::dadosPessoais', function () {
    test('aceita telefone válido', function () {
        $result = UsuarioRequestValidator::dadosPessoais(makeReq(['telefone' => '61999990000']));
        expect($result['telefone'])->toBe('61999990000');
    });

    test('aceita telefone null', function () {
        $result = UsuarioRequestValidator::dadosPessoais(makeReq(['telefone' => null]));
        expect($result['telefone'])->toBeNull();
    });

    test('rejeita telefone > 50 chars', function () {
        UsuarioRequestValidator::dadosPessoais(makeReq(['telefone' => str_repeat('9', 51)]));
    })->throws(ValidationException::class);
});

describe('UsuarioRequestValidator::perfil', function () {
    test('aceita uuid válido', function () {
        $result = UsuarioRequestValidator::perfil(makeReq(['perfil_id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890']));
        expect($result['perfil_id'])->toBe('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    });

    test('rejeita perfil_id não-uuid', function () {
        UsuarioRequestValidator::perfil(makeReq(['perfil_id' => 'invalido']));
    })->throws(ValidationException::class);

    test('rejeita perfil_id ausente', function () {
        UsuarioRequestValidator::perfil(makeReq([]));
    })->throws(ValidationException::class);
});

describe('UsuarioRequestValidator::atribuicoes', function () {
    test('aceita atribuicoes válidas', function () {
        $result = UsuarioRequestValidator::atribuicoes(makeReq([
            'atribuicoes' => [[
                'unidade_id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                'atribuicoes' => ['LOTADO'],
            ]],
        ]));
        expect($result['atribuicoes'])->toHaveCount(1);
    });

    test('rejeita atribuicoes vazio', function () {
        UsuarioRequestValidator::atribuicoes(makeReq(['atribuicoes' => []]));
    })->throws(ValidationException::class);

    test('rejeita atribuicoes ausente', function () {
        UsuarioRequestValidator::atribuicoes(makeReq([]));
    })->throws(ValidationException::class);

    test('rejeita unidade_id não-uuid', function () {
        UsuarioRequestValidator::atribuicoes(makeReq([
            'atribuicoes' => [['unidade_id' => 'x', 'atribuicoes' => ['LOTADO']]],
        ]));
    })->throws(ValidationException::class);
});

describe('UsuarioRequestValidator::textoComplementar', function () {
    test('aceita texto válido', function () {
        $result = UsuarioRequestValidator::textoComplementar(makeReq(['texto_complementar_plano' => '<p>TCR</p>']));
        expect($result['texto_complementar_plano'])->toBe('<p>TCR</p>');
    });

    test('aceita texto null', function () {
        $result = UsuarioRequestValidator::textoComplementar(makeReq(['texto_complementar_plano' => null]));
        expect($result['texto_complementar_plano'])->toBeNull();
    });
});
