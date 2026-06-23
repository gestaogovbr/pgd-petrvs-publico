<?php

namespace Tests\Unit\V2\PlanoTrabalho\Ocorrencia;

use App\Exceptions\ValidateException;
use App\Models\Afastamento;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaStoreDTO;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaUpdateDTO;
use App\V2\PlanoTrabalho\Ocorrencia\Validators\OcorrenciaStoreValidator;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarOcorrenciaStoreValidator(): OcorrenciaStoreValidator
{
    return new OcorrenciaStoreValidator(
        Mockery::mock(PlanoTrabalhoRepository::class),
        Mockery::mock(UnidadeRepository::class),
    );
}

function planoComPeriodo(string $inicio = '2026-03-01 00:00:00', string $fim = '2026-03-31 00:00:00'): PlanoTrabalho
{
    $plano = new PlanoTrabalho();
    $plano->data_inicio = $inicio;
    $plano->data_fim = $fim;

    return $plano;
}

function dtoStore(string $inicio, string $fim): OcorrenciaStoreDTO
{
    return OcorrenciaStoreDTO::fromArray([
        'observacoes' => 'Teste',
        'data_inicio' => $inicio,
        'data_fim' => $fim,
        'tipo_motivo_afastamento_id' => '00000000-0000-4000-8000-000000000001',
    ], 'plano-1');
}

describe('OcorrenciaStoreValidator::validarStore', function () {

    test('aceita ocorrência de um único dia no primeiro dia do plano', function () {
        $validator = criarOcorrenciaStoreValidator();
        $plano = planoComPeriodo();

        $validator->validarStore($plano, dtoStore('2026-03-01', '2026-03-01'));

        expect(true)->toBeTrue();
    });

    test('aceita ocorrência de um único dia no último dia do plano', function () {
        $validator = criarOcorrenciaStoreValidator();
        $plano = planoComPeriodo();

        $validator->validarStore($plano, dtoStore('2026-03-31', '2026-03-31'));

        expect(true)->toBeTrue();
    });

    test('rejeita ocorrência inteiramente antes do período do plano', function () {
        $validator = criarOcorrenciaStoreValidator();
        $plano = planoComPeriodo();

        $validator->validarStore($plano, dtoStore('2026-02-01', '2026-02-28'));
    })->throws(ValidateException::class);

    test('rejeita ocorrência inteiramente depois do período do plano', function () {
        $validator = criarOcorrenciaStoreValidator();
        $plano = planoComPeriodo();

        $validator->validarStore($plano, dtoStore('2026-04-01', '2026-04-30'));
    })->throws(ValidateException::class);
});

describe('OcorrenciaStoreValidator::validarUpdate', function () {

    test('aceita atualização para o mesmo dia quando plano usa datetime', function () {
        $validator = criarOcorrenciaStoreValidator();
        $plano = planoComPeriodo();

        $afastamento = new Afastamento();
        $afastamento->data_inicio = '2026-03-10 00:00:00';
        $afastamento->data_fim = '2026-03-15 00:00:00';

        $dto = OcorrenciaUpdateDTO::fromArray([
            'data_inicio' => '2026-03-01',
            'data_fim' => '2026-03-01',
        ], 'plano-1', 'ocor-1');

        $validator->validarUpdate($plano, $dto, $afastamento);

        expect(true)->toBeTrue();
    });
});
