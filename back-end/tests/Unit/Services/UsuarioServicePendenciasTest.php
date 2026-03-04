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
use Illuminate\Database\Eloquent\Collection;
use Mockery;
use Illuminate\Support\Facades\DB;

class UsuarioServicePendenciasTest extends TestCase
{
    protected $service;
    protected $usuarioRepository;
    protected $unidadeRepository;
    protected $planoTrabalhoConsolidacaoRepository;
    protected $planoTrabalhoRepository;
    protected $planoEntregaRepository;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
        $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
        $this->planoTrabalhoConsolidacaoRepository = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
        $this->planoTrabalhoRepository = Mockery::mock(PlanoTrabalhoRepository::class);
        $this->planoEntregaRepository = Mockery::mock(PlanoEntregaRepository::class);
        
        $this->app->instance(UsuarioRepository::class, $this->usuarioRepository);
        $this->app->instance(UnidadeRepository::class, $this->unidadeRepository);
        $this->app->instance(PlanoTrabalhoConsolidacaoRepository::class, $this->planoTrabalhoConsolidacaoRepository);
        $this->app->instance(PlanoTrabalhoRepository::class, $this->planoTrabalhoRepository);
        $this->app->instance(PlanoEntregaRepository::class, $this->planoEntregaRepository);
        
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
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_pendencias_chefe_sem_unidade_especifica()
    {
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
            ->with(['u1', 'u2']) // Deve chamar com IDs de todas as unidades gerenciadas
            ->andReturn(new Collection());

        // Mock Repositories returning empty collections
        $this->planoTrabalhoConsolidacaoRepository->shouldReceive('getPendentesAvaliacao')
            ->once()
            ->with(['u1', 'u2'], $usuarioId, Mockery::any())
            ->andReturn(new Collection());

        $this->planoTrabalhoRepository->shouldReceive('getPlanosTrabalhoAssinatura')
            ->once()
            ->with(['u1', 'u2'], $usuarioId)
            ->andReturn(new Collection());

        $this->planoEntregaRepository->shouldReceive('getPlanosEntregaAvaliacao')->andReturn(new Collection());
        $this->planoEntregaRepository->shouldReceive('getPlanosEntregaHomologacao')->andReturn(new Collection());
        $this->planoEntregaRepository->shouldReceive('getEntregasPlanoEntregaHomologacao')->andReturn(new Collection());

        $result = $this->service->pendenciasChefe($usuarioId, null);
        
        $this->assertIsArray($result);
    }

    public function test_pendencias_chefe_com_unidade_especifica_nao_gerenciada()
    {
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
            
        // Se a unidade solicitada (u3) não está nas gerenciadas (u1), 
        // o código deve usar as gerenciadas (u1) ou filtrar?
        // Analisando o código:
        // $unidades_ids = $unidades->pluck('id')->toArray(); // ['u1']
        // if(!empty($unidade_id) && in_array($unidade_id, $unidades_ids)) { ... }
        // A condição in_array falha. $unidades_ids permanece ['u1'].
        
        $this->unidadeRepository->shouldReceive('getSubordinadas')
            ->once()
            ->with(['u1']) // Deve chamar com u1, ignorando u3
            ->andReturn(new Collection());

        $this->planoTrabalhoConsolidacaoRepository->shouldReceive('getPendentesAvaliacao')
            ->with(['u1'], $usuarioId, Mockery::any())
            ->andReturn(new Collection());

        $this->planoTrabalhoRepository->shouldReceive('getPlanosTrabalhoAssinatura')
            ->with(['u1'], $usuarioId)
            ->andReturn(new Collection());

        $this->planoEntregaRepository->shouldReceive('getPlanosEntregaAvaliacao')->andReturn(new Collection());
        $this->planoEntregaRepository->shouldReceive('getPlanosEntregaHomologacao')->andReturn(new Collection());
        $this->planoEntregaRepository->shouldReceive('getEntregasPlanoEntregaHomologacao')->andReturn(new Collection());

        $result = $this->service->pendenciasChefe($usuarioId, $unidadeId);
        
        $this->assertIsArray($result);
    }
}
