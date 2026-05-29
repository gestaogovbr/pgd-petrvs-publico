<?php

namespace Tests\IntegrationTenant\Repository;

use App\Enums\StatusEnum;
use App\Models\Entrega;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Repository\PlanoEntregaRepository;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Str;
use Tests\DatabaseTenantTestCase;

class PlanoEntregaRepositoryTest extends DatabaseTenantTestCase
{
    protected PlanoEntregaRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        Bus::fake();
        $this->repository = app(PlanoEntregaRepository::class);
    }

    public function testFindById(): void
    {
        $plano = PlanoEntrega::factory()->create();
        $found = $this->repository->findById($plano->id);
        $this->assertNotNull($found);
        $this->assertSame((string) $plano->id, $found->id);
        $this->assertNull($this->repository->findById(Str::uuid()->toString()));
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

    public function testFindAllParaEnvio(): void
    {
        $incluido = PlanoEntrega::factory()->create();
        $incluido->forceFill(['status' => StatusEnum::INCLUIDO->value])->save();

        $ativo = PlanoEntrega::factory()->create();
        $ativo->forceFill(['status' => StatusEnum::ATIVO->value])->save();

        $deleted = PlanoEntrega::factory()->create();
        $deleted->forceFill(['status' => StatusEnum::ATIVO->value])->save();
        $deleted->delete();

        $ids = [];
        $this->repository->findAllParaEnvio(100, function ($chunk) use (&$ids): void {
            foreach ($chunk as $row) {
                $ids[] = $row->id;
            }
        });

        $this->assertContains($ativo->id, $ids, 'PT não está em status para envio');
        $this->assertNotContains($incluido->id, $ids, 'PT em status INCLUIDO não deveria ser retornado');
        $this->assertNotContains($deleted->id, $ids, 'PT excluído não deveria ser retornado');
    }

    public function testGetPlanosEntregaAvaliacao(): void
    {
        $plano = PlanoEntrega::factory()->create();
        $unidadeId = $plano->unidade_id;
        $plano->forceFill(['status' => StatusEnum::CONCLUIDO->value])->save();
        $outro = PlanoEntrega::factory()->create();
        $outro->forceFill(['status' => StatusEnum::ATIVO->value])->save();

        $result = $this->repository->getPlanosEntregaAvaliacao([$unidadeId]);
        $this->assertTrue($result->pluck('id')->contains($plano->id));
        $this->assertFalse($result->pluck('id')->contains($outro->id));
    }

    public function testGetPlanosEntregaHomologacao(): void
    {
        $plano = PlanoEntrega::factory()->create();
        $unidadeId = $plano->unidade_id;

        $outro = PlanoEntrega::factory()->create();

        PlanoEntrega::withoutEvents(function () use ($plano, $outro) {
            $plano->forceFill(['status' => StatusEnum::HOMOLOGANDO->value])->save();
            $outro->forceFill(['status' => StatusEnum::ATIVO->value])->save();
        });

        $result = $this->repository->getPlanosEntregaHomologacao([$unidadeId]);
        $this->assertTrue($result->pluck('id')->contains($plano->id));
        $this->assertFalse($result->pluck('id')->contains($outro->id));
    }

    public function testRegistrarTentativa(): void
    {
        $plano = PlanoEntrega::factory()->create();
        $this->assertNull($plano->fresh()->data_tentativa_envio);

        $this->repository->registrarTentativa($plano);

        $this->assertNotNull($plano->fresh()->data_tentativa_envio);
    }
}
