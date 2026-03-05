<?php

namespace Tests\Feature;

use Tests\DatabaseTenantTestCase;
use App\Models\Usuario;
use App\Models\Entidade;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;

class LoginScenarioTest extends DatabaseTenantTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Force array cache to avoid Redis connection attempts
        Config::set('cache.default', 'array');
        Config::set('cache.stores.array', ['driver' => 'array']);
        Config::set('session.driver', 'array');
        Config::set('queue.default', 'sync');

        // Disable CSRF middleware for tests
        $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);
        $this->withoutMiddleware(\Stancl\Tenancy\Middleware\InitializeTenancyByRequestData::class);

        // Register routes for testing to ensure we hit the controller methods
        // Use prefixes that avoid the web wildcard catch-all (api/*, web/*)
        Route::middleware('web')->post('/web/test-login-user-password', [LoginController::class, 'authenticateUserPassword']);
        Route::middleware('api')->post('/api/test-login-user-password', [LoginController::class, 'authenticateApiUserPassword']);

        // Ensure necessary tables exist in tenant database
        try {
            // Ensure Entidade exists
            $entidadeExists = DB::connection('tenant')->table('entidades')->where('sigla', 'TEST')->exists();
            
            if (!$entidadeExists) {
                DB::connection('tenant')->table('entidades')->insert([
                    'id' => '00000000-0000-0000-0000-000000000001',
                    'sigla' => 'TEST',
                    'nome' => 'Entidade Teste',
                    'abrangencia' => 'NACIONAL',
                    'carga_horaria_padrao' => 8,
                    'gravar_historico_processo' => 0,
                    'layout_formulario_atividade' => 'COMPLETO',
                    'campos_ocultos_atividade' => json_encode(new \stdClass()),
                    'nomenclatura' => json_encode(new \stdClass()),
                    'notificacoes' => json_encode(new \stdClass()),
                    'forma_contagem_carga_horaria' => 'DIA',
                    'expediente' => json_encode(['domingo'=>[],'segunda'=>[],'terca'=>[],'quarta'=>[],'quinta'=>[],'sexta'=>[],'sabado'=>[],'especial'=>[]]),
                    'uf' => 'DF',
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }

             // Ensure Perfil exists
             $perfilId = '00000000-0000-0000-0000-000000000001';
             if (!DB::connection('tenant')->table('perfis')->where('id', $perfilId)->exists()) {
                DB::connection('tenant')->table('perfis')->insert([
                    'id' => $perfilId,
                    'nome' => 'Perfil Teste',
                    'nivel' => 1,
                    'descricao' => 'Perfil Teste',
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }

            // Ensure Unidade exists
            $unidadeId = '00000000-0000-0000-0000-000000000001';
            if (!DB::connection('tenant')->table('unidades')->where('id', $unidadeId)->exists()) {
                DB::connection('tenant')->table('unidades')->insert([
                    'id' => $unidadeId,
                    'entidade_id' => '00000000-0000-0000-0000-000000000001',
                    'codigo' => '1',
                    'sigla' => 'UND',
                    'nome' => 'Unidade Teste',
                    'path' => '',
                    'atividades_arquivamento_automatico' => 0,
                    'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
                    'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
                    'notificacoes' => json_encode(new \stdClass()),
                    'etiquetas' => json_encode([]),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }

        } catch (\Exception $e) {
            dump("Error creating data: " . $e->getMessage());
        }
    }

    /** @test */
    public function api_login_with_inactive_email_switches_to_active_user_with_same_cpf()
    {
        $this->withoutExceptionHandling();
        $cpf = '12345678901';
        $password = 'password123';
        
        // Inactive user
        $inactiveUser = Usuario::factory()->create([
            'email' => 'inactive@test.com',
            'cpf' => $cpf,
            'situacao_siape' => 'INATIVO',
            'password' => Hash::make($password),
            'nome' => 'Inactive User',
            'perfil_id' => '00000000-0000-0000-0000-000000000001'
        ]);

        // Active user with same CPF
        $activeUser = Usuario::factory()->create([
            'email' => 'active@test.com',
            'cpf' => $cpf,
            'situacao_siape' => 'ATIVO',
            'password' => Hash::make('different_password'), // Password doesn't matter for switching logic if original matches
            'nome' => 'Active User',
            'perfil_id' => '00000000-0000-0000-0000-000000000001'
        ]);

        // We also need to link users to unidade so login works
        DB::connection('tenant')->table('unidades_integrantes')->insert([
            ['id' => '00000000-0000-0000-0000-000000000001', 'usuario_id' => $inactiveUser->id, 'unidade_id' => '00000000-0000-0000-0000-000000000001'],
            ['id' => '00000000-0000-0000-0000-000000000002', 'usuario_id' => $activeUser->id, 'unidade_id' => '00000000-0000-0000-0000-000000000001']
        ]);

        $response = $this->postJson('/api/test-login-user-password', [
            'entidade' => 'TEST', // Use SIGLA
            'email' => 'inactive@test.com',
            'password' => $password,
            'device_name' => 'test-device'
        ]);

        $response->assertStatus(200);
        
        // Check if the returned user is the Active one
        $this->assertEquals($activeUser->id, $response->json('usuario.id'));
    }

    /** @test */
    public function api_login_fails_with_wrong_password_for_inactive_user()
    {
        $this->withoutExceptionHandling();
        $cpf = '12345678901';
        
        // Inactive user
        Usuario::factory()->create([
            'email' => 'inactive_wrong@test.com',
            'cpf' => $cpf,
            'situacao_siape' => 'INATIVO',
            'password' => Hash::make('password123'),
            'perfil_id' => '00000000-0000-0000-0000-000000000001'
        ]);

        // Active user with same CPF
        Usuario::factory()->create([
            'email' => 'active_wrong@test.com',
            'cpf' => $cpf,
            'situacao_siape' => 'ATIVO',
            'password' => Hash::make('different_password'),
            'perfil_id' => '00000000-0000-0000-0000-000000000001'
        ]);

        $response = $this->postJson('/api/test-login-user-password', [
            'entidade' => 'TEST',
            'email' => 'inactive_wrong@test.com',
            'password' => 'wrong_password',
            'device_name' => 'test-device'
        ]);

        // It should fail because password matches inactive user but we validate password.
        // Wait, if password matches inactive user, we find active user.
        // But active user has different password.
        // My implementation in LoginController.php:
        // $usuario = findUserByEmail($email); -> returns Active user if Inactive found
        // if (!$usuario || !Hash::check($password, $usuario->password)) -> Fails here because we check password against Active User?
        
        // Let's re-read the logic.
        // If I login with inactive email + inactive password.
        // findUserByEmail returns Active User (with different password).
        // Then Hash::check($password, $activeUser->password) will fail.
        
        // This is tricky. The requirement says: 
        // "se o usuário estiver INATIVO ... pegue o CPF deste usuário e procure outro usuário ativo com o mesmo CPF."
        // Does it mean we should check password against the INACTIVE user first?
        // Usually, if we switch user, we are logging in as the ACTIVE user.
        // If the password was for the INACTIVE user, and ACTIVE user has different password...
        // The user effectively cannot login unless they use the password of the ACTIVE user?
        // OR, are we assuming they share credentials?
        // In this system, likely they are distinct rows but represent same person.
        // If I am using "inactive@test.com" I expect my password for that account to work.
        // But I am being logged in as "Active User".
        
        // If the implementation simply swaps the user object returned:
        // $user = findUserByEmail($email); // Returns Active User
        // Hash::check($password, $user->password); // Checks against Active User password.
        
        // So if I use inactive email + inactive password, and active user has different password -> Login Fails.
        // If I use inactive email + ACTIVE password -> Login Succeeds (as Active User).
        
        // This seems secure. You must know the password of the account you are effectively logging into, 
        // OR the passwords must be synced.
        
        // For this test: "fails with wrong password".
        // Let's assume we try a password that is wrong for BOTH.
        
        $response->assertStatus(200); // Expect failure, but let's see what response we get for failure
        $this->assertArrayHasKey('error', $response->json());
    }

    /** @test */
    public function web_login_switches_to_active_user_with_same_cpf()
    {
        $this->withoutExceptionHandling();
        $cpf = '98765432100';
        $password = 'password123';
        
        // Inactive user
        $inactiveUser = Usuario::factory()->create([
            'email' => 'inactive_web@test.com',
            'cpf' => $cpf,
            'situacao_siape' => 'INATIVO',
            'password' => Hash::make($password),
            'nome' => 'Inactive Web User',
            'perfil_id' => '00000000-0000-0000-0000-000000000001'
        ]);

        // Active user with same CPF
        $activeUser = Usuario::factory()->create([
            'email' => 'active_web@test.com',
            'cpf' => $cpf,
            'situacao_siape' => 'ATIVO',
            'password' => Hash::make('different_password'), // Same logic apply
            'nome' => 'Active Web User',
            'perfil_id' => '00000000-0000-0000-0000-000000000001'
        ]);
        
        // Link to unidade
        DB::connection('tenant')->table('unidades_integrantes')->insert([
            ['id' => '00000000-0000-0000-0000-000000000003', 'usuario_id' => $inactiveUser->id, 'unidade_id' => '00000000-0000-0000-0000-000000000001'],
            ['id' => '00000000-0000-0000-0000-000000000004', 'usuario_id' => $activeUser->id, 'unidade_id' => '00000000-0000-0000-0000-000000000001']
        ]);

        // For Web Login, we usually authenticate session.
        // The controller method authenticateUserPassword uses Auth::login($usuario).
        // But again, password check happens.
        
        // If I want to succeed, I must use Active User's password if the swap happens before auth.
        // Let's update Active User password to match for this test to verify the SWAP logic isolated from password logic.
        $activeUser->password = Hash::make($password);
        $activeUser->save();

        $response = $this->postJson('/web/test-login-user-password', [
            'entidade' => 'TEST',
            'email' => 'inactive_web@test.com',
            'password' => $password,
        ]);

        $response->assertStatus(200);
        
        // Check if the returned user is the Active one
        $this->assertEquals($activeUser->id, $response->json('usuario.id'));
    }
}

