<?php

namespace Tests\IntegrationTenant\Repository;

use App\Models\Entidade;
use App\Models\Cidade;
use App\Models\TipoModalidade;
use App\Models\Feriado;
use App\Repository\EntidadeRepository;
use Tests\DatabaseTenantTestCase;
use Illuminate\Foundation\Testing\WithFaker;

class EntidadeRepositoryTest extends DatabaseTenantTestCase
{
    use WithFaker;

    protected EntidadeRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = app(EntidadeRepository::class);
    }

    public function testFindById()
    {
        $entidade = Entidade::factory()->create();
        
        $found = $this->repository->findById($entidade->id);
        
        $this->assertNotNull($found);
        $this->assertEquals($entidade->id, $found->id);
    }

    public function testFindByIdWithRelations()
    {
        $entidade = Entidade::factory()->create();
        $feriado = Feriado::factory()->create(['entidade_id' => $entidade->id]);
        
        $found = $this->repository->findById($entidade->id, ['feriados']);
        
        $this->assertNotNull($found);
        $this->assertEquals($entidade->id, $found->id);
        $this->assertTrue($found->relationLoaded('feriados'));
        $this->assertTrue($found->feriados->contains($feriado));
    }

    public function testFindBySigla()
    {
        $entidade = Entidade::factory()->create(['sigla' => 'TEST-SIGLA']);
        
        $found = $this->repository->findBySigla('TEST-SIGLA');
        
        $this->assertNotNull($found);
        $this->assertEquals($entidade->id, $found->id);
        $this->assertEquals('TEST-SIGLA', $found->sigla);
    }

    public function testFindBySiglaWithRelations()
    {
        $entidade = Entidade::factory()->create(['sigla' => 'TEST-SIGLA-REL']);
        $feriado = Feriado::factory()->create(['entidade_id' => $entidade->id]);
        
        $found = $this->repository->findBySigla('TEST-SIGLA-REL', ['feriados']);
        
        $this->assertNotNull($found);
        $this->assertEquals($entidade->id, $found->id);
        $this->assertTrue($found->relationLoaded('feriados'));
        $this->assertTrue($found->feriados->contains($feriado));
    }
}
