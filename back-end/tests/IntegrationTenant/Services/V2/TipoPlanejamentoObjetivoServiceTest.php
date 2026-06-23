<?php

namespace Tests\Unit\Services\V2;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\TipoPlanejamentoObjetivo;
use App\Repository\TipoPlanejamentoObjetivoRepository;
use App\V2\Planejamento\TipoObjetivo\DTOs\TipoPlanejamentoObjetivoStoreDTO;
use App\V2\Planejamento\TipoObjetivo\DTOs\TipoPlanejamentoObjetivoUpdateDTO;
use App\V2\Planejamento\TipoObjetivo\TipoPlanejamentoObjetivoService;
use App\V2\Planejamento\TipoObjetivo\Validators\TipoPlanejamentoObjetivoStoreValidator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Mockery;
//use Tests\TestCase;

//uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarTipoPlanejamentoObjetivoService(
    ?TipoPlanejamentoObjetivoRepository $repo = null,
    ?TipoPlanejamentoObjetivoStoreValidator $validator = null,
): TipoPlanejamentoObjetivoService {
    return new TipoPlanejamentoObjetivoService(
        $repo ?? Mockery::mock(TipoPlanejamentoObjetivoRepository::class),
        $validator ?? Mockery::mock(TipoPlanejamentoObjetivoStoreValidator::class),
    );
}

describe('TipoPlanejamentoObjetivoService::index', function () {
    test('retorna collection do repository', function () {
        $expected = new Collection([new TipoPlanejamentoObjetivo(['nome' => 'Tipo A'])]);

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $repo->shouldReceive('getAll')->once()->andReturn($expected);

        $service = criarTipoPlanejamentoObjetivoService(repo: $repo);

        expect($service->index())->toBe($expected);
    });
});

describe('TipoPlanejamentoObjetivoService::store', function () {
    test('valida autorização e delega criação ao repository', function () {
        $dto = TipoPlanejamentoObjetivoStoreDTO::fromArray(['nome' => 'Novo Tipo', 'descricao' => 'Desc']);
        $created = Mockery::mock(TipoPlanejamentoObjetivo::class)->makePartial();

        Auth::shouldReceive('id')->andReturn('user-1');

        $validator = Mockery::mock(TipoPlanejamentoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')->once()->with('user-1');

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $repo->shouldReceive('create')
            ->once()
            ->with($dto->toPersistArray())
            ->andReturn($created);

        $service = criarTipoPlanejamentoObjetivoService(repo: $repo, validator: $validator);

        expect($service->store($dto))->toBe($created);
    });

    test('lança ForbiddenException quando usuário não é ADM_MASTER', function () {
        $dto = TipoPlanejamentoObjetivoStoreDTO::fromArray(['nome' => 'X']);

        Auth::shouldReceive('id')->andReturn('user-participante');

        $validator = Mockery::mock(TipoPlanejamentoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')
            ->once()
            ->andThrow(new ForbiddenException('Apenas administradores master podem gerenciar tipos de objetivo.'));

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $repo->shouldNotReceive('create');

        $service = criarTipoPlanejamentoObjetivoService(repo: $repo, validator: $validator);
        $service->store($dto);
    })->throws(ForbiddenException::class);
});

describe('TipoPlanejamentoObjetivoService::update', function () {
    test('valida autorização e existência antes de atualizar', function () {
        $tipoObjetivo = Mockery::mock(TipoPlanejamentoObjetivo::class)->makePartial();
        $tipoObjetivo->shouldReceive('refresh')->once()->andReturnSelf();

        $dto = TipoPlanejamentoObjetivoUpdateDTO::fromArray(['nome' => 'Atualizado'], 'tipo-1');

        Auth::shouldReceive('id')->andReturn('user-1');

        $validator = Mockery::mock(TipoPlanejamentoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')->once()->with('user-1');
        $validator->shouldReceive('validarExistencia')->once()->with('tipo-1')->andReturn($tipoObjetivo);

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $repo->shouldReceive('update')->once()->with('tipo-1', ['nome' => 'Atualizado'])->andReturn($tipoObjetivo);

        $service = criarTipoPlanejamentoObjetivoService(repo: $repo, validator: $validator);

        expect($service->update($dto))->toBe($tipoObjetivo);
    });

    test('lança NotFoundException quando tipo não existe', function () {
        $dto = TipoPlanejamentoObjetivoUpdateDTO::fromArray(['nome' => 'X'], 'inexistente');

        Auth::shouldReceive('id')->andReturn('user-1');

        $validator = Mockery::mock(TipoPlanejamentoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')->once()->with('user-1');
        $validator->shouldReceive('validarExistencia')
            ->once()
            ->andThrow(new NotFoundException('Tipo de objetivo não encontrado.'));

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $repo->shouldNotReceive('update');

        $service = criarTipoPlanejamentoObjetivoService(repo: $repo, validator: $validator);
        $service->update($dto);
    })->throws(NotFoundException::class);
});

describe('TipoPlanejamentoObjetivoService::destroy', function () {
    test('valida autorização e existência antes de deletar', function () {
        $tipoObjetivo = Mockery::mock(TipoPlanejamentoObjetivo::class)->makePartial();

        Auth::shouldReceive('id')->andReturn('user-1');

        $validator = Mockery::mock(TipoPlanejamentoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')->once()->with('user-1');
        $validator->shouldReceive('validarExistencia')->once()->with('tipo-1')->andReturn($tipoObjetivo);

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $repo->shouldReceive('delete')->once()->with('tipo-1')->andReturn(true);

        $service = criarTipoPlanejamentoObjetivoService(repo: $repo, validator: $validator);
        $service->destroy('tipo-1');
    });

    test('não chama delete quando autorização falha', function () {
        Auth::shouldReceive('id')->andReturn('user-participante');

        $validator = Mockery::mock(TipoPlanejamentoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')
            ->once()
            ->andThrow(new ForbiddenException('Sem permissão.'));

        $repo = Mockery::mock(TipoPlanejamentoObjetivoRepository::class);
        $repo->shouldNotReceive('delete');

        $service = criarTipoPlanejamentoObjetivoService(repo: $repo, validator: $validator);
        $service->destroy('tipo-1');
    })->throws(ForbiddenException::class);
});
