<?php

use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\Ocorrencia\OcorrenciaService;
use App\V2\Ocorrencia\Validators\OcorrenciaStoreValidator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

beforeEach(function () {
    $this->validator = Mockery::mock(OcorrenciaStoreValidator::class);
    $this->afastamentoRepo = Mockery::mock(AfastamentoRepository::class);
    $this->ptRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);

    $this->service = new OcorrenciaService(
        $this->validator,
        $this->afastamentoRepo,
        $this->ptRepo,
        $this->consolidacaoRepo,
        $this->unidadeRepo,
        $this->usuarioRepo,
    );

    Auth::shouldReceive('id')->andReturn('user-logado');
});

describe('getUnidadeIdsWithSubordinadas (via agentes)', function () {

    test('retorna unidades gerenciadas + subordinadas sem duplicatas', function () {
        $gerenciadas = new Collection([
            (object) ['id' => 'unidade-a'],
            (object) ['id' => 'unidade-b'],
        ]);
        $subordinadas = new Collection([
            (object) ['id' => 'unidade-b'], // duplicata
            (object) ['id' => 'unidade-c'],
        ]);

        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->once()->with('user-logado')->andReturn($gerenciadas);

        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->once()->with(['unidade-a', 'unidade-b'])->andReturn($subordinadas);

        $this->usuarioRepo->shouldReceive('findAgentesVisiveis')
            ->once()
            ->with('user-logado', Mockery::on(function (array $ids) {
                sort($ids);
                return $ids === ['unidade-a', 'unidade-b', 'unidade-c'];
            }))
            ->andReturn(new Collection());

        $this->service->agentes();
    });

    test('retorna apenas gerenciadas quando não há subordinadas', function () {
        $gerenciadas = new Collection([
            (object) ['id' => 'unidade-x'],
        ]);

        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->once()->with('user-logado')->andReturn($gerenciadas);

        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->once()->with(['unidade-x'])->andReturn(new Collection());

        $this->usuarioRepo->shouldReceive('findAgentesVisiveis')
            ->once()
            ->with('user-logado', ['unidade-x'])
            ->andReturn(new Collection());

        $this->service->agentes();
    });

    test('retorna vazio quando usuário não gerencia nenhuma unidade', function () {
        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->once()->with('user-logado')->andReturn(new Collection());

        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->once()->with([])->andReturn(new Collection());

        $this->usuarioRepo->shouldReceive('findAgentesVisiveis')
            ->once()
            ->with('user-logado', [])
            ->andReturn(new Collection());

        $this->service->agentes();
    });
});
