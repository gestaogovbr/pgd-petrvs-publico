<?php

use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoStoreValidator;
use App\Models\PlanoTrabalho;
use App\Exceptions\ValidateException;
use Tests\TestCase;
use Illuminate\Database\Eloquent\Relations\HasMany;

uses(TestCase::class);

beforeEach(function () {
    $this->validator = new PlanoTrabalhoDocumentoStoreValidator();
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoDocumentoStoreValidator', function () {

    test('lança exceção quando plano não possui entregas', function () {
        $relation = Mockery::mock(HasMany::class);
        $relation->shouldReceive('exists')->andReturn(false);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->shouldReceive('entregas')->andReturn($relation);

        $this->validator->validar($plano);
    })->throws(ValidateException::class, 'Plano de Trabalho deve possuir ao menos uma entrega para gerar o documento.');

    test('permite quando plano possui entregas', function () {
        $relation = Mockery::mock(HasMany::class);
        $relation->shouldReceive('exists')->andReturn(true);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->shouldReceive('entregas')->andReturn($relation);

        $this->validator->validar($plano);

        expect(true)->toBeTrue();
    });
});
