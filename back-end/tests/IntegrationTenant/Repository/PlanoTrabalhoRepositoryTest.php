<?php

namespace Tests\IntegrationTenant\Repository;

use App\Enums\StatusEnum;
use App\Models\Perfil;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Repository\PlanoTrabalhoRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Str;
use Tests\DatabaseTenantTestCase;
use App\Enums\StatusEnum;
use App\Models\Perfil;

class PlanoTrabalhoRepositoryTest extends DatabaseTenantTestCase
{
    protected PlanoTrabalhoRepository $repository;
    protected string $perfilId;

    protected function setUp(): void
    {
        parent::setUp();
        Bus::fake();
        $this->repository = app(PlanoTrabalhoRepository::class);

        $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão'])->id;
    }

    public function testGetPlanosTrabalhoAssinatura()
    {
        $unidade = Unidade::factory()->create();
        $usuario = Usuario::factory()->create([
            'modalidade_pgd' => 'presencial',
            'perfil_id' => $this->perfilId
        ]);
        $outroUsuario = Usuario::factory()->create([
            'modalidade_pgd' => 'presencial',
            'perfil_id' => $this->perfilId
        ]);

        // Plano waiting for signature, correct unit, different user
        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $outroUsuario->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'modalidade_pgd' => 'presencial'
        ]);

        // Plano waiting for signature, correct unit, same user (should be excluded)
        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $usuario->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'modalidade_pgd' => 'presencial'
        ]);

        // Plano not waiting for signature
        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $outroUsuario->id,
            'status' => StatusEnum::ATIVO->value,
            'modalidade_pgd' => 'presencial'
        ]);

        $result = $this->repository->getPlanosTrabalhoAssinatura([$unidade->id], [], $usuario->id);

        $this->assertCount(1, $result);
        $this->assertEquals($outroUsuario->id, $result->first()->usuario_id);
    }

    public function testGetPlanosTrabalhoAssinaturaNaoIncluiPlanoDoGestorTitularParaChefeSubstituto()
    {
        $unidade = Unidade::factory()->create();

        $gestorTitular = Usuario::factory()->create([
            'modalidade_pgd' => 'presencial',
            'perfil_id' => $this->perfilId
        ]);
        $gestorSubstituto = Usuario::factory()->create([
            'modalidade_pgd' => 'presencial',
            'perfil_id' => $this->perfilId
        ]);
        $participante = Usuario::factory()->create([
            'modalidade_pgd' => 'presencial',
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
            'modalidade_pgd' => 'presencial'
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $participante->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'modalidade_pgd' => 'presencial'
        ]);

        $result = $this->repository->getPlanosTrabalhoAssinatura([$unidade->id], [], $gestorSubstituto->id);

        $this->assertCount(1, $result);
        $this->assertEquals($participante->id, $result->first()->usuario_id);
    }

    public function testGetPlanosTrabalhoAssinaturaIncluiPlanoDoGestorTitularQuandoUsuarioNaoEhChefeSubstituto()
    {
        $unidade = Unidade::factory()->create();

        $gestorTitular = Usuario::factory()->create([
            'modalidade_pgd' => 'presencial',
            'perfil_id' => $this->perfilId
        ]);
        $outroUsuario = Usuario::factory()->create([
            'modalidade_pgd' => 'presencial',
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
            'modalidade_pgd' => 'presencial'
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $outroUsuario->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'modalidade_pgd' => 'presencial'
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
            'modalidade_pgd' => 'presencial',
            'perfil_id' => $this->perfilId
        ]);
        $titularSubordinada = Usuario::factory()->create([
            'modalidade_pgd' => 'presencial',
            'perfil_id' => $this->perfilId
        ]);
        $participanteSubordinada = Usuario::factory()->create([
            'modalidade_pgd' => 'presencial',
            'perfil_id' => $this->perfilId
        ]);
        $participanteSuperior = Usuario::factory()->create([
            'modalidade_pgd' => 'presencial',
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
            'modalidade_pgd' => 'presencial'
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidadeSubordinada->id,
            'usuario_id' => $titularSubordinada->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'modalidade_pgd' => 'presencial'
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidadeSubordinada->id,
            'usuario_id' => $participanteSubordinada->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'modalidade_pgd' => 'presencial'
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
        $this->assertCount(1, $result->entregas);
        $this->assertCount(1, $result->consolidacoes);
        $this->assertSame($consolidacaoAvaliada->id, $result->consolidacoes->first()->id);
    }

    public function testFindById(): void
    {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);
        $found = $this->repository->findById($plano->id);
        $this->assertNotNull($found);
        $this->assertSame($plano->id, $found->id);
        $this->assertNull($this->repository->findById(Str::uuid()->toString()));
    }

    public function testPlanosAtivos(): void
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $ativo = PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addMonth(),
            'status' => StatusEnum::ATIVO->value,
        ]);
        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => now()->addMonth(),
            'data_fim' => now()->addMonths(2),
            'status' => StatusEnum::ATIVO->value,
        ]);

        $result = $this->repository->planosAtivos($usuario->id);
        $this->assertCount(1, $result);
        $this->assertSame($ativo->id, $result->first()->id);
    }

    public function testPlanosAtivosPorData(): void
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $dentro = PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-12-31',
            'status' => StatusEnum::ATIVO->value,
        ]);
        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => '2026-01-01',
            'data_fim' => '2026-12-31',
            'status' => StatusEnum::ATIVO->value,
        ]);

        $result = $this->repository->planosAtivosPorData('2025-06-01', '2025-06-30', $usuario->id);
        $this->assertCount(1, $result);
        $this->assertSame($dentro->id, $result->first()->id);
    }

    public function testBuscarPlanosPendentes(): void
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $referencia = PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'status' => StatusEnum::ATIVO->value,
            'data_fim' => '2025-03-01',
        ]);
        $pendente = PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
            'data_fim' => '2025-02-01',
        ]);
        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'status' => StatusEnum::INCLUIDO->value,
            'data_fim' => '2025-01-01',
        ]);

        $result = $this->repository->buscarPlanosPendentes($usuario->id, $referencia->id, '2025-03-15');
        $this->assertCount(1, $result);
        $this->assertSame($pendente->id, $result->first()->id);
    }

    public function testChunkEnviosPendentes(): void
    {
        $incluido = PlanoTrabalho::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'status' => StatusEnum::INCLUIDO->value,
            'data_agendamento_envio' => now(),
            'data_envio_api_pgd' => null,
        ]);
        $pendente = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_agendamento_envio' => Carbon::now()->subHour(),
            'data_envio_api_pgd' => null,
        ]);
        $jaEnviado = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_agendamento_envio' => Carbon::now()->subDays(2),
            'data_conclusao_envio' => Carbon::now()->subDay(),
            'data_envio_api_pgd' => Carbon::now()->subDay(),
        ]);

        $ids = [];
        $this->repository->chunkEnviosPendentes(100, function ($chunk) use (&$ids): void {
            foreach ($chunk as $plano) {
                $ids[] = $plano->id;
            }
        });

        $this->assertContains($pendente->id, $ids);
        $this->assertNotContains($incluido->id, $ids);
        $this->assertNotContains($jaEnviado->id, $ids);
    }

    public function testRegistrarTentativa(): void
    {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);
        $this->assertNull($plano->fresh()->data_tentativa_envio);

        $this->repository->registrarTentativa($plano);

        $this->assertNotNull($plano->fresh()->data_tentativa_envio);
    }
}
