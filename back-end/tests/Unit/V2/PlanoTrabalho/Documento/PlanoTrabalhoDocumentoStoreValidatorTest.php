<?php

use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoStoreValidator;
use App\Repository\PlanoTrabalhoRepository;
use App\Models\PlanoTrabalho;
use App\Exceptions\ServerException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->validator = new PlanoTrabalhoDocumentoStoreValidator($this->planoRepo);
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoDocumentoStoreValidator', function () {

    test('lança exceção quando plano de trabalho não encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn(null);
        $this->planoRepo->shouldNotReceive('possuiEntregas');

        $this->validator->validar('plano-1');
    })->throws(ServerException::class, 'Plano de Trabalho não encontrado.');

    test('lança exceção quando plano não possui entregas', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        $this->planoRepo->shouldReceive('possuiEntregas')->with('plano-1')->andReturn(false);

        $this->validator->validar('plano-1');
    })->throws(ServerException::class, 'Plano de Trabalho deve possuir ao menos uma entrega para gerar o documento.');

    test('permite quando plano existe e possui entregas', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        $this->planoRepo->shouldReceive('possuiEntregas')->with('plano-1')->andReturn(true);

        $this->validator->validar('plano-1');

        expect(true)->toBeTrue();
    });
});
