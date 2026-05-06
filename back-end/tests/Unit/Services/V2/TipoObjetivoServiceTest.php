<?php

namespace Tests\Unit\Services\V2;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\TipoObjetivo;
use App\Repository\TipoObjetivoRepository;
use App\V2\TipoObjetivo\DTOs\TipoObjetivoStoreDTO;
use App\V2\TipoObjetivo\DTOs\TipoObjetivoUpdateDTO;
use App\V2\TipoObjetivo\TipoObjetivoService;
use App\V2\TipoObjetivo\Validators\TipoObjetivoStoreValidator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarTipoObjetivoService(
    ?TipoObjetivoRepository $repo = null,
    ?TipoObjetivoStoreValidator $validator = null,
): TipoObjetivoService {
    return new TipoObjetivoService(
        $repo ?? Mockery::mock(TipoObjetivoRepository::class),
        $validator ?? Mockery::mock(TipoObjetivoStoreValidator::class),
    );
}

describe('TipoObjetivoService::index', function () {
    test('retorna collection do repository', function () {
        $expected = new Collection([new TipoObjetivo(['nome' => 'Tipo A'])]);

        $repo = Mockery::mock(TipoObjetivoRepository::class);
        $repo->shouldReceive('getAll')->once()->andReturn($expected);

        $service = criarTipoObjetivoService(repo: $repo);

        expect($service->index())->toBe($expected);
    });
});

describe('TipoObjetivoService::store', function () {
    test('valida autorização e delega criação ao repository', function () {
        $dto = TipoObjetivoStoreDTO::fromArray(['nome' => 'Novo Tipo', 'descricao' => 'Desc']);
        $created = Mockery::mock(TipoObjetivo::class)->makePartial();

        Auth::shouldReceive('id')->andReturn('user-1');

        $validator = Mockery::mock(TipoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')->once()->with('user-1');

        $repo = Mockery::mock(TipoObjetivoRepository::class);
        $repo->shouldReceive('create')
            ->once()
            ->with($dto->toPersistArray())
            ->andReturn($created);

        $service = criarTipoObjetivoService(repo: $repo, validator: $validator);

        expect($service->store($dto))->toBe($created);
    });

    test('lança ForbiddenException quando usuário não é ADM_MASTER', function () {
        $dto = TipoObjetivoStoreDTO::fromArray(['nome' => 'X']);

        Auth::shouldReceive('id')->andReturn('user-participante');

        $validator = Mockery::mock(TipoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')
            ->once()
            ->andThrow(new ForbiddenException('Apenas administradores master podem gerenciar tipos de objetivo.'));

        $repo = Mockery::mock(TipoObjetivoRepository::class);
        $repo->shouldNotReceive('create');

        $service = criarTipoObjetivoService(repo: $repo, validator: $validator);
        $service->store($dto);
    })->throws(ForbiddenException::class);
});

describe('TipoObjetivoService::update', function () {
    test('valida autorização e existência antes de atualizar', function () {
        $tipoObjetivo = Mockery::mock(TipoObjetivo::class)->makePartial();
        $tipoObjetivo->shouldReceive('refresh')->once()->andReturnSelf();

        $dto = TipoObjetivoUpdateDTO::fromArray(['nome' => 'Atualizado'], 'tipo-1');

        Auth::shouldReceive('id')->andReturn('user-1');

        $validator = Mockery::mock(TipoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')->once()->with('user-1');
        $validator->shouldReceive('validarExistencia')->once()->with('tipo-1')->andReturn($tipoObjetivo);

        $repo = Mockery::mock(TipoObjetivoRepository::class);
        $repo->shouldReceive('update')->once()->with('tipo-1', ['nome' => 'Atualizado'])->andReturn($tipoObjetivo);

        $service = criarTipoObjetivoService(repo: $repo, validator: $validator);

        expect($service->update($dto))->toBe($tipoObjetivo);
    });

    test('lança NotFoundException quando tipo não existe', function () {
        $dto = TipoObjetivoUpdateDTO::fromArray(['nome' => 'X'], 'inexistente');

        Auth::shouldReceive('id')->andReturn('user-1');

        $validator = Mockery::mock(TipoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')->once()->with('user-1');
        $validator->shouldReceive('validarExistencia')
            ->once()
            ->andThrow(new NotFoundException('Tipo de objetivo não encontrado.'));

        $repo = Mockery::mock(TipoObjetivoRepository::class);
        $repo->shouldNotReceive('update');

        $service = criarTipoObjetivoService(repo: $repo, validator: $validator);
        $service->update($dto);
    })->throws(NotFoundException::class);
});

describe('TipoObjetivoService::destroy', function () {
    test('valida autorização e existência antes de deletar', function () {
        $tipoObjetivo = Mockery::mock(TipoObjetivo::class)->makePartial();

        Auth::shouldReceive('id')->andReturn('user-1');

        $validator = Mockery::mock(TipoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')->once()->with('user-1');
        $validator->shouldReceive('validarExistencia')->once()->with('tipo-1')->andReturn($tipoObjetivo);

        $repo = Mockery::mock(TipoObjetivoRepository::class);
        $repo->shouldReceive('delete')->once()->with('tipo-1')->andReturn(true);

        $service = criarTipoObjetivoService(repo: $repo, validator: $validator);
        $service->destroy('tipo-1');
    });

    test('não chama delete quando autorização falha', function () {
        Auth::shouldReceive('id')->andReturn('user-participante');

        $validator = Mockery::mock(TipoObjetivoStoreValidator::class);
        $validator->shouldReceive('validar')
            ->once()
            ->andThrow(new ForbiddenException('Sem permissão.'));

        $repo = Mockery::mock(TipoObjetivoRepository::class);
        $repo->shouldNotReceive('delete');

        $service = criarTipoObjetivoService(repo: $repo, validator: $validator);
        $service->destroy('tipo-1');
    })->throws(ForbiddenException::class);
});
