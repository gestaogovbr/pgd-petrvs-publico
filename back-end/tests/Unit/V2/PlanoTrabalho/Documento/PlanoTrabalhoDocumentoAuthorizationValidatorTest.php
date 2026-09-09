<?php

use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoAuthorizationValidator;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Models\PlanoTrabalho;
use App\Exceptions\NotFoundException;
use App\Exceptions\ForbiddenException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->validator = new PlanoTrabalhoDocumentoAuthorizationValidator($this->planoRepo, $this->unidadeRepo);
});

afterEach(function () {
    Mockery::close();
});

function fakePlanoDocumento(string $usuarioId, string $unidadeId): PlanoTrabalho
{
    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->usuario_id = $usuarioId;
    $plano->unidade_id = $unidadeId;
    return $plano;
}

describe('PlanoTrabalhoDocumentoAuthorizationValidator', function () {

    test('lança NotFoundException quando plano não encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn(null);
        $this->unidadeRepo->shouldNotReceive('isUsuarioGestorRecursivo');

        $this->validator->validar('plano-1', 'user-1');
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('permite quando usuário é dono do plano', function () {
        $plano = fakePlanoDocumento('user-1', 'unidade-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->unidadeRepo->shouldNotReceive('isUsuarioGestorRecursivo');

        $result = $this->validator->validar('plano-1', 'user-1');

        expect($result)->toBe($plano);
    });

    test('permite quando usuário é chefia da unidade do plano', function () {
        $plano = fakePlanoDocumento('user-dono', 'unidade-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'user-chefia', true)
            ->andReturn(true);

        $result = $this->validator->validar('plano-1', 'user-chefia');

        expect($result)->toBe($plano);
    });

    test('lança ForbiddenException quando usuário não é dono nem chefia', function () {
        $plano = fakePlanoDocumento('user-dono', 'unidade-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'user-estranho', true)
            ->andReturn(false);

        $this->validator->validar('plano-1', 'user-estranho');
    })->throws(ForbiddenException::class, 'Usuário não tem permissão para acessar o documento deste Plano de Trabalho.');
});

describe('PlanoTrabalhoDocumentoAuthorizationValidator::validarAssinatura', function () {

    test('lança NotFoundException quando plano não encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn(null);

        $this->validator->validarAssinatura('plano-1', 'user-1');
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('permite quando usuário é dono do plano', function () {
        $plano = fakePlanoDocumento('user-1', 'unidade-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->unidadeRepo->shouldNotReceive('isUsuarioGestorRecursivo');

        $result = $this->validator->validarAssinatura('plano-1', 'user-1');

        expect($result)->toBe($plano);
    });

    test('permite quando usuário é chefia titular da unidade do plano', function () {
        $plano = fakePlanoDocumento('user-dono', 'unidade-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'user-chefia', false)
            ->andReturn(true);

        $result = $this->validator->validarAssinatura('plano-1', 'user-chefia');

        expect($result)->toBe($plano);
    });

    test('bloqueia delegado que não é titular nem substituto', function () {
        $plano = fakePlanoDocumento('user-dono', 'unidade-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'user-delegado', false)
            ->andReturn(false);

        $this->validator->validarAssinatura('plano-1', 'user-delegado');
    })->throws(ForbiddenException::class, 'Usuário não tem permissão para assinar o documento deste Plano de Trabalho.');

    test('permite usuário que é delegado E titular na mesma unidade', function () {
        $plano = fakePlanoDocumento('user-dono', 'unidade-1');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'user-titular-delegado', false)
            ->andReturn(true);

        $result = $this->validator->validarAssinatura('plano-1', 'user-titular-delegado');

        expect($result)->toBe($plano);
    });
});
