<?php

namespace Tests\IntegrationTenant\Repository;

use App\Models\PlanoTrabalho;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\PlanoTrabalhoRepository;
use Tests\DatabaseTenantTestCase;
use App\Enums\StatusEnum;
use App\Models\TipoModalidade;
use App\Models\Perfil;

class PlanoTrabalhoRepositoryTest extends DatabaseTenantTestCase
{
    protected PlanoTrabalhoRepository $repository;
    protected string $tipoModalidadeId;
    protected string $perfilId;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = app(PlanoTrabalhoRepository::class);

        // Create prerequisites
        $this->tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial'])->id;
        $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão'])->id;
    }

    public function testGetPlanosTrabalhoAssinatura()
    {
        $unidade = Unidade::factory()->create();
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $outroUsuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);

        // Plano waiting for signature, correct unit, different user
        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $outroUsuario->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId
        ]);

        // Plano waiting for signature, correct unit, same user (should be excluded)
        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $usuario->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId
        ]);

        // Plano not waiting for signature
        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $outroUsuario->id,
            'status' => StatusEnum::ATIVO->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId
        ]);

        $result = $this->repository->getPlanosTrabalhoAssinatura([$unidade->id], $usuario->id);
        
        $this->assertCount(1, $result);
        $this->assertEquals($outroUsuario->id, $result->first()->usuario_id);
    }
}
