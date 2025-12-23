<?php

namespace Tests\Feature;

use App\Models\Usuario;
use App\Services\SiapeIndividualService;
use App\Services\SiapeIndividualServidorService;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SiapeIndividualServidorServiceTest extends TestCase
{
    use RefreshDatabase;

    private $service;
    private $mockSiapeService;

    protected function setUp(): void
    {
        parent::setUp();

        // Create tables manually to avoid migration conflicts and ensure tenant tables exist
        if (!\Illuminate\Support\Facades\Schema::hasTable('usuarios')) {
             \Illuminate\Support\Facades\Schema::create('usuarios', function ($table) {
                $table->uuid('id')->primary();
                $table->string('nome');
                $table->string('email')->nullable();
                $table->string('cpf')->nullable();
                $table->string('matricula')->nullable();
                $table->string('apelido')->nullable();
                $table->string('situacao_siape')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!\Illuminate\Support\Facades\Schema::hasTable('unidades')) {
            \Illuminate\Support\Facades\Schema::create('unidades', function ($table) {
                $table->uuid('id')->primary();
                $table->string('nome');
                $table->string('sigla');
                $table->string('codigo')->nullable(); 
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!\Illuminate\Support\Facades\Schema::hasTable('unidades_integrantes')) {
            \Illuminate\Support\Facades\Schema::create('unidades_integrantes', function ($table) {
                $table->uuid('id')->primary();
                $table->uuid('usuario_id');
                $table->uuid('unidade_id');
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!\Illuminate\Support\Facades\Schema::hasTable('unidades_integrantes_atribuicoes')) {
            \Illuminate\Support\Facades\Schema::create('unidades_integrantes_atribuicoes', function ($table) {
                $table->uuid('id')->primary();
                $table->uuid('unidade_integrante_id');
                $table->string('atribuicao');
                $table->timestamps();
                $table->softDeletes();
            });
        }

        $this->service = new SiapeIndividualServidorService();
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
        
        $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf]);

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

        $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf]);

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
 
         $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf]);
 
         $this->assertTrue($resumo[0]['usuario_existia']);
         $this->assertContains('nome', $resumo[0]['alteracoes']);
    }
}
