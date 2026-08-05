<?php

use App\Models\Usuario;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('Usuario::getNomeExibicaoAttribute', function () {

    test('retorna nome_social quando preenchido', function () {
        $usuario = new Usuario();
        $usuario->nome = 'João da Silva';
        $usuario->nome_social = 'Maria Silva';

        expect($usuario->nome_exibicao)->toBe('Maria Silva');
    });

    test('retorna nome quando nome_social é nulo', function () {
        $usuario = new Usuario();
        $usuario->nome = 'João da Silva';
        $usuario->nome_social = null;

        expect($usuario->nome_exibicao)->toBe('João da Silva');
    });

    test('retorna string vazia quando ambos são nulos', function () {
        $usuario = new Usuario();
        $usuario->nome = null;
        $usuario->nome_social = null;

        expect($usuario->nome_exibicao)->toBe('');
    });
});

describe('Usuario::getNomeCompletoTcrAttribute', function () {

    test('retorna nome social com nome civil entre parênteses quando nome_social preenchido', function () {
        $usuario = new Usuario();
        $usuario->nome = 'João da Silva';
        $usuario->nome_social = 'Maria Silva';

        expect($usuario->nome_completo_tcr)->toBe('Maria Silva (João da Silva)');
    });

    test('retorna apenas nome civil quando nome_social é nulo', function () {
        $usuario = new Usuario();
        $usuario->nome = 'João da Silva';
        $usuario->nome_social = null;

        expect($usuario->nome_completo_tcr)->toBe('João da Silva');
    });

    test('retorna apenas nome civil quando nome_social é string vazia', function () {
        $usuario = new Usuario();
        $usuario->nome = 'João da Silva';
        $usuario->nome_social = '';

        expect($usuario->nome_completo_tcr)->toBe('João da Silva');
    });
});
