<?php

namespace Tests\IntegrationTenant\Repository;

use App\Models\PlanoEntrega;
use App\Repository\PlanoEntregaRepository;
use Illuminate\Support\Str;
use Tests\DatabaseTenantTestCase;

class PlanoEntregaRepositoryTest extends DatabaseTenantTestCase
{
    protected PlanoEntregaRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = app(PlanoEntregaRepository::class);
    }

    public function testFindOneParaEnvioRetornaNullQuandoIdInexistente(): void
    {
        $this->assertNull($this->repository->findOneParaEnvio(Str::uuid()->toString()));
    }

    public function testFindOneParaEnvioCarregaRelacoesNecessarias(): void
    {
        $plano = PlanoEntrega::factory()->create();

        $result = $this->repository->findOneParaEnvio($plano->id);

        $this->assertNotNull($result);
        $this->assertSame((string) $plano->id, $result->id);
        $this->assertTrue($result->relationLoaded('programa'));
        $this->assertTrue($result->relationLoaded('unidade'));
        $this->assertTrue($result->relationLoaded('entregas'));
        $this->assertTrue($result->programa->relationLoaded('unidade'));
        if ($result->entregas->isNotEmpty()) {
            $this->assertTrue($result->entregas->first()->relationLoaded('unidade'));
        }
    }
}
