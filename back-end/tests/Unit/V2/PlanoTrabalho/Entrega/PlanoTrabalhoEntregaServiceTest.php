<?php

use App\V2\PlanoTrabalho\Entrega\PlanoTrabalhoEntregaService;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaStoreValidator;
use App\V2\PlanoTrabalho\Documento\TCR\TCRInvalidador;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Models\PlanoTrabalhoEntrega;
use App\Exceptions\ServerException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->repository = Mockery::mock(PlanoTrabalhoEntregaRepository::class);
    $this->storeValidator = Mockery::mock(PlanoTrabalhoEntregaStoreValidator::class);
    $this->tcrInvalidador = Mockery::mock(TCRInvalidador::class);

    $this->service = new PlanoTrabalhoEntregaService(
        $this->repository,
        $this->storeValidator,
        $this->tcrInvalidador,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoEntregaService::store', function () {

    test('valida, persiste e invalida TCR', function () {
        $this->storeValidator->shouldReceive('validar')->once()->with('plano-1');

        $entrega = Mockery::mock(PlanoTrabalhoEntrega::class);
        $this->repository->shouldReceive('create')->once()->andReturn($entrega);
        $this->tcrInvalidador->shouldReceive('invalidar')->once()->with('plano-1');

        $result = $this->service->store('plano-1', [
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Entrega 1',
        ]);

        expect($result)->toBe($entrega);
    });

    test('não persiste quando validação lança exceção', function () {
        $this->storeValidator->shouldReceive('validar')
            ->andThrow(new ServerException('ValidatePlanoTrabalhoEntrega', 'Plano de Trabalho não encontrado.'));

        $this->repository->shouldNotReceive('create');
        $this->tcrInvalidador->shouldNotReceive('invalidar');

        $this->service->store('plano-inexistente', [
            'plano_entrega_entrega_id' => 'pee-1',
        ]);
    })->throws(ServerException::class, 'Plano de Trabalho não encontrado.');
});

describe('PlanoTrabalhoEntregaService::destroy', function () {

    test('valida, remove e invalida TCR', function () {
        $this->storeValidator->shouldReceive('validar')->once()->with('plano-1');
        $this->repository->shouldReceive('delete')->once()->with('entrega-1');
        $this->tcrInvalidador->shouldReceive('invalidar')->once()->with('plano-1');

        $this->service->destroy('plano-1', 'entrega-1');
    });
});
