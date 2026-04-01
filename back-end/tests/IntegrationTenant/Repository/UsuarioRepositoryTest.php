<?php

namespace Tests\IntegrationTenant\Repository;

use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Programa;
use App\Models\ProgramaParticipante;
use App\Repository\UsuarioRepository;
use Tests\DatabaseTenantTestCase;
use App\Enums\ModalidadeParticipacaoEnum;
use Illuminate\Support\Facades\DB;
use App\Models\Documento;
use App\Models\DocumentoAssinatura;
use App\Models\Entidade;
use App\Models\PlanoTrabalho;
use App\Models\TipoModalidade;
use App\Models\Perfil;
use App\Enums\UsuarioSituacaoSiape;
use Illuminate\Support\Str;

class UsuarioRepositoryTest extends DatabaseTenantTestCase
{
    protected UsuarioRepository $repository;
    protected string $tipoModalidadeId;
    protected string $perfilId;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = app(UsuarioRepository::class);

        // Create prerequisites
        $this->tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial'])->id;
        $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão'])->id;
    }

    public function testFindById()
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $found = $this->repository->findById($usuario->id);
        $this->assertEquals($usuario->id, $found->id);
    }

    public function testFindByCpfOrEmail()
    {
        $cpf = str_pad((string) random_int(1, 99999999999), 11, '0', STR_PAD_LEFT);
        $email = 'teste-' . uniqid() . '@example.com';
        $usuario = Usuario::factory()->create([
            'cpf' => $cpf, 
            'email' => $email,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);

        $foundCpf = $this->repository->findByCpfOrEmail($cpf, 'other@example.com');
        $this->assertEquals($usuario->id, $foundCpf->id);

        $foundEmail = $this->repository->findByCpfOrEmail('00000000000', $email);
        $this->assertEquals($usuario->id, $foundEmail->id);
    }

    public function testIsParticipanteHabilitado()
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $programa = Programa::factory()->create();
        
        // Not linked
        $this->assertFalse($this->repository->isParticipanteHabilitado($usuario->id, $programa->id));

        // Linked but disabled
        ProgramaParticipante::factory()->create([
            'usuario_id' => $usuario->id,
            'programa_id' => $programa->id,
            'habilitado' => false
        ]);
        $this->assertFalse($this->repository->isParticipanteHabilitado($usuario->id, $programa->id));

        // Linked and enabled
        ProgramaParticipante::where('usuario_id', $usuario->id)
            ->where('programa_id', $programa->id)
            ->update(['habilitado' => true]);
            
        $this->assertTrue($this->repository->isParticipanteHabilitado($usuario->id, $programa->id));
    }

    public function testIsIntegrante()
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $unidade = Unidade::factory()->create();

        // Not integrante
        $this->assertFalse($this->repository->isIntegrante($usuario->id, $unidade->id, 'GESTOR'));

        // Integrante but different atribuicao
        $integrante = new UnidadeIntegrante();
        $integrante->usuario_id = $usuario->id;
        $integrante->unidade_id = $unidade->id;
        $integrante->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->unidade_integrante_id = $integrante->id;
        $atribuicao->atribuicao = 'LOTADO';
        $atribuicao->save();

        $this->assertFalse($this->repository->isIntegrante($usuario->id, $unidade->id, 'GESTOR'));
        $this->assertTrue($this->repository->isIntegrante($usuario->id, $unidade->id, 'LOTADO'));
    }

    public function testGetAtribuicoes()
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $unidade = Unidade::factory()->create();

        $integrante = new UnidadeIntegrante();
        $integrante->usuario_id = $usuario->id;
        $integrante->unidade_id = $unidade->id;
        $integrante->save();

        $atribuicao1 = new UnidadeIntegranteAtribuicao();
        $atribuicao1->unidade_integrante_id = $integrante->id;
        $atribuicao1->atribuicao = 'LOTADO';
        $atribuicao1->save();

        // Use a valid enum value for the second attribution
        // Assuming 'AVALIADOR_PLANO_TRABALHO' is a valid value based on previous experience
        $atribuicao2 = new UnidadeIntegranteAtribuicao();
        $atribuicao2->unidade_integrante_id = $integrante->id;
        $atribuicao2->atribuicao = 'AVALIADOR_PLANO_TRABALHO';
        $atribuicao2->save();

        $atribuicoes = $this->repository->getAtribuicoes($usuario->id, $unidade->id);
        $this->assertCount(2, $atribuicoes);
        $this->assertContains('LOTADO', $atribuicoes);
        $this->assertContains('AVALIADOR_PLANO_TRABALHO', $atribuicoes);
    }

    public function testIsLotacao()
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $unidade = Unidade::factory()->create();

        $this->assertFalse($this->repository->isLotacao($usuario->id, $unidade->id));

        $integrante = new UnidadeIntegrante();
        $integrante->usuario_id = $usuario->id;
        $integrante->unidade_id = $unidade->id;
        $integrante->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->unidade_integrante_id = $integrante->id;
        $atribuicao->atribuicao = 'LOTADO';
        $atribuicao->save();

        $this->assertTrue($this->repository->isLotacao($usuario->id, $unidade->id));
    }

    public function testFindAllSemMatricula()
    {
        Usuario::factory()->create([
            'matricula' => '12345',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $semMatricula = Usuario::factory()->create([
            'matricula' => null,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);

        $result = $this->repository->findAllSemMatricula();
        $this->assertTrue($result->contains('id', $semMatricula->id));
        $this->assertFalse($result->contains('matricula', '12345'));
    }

    public function testFindByCpfAndLotacao()
    {
        $cpf = '99988877766';
        $usuario = Usuario::factory()->create([
            'cpf' => $cpf,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $unidade = Unidade::factory()->create();

        $integrante = new UnidadeIntegrante();
        $integrante->usuario_id = $usuario->id;
        $integrante->unidade_id = $unidade->id;
        $integrante->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->unidade_integrante_id = $integrante->id;
        $atribuicao->atribuicao = 'LOTADO';
        $atribuicao->save();

        $found = $this->repository->findByCpfAndLotacao($cpf, $unidade->id);
        $this->assertEquals($usuario->id, $found->id);

        $notFound = $this->repository->findByCpfAndLotacao('00000000000', $unidade->id);
        $this->assertNull($notFound);
    }

    public function testFindAllByCpf()
    {
        $cpf = '11122233344';
        Usuario::factory()->count(2)->create([
            'cpf' => $cpf,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        Usuario::factory()->create([
            'cpf' => '99999999999',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);

        $result = $this->repository->findAllByCpf($cpf);
        $this->assertCount(2, $result);
    }

    public function testGetUnidadesVinculadas()
    {
        $cpf = '55566677788';
        $usuario = Usuario::factory()->create([
            'cpf' => $cpf,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ]);
        $unidade1 = Unidade::factory()->create();
        $unidade2 = Unidade::factory()->create();

        $integrante1 = new UnidadeIntegrante();
        $integrante1->usuario_id = $usuario->id;
        $integrante1->unidade_id = $unidade1->id;
        $integrante1->save();

        $atribuicao1 = new UnidadeIntegranteAtribuicao();
        $atribuicao1->unidade_integrante_id = $integrante1->id;
        $atribuicao1->atribuicao = 'LOTADO';
        $atribuicao1->save();

        $integrante2 = new UnidadeIntegrante();
        $integrante2->usuario_id = $usuario->id;
        $integrante2->unidade_id = $unidade2->id;
        $integrante2->save();

        $atribuicao2 = new UnidadeIntegranteAtribuicao();
        $atribuicao2->unidade_integrante_id = $integrante2->id;
        $atribuicao2->atribuicao = 'COLABORADOR';
        $atribuicao2->save();

        $unidades = $this->repository->getUnidadesVinculadas($cpf);
        $this->assertCount(2, $unidades);
    }

    public function testCreateAndUpdate()
    {
        $attributes = [
            'nome' => 'Novo Usuário',
            'cpf' => '12312312312',
            'email' => 'novo@example.com',
            'matricula' => '654321',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ];

        $usuario = $this->repository->create($attributes);
        $this->assertDatabaseHas('usuarios', ['email' => 'novo@example.com']);

        $updated = $this->repository->update($usuario->id, ['nome' => 'Nome Atualizado']);
        $this->assertEquals('Nome Atualizado', $updated->nome);
    }

    public function testFindOneParaEnvioRetornaNullQuandoIdInexistente(): void
    {
        $this->assertNull($this->repository->findOneParaEnvio(Str::uuid()->toString()));
    }

    public function testFindOneParaEnvioIncluiApenasUnidadesIntegrantesComAtribuicaoLotada(): void
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $unidadeLotada = Unidade::factory()->create();
        $unidadeGestor = Unidade::factory()->create();

        $integranteLotado = UnidadeIntegrante::query()->create([
            'unidade_id' => $unidadeLotada->id,
            'usuario_id' => $usuario->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'unidade_integrante_id' => $integranteLotado->id,
            'atribuicao' => 'LOTADO',
        ]);

        $integranteGestor = UnidadeIntegrante::query()->create([
            'unidade_id' => $unidadeGestor->id,
            'usuario_id' => $usuario->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'unidade_integrante_id' => $integranteGestor->id,
            'atribuicao' => 'GESTOR',
        ]);

        $result = $this->repository->findOneParaEnvio($usuario->id);

        $this->assertNotNull($result);
        $this->assertSame($usuario->id, $result->id);
        $this->assertTrue($result->relationLoaded('unidadesIntegrantes'));
        $this->assertCount(1, $result->unidadesIntegrantes);
        $this->assertSame($integranteLotado->id, $result->unidadesIntegrantes->first()->id);
    }

    public function testFindByMatricula(): void
    {
        $matricula = 'MAT-' . uniqid();
        $usuario = Usuario::factory()->create([
            'matricula' => $matricula,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);

        $found = $this->repository->findByMatricula($matricula);
        $this->assertNotNull($found);
        $this->assertSame($usuario->id, $found->id);
        $this->assertNull($this->repository->findByMatricula('inexistente'));
    }

    public function testFindByEmail(): void
    {
        $email = 'email-' . uniqid() . '@example.com';
        $usuario = Usuario::factory()->create([
            'email' => $email,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);

        $found = $this->repository->findByEmail($email);
        $this->assertNotNull($found);
        $this->assertSame($usuario->id, $found->id);
    }

    public function testFindByCpf(): void
    {
        $cpf = str_pad((string) random_int(1, 99999999999), 11, '0', STR_PAD_LEFT);
        $usuario = Usuario::factory()->create([
            'cpf' => $cpf,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);

        $found = $this->repository->findByCpf($cpf);
        $this->assertNotNull($found);
        $this->assertSame($usuario->id, $found->id);
    }

    public function testFindActivesByCpf(): void
    {
        $cpfAtivo = str_pad((string) random_int(1, 99999999999), 11, '0', STR_PAD_LEFT);
        $ativo = Usuario::factory()->create([
            'cpf' => $cpfAtivo,
            'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $cpfInativo = str_pad((string) random_int(1, 99999999999), 11, '0', STR_PAD_LEFT);
        Usuario::factory()->create([
            'cpf' => $cpfInativo,
            'situacao_siape' => UsuarioSituacaoSiape::INATIVO->value,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);

        $ativos = $this->repository->findActivesByCpf($cpfAtivo);
        $this->assertCount(1, $ativos);
        $this->assertSame($ativo->id, $ativos->first()->id);

        $this->assertCount(0, $this->repository->findActivesByCpf($cpfInativo));
    }

    public function testNewUsuario(): void
    {
        $u = $this->repository->newUsuario(['nome' => 'Instância nova']);
        $this->assertInstanceOf(Usuario::class, $u);
        $this->assertSame('Instância nova', $u->nome);
        $this->assertFalse($u->exists);
    }

    public function testDelete(): void
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $this->assertTrue($this->repository->delete($usuario->id));
        $this->assertSoftDeleted('usuarios', ['id' => $usuario->id]);
    }

    public function testRestore(): void
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $usuario->delete();
        $this->assertTrue($this->repository->restore($usuario->id));
        $this->assertDatabaseHas('usuarios', ['id' => $usuario->id, 'deleted_at' => null]);
    }

    public function testRegistrarTentativa(): void
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $this->assertNull($usuario->fresh()->data_tentativa_envio);

        $this->repository->registrarTentativa($usuario);

        $this->assertNotNull($usuario->fresh()->data_tentativa_envio);
    }

    public function testFindAllParaEnvioIncluiUsuarioComPlanoTrabalhoEDocumentoAssinatura(): void
    {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        PlanoTrabalho::factory()->ativo()->create([
            'usuario_id' => $usuario->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);
        $documento = Documento::query()->create([
            'id' => (string) Str::uuid(),
            'numero' => random_int(2000000, 2999999),
            'titulo' => 'Doc teste envio',
            'tipo' => 'HTML',
            'especie' => 'OUTRO',
        ]);
        DocumentoAssinatura::query()->create([
            'id' => (string) Str::uuid(),
            'documento_id' => $documento->id,
            'usuario_id' => $usuario->id,
            'assinatura' => 'hash-teste',
        ]);

        $semEnvio = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        PlanoTrabalho::factory()->ativo()->create([
            'usuario_id' => $semEnvio->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $ids = [];
        $this->repository->findAllParaEnvio(100, function ($chunk) use (&$ids): void {
            foreach ($chunk as $row) {
                $ids[] = $row->id;
            }
        });

        $this->assertContains($usuario->id, $ids);
        $this->assertNotContains($semEnvio->id, $ids);
    }
}
