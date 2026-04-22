<?php

use App\V2\PlanoTrabalho\Entrega\PlanoTrabalhoEntregaService;
use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaAuthorizationValidator;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaStoreValidator;
use App\V2\PlanoTrabalho\Documento\TCR\TCRInvalidador;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Models\PlanoTrabalhoEntrega;
use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->repository = Mockery::mock(PlanoTrabalhoEntregaRepository::class);
    $this->storeValidator = Mockery::mock(PlanoTrabalhoEntregaStoreValidator::class);
    $this->authValidator = Mockery::mock(PlanoTrabalhoEntregaAuthorizationValidator::class);
    $this->tcrInvalidador = Mockery::mock(TCRInvalidador::class);

    $this->service = new PlanoTrabalhoEntregaService(
        $this->repository,
        $this->storeValidator,
        $this->authValidator,
        $this->tcrInvalidador,
    );
});

afterEach(fn () => Mockery::close());

describe('PlanoTrabalhoEntregaService::store', function () {

    test('valida, persiste e invalida TCR', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->authValidator->shouldReceive('validar')->once()->with('plano-1', 'user-1');

        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Entrega 1',
        ], 'plano-1');

        $this->storeValidator->shouldReceive('validar')->once()->with($dto);

        $entrega = Mockery::mock(PlanoTrabalhoEntrega::class);
        $this->repository->shouldReceive('create')->once()->andReturn($entrega);
        $this->tcrInvalidador->shouldReceive('invalidar')->once()->with('plano-1');

        $result = $this->service->store($dto);

        expect($result)->toBe($entrega);
    });

    test('não persiste quando validação lança exceção', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->authValidator->shouldReceive('validar')->once();

        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'pee-1',
        ], 'plano-inexistente');

        $this->storeValidator->shouldReceive('validar')
            ->andThrow(new NotFoundException('Plano de Trabalho não encontrado.'));

        $this->repository->shouldNotReceive('create');
        $this->tcrInvalidador->shouldNotReceive('invalidar');

        $this->service->store($dto);
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');
});

describe('PlanoTrabalhoEntregaService::destroy', function () {

    test('valida, remove e invalida TCR', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->authValidator->shouldReceive('validar')->once()->with('plano-1', 'user-1');
        $this->storeValidator->shouldReceive('validarDestroy')->once()->with('plano-1');
        $this->repository->shouldReceive('delete')->once()->with('entrega-1');
        $this->tcrInvalidador->shouldReceive('invalidar')->once()->with('plano-1');

        $this->service->destroy('plano-1', 'entrega-1');
    });
});

describe('PlanoTrabalhoEntregaService — perfil Consulta', function () {

    test('perfil Consulta é bloqueado ao tentar adicionar entrega', function () {
        Auth::shouldReceive('id')->andReturn('user-consulta');

        $this->authValidator->shouldReceive('validar')
            ->with('plano-1', 'user-consulta')
            ->once()
            ->andThrow(new \App\Exceptions\ForbiddenException('Usuário não tem permissão para gerenciar entregas deste Plano de Trabalho.'));

        $this->storeValidator->shouldNotReceive('validar');
        $this->repository->shouldNotReceive('create');

        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Entrega teste',
        ], 'plano-1');

        $this->service->store($dto);
    })->throws(\App\Exceptions\ForbiddenException::class);

    test('perfil Consulta é bloqueado ao tentar editar entrega', function () {
        Auth::shouldReceive('id')->andReturn('user-consulta');

        $this->authValidator->shouldReceive('validar')
            ->with('plano-1', 'user-consulta')
            ->once()
            ->andThrow(new \App\Exceptions\ForbiddenException('Usuário não tem permissão para gerenciar entregas deste Plano de Trabalho.'));

        $this->storeValidator->shouldNotReceive('validar');
        $this->repository->shouldNotReceive('update');

        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Entrega editada',
        ], 'plano-1');

        $this->service->update('entrega-1', $dto);
    })->throws(\App\Exceptions\ForbiddenException::class);

    test('perfil Consulta é bloqueado ao tentar excluir entrega', function () {
        Auth::shouldReceive('id')->andReturn('user-consulta');

        $this->authValidator->shouldReceive('validar')
            ->with('plano-1', 'user-consulta')
            ->once()
            ->andThrow(new \App\Exceptions\ForbiddenException('Usuário não tem permissão para gerenciar entregas deste Plano de Trabalho.'));

        $this->storeValidator->shouldNotReceive('validarDestroy');
        $this->repository->shouldNotReceive('delete');

        $this->service->destroy('plano-1', 'entrega-1');
    })->throws(\App\Exceptions\ForbiddenException::class);
});
