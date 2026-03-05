<?php

namespace Tests\Feature;

use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;
use Stancl\Tenancy\Middleware\InitializeTenancyByRequestData;
use App\Http\Middleware\TenantConfigurations;

class LoginControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['cache.default' => 'array']);
        $this->withoutExceptionHandling();
        $this->withoutMiddleware([
            InitializeTenancyByRequestData::class,
            TenantConfigurations::class,
            \Stancl\Tenancy\Middleware\IdentificationMiddleware::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
        ]);
        // Create tables manually if needed, but RefreshDatabase should handle it.
        // Copying schema creation from SiapeIndividualServidorServiceTest just in case
        
        // Force recreate usuarios table to ensure all columns exist (mysql-schema.sql might be incomplete for tests)
        if (Schema::hasTable('usuarios')) {
             Schema::drop('usuarios');
        }

        Schema::create('usuarios', function ($table) {
            $table->uuid('id')->primary();
            $table->string('nome');
            $table->string('email')->nullable();
            $table->string('cpf')->nullable();
            $table->string('matricula')->nullable();
            $table->string('apelido')->nullable();
            $table->string('situacao_siape')->nullable();
            $table->string('password')->nullable();
            $table->string('telefone')->nullable();
            $table->date('data_nascimento')->nullable();
            $table->string('sexo')->nullable();
            $table->string('situacao_funcional')->nullable();
            $table->json('config')->nullable();
            $table->json('notificacoes')->nullable();
            $table->string('tipo_modalidade_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        if (!Schema::hasTable('tipos_modalidades')) {
            Schema::create('tipos_modalidades', function ($table) {
                $table->uuid('id')->primary();
                $table->string('nome');
                $table->tinyInteger('exige_pedagio')->default(0);
                $table->tinyInteger('plano_trabalho_calcula_horas')->default(0);
                $table->tinyInteger('atividade_tempo_despendido')->default(0);
                $table->tinyInteger('atividade_esforco')->default(0);
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!Schema::hasTable('unidades_integrantes')) {
            Schema::create('unidades_integrantes', function ($table) {
                $table->uuid('id')->primary();
                $table->uuid('unidade_id')->nullable();
                $table->uuid('usuario_id')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }
        }

    /** @test */
    public function login_via_email_switches_to_active_user_with_same_cpf()
    {
        $cpf = '12345678901';
        
        // Inactive user
        $inactiveUser = Usuario::factory()->create([
            'email' => 'inactive@test.com',
            'cpf' => $cpf,
            'situacao_siape' => 'INATIVO',
            'password' => bcrypt('password'),
            'nome' => 'Inactive User',
            'apelido' => 'Inactive',
        ]);

        // Active user with same CPF
        $activeUser = Usuario::factory()->create([
            'email' => 'active@test.com',
            'cpf' => $cpf,
            'situacao_siape' => 'ATIVO',
            'password' => bcrypt('password'), // Password doesn't matter for the switch, but needed for factory
            'nome' => 'Active User',
            'apelido' => 'Active',
        ]);

        // Login with Inactive user credentials
        $response = $this->postJson('/web/login-user-password', [
            'email' => 'inactive@test.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        
        // Check if the authenticated user is the Active one
        $this->assertEquals($activeUser->id, Auth::id());
        
        // Check if the response returns the Active user data
        $response->assertJsonPath('usuario.id', $activeUser->id);
    }
    
    /** @test */
    public function login_via_email_stays_on_inactive_if_no_active_found()
    {
        $cpf = '12345678901';
        
        // Inactive user
        $inactiveUser = Usuario::factory()->create([
            'email' => 'inactive@test.com',
            'cpf' => $cpf,
            'situacao_siape' => 'INATIVO',
            'password' => bcrypt('password'),
            'nome' => 'Inactive User',
            'apelido' => 'Inactive',
        ]);

        // Login with Inactive user credentials
        $response = $this->postJson('/web/login-user-password', [
            'email' => 'inactive@test.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        
        // Check if the authenticated user is still the Inactive one
        $this->assertEquals($inactiveUser->id, Auth::id());
        $response->assertJsonPath('usuario.id', $inactiveUser->id);
    }

    /** @test */
    public function login_via_email_normal_active_user()
    {
        $cpf = '12345678901';
        
        // Active user
        $activeUser = Usuario::factory()->create([
            'email' => 'active@test.com',
            'cpf' => $cpf,
            'situacao_siape' => 'ATIVO',
            'password' => bcrypt('password'),
            'nome' => 'Active User',
            'apelido' => 'Active',
        ]);

        // Login
        $response = $this->postJson('/web/login-user-password', [
            'email' => 'active@test.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        $this->assertEquals($activeUser->id, Auth::id());
    }
}
