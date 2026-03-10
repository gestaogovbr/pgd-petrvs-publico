<?php

namespace Tests\Feature;

use App\Models\Usuario;
use App\Models\SiapeBlackListServidor;
use App\Services\SiapeIndividualService;
use App\Services\SiapeIndividualServidorService;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

class SiapeIndividualServidorServiceTest extends TestCase
{
    use RefreshDatabase;

    private $service;
    private $mockSiapeService;

    protected function setUp(): void
    {
        parent::setUp();

        // Drop tables to ensure clean schema for every test
        \Illuminate\Support\Facades\Schema::dropIfExists('unidades_integrantes_atribuicoes');
        \Illuminate\Support\Facades\Schema::dropIfExists('unidades_integrantes');
        \Illuminate\Support\Facades\Schema::dropIfExists('usuarios');
        \Illuminate\Support\Facades\Schema::dropIfExists('siape_blacklist_servidores');
        \Illuminate\Support\Facades\Schema::dropIfExists('unidades');

        // Create tables manually to avoid migration conflicts and ensure tenant tables exist
        \Illuminate\Support\Facades\Schema::create('usuarios', function ($table) {
            $table->uuid('id')->primary();
            $table->string('nome');
            $table->string('email')->nullable();
            $table->string('cpf')->nullable();
            $table->string('matricula')->nullable();
            $table->string('apelido')->nullable();
            $table->string('situacao_siape')->nullable();
            $table->boolean('usuario_externo')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });

        \Illuminate\Support\Facades\Schema::create('siape_blacklist_servidores', function ($table) {
            $table->uuid('id')->primary();
            $table->string('cpf');
            $table->string('matricula')->nullable();
            $table->longText('response')->nullable();
            $table->tinyInteger('inativado')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        \Illuminate\Support\Facades\Schema::create('unidades', function ($table) {
            $table->uuid('id')->primary();
            $table->string('nome');
            $table->string('sigla');
            $table->string('codigo')->nullable(); 
            $table->timestamps();
            $table->softDeletes();
        });

        \Illuminate\Support\Facades\Schema::create('unidades_integrantes', function ($table) {
            $table->uuid('id')->primary();
            $table->uuid('usuario_id');
            $table->uuid('unidade_id');
            $table->timestamps();
            $table->softDeletes();
        });

        \Illuminate\Support\Facades\Schema::create('unidades_integrantes_atribuicoes', function ($table) {
            $table->uuid('id')->primary();
            $table->uuid('unidade_integrante_id');
            $table->string('atribuicao');
            $table->timestamps();
            $table->softDeletes();
        });

        $this->service = app(SiapeIndividualServidorService::class);
        $this->mockSiapeService = $this->createMock(SiapeIndividualService::class);
        
        $this->mockSiapeService->config = [
            'codOrgao' => '12345',
            'siglaSistema' => 'TESTE',
            'nomeSistema' => 'SISTEMA TESTE',
            'senha' => 'senha',
            'parmExistPag' => 'S',
            'parmTipoVinculo' => '1'
        ];
    }

    /** @test */
    public function deve_identificar_usuario_novo_no_resumo()
    {
        $cpf = '12345678901';
        
        // Ensure user does not exist
        $this->assertDatabaseMissing('usuarios', ['cpf' => $cpf]);

        $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
        $method = $reflection->getMethod('gerarResumo');
        $method->setAccessible(true);

        $usuariosAntes = []; 

        // Create user manually to simulate insertion
        $usuario = new Usuario();
        $usuario->fill([
            'nome' => 'Novo Usuario',
            'email' => 'novo@teste.com',
            'cpf' => $cpf,
            'apelido' => 'Novo',
            'matricula' => '11111'
        ]);
        $usuario->save(); // Works if validation doesn't block it
        
        $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);

        $this->assertCount(1, $resumo);
        $this->assertEquals('Novo Usuario', $resumo[0]['nome']);
        $this->assertFalse($resumo[0]['usuario_existia']);
        $this->assertTrue($resumo[0]['usuario_inserido']);
    }

    /** @test */
    public function deve_identificar_usuario_existente_no_resumo()
    {
        $cpf = '98765432109';
        
        // Create user that "exists"
        $usuario = new Usuario();
        $usuario->fill([
            'nome' => 'Usuario Existente',
            'email' => 'existente@teste.com',
            'cpf' => $cpf,
            'apelido' => 'Existente',
            'matricula' => '22222',
            'situacao_siape' => 'ATIVO'
        ]);
        $usuario->save();

        // User state "before"
        $usuariosAntes = [[
            'id' => $usuario->id,
            'matricula' => $usuario->matricula,
            'nome' => $usuario->nome,
            'email' => $usuario->email,
            'situacao_siape' => $usuario->situacao_siape,
            'lotacao_id' => null
        ]];

        $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
        $method = $reflection->getMethod('gerarResumo');
        $method->setAccessible(true);

        $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);

        $this->assertCount(1, $resumo);
        $this->assertEquals('Usuario Existente', $resumo[0]['nome']);
        $this->assertTrue($resumo[0]['usuario_existia']);
        $this->assertFalse($resumo[0]['usuario_inserido']);
    }

    /** @test */
    public function deve_identificar_alteracoes_no_usuario()
    {
         $cpf = '11122233344';
        
         // Create user that "exists" but has New Name
         $usuario = new Usuario();
         $usuario->fill([
            'nome' => 'Nome Novo',
            'email' => 'mudanca@teste.com',
            'cpf' => $cpf,
            'apelido' => 'Mudanca',
            'matricula' => '33333',
            'situacao_siape' => 'ATIVO'
        ]);
        $usuario->save();

         // User state "before" - Old Name
         $usuariosAntes = [[
             'id' => $usuario->id,
             'matricula' => $usuario->matricula,
             'nome' => 'Nome Antigo',
             'email' => $usuario->email,
             'situacao_siape' => $usuario->situacao_siape,
             'lotacao_id' => null
         ]];
 
         $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
         $method = $reflection->getMethod('gerarResumo');
         $method->setAccessible(true);
 
         $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);
 
         $this->assertTrue($resumo[0]['usuario_existia']);
         $this->assertContains('nome', $resumo[0]['alteracoes']);
    }

    /** @test */
    public function deve_retornar_parcial_se_lotacao_falhar_para_usuario_existente()
    {
        $cpf = '55566677788';
        
        // Create user that "exists"
        $usuario = new Usuario();
        $usuario->fill([
            'nome' => 'Usuario Sem Lotacao',
            'email' => 'semlotacao@teste.com',
            'cpf' => $cpf,
            'apelido' => 'SemLotacao',
            'matricula' => '44444',
            'situacao_siape' => 'ATIVO'
        ]);
        $usuario->save();

        // User state "before"
        $usuariosAntes = [[
            'id' => $usuario->id,
            'matricula' => $usuario->matricula,
            'nome' => $usuario->nome,
            'email' => $usuario->email,
            'situacao_siape' => $usuario->situacao_siape,
            'lotacao_id' => null
        ]];

        $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
        $method = $reflection->getMethod('gerarResumo');
        $method->setAccessible(true);

        $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);

        $this->assertTrue($resumo[0]['usuario_existia']);
        $this->assertFalse($resumo[0]['lotacao_associada']);
        $this->assertEquals('parcial', $resumo[0]['status']);
        $this->assertStringContainsString('Lotação não associada', $resumo[0]['mensagem']);
    }

    /** @test */
    public function deve_gerenciar_blacklist_corretamente_para_multiplas_matriculas()
    {
        $cpf = '11122233344';
        
        // Scenario:
        // DB Users:
        // - User A: Matricula '11111' (Active)
        // - User B: Matricula '22222' (Active)
        // SIAPE Returns:
        // - Matricula '11111'
        // - Matricula '33333' (New)
        
        // Setup DB
        $userA = new Usuario();
        $userA->fill([
            'nome' => 'User A',
            'email' => 'a@test.com',
            'cpf' => $cpf,
            'matricula' => '11111',
            'situacao_siape' => 'ATIVO'
        ]);
        $userA->save();
        
        $userB = new Usuario();
        $userB->fill([
            'nome' => 'User B',
            'email' => 'b@test.com',
            'cpf' => $cpf,
            'matricula' => '22222',
            'situacao_siape' => 'ATIVO'
        ]);
        $userB->save();

        // Setup Blacklist
        // Add blacklist entry for '11111' to verify it gets removed
        SiapeBlackListServidor::create([
            'id' => Str::uuid(),
            'cpf' => $cpf,
            'matricula' => '11111',
            'response' => 'test'
        ]);

        // Mock SIAPE Data
        $dadosFuncionais = [
            ['matriculaSiape' => '11111', 'codUorgExercicio' => '123'],
            ['matriculaSiape' => '33333', 'codUorgExercicio' => '123']
        ];

        // Call the private method removeVinculoParaforcarSerLotadoNovamente
        $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
        $method = $reflection->getMethod('removeVinculoParaforcarSerLotadoNovamente');
        $method->setAccessible(true);
        
        $method->invokeArgs($this->service, [$cpf, $dadosFuncionais]);

        // Assertions
        
        // 1. User A (11111) should have blacklist entry removed
        $this->assertDatabaseMissing('siape_blacklist_servidores', [
            'cpf' => $cpf,
            'matricula' => '11111'
        ]);

        // 2. User B (22222) should be added to blacklist
        $this->assertDatabaseHas('siape_blacklist_servidores', [
            'cpf' => $cpf,
            'matricula' => '22222'
        ]);
    }
}
