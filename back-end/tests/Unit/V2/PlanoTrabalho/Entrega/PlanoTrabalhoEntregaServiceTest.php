<?php

use App\V2\PlanoTrabalho\Entrega\PlanoTrabalhoEntregaService;
use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaAuthorizationValidator;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaStoreValidator;
use App\V2\PlanoTrabalho\Documento\TCR\TCRInvalidador;
use App\Repository\AtividadeRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoEntrega;
use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->repository = Mockery::mock(PlanoTrabalhoEntregaRepository::class);
    $this->storeValidator = Mockery::mock(PlanoTrabalhoEntregaStoreValidator::class);
    $this->authValidator = Mockery::mock(PlanoTrabalhoEntregaAuthorizationValidator::class);
    $this->tcrInvalidador = Mockery::mock(TCRInvalidador::class);
    $this->atividadeRepository = Mockery::mock(AtividadeRepository::class);
    $this->planoRepository = Mockery::mock(PlanoTrabalhoRepository::class);

    $this->service = new PlanoTrabalhoEntregaService(
        $this->repository,
        $this->storeValidator,
        $this->authValidator,
        $this->tcrInvalidador,
        $this->atividadeRepository,
        $this->planoRepository,
    );
});

afterEach(fn () => Mockery::close());

function mockPlanoService(string $status = 'INCLUIDO'): PlanoTrabalho
{
    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->status = $status;
    return $plano;
}

describe('PlanoTrabalhoEntregaService::store', function () {

    test('valida, persiste e invalida TCR no planejamento', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->authValidator->shouldReceive('validar')->once()->with('plano-1', 'user-1')
            ->andReturn(mockPlanoService(StatusEnum::INCLUIDO->value));

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

    test('persiste em execução sem invalidar TCR', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->authValidator->shouldReceive('validar')->once()->with('plano-1', 'user-1')
            ->andReturn(mockPlanoService(StatusEnum::ATIVO->value));

        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'SEM_ENTREGA',
            'descricao' => 'Nova contribuição',
            'consolidacao_id' => 'cons-1',
        ], 'plano-1');

        $this->storeValidator->shouldReceive('validar')->once()->with($dto);

        $entrega = Mockery::mock(PlanoTrabalhoEntrega::class);
        $this->repository->shouldReceive('create')->once()->andReturn($entrega);
        $this->tcrInvalidador->shouldNotReceive('invalidar');

        $result = $this->service->store($dto);

        expect($result)->toBe($entrega);
    });

    test('não persiste quando validação lança exceção', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->authValidator->shouldReceive('validar')->once()
            ->andReturn(mockPlanoService());

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

describe('PlanoTrabalhoEntregaService::update', function () {

    test('valida, atualiza e invalida TCR', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->authValidator->shouldReceive('validar')->once()->with('plano-1', 'user-1')
            ->andReturn(mockPlanoService());

        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Entrega atualizada',
        ], 'plano-1', 'entrega-1');

        $this->storeValidator->shouldReceive('validarUpdate')->once()->with($dto);

        $entrega = Mockery::mock(PlanoTrabalhoEntrega::class)->makePartial();
        // Não deve chamar refresh(): isso descartaria as relações aninhadas
        // (planoEntregaEntrega.planoEntrega.unidade) carregadas pelo repositório.
        $entrega->shouldNotReceive('refresh');
        $this->repository->shouldReceive('update')->once()->with('entrega-1', $dto->toArray())->andReturn($entrega);
        $this->tcrInvalidador->shouldReceive('invalidar')->once()->with('plano-1');

        $result = $this->service->update('entrega-1', $dto);

        expect($result)->toBe($entrega);
    });

    test('lança NotFoundException quando entrega não existe', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->authValidator->shouldReceive('validar')->once()->with('plano-1', 'user-1')
            ->andReturn(mockPlanoService());

        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Entrega inexistente',
        ], 'plano-1', 'entrega-inexistente');

        $this->storeValidator->shouldReceive('validarUpdate')->once()->with($dto);
        $this->repository->shouldReceive('update')->once()->with('entrega-inexistente', $dto->toArray())->andReturn(null);
        $this->tcrInvalidador->shouldNotReceive('invalidar');

        $this->service->update('entrega-inexistente', $dto);
    })->throws(NotFoundException::class, 'Entrega do Plano de Trabalho não encontrada.');
});

describe('PlanoTrabalhoEntregaService::destroy', function () {

    test('valida, remove e invalida TCR no planejamento', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->authValidator->shouldReceive('validar')->once()->with('plano-1', 'user-1')
            ->andReturn(mockPlanoService());
        $this->storeValidator->shouldReceive('validarDestroy')->once()->with('plano-1', 'entrega-1', null);
        $this->atividadeRepository->shouldNotReceive('idsPorEntregaEmPeriodosIncluidos');
        $this->repository->shouldReceive('delete')->once()->with('entrega-1')->andReturn(true);
        $this->tcrInvalidador->shouldReceive('invalidar')->once()->with('plano-1');

        $this->service->destroy('plano-1', 'entrega-1');
    });

    test('remove atividades de períodos abertos e não invalida TCR em execução', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->authValidator->shouldReceive('validar')->once()->with('plano-1', 'user-1')
            ->andReturn(mockPlanoService(StatusEnum::ATIVO->value));
        $this->storeValidator->shouldReceive('validarDestroy')->once()->with('plano-1', 'entrega-1', 'cons-1');
        $this->atividadeRepository->shouldReceive('idsPorEntregaEmPeriodosIncluidos')
            ->once()
            ->with('entrega-1')
            ->andReturn(['atv-1', 'atv-2']);
        $this->atividadeRepository->shouldReceive('delete')->once()->with('atv-1')->andReturn(true);
        $this->atividadeRepository->shouldReceive('delete')->once()->with('atv-2')->andReturn(true);
        $this->repository->shouldReceive('delete')->once()->with('entrega-1')->andReturn(true);
        $this->tcrInvalidador->shouldNotReceive('invalidar');

        $this->service->destroy('plano-1', 'entrega-1', 'cons-1');
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

        $this->storeValidator->shouldNotReceive('validarUpdate');
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
