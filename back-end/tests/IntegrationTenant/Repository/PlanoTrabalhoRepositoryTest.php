<?php

namespace Tests\IntegrationTenant\Repository;

use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Repository\PlanoTrabalhoRepository;
use Tests\DatabaseTenantTestCase;
use App\Enums\StatusEnum;
use App\Models\TipoModalidade;
use App\Models\Perfil;
use Illuminate\Support\Str;

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

        $result = $this->repository->getPlanosTrabalhoAssinatura([$unidade->id], [], $usuario->id);
        
        $this->assertCount(1, $result);
        $this->assertEquals($outroUsuario->id, $result->first()->usuario_id);
    }

    public function testGetPlanosTrabalhoAssinaturaNaoIncluiPlanoDoGestorTitularParaChefeSubstituto()
    {
        $unidade = Unidade::factory()->create();

        $gestorTitular = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $gestorSubstituto = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $participante = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);

        $integranteTitular = UnidadeIntegrante::query()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $gestorTitular->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => $integranteTitular->id,
        ]);

        $integranteSubstituto = UnidadeIntegrante::query()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $gestorSubstituto->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'GESTOR_SUBSTITUTO',
            'unidade_integrante_id' => $integranteSubstituto->id,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $gestorTitular->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $participante->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId
        ]);

        $result = $this->repository->getPlanosTrabalhoAssinatura([$unidade->id], [], $gestorSubstituto->id);

        $this->assertCount(1, $result);
        $this->assertEquals($participante->id, $result->first()->usuario_id);
    }

    public function testGetPlanosTrabalhoAssinaturaIncluiPlanoDoGestorTitularQuandoUsuarioNaoEhChefeSubstituto()
    {
        $unidade = Unidade::factory()->create();

        $gestorTitular = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $outroUsuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);

        $integranteTitular = UnidadeIntegrante::query()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $gestorTitular->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => $integranteTitular->id,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $gestorTitular->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $outroUsuario->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId
        ]);

        $result = $this->repository->getPlanosTrabalhoAssinatura([$unidade->id], [], 'usuario-qualquer');

        $this->assertCount(2, $result);
        $this->assertTrue($result->pluck('usuario_id')->contains($gestorTitular->id));
        $this->assertTrue($result->pluck('usuario_id')->contains($outroUsuario->id));
    }

    public function testGetPlanosTrabalhoAssinaturaIncluiApenasGestorTitularDasSubordinadas()
    {
        $unidadeSuperior = Unidade::factory()->create();
        $unidadeSubordinada = Unidade::factory()->create(['unidade_pai_id' => $unidadeSuperior->id]);

        $usuarioLogado = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $titularSubordinada = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $participanteSubordinada = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $participanteSuperior = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);

        $integranteTitularSub = UnidadeIntegrante::query()->create([
            'unidade_id' => $unidadeSubordinada->id,
            'usuario_id' => $titularSubordinada->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => $integranteTitularSub->id,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidadeSuperior->id,
            'usuario_id' => $participanteSuperior->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidadeSubordinada->id,
            'usuario_id' => $titularSubordinada->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidadeSubordinada->id,
            'usuario_id' => $participanteSubordinada->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId
        ]);

        $result = $this->repository->getPlanosTrabalhoAssinatura(
            [$unidadeSuperior->id],
            [$unidadeSubordinada->id],
            $usuarioLogado->id
        );

        $this->assertCount(2, $result);
        $this->assertTrue($result->pluck('usuario_id')->contains($participanteSuperior->id));
        $this->assertTrue($result->pluck('usuario_id')->contains($titularSubordinada->id));
        $this->assertFalse($result->pluck('usuario_id')->contains($participanteSubordinada->id));
    }

    public function testFindAllParaEnvio(): void
    {
        $incluido = PlanoTrabalho::factory()->create([
            'status' => StatusEnum::INCLUIDO->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);
        $ativo = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);
        $deleted = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);
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

    public function testFindOneParaEnvioRetornaNullQuandoIdInexistente(): void
    {
        $this->assertNull($this->repository->findOneParaEnvio(Str::uuid()->toString()));
    }

    public function testFindOneParaEnvioCarregaRelacoesEFiltraConsolidacoesAvaliadas(): void
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        PlanoTrabalhoEntrega::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'plano_entrega_entrega_id' => null,
        ]);

        PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => StatusEnum::INCLUIDO->value,
        ]);
        $consolidacaoAvaliada = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => StatusEnum::AVALIADO->value,
        ]);

        $result = $this->repository->findOneParaEnvio($plano->id);

        $this->assertNotNull($result);
        $this->assertSame($plano->id, $result->id);
        $this->assertTrue($result->relationLoaded('programa'));
        $this->assertTrue($result->relationLoaded('usuario'));
        $this->assertTrue($result->relationLoaded('entregas'));
        $this->assertTrue($result->relationLoaded('consolidacoes'));
        $this->assertCount(1, $result->entregas);
        $this->assertCount(1, $result->consolidacoes);
        $this->assertSame($consolidacaoAvaliada->id, $result->consolidacoes->first()->id);
    }
}
