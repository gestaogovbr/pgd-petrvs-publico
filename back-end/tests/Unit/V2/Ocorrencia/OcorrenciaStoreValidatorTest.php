<?php

namespace Tests\Unit\V2\Ocorrencia;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\Afastamento;
use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\UnidadeRepository;
use App\V2\Ocorrencia\Validators\OcorrenciaStoreValidator;
use Illuminate\Database\Eloquent\Collection;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarValidator(?AfastamentoRepository $afastamentoRepo = null, ?UnidadeRepository $unidadeRepo = null): OcorrenciaStoreValidator
{
    return new OcorrenciaStoreValidator(
        $afastamentoRepo ?? Mockery::mock(AfastamentoRepository::class),
        $unidadeRepo ?? Mockery::mock(UnidadeRepository::class),
    );
}

describe('OcorrenciaStoreValidator::validarAutorizacao', function () {

    test('permite quando usuario_id é o próprio usuário logado', function () {
        $validator = criarValidator();

        $validator->validarAutorizacao('user-1', 'user-1');

        expect(true)->toBeTrue();
    });

    test('permite quando usuário logado é gestor de unidade onde o alvo está lotado', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->with('gestor-1')
            ->andReturn(new Collection([(object) ['id' => 'unidade-1']]));
        $unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->with(['unidade-1'])
            ->andReturn(new Collection([(object) ['id' => 'unidade-1'], (object) ['id' => 'unidade-sub']]));

        $afastamentoRepo = Mockery::mock(AfastamentoRepository::class);
        $afastamentoRepo->shouldReceive('usuarioPossuiVinculoEmUnidades')
            ->with('user-alvo', ['unidade-1', 'unidade-sub'])
            ->andReturn(true);

        $validator = criarValidator($afastamentoRepo, $unidadeRepo);

        $validator->validarAutorizacao('user-alvo', 'gestor-1');

        expect(true)->toBeTrue();
    });

    test('rejeita quando usuário logado não gerencia nenhuma unidade', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->with('user-sem-gestao')
            ->andReturn(new Collection());

        $validator = criarValidator(unidadeRepo: $unidadeRepo);

        $validator->validarAutorizacao('user-alvo', 'user-sem-gestao');
    })->throws(ForbiddenException::class);

    test('rejeita quando alvo não está lotado em unidades gerenciadas', function () {
        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->andReturn(new Collection([(object) ['id' => 'unidade-1']]));
        $unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->with(['unidade-1'])
            ->andReturn(new Collection([(object) ['id' => 'unidade-1']]));

        $afastamentoRepo = Mockery::mock(AfastamentoRepository::class);
        $afastamentoRepo->shouldReceive('usuarioPossuiVinculoEmUnidades')
            ->with('user-alvo', ['unidade-1'])
            ->andReturn(false);

        $validator = criarValidator($afastamentoRepo, $unidadeRepo);

        $validator->validarAutorizacao('user-alvo', 'gestor-1');
    })->throws(ForbiddenException::class);
});

describe('OcorrenciaStoreValidator::validarExistencia', function () {

    test('retorna afastamento quando encontrado', function () {
        $afastamento = new Afastamento();
        $afastamento->id = 'oc-1';
        $afastamento->usuario_id = 'user-1';

        $afastamentoRepo = Mockery::mock(AfastamentoRepository::class);
        $afastamentoRepo->shouldReceive('findById')->with('oc-1')->andReturn($afastamento);

        $validator = criarValidator($afastamentoRepo);

        $result = $validator->validarExistencia('oc-1', 'user-1');

        expect($result->id)->toBe('oc-1');
    });

    test('rejeita quando afastamento não existe', function () {
        $afastamentoRepo = Mockery::mock(AfastamentoRepository::class);
        $afastamentoRepo->shouldReceive('findById')->with('oc-1')->andReturn(null);

        $validator = criarValidator($afastamentoRepo);

        $validator->validarExistencia('oc-1', 'user-1');
    })->throws(NotFoundException::class);

    test('rejeita quando afastamento pertence a outro usuário', function () {
        $afastamento = new Afastamento();
        $afastamento->id = 'oc-1';
        $afastamento->usuario_id = 'user-outro';

        $afastamentoRepo = Mockery::mock(AfastamentoRepository::class);
        $afastamentoRepo->shouldReceive('findById')->with('oc-1')->andReturn($afastamento);

        $validator = criarValidator($afastamentoRepo);

        $validator->validarExistencia('oc-1', 'user-1');
    })->throws(NotFoundException::class);
});
