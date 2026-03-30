<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\UsuarioService;
use App\Repository\UsuarioRepository;
use App\Repository\UnidadeRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\PlanoEntregaRepository;
use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Mockery;
use Illuminate\Support\Facades\Auth;

uses(TestCase::class);

beforeEach(function () {
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $this->planoTrabalhoConsolidacaoRepository = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->planoTrabalhoRepository = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->planoEntregaRepository = Mockery::mock(PlanoEntregaRepository::class);
    
    // Mock DB facade
    DB::shouldReceive('beginTransaction')->byDefault();
    DB::shouldReceive('commit')->byDefault();
    DB::shouldReceive('rollback')->byDefault();

    $this->service = Mockery::mock(UsuarioService::class)->makePartial();
    $this->service->shouldAllowMockingProtectedMethods();
    
    // Inject repositories via Reflection
    $reflection = new \ReflectionClass(UsuarioService::class);
    
    $repos = [
        'usuarioRepository' => $this->usuarioRepository,
        'unidadeRepository' => $this->unidadeRepository,
        'planoTrabalhoConsolidacaoRepository' => $this->planoTrabalhoConsolidacaoRepository,
        'planoTrabalhoRepository' => $this->planoTrabalhoRepository,
        'planoEntregaRepository' => $this->planoEntregaRepository,
    ];

    foreach ($repos as $propName => $mock) {
        if ($reflection->hasProperty($propName)) {
            $prop = $reflection->getProperty($propName);
            $prop->setAccessible(true);
            $prop->setValue($this->service, $mock);
        }
    }
});

afterEach(function () {
    Mockery::close();
});

test('pendencias chefe sem unidade especifica', function () {
    $usuarioId = 'user-123';
    
    // Mock Unidades Gerenciadas (2 unidades)
    $unidade1 = Mockery::mock(Unidade::class);
    $unidade1->shouldReceive('getAttribute')->with('id')->andReturn('u1');
    $unidade1->shouldReceive('offsetExists')->with('id')->andReturn(true);
    $unidade1->shouldReceive('offsetGet')->with('id')->andReturn('u1');
    
    $unidade2 = Mockery::mock(Unidade::class);
    $unidade2->shouldReceive('getAttribute')->with('id')->andReturn('u2');
    $unidade2->shouldReceive('offsetExists')->with('id')->andReturn(true);
    $unidade2->shouldReceive('offsetGet')->with('id')->andReturn('u2');
    
    $unidadesGerenciadas = new Collection([$unidade1, $unidade2]);
    
    $this->unidadeRepository->shouldReceive('getUnidadesGerenciadas')
        ->once()
        ->with($usuarioId)
        ->andReturn($unidadesGerenciadas);
        
    // Mock Subordinadas
    $this->unidadeRepository->shouldReceive('getSubordinadas')
        ->once()
        ->with(['u1', 'u2'])
        ->andReturn(new Collection());

    // Mock Repositories returning empty collections
    $this->planoTrabalhoConsolidacaoRepository->shouldReceive('getPendentesAvaliacao')
        ->once()
        ->with(['u1', 'u2'], [], $usuarioId, Mockery::any())
        ->andReturn(new Collection());

    $this->planoTrabalhoRepository->shouldReceive('getPlanosTrabalhoAssinatura')
        ->once()
        ->with(['u1', 'u2'], [], $usuarioId)
        ->andReturn(new Collection());

    $this->planoEntregaRepository->shouldReceive('getPlanosEntregaAvaliacao')->andReturn(new Collection());
    $this->planoEntregaRepository->shouldReceive('getPlanosEntregaHomologacao')->andReturn(new Collection());
    $this->planoEntregaRepository->shouldReceive('getEntregasPlanoEntregaHomologacao')->andReturn(new Collection());
    $this->planoEntregaRepository->shouldReceive('getEntregasPlanoEntregaExecucao')->andReturn(new Collection());

    $result = $this->service->pendenciasChefe($usuarioId, null);
    
    expect($result)->toBeArray();
});

test('pendencias chefe com unidade especifica nao gerenciada', function () {
    $usuarioId = 'user-123';
    $unidadeId = 'u3'; // Unidade não gerenciada pelo usuário
    
    // Mock Unidades Gerenciadas (apenas u1)
    $unidade1 = Mockery::mock(Unidade::class);
    $unidade1->shouldReceive('getAttribute')->with('id')->andReturn('u1');
    $unidade1->shouldReceive('offsetExists')->with('id')->andReturn(true);
    $unidade1->shouldReceive('offsetGet')->with('id')->andReturn('u1');
    
    $unidadesGerenciadas = new Collection([$unidade1]);
    
    $this->unidadeRepository->shouldReceive('getUnidadesGerenciadas')
        ->once()
        ->with($usuarioId)
        ->andReturn($unidadesGerenciadas);
        
    $this->unidadeRepository->shouldReceive('getSubordinadas')
        ->once()
        ->with(['u1'])
        ->andReturn(new Collection());

    $this->planoTrabalhoConsolidacaoRepository->shouldReceive('getPendentesAvaliacao')
        ->with(['u1'], [], $usuarioId, Mockery::any())
        ->andReturn(new Collection());

    $this->planoTrabalhoRepository->shouldReceive('getPlanosTrabalhoAssinatura')
        ->with(['u1'], [], $usuarioId)
        ->andReturn(new Collection());

    $this->planoEntregaRepository->shouldReceive('getPlanosEntregaAvaliacao')->andReturn(new Collection());
    $this->planoEntregaRepository->shouldReceive('getPlanosEntregaHomologacao')->andReturn(new Collection());
    $this->planoEntregaRepository->shouldReceive('getEntregasPlanoEntregaHomologacao')->andReturn(new Collection());
    $this->planoEntregaRepository->shouldReceive('getEntregasPlanoEntregaExecucao')->andReturn(new Collection());

    $result = $this->service->pendenciasChefe($usuarioId, $unidadeId);
    
    expect($result)->toBeArray();
});

test('pendencias chefe inclui subordinadas para planos de trabalho e registros de execução', function () {
    $usuarioId = 'user-123';

    $unidade1 = Mockery::mock(Unidade::class);
    $unidade1->shouldReceive('getAttribute')->with('id')->andReturn('u1');
    $unidade1->shouldReceive('offsetExists')->with('id')->andReturn(true);
    $unidade1->shouldReceive('offsetGet')->with('id')->andReturn('u1');

    $unidadesGerenciadas = new Collection([$unidade1]);

    $this->unidadeRepository->shouldReceive('getUnidadesGerenciadas')
        ->once()
        ->with($usuarioId)
        ->andReturn($unidadesGerenciadas);

    $sub1 = Mockery::mock(Unidade::class);
    $sub1->shouldReceive('getAttribute')->with('id')->andReturn('u2');
    $sub1->shouldReceive('offsetExists')->with('id')->andReturn(true);
    $sub1->shouldReceive('offsetGet')->with('id')->andReturn('u2');

    $sub2 = Mockery::mock(Unidade::class);
    $sub2->shouldReceive('getAttribute')->with('id')->andReturn('u3');
    $sub2->shouldReceive('offsetExists')->with('id')->andReturn(true);
    $sub2->shouldReceive('offsetGet')->with('id')->andReturn('u3');

    $this->unidadeRepository->shouldReceive('getSubordinadas')
        ->once()
        ->with(['u1'])
        ->andReturn(new Collection([$sub1, $sub2]));

    $this->planoTrabalhoConsolidacaoRepository->shouldReceive('getPendentesAvaliacao')
        ->once()
        ->with(['u1'], ['u2', 'u3'], $usuarioId, Mockery::any())
        ->andReturn(new Collection());

    $this->planoTrabalhoRepository->shouldReceive('getPlanosTrabalhoAssinatura')
        ->once()
        ->with(['u1'], ['u2', 'u3'], $usuarioId)
        ->andReturn(new Collection());

    $this->planoEntregaRepository->shouldReceive('getPlanosEntregaAvaliacao')
        ->once()
        ->with(['u2', 'u3'])
        ->andReturn(new Collection());
    $this->planoEntregaRepository->shouldReceive('getPlanosEntregaHomologacao')
        ->once()
        ->with(['u2', 'u3'])
        ->andReturn(new Collection());
    $this->planoEntregaRepository->shouldReceive('getEntregasPlanoEntregaExecucao')
        ->once()
        ->with(['u2', 'u3'])
        ->andReturn(new Collection());
    $this->planoEntregaRepository->shouldReceive('getEntregasPlanoEntregaHomologacao')->andReturn(new Collection());

    $result = $this->service->pendenciasChefe($usuarioId, null);

    expect($result)->toBeArray();
});
