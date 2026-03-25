<?php

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use App\V2\PlanoTrabalho\Validacoes\PlanoTrabalhoStoreValidacao;
use App\Repository\UnidadeRepository;
use App\Repository\ProgramaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Models\Unidade;
use App\Models\Programa;
use App\Exceptions\ServerException;
use Tests\TestCase;

uses(TestCase::class);

function buildStoreDTO(array $overrides = []): PlanoTrabalhoStoreDTO
{
    return PlanoTrabalhoStoreDTO::fromArray(array_merge([
        'usuario_id' => 'user-1',
        'unidade_id' => 'unidade-1',
        'programa_id' => 'programa-1',
        'data_inicio' => '2024-03-01',
        'data_fim' => '2024-06-30',
        'tipo_modalidade_id' => 'mod-1',
    ], $overrides), 'criador-1');
}

beforeEach(function () {
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->programaRepo = Mockery::mock(ProgramaRepository::class);
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);

    $this->validacao = new PlanoTrabalhoStoreValidacao(
        $this->unidadeRepo,
        $this->programaRepo,
        $this->planoRepo,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoStoreValidacao', function () {

    test('lança exceção quando unidade está inativa', function () {
        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->data_inativacao = '2024-01-01';

        $this->unidadeRepo->shouldReceive('findById')->with('unidade-1')->andReturn($unidade);

        $this->validacao->validar(buildStoreDTO());
    })->throws(ServerException::class, 'A unidade está inativa.');

    test('lança exceção quando datas fora do período do regramento', function () {
        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->data_inativacao = null;

        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->data_inicio = '2024-04-01';
        $programa->data_fim = '2024-12-31';

        $this->unidadeRepo->shouldReceive('findById')->andReturn($unidade);
        $this->programaRepo->shouldReceive('findById')->with('programa-1')->andReturn($programa);

        $this->validacao->validar(buildStoreDTO());
    })->throws(ServerException::class, 'As datas do plano de trabalho estão fora do período de vigência do regramento.');

    test('lança exceção quando existe conflito de período', function () {
        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->data_inativacao = null;

        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->data_inicio = '2024-01-01';
        $programa->data_fim = '2024-12-31';

        $this->unidadeRepo->shouldReceive('findById')->andReturn($unidade);
        $this->programaRepo->shouldReceive('findById')->andReturn($programa);
        $this->planoRepo->shouldReceive('existeConflitoPeriodo')
            ->with('user-1', '2024-03-01', '2024-06-30')
            ->andReturn(true);

        $this->validacao->validar(buildStoreDTO());
    })->throws(ServerException::class, 'Este participante já possui plano de trabalho cadastrado para o período.');
});
