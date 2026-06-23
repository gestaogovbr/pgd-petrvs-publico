<?php

use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoStoreValidator;
use App\V2\PlanoTrabalho\Entrega\DTOs\ResumoForcaTrabalhoDTO;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Models\PlanoTrabalho;
use App\Exceptions\ValidateException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->entregaRepo = Mockery::mock(PlanoTrabalhoEntregaRepository::class);
    $this->validator = new PlanoTrabalhoDocumentoStoreValidator($this->entregaRepo);

    /** @var PlanoTrabalho $plano */
    $this->plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $this->plano->id = 'plano-1';
});

afterEach(fn () => Mockery::close());

function mockResumo(int $count, float $somatorio = 0): ResumoForcaTrabalhoDTO
{
    return new ResumoForcaTrabalhoDTO($count, $somatorio);
}

describe('PlanoTrabalhoDocumentoStoreValidator', function () {

    test('lança exceção quando plano não possui entregas', function () {
        $this->entregaRepo->shouldReceive('resumoForcaTrabalhoPorPlano')->with('plano-1')->andReturn(mockResumo(0));

        $this->validator->validar($this->plano, null);
    })->throws(ValidateException::class, 'Plano de Trabalho deve possuir ao menos uma entrega para gerar o documento.');

    test('permite quando CHD igual a 100% sem justificativa', function () {
        $this->entregaRepo->shouldReceive('resumoForcaTrabalhoPorPlano')->with('plano-1')->andReturn(mockResumo(2, 100.0));

        $result = $this->validator->validar($this->plano, null);
        expect($result)->toBeNull();
    });

    test('permite quando CHD abaixo de 100% com justificativa', function () {
        $this->entregaRepo->shouldReceive('resumoForcaTrabalhoPorPlano')->with('plano-1')->andReturn(mockResumo(1, 80.0));

        $result = $this->validator->validar($this->plano, 'Participante em regime parcial.');
        expect($result)->toBe('Participante em regime parcial.');
    });

    test('permite quando CHD acima de 100% com justificativa', function () {
        $this->entregaRepo->shouldReceive('resumoForcaTrabalhoPorPlano')->with('plano-1')->andReturn(mockResumo(3, 120.0));

        $result = $this->validator->validar($this->plano, 'Acúmulo temporário de entregas.');
        expect($result)->toBe('Acúmulo temporário de entregas.');
    });

    test('sanitiza justificativa para null quando CHD igual a 100%', function () {
        $this->entregaRepo->shouldReceive('resumoForcaTrabalhoPorPlano')->with('plano-1')->andReturn(mockResumo(2, 100.0));

        $result = $this->validator->validar($this->plano, 'Justificativa desnecessária.');
        expect($result)->toBeNull();
    });

    test('lança exceção quando CHD abaixo de 100% sem justificativa', function () {
        $this->entregaRepo->shouldReceive('resumoForcaTrabalhoPorPlano')->with('plano-1')->andReturn(mockResumo(1, 80.0));

        $this->validator->validar($this->plano, null);
    })->throws(ValidateException::class, 'A justificativa é obrigatória quando o percentual de carga horária é diferente de 100%.');

    test('lança exceção quando CHD acima de 100% sem justificativa', function () {
        $this->entregaRepo->shouldReceive('resumoForcaTrabalhoPorPlano')->with('plano-1')->andReturn(mockResumo(1, 150.0));

        $this->validator->validar($this->plano, null);
    })->throws(ValidateException::class, 'A justificativa é obrigatória quando o percentual de carga horária é diferente de 100%.');

    test('faz apenas uma chamada ao repository', function () {
        $this->entregaRepo->shouldReceive('resumoForcaTrabalhoPorPlano')->once()->with('plano-1')->andReturn(mockResumo(1, 80.0));

        $this->validator->validar($this->plano, 'Justificativa.');
    });
});
