<?php

use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaStoreValidator;
use App\Repository\PlanoTrabalhoRepository;
use App\Models\PlanoTrabalho;
use App\Enums\StatusEnum;
use App\Exceptions\ServerException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->validator = new PlanoTrabalhoEntregaStoreValidator($this->planoRepo);
});

afterEach(function () {
    Mockery::close();
});

function fakePlanoEntrega(string $status): PlanoTrabalho
{
    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->status = $status;
    return $plano;
}

describe('PlanoTrabalhoEntregaStoreValidator', function () {

    test('lança exceção quando plano de trabalho não encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn(null);

        $this->validator->validar('plano-1');
    })->throws(ServerException::class, 'Plano de Trabalho não encontrado.');

    test('permite quando status é INCLUIDO', function () {
        $this->planoRepo->shouldReceive('findById')
            ->andReturn(fakePlanoEntrega(StatusEnum::INCLUIDO->value));

        $this->validator->validar('plano-1');

        expect(true)->toBeTrue();
    });

    test('permite quando status é AGUARDANDO_ASSINATURA', function () {
        $this->planoRepo->shouldReceive('findById')
            ->andReturn(fakePlanoEntrega(StatusEnum::AGUARDANDO_ASSINATURA->value));

        $this->validator->validar('plano-1');

        expect(true)->toBeTrue();
    });

    test('lança exceção quando status é ATIVO', function () {
        $this->planoRepo->shouldReceive('findById')
            ->andReturn(fakePlanoEntrega(StatusEnum::ATIVO->value));

        $this->validator->validar('plano-1');
    })->throws(ServerException::class, 'Entregas só podem ser adicionadas quando o Plano de Trabalho é um rascunho ou está aguardando assinatura.');

    test('lança exceção quando status é CONCLUIDO', function () {
        $this->planoRepo->shouldReceive('findById')
            ->andReturn(fakePlanoEntrega(StatusEnum::CONCLUIDO->value));

        $this->validator->validar('plano-1');
    })->throws(ServerException::class, 'Entregas só podem ser adicionadas quando o Plano de Trabalho é um rascunho ou está aguardando assinatura.');
});
