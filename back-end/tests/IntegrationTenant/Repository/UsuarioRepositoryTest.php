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
use App\Models\Entidade;
use App\Models\TipoModalidade;
use App\Models\Perfil;

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
}
