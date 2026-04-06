<?php

use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaStoreValidator;
use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->planoEntregaRepo = Mockery::mock(PlanoEntregaRepository::class);
    $this->ptEntregaRepo = Mockery::mock(PlanoTrabalhoEntregaRepository::class);

    $this->validator = new PlanoTrabalhoEntregaStoreValidator(
        $this->planoRepo,
        $this->planoEntregaRepo,
        $this->ptEntregaRepo,
    );
});

afterEach(fn () => Mockery::close());

function mockPlano(string $status, string $dataInicio = '2025-01-01', string $dataFim = '2025-06-30'): PlanoTrabalho
{
    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->status = $status;
    $plano->data_inicio = $dataInicio;
    $plano->data_fim = $dataFim;
    return $plano;
}

function mockEntregaPE(string $dataInicio, ?string $dataFim): PlanoEntregaEntrega
{
    /** @var PlanoEntregaEntrega $entrega */
    $entrega = Mockery::mock(PlanoEntregaEntrega::class)->makePartial();
    $entrega->id = 'pee-1';
    $entrega->data_inicio = $dataInicio;
    $entrega->data_fim = $dataFim;
    return $entrega;
}

function dtoPlanoEntrega(string $planoTrabalhoId = 'plano-1', string $peeId = 'pee-1'): PlanoTrabalhoEntregaStoreDTO
{
    return PlanoTrabalhoEntregaStoreDTO::fromArray([
        'origem' => 'PLANO_ENTREGA',
        'plano_entrega_entrega_id' => $peeId,
    ], $planoTrabalhoId);
}

function dtoOutroOrgao(string $planoTrabalhoId = 'plano-1'): PlanoTrabalhoEntregaStoreDTO
{
    return PlanoTrabalhoEntregaStoreDTO::fromArray([
        'origem' => 'OUTRO_ORGAO',
        'orgao' => 'Órgão externo',
    ], $planoTrabalhoId);
}

function dtoNaoVinculado(string $planoTrabalhoId = 'plano-1'): PlanoTrabalhoEntregaStoreDTO
{
    return PlanoTrabalhoEntregaStoreDTO::fromArray([
        'origem' => 'SEM_ENTREGA',
    ], $planoTrabalhoId);
}

describe('PlanoTrabalhoEntregaStoreValidator::validar', function () {

    // ── Sempre ──

    test('lança exceção quando plano não encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(null);

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('lança exceção quando status não permitido', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::ATIVO->value));

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(ValidateException::class);

    // ── Tipo PLANO_ENTREGA ──

    test('lança exceção quando entrega PE não encontrada', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(null);

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(NotFoundException::class, 'A entrega do plano de entregas não foi encontrada.');

    test('lança exceção quando vínculo duplicado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-02-01', '2025-05-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->with('plano-1', 'pee-1')->andReturn(true);

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(ValidateException::class, 'Esta entrega já está vinculada a este Plano de Trabalho.');

    test('lança exceção quando entrega totalmente antes do PT', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value, '2025-06-01', '2025-12-31'));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-01-01', '2025-05-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->andReturn(false);

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(ValidateException::class, 'O período da entrega do plano de entregas não possui interseção com o período do plano de trabalho.');

    test('lança exceção quando entrega totalmente depois do PT', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value, '2025-01-01', '2025-06-30'));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-07-01', '2025-12-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->andReturn(false);

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(ValidateException::class, 'O período da entrega do plano de entregas não possui interseção com o período do plano de trabalho.');

    test('permite entrega com interseção de período', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-02-01', '2025-05-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->andReturn(false);

        $this->validator->validar(dtoPlanoEntrega());

        expect(true)->toBeTrue();
    });

    test('permite entrega sem data_fim (aberta)', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-03-01', null));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->andReturn(false);

        $this->validator->validar(dtoPlanoEntrega());

        expect(true)->toBeTrue();
    });

    // ── Tipo OUTRO_ORGAO ──

    test('tipo OUTRO_ORGAO não valida entrega PE', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldNotReceive('findEntregaById');
        $this->ptEntregaRepo->shouldNotReceive('existeVinculo');

        $this->validator->validar(dtoOutroOrgao());

        expect(true)->toBeTrue();
    });

    // ── Tipo SEM_ENTREGA ──

    test('tipo SEM_ENTREGA não valida entrega PE', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldNotReceive('findEntregaById');
        $this->ptEntregaRepo->shouldNotReceive('existeVinculo');

        $this->validator->validar(dtoNaoVinculado());

        expect(true)->toBeTrue();
    });
});

describe('PlanoTrabalhoEntregaStoreValidator::validarDestroy', function () {

    test('permite quando status INCLUIDO', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));

        $this->validator->validarDestroy('plano-1');

        expect(true)->toBeTrue();
    });

    test('lança exceção quando status ATIVO', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::ATIVO->value));

        $this->validator->validarDestroy('plano-1');
    })->throws(ValidateException::class);
});
