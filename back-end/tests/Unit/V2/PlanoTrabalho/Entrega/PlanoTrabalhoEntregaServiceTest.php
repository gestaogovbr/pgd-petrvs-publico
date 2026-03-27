<?php

use App\V2\PlanoTrabalho\Entrega\PlanoTrabalhoEntregaService;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaStoreValidator;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Models\PlanoTrabalhoEntrega;
use App\Exceptions\ServerException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->repository = Mockery::mock(PlanoTrabalhoEntregaRepository::class);
    $this->storeValidator = Mockery::mock(PlanoTrabalhoEntregaStoreValidator::class);

    $this->service = new PlanoTrabalhoEntregaService(
        $this->repository,
        $this->storeValidator,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoEntregaService::store', function () {

    test('valida e persiste uma entrega', function () {
        $this->storeValidator
            ->shouldReceive('validar')
            ->once()
            ->with('plano-1');

        $entrega = Mockery::mock(PlanoTrabalhoEntrega::class);

        $this->repository
            ->shouldReceive('create')
            ->once()
            ->with(Mockery::type('array'))
            ->andReturn($entrega);

        $result = $this->service->store('plano-1', [
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Entrega 1',
        ]);

        expect($result)->toBe($entrega);
    });

    test('não persiste quando validação lança exceção', function () {
        $this->storeValidator
            ->shouldReceive('validar')
            ->once()
            ->andThrow(new ServerException('ValidatePlanoTrabalhoEntrega', 'Plano de Trabalho não encontrado.'));

        $this->repository->shouldNotReceive('create');

        $this->service->store('plano-inexistente', [
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Entrega 1',
        ]);
    })->throws(ServerException::class, 'Plano de Trabalho não encontrado.');

    test('passa plano_trabalho_id correto ao repository', function () {
        $this->storeValidator->shouldReceive('validar')->once();

        $entrega = Mockery::mock(PlanoTrabalhoEntrega::class);

        $this->repository
            ->shouldReceive('create')
            ->once()
            ->with(Mockery::on(fn (array $attrs) =>
                $attrs['plano_trabalho_id'] === 'plano-xyz'
                && $attrs['plano_entrega_entrega_id'] === 'pee-1'
            ))
            ->andReturn($entrega);

        $this->service->store('plano-xyz', [
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Teste',
        ]);
    });
});
