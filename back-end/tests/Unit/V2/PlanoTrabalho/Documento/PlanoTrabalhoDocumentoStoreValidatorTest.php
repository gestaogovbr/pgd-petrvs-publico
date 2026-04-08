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

afterEach(fn () => Mockery::close());

function mockPlanoComEntregas(bool $existem, float $somatorio = 0): PlanoTrabalho
{
    $relation = Mockery::mock(HasMany::class);
    $relation->shouldReceive('exists')->andReturn($existem);

    if ($existem) {
        $relation->shouldReceive('sum')->with('forca_trabalho')->andReturn($somatorio);
    }

    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->shouldReceive('entregas')->andReturn($relation);

    return $plano;
}

describe('PlanoTrabalhoDocumentoStoreValidator', function () {

    test('lança exceção quando plano não possui entregas', function () {
        $this->validator->validar(mockPlanoComEntregas(false), null);
    })->throws(ValidateException::class, 'Plano de Trabalho deve possuir ao menos uma entrega para gerar o documento.');

    test('permite quando CHD igual a 100% sem justificativa', function () {
        $result = $this->validator->validar(mockPlanoComEntregas(true, 100.0), null);
        expect($result)->toBeNull();
    });

    test('permite quando CHD abaixo de 100% com justificativa', function () {
        $result = $this->validator->validar(mockPlanoComEntregas(true, 80.0), 'Participante em regime parcial.');
        expect($result)->toBe('Participante em regime parcial.');
    });

    test('permite quando CHD acima de 100% com justificativa', function () {
        $result = $this->validator->validar(mockPlanoComEntregas(true, 120.0), 'Acúmulo temporário de entregas.');
        expect($result)->toBe('Acúmulo temporário de entregas.');
    });

    test('sanitiza justificativa para null quando CHD igual a 100%', function () {
        $result = $this->validator->validar(mockPlanoComEntregas(true, 100.0), 'Justificativa desnecessária.');
        expect($result)->toBeNull();
    });

    test('lança exceção quando CHD abaixo de 100% sem justificativa', function () {
        $this->validator->validar(mockPlanoComEntregas(true, 80.0), null);
    })->throws(ValidateException::class, 'A justificativa é obrigatória quando o percentual de carga horária é diferente de 100%.');

    test('lança exceção quando CHD acima de 100% sem justificativa', function () {
        $this->validator->validar(mockPlanoComEntregas(true, 150.0), null);
    })->throws(ValidateException::class, 'A justificativa é obrigatória quando o percentual de carga horária é diferente de 100%.');
});
