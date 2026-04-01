<?php

namespace Tests\IntegrationTenant\Repository;

use App\Enums\StatusEnum;
use App\Models\Entrega;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
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

        $this->assertContains($ativo->id, $ids);
        $this->assertNotContains($incluido->id, $ids);
        $this->assertNotContains($deleted->id, $ids);
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
        $plano->forceFill(['status' => StatusEnum::HOMOLOGANDO->value])->save();
        $outro = PlanoEntrega::factory()->create();
        $outro->forceFill(['status' => StatusEnum::ATIVO->value])->save();

        $result = $this->repository->getPlanosEntregaHomologacao([$unidadeId]);
        $this->assertTrue($result->pluck('id')->contains($plano->id));
        $this->assertFalse($result->pluck('id')->contains($outro->id));
    }

    public function testGetEntregasPlanoEntregaHomologacao(): void
    {
        $plano = PlanoEntrega::factory()->create();
        $plano->forceFill(['status' => StatusEnum::ATIVO->value])->save();

        $entregaTipo = Entrega::query()->create([
            'id' => (string) Str::uuid(),
            'nome' => 'Entrega teste',
            'descricao' => 'Desc',
            'tipo_indicador' => 'QUANTIDADE',
        ]);

        PlanoEntregaEntrega::query()->create([
            'id' => (string) Str::uuid(),
            'plano_entrega_id' => $plano->id,
            'unidade_id' => $plano->unidade_id,
            'entrega_id' => $entregaTipo->id,
            'homologado' => false,
            'realizado' => ['v' => 1],
            'data_inicio' => now(),
            'descricao' => 'Entrega PE',
            'meta' => [],
            'descricao_meta' => 'Meta',
            'descricao_entrega' => 'Título',
        ]);

        $result = $this->repository->getEntregasPlanoEntregaHomologacao([$plano->unidade_id]);
        $this->assertCount(1, $result);
        $this->assertSame($plano->id, $result->first()->plano_entrega_id);
    }

    public function testGetEntregasPlanoEntregaExecucao(): void
    {
        $plano = PlanoEntrega::factory()->create();
        $plano->forceFill([
            'status' => StatusEnum::ATIVO->value,
            'data_fim' => now()->subDays(40),
        ])->save();

        $entregaTipo = Entrega::query()->create([
            'id' => (string) Str::uuid(),
            'nome' => 'Entrega exec',
            'descricao' => 'Desc',
            'tipo_indicador' => 'QUANTIDADE',
        ]);

        PlanoEntregaEntrega::query()->create([
            'id' => (string) Str::uuid(),
            'plano_entrega_id' => $plano->id,
            'unidade_id' => $plano->unidade_id,
            'entrega_id' => $entregaTipo->id,
            'homologado' => false,
            'realizado' => null,
            'data_inicio' => now()->subDays(50),
            'descricao' => 'Sem progresso',
            'meta' => [],
            'descricao_meta' => 'Meta',
            'descricao_entrega' => 'Título',
        ]);

        $result = $this->repository->getEntregasPlanoEntregaExecucao([$plano->unidade_id]);
        $this->assertCount(1, $result);
        $this->assertSame($plano->id, $result->first()->plano_entrega_id);
    }

    public function testRegistrarTentativa(): void
    {
        $plano = PlanoEntrega::factory()->create();
        $this->assertNull($plano->fresh()->data_tentativa_envio);

        $this->repository->registrarTentativa($plano);

        $this->assertNotNull($plano->fresh()->data_tentativa_envio);
    }
}
