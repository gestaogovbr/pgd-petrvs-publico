<?php

namespace Tests\Unit;

use App\Models\Usuario;
use App\Services\IntegracaoService;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class IntegracaoServiceEmailTest extends TestCase
{
    // Usamos DatabaseTransactions se o banco existir, mas aqui vamos criar tabela em memoria sqlite
    // Entao nao usamos RefreshDatabase padrao que roda todas migrations
    
    protected $service;

    protected function setUp(): void
    {
        parent::setUp();

        // Configura banco em memória limpo se necessário (Pest/Laravel já faz isso com sqlite :memory:)
        // Cria apenas a tabela necessária para o teste
        if (!Schema::hasTable('usuarios')) {
            Schema::create('usuarios', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('email')->unique();
                $table->string('nome')->nullable();
                $table->string('cpf')->nullable();
                $table->string('matricula')->nullable();
                $table->string('situacao_funcional')->nullable();
                $table->uuid('perfil_id')->nullable(); // FK para perfil
                $table->softDeletes(); // Importante para o teste de soft delete
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('perfis')) {
             Schema::create('perfis', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('nome');
                $table->timestamps();
                $table->softDeletes();
            });
        }
        
        if (!Schema::hasTable('audits')) {
             Schema::create('audits', function (Blueprint $table) {
                $table->id();
                $table->string('user_type')->nullable();
                $table->unsignedBigInteger('user_id')->nullable();
                $table->string('event');
                $table->uuid('auditable_id');
                $table->string('auditable_type');
                $table->text('old_values')->nullable();
                $table->text('new_values')->nullable();
                $table->text('url')->nullable();
                $table->ipAddress('ip_address')->nullable();
                $table->string('user_agent', 1023)->nullable();
                $table->string('tags')->nullable();
                $table->timestamps();
            });
        }

        // Mock de dependências
        // O construtor de IntegracaoService não usa injeção de dependência tradicional
        // Ele instancia serviços internamente. Para este teste unitário focado no método privado,
        // não precisamos nos preocupar com as dependências externas, pois o método só usa o Model Usuario.
        $this->service = new IntegracaoService();
    }

    public function test_deve_alterar_email_de_usuario_existente_ativo_para_liberar_email()
    {
        // Cria usuário antigo ocupando o e-mail via DB direto para evitar hooks do Model
        $email = 'conflito@teste.gov.br';
        $id = \Illuminate\Support\Str::uuid()->toString();
        
        DB::table('usuarios')->insert([
            'id' => $id,
            'email' => $email,
            'matricula' => '11111',
            'nome' => 'Antigo',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        $this->assertDatabaseHas('usuarios', ['email' => $email]);

        // Acessa método privado via Reflection
        $reflection = new \ReflectionClass(IntegracaoService::class);
        $method = $reflection->getMethod('verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake');
        $method->setAccessible(true);

        // Executa a correção
        // Precisamos garantir que o Model Usuario não falhe ao tentar atualizar
        // Desabilitamos eventos para evitar Auditable/Logs no update
        Usuario::flushEventListeners();

        $method->invokeArgs($this->service, [$email, '22222']);

        // Verifica se o antigo foi renomeado
        $usuarioAntigo = DB::table('usuarios')->where('id', $id)->first();
        $this->assertNotEquals($email, $usuarioAntigo->email);
        $this->assertStringContainsString('@petrvs.gov.br', $usuarioAntigo->email);
    }

    public function test_deve_alterar_email_de_usuario_existente_soft_deleted_para_liberar_email()
    {
        // Cria usuário antigo ocupando o e-mail e deleta (soft delete)
        $email = 'conflito_deleted@teste.gov.br';
        $id = \Illuminate\Support\Str::uuid()->toString();
        
        DB::table('usuarios')->insert([
            'id' => $id,
            'email' => $email,
            'matricula' => '33333',
            'nome' => 'Deletado',
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => now() // Soft deleted
        ]);
        
        // Verifica que ele ainda existe no banco com esse email (incluindo trash)
        $this->assertDatabaseHas('usuarios', ['id' => $id, 'email' => $email]);

        // Acessa método privado
        $reflection = new \ReflectionClass(IntegracaoService::class);
        $method = $reflection->getMethod('verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake');
        $method->setAccessible(true);
        
        Usuario::flushEventListeners();

        // Executa a correção
        $method->invokeArgs($this->service, [$email, '44444']);

        // Verifica se o antigo foi renomeado
        $usuarioAntigo = DB::table('usuarios')->where('id', $id)->first();
        
        $this->assertNotEquals($email, $usuarioAntigo->email, "O e-mail do usuário deletado deveria ter sido alterado.");
        $this->assertStringContainsString('@petrvs.gov.br', $usuarioAntigo->email);
    }
}
