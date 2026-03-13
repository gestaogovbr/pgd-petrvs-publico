<?php

namespace Tests\IntegrationTenant\Controllers;

use App\Http\Controllers\LoginController;
use App\Models\Entidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\FirebaseAuthService;
use App\Services\GoogleService;
use App\Services\LoginService;
use App\Services\UnidadeService;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Sanctum;
use Laravel\Socialite\Facades\Socialite;
use Mockery;

beforeEach(function () {
    if (!Route::has('__tests.login.authenticateUserPassword')) {
        Route::middleware(['api'])->post('/__tests/login/authenticate-user-password', [LoginController::class, 'authenticateUserPassword'])
            ->name('__tests.login.authenticateUserPassword');
    }

    if (!Route::has('__tests.login.authenticateSession')) {
        Route::middleware(['api'])->post('/__tests/login/authenticate-session', [LoginController::class, 'authenticateSession'])
            ->name('__tests.login.authenticateSession');
    }

    if (!Route::has('__tests.login.selecionaUnidade')) {
        Route::middleware(['api'])->post('/__tests/login/seleciona-unidade', [LoginController::class, 'selecionaUnidade'])
            ->name('__tests.login.selecionaUnidade');
    }

    if (!Route::has('__tests.login.horarioUnidade')) {
        Route::middleware(['api'])->post('/__tests/login/horario', [LoginController::class, 'horarioUnidade'])
            ->name('__tests.login.horarioUnidade');
    }

    if (!Route::has('__tests.login.logoutWeb')) {
        Route::middleware(['api'])->get('/__tests/login/logout-web', [LoginController::class, 'logout'])
            ->name('__tests.login.logoutWeb');
    }

    if (!Route::has('__tests.login.logoutStateless')) {
        Route::middleware(['api', 'auth:sanctum'])->get('/__tests/login/logout-stateless', [LoginController::class, 'logout'])
            ->name('__tests.login.logoutStateless');
    }

    if (!Route::has('__tests.login.throttledAuthenticateUserPassword')) {
        Route::middleware(['api', 'throttle:2,1'])->post('/__tests/login/throttled/authenticate-user-password', [LoginController::class, 'authenticateUserPassword'])
            ->name('__tests.login.throttledAuthenticateUserPassword');
    }

    if (!Route::has('__tests.login.authenticateFirebaseToken')) {
        Route::middleware(['api'])->post('/__tests/login/authenticate-firebase-token', [LoginController::class, 'authenticateFirebaseToken'])
            ->name('__tests.login.authenticateFirebaseToken');
    }

    if (!Route::has('__tests.login.authenticateGoogleToken')) {
        Route::middleware(['api'])->post('/__tests/login/authenticate-google-token', [LoginController::class, 'authenticateGoogleToken'])
            ->name('__tests.login.authenticateGoogleToken');
    }

    if (!Route::has('__tests.login.authenticateApiSessionOpen')) {
        Route::middleware(['api'])->post('/__tests/login/authenticate-api-session', [LoginController::class, 'authenticateApiSession'])
            ->name('__tests.login.authenticateApiSessionOpen');
    }

    if (!Route::has('__tests.login.authenticateApiSessionAuth')) {
        Route::middleware(['api', 'auth:sanctum'])->post('/__tests/login/authenticate-api-session-auth', [LoginController::class, 'authenticateApiSession'])
            ->name('__tests.login.authenticateApiSessionAuth');
    }

    if (!Route::has('__tests.login.authenticateApiUserPassword')) {
        Route::middleware(['api'])->post('/__tests/login/authenticate-api-user-password', [LoginController::class, 'authenticateApiUserPassword'])
            ->name('__tests.login.authenticateApiUserPassword');
    }

    if (!Route::has('__tests.login.authenticateApiFirebaseToken')) {
        Route::middleware(['api'])->post('/__tests/login/authenticate-api-firebase-token', [LoginController::class, 'authenticateApiFirebaseToken'])
            ->name('__tests.login.authenticateApiFirebaseToken');
    }

    if (!Route::has('__tests.login.authenticateApiGoogleToken')) {
        Route::middleware(['api'])->post('/__tests/login/authenticate-api-google-token', [LoginController::class, 'authenticateApiGoogleToken'])
            ->name('__tests.login.authenticateApiGoogleToken');
    }

    if (!Route::has('__tests.login.validateApiTokenOpen')) {
        Route::middleware(['api'])->get('/__tests/login/validate-token-open', [LoginController::class, 'validateApiToken'])
            ->name('__tests.login.validateApiTokenOpen');
    }

    if (!Route::has('__tests.login.validateApiTokenAuth')) {
        Route::middleware(['api', 'auth:sanctum'])->get('/__tests/login/validate-token-auth', [LoginController::class, 'validateApiToken'])
            ->name('__tests.login.validateApiTokenAuth');
    }

    if (!Route::has('__tests.login.azureRedirect')) {
        Route::middleware(['api'])->get('/__tests/login/azure-redirect', [LoginController::class, 'signInAzureRedirect'])
            ->name('__tests.login.azureRedirect');
    }

    if (!Route::has('__tests.login.azureCallback')) {
        Route::middleware(['api'])->get('/__tests/login/azure-callback', [LoginController::class, 'signInAzureCallback'])
            ->name('__tests.login.azureCallback');
    }

    if (!Route::has('__tests.login.govBrRedirect')) {
        Route::middleware(['api'])->get('/__tests/login/govbr-redirect', [LoginController::class, 'signInGovBrRedirect'])
            ->name('__tests.login.govBrRedirect');
    }

    if (!Route::has('__tests.login.govBrCallback')) {
        Route::middleware(['api'])->get('/__tests/login/govbr-callback', [LoginController::class, 'signInGovBrCallback'])
            ->name('__tests.login.govBrCallback');
    }
});

beforeEach(function () {
    $this->app->instance(FirebaseAuthService::class, Mockery::mock(FirebaseAuthService::class));
    $this->app->instance(GoogleService::class, Mockery::mock(GoogleService::class));
});

afterAll(function () {
    Mockery::close();
});

test('selecionaUnidade retorna 422 quando unidade_id ausente', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/__tests/login/seleciona-unidade', []);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['unidade_id']);
})->group('login-controller');

test('selecionaUnidade retorna 200 e atualiza sessão e config do usuário', function () {
    $unidade = Unidade::factory()->create();
    $usuario = Usuario::factory()->create();

    $vinculo = UnidadeIntegrante::query()->create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
    ]);

    UnidadeIntegranteAtribuicao::query()->create([
        'unidade_integrante_id' => $vinculo->id,
        'atribuicao' => 'COLABORADOR',
    ]);

    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/__tests/login/seleciona-unidade', [
        'unidade_id' => $unidade->id,
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('status', 'OK');
    $response->assertJsonPath('unidade.id', $unidade->id);

    expect(session('unidade_id'))->toBe($unidade->id);

    $usuario->refresh();
    expect($usuario->config['unidade_id'] ?? null)->toBe($unidade->id);
    $this->assertDatabaseHas('usuarios', [
        'id' => $usuario->id,
    ], 'tenant');
})->group('login-controller');

test('selecionaUnidade troca usuário logado quando matrícula informada difere do usuário atual', function () {
    $unidade = Unidade::factory()->create();
    $usuarioOriginal = Usuario::factory()->create(['matricula' => 'MAT-ORIGINAL']);
    $usuarioMatricula = Usuario::factory()->create(['matricula' => 'MAT-NOVA']);

    $vinculo = UnidadeIntegrante::query()->create([
        'usuario_id' => $usuarioMatricula->id,
        'unidade_id' => $unidade->id,
    ]);

    UnidadeIntegranteAtribuicao::query()->create([
        'unidade_integrante_id' => $vinculo->id,
        'atribuicao' => 'COLABORADOR',
    ]);

    $this->actingAs($usuarioOriginal, 'web');

    $response = $this->postJson('/__tests/login/seleciona-unidade', [
        'unidade_id' => $unidade->id,
        'matricula' => $usuarioMatricula->matricula,
    ]);

    $response->assertStatus(200);
    expect(Auth::guard('web')->id())->toBe($usuarioMatricula->id);
})->group('login-controller');

test('selecionaUnidade retorna erro quando usuário não está logado', function () {
    $unidade = Unidade::factory()->create();

    $response = $this->postJson('/__tests/login/seleciona-unidade', [
        'unidade_id' => $unidade->id,
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'Usuário não logado');
})->group('login-controller');

test('selecionaUnidade retorna erro quando unidade não está vinculada ao usuário', function () {
    $unidade = Unidade::factory()->create();
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/__tests/login/seleciona-unidade', [
        'unidade_id' => $unidade->id,
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'Unidade não encontrada no usuário');
})->group('login-controller');

test('authenticateUserPassword retorna 422 quando dados obrigatórios ausentes', function () {
    $response = $this->postJson('/__tests/login/authenticate-user-password', []);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['email', 'password']);
})->group('login-controller');

test('authenticateUserPassword autentica com sucesso e retorna entidade e usuário', function () {
    $usuario = Usuario::factory()->create([
        'password' => bcrypt('senha-teste'),
    ]);

    $entidade = Entidade::factory()->create();

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')
        ->once()
        ->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')
        ->once()
        ->andReturn($usuario);

    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-user-password', [
        'email' => $usuario->email,
        'password' => 'senha-teste',
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
    $response->assertJsonPath('entidade.id', $entidade->id);
    $response->assertJsonPath('usuario.id', $usuario->id);
    expect(session('kind'))->toBe('USERPASSWORD');
})->group('login-controller');

test('authenticateUserPassword retorna 200 com erro quando credenciais são inválidas', function () {
    $usuario = Usuario::factory()->create([
        'password' => bcrypt('senha-correta'),
    ]);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldNotReceive('registrarEntidade');
    $loginService->shouldNotReceive('registrarUsuario');
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-user-password', [
        'email' => $usuario->email,
        'password' => 'senha-incorreta',
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'As credenciais fornecidas são inválidas.');
})->group('login-controller');

test('authenticateUserPassword retorna 401 quando usuário inativo', function () {
    $usuario = Usuario::factory()->create([
        'password' => bcrypt('senha-correta'),
    ]);

    $entidade = Entidade::factory()->create();

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')
        ->once()
        ->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')
        ->once()
        ->andReturn(null);
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-user-password', [
        'email' => $usuario->email,
        'password' => 'senha-correta',
    ]);

    $response->assertStatus(401);
    $response->assertJsonPath('error', 'Usuário inativo no SIAPE. Acesso negado.');
})->group('login-controller');

test('authenticateUserPassword retorna 500 quando ocorre exceção inesperada', function () {
    $usuario = Usuario::factory()->create([
        'password' => bcrypt('senha-correta'),
    ]);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')
        ->once()
        ->andThrow(new \RuntimeException('falha'));
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-user-password', [
        'email' => $usuario->email,
        'password' => 'senha-correta',
    ]);

    $response->assertStatus(500);
})->group('login-controller');

test('authenticateSession retorna 200 quando usuário já está logado e registra dados', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');
    session(['kind' => 'SESSION']);

    $entidade = Entidade::factory()->create();

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')
        ->once()
        ->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')
        ->once()
        ->andReturn($usuario);
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-session', []);

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
    $response->assertJsonPath('usuario.id', $usuario->id);
    $response->assertJsonPath('entidade.id', $entidade->id);
    $response->assertJsonPath('kind', 'SESSION');
})->group('login-controller');

test('authenticateSession efetua auto-login e retorna 200 quando configuração definida', function () {
    config()->set('petrvs.auto-login', 'autologin@teste.com');

    $usuario = Usuario::factory()->create([
        'email' => config('petrvs.auto-login'),
    ]);

    $entidade = Entidade::factory()->create();

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')
        ->once()
        ->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')
        ->once()
        ->andReturn($usuario);
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-session', []);

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
    $response->assertJsonPath('usuario.id', $usuario->id);
    expect(Auth::guard('web')->id())->toBe($usuario->id);
    expect(session('kind'))->toBe('SESSION');
})->group('login-controller');

test('authenticateSession retorna 200 com erro quando não há sessão e auto-login não configurado', function () {
    config()->set('petrvs.auto-login', null);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldNotReceive('registrarEntidade');
    $loginService->shouldNotReceive('registrarUsuario');
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-session', []);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'Sessão não encontrada');
})->group('login-controller');

test('authenticateSession retorna 200 com erro quando auto-login configurado mas usuário não existe', function () {
    config()->set('petrvs.auto-login', 'autologin@teste.com');

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldNotReceive('registrarEntidade');
    $loginService->shouldNotReceive('registrarUsuario');
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-session', []);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'Usuário não encontrado');
})->group('login-controller');

test('authenticateSession retorna 401 quando usuário logado é inativo', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $entidade = Entidade::factory()->create();

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')
        ->once()
        ->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')
        ->once()
        ->andReturn(null);
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-session', []);

    $response->assertStatus(401);
    $response->assertJsonPath('error', 'Usuário inativo no SIAPE. Acesso negado.');
})->group('login-controller');

test('authenticateSession retorna 500 quando ocorre exceção inesperada', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')
        ->once()
        ->andThrow(new \RuntimeException('falha'));
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-session', []);

    $response->assertStatus(500);
})->group('login-controller');

test('rate limiting bloqueia requisições excedentes no endpoint de login', function () {
    $usuario = Usuario::factory()->create([
        'password' => bcrypt('senha-teste'),
    ]);

    $entidade = Entidade::factory()->create();

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')
        ->times(2)
        ->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')
        ->times(2)
        ->andReturn($usuario);
    $this->app->instance(LoginService::class, $loginService);

    $this->postJson('/__tests/login/throttled/authenticate-user-password', [
        'email' => $usuario->email,
        'password' => 'senha-teste',
    ])->assertStatus(200);

    $this->postJson('/__tests/login/throttled/authenticate-user-password', [
        'email' => $usuario->email,
        'password' => 'senha-teste',
    ])->assertStatus(200);

    $this->postJson('/__tests/login/throttled/authenticate-user-password', [
        'email' => $usuario->email,
        'password' => 'senha-teste',
    ])->assertStatus(429);
})->group('login-controller');

test('horarioUnidade retorna 200 e hora quando usuário e unidade estão definidos', function () {
    $unidade = Unidade::factory()->create();
    $usuario = Usuario::factory()->create();

    $this->actingAs($usuario, 'web');
    session(['unidade_id' => $unidade->id]);

    $unidadeService = Mockery::mock(UnidadeService::class);
    $unidadeService->shouldReceive('hora')
        ->once()
        ->with($unidade->id)
        ->andReturn('10:30');
    $this->app->instance(UnidadeService::class, $unidadeService);

    $response = $this->postJson('/__tests/login/horario', []);

    $response->assertStatus(200);
    $response->assertJsonPath('status', 'OK');
    $response->assertJsonPath('hora', '10:30');
})->group('login-controller');

test('horarioUnidade retorna 200 com erro quando usuário não está logado', function () {
    $response = $this->postJson('/__tests/login/horario', []);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'Usuário não logado');
})->group('login-controller');

test('horarioUnidade retorna 200 com erro quando unidade não está definida na sessão', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/__tests/login/horario', []);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'Usuário sem unidade selecionada');
})->group('login-controller');

test('logout retorna 200 e desloga usuário do web', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');
    session(['kind' => 'SESSION']);

    $response = $this->getJson('/__tests/login/logout-web');

    $response->assertStatus(200);
    $response->assertJsonPath('status', 'OK');
    expect(Auth::guard('web')->check())->toBeFalse();
})->group('login-controller');

test('logout retorna 200 e revoga token quando autenticação é stateless via Sanctum', function () {
    $usuario = Usuario::factory()->create();
    $token = $usuario->createToken('device')->plainTextToken;

    expect($usuario->tokens()->count())->toBe(1);
    Sanctum::actingAs($usuario);

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)->getJson('/__tests/login/logout-stateless');

    $response->assertStatus(200);
    $response->assertJsonPath('status', 'OK');
    $usuario->refresh();
    expect($usuario->tokens()->count())->toBe(0);
})->group('login-controller');

test('authenticateFirebaseToken retorna 422 quando dados obrigatórios ausentes', function () {
    $response = $this->postJson('/__tests/login/authenticate-firebase-token', []);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['entidade', 'token']);
})->group('login-controller');

test('authenticateFirebaseToken retorna 200 com sucesso quando token válido', function () {
    $usuario = Usuario::factory()->create([
        'email' => 'user@teste.com',
    ]);
    $entidade = Entidade::factory()->create();

    $firebase = Mockery::mock(FirebaseAuthService::class);
    $firebase->shouldReceive('verifyFirebaseToken')
        ->once()
        ->andReturn([
            'email' => $usuario->email,
            'picture' => 'https://example.test/avatar.jpg',
        ]);
    $this->app->instance(FirebaseAuthService::class, $firebase);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')->once()->andReturn($usuario);
    $this->app->instance(LoginService::class, $loginService);

    Mockery::mock('overload:' . \App\Services\UsuarioService::class)
        ->shouldReceive('atualizarFotoPerfil')
        ->once()
        ->andReturnNull();

    $response = $this->postJson('/__tests/login/authenticate-firebase-token', [
        'entidade' => $entidade->sigla,
        'token' => 'token-valido',
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
    $response->assertJsonPath('usuario.id', $usuario->id);
    $response->assertJsonPath('entidade.id', $entidade->id);
    expect(session('kind'))->toBe('FIREBASE');
})->group('login-controller');

test('authenticateFirebaseToken retorna 401 quando usuário é inativo', function () {
    $usuario = Usuario::factory()->create([
        'email' => 'user@teste.com',
    ]);
    $entidade = Entidade::factory()->create();

    $firebase = Mockery::mock(FirebaseAuthService::class);
    $firebase->shouldReceive('verifyFirebaseToken')
        ->once()
        ->andReturn([
            'email' => $usuario->email,
            'picture' => 'https://example.test/avatar.jpg',
        ]);
    $this->app->instance(FirebaseAuthService::class, $firebase);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')->once()->andReturn(null);
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-firebase-token', [
        'entidade' => $entidade->sigla,
        'token' => 'token-valido',
    ]);

    $response->assertStatus(401);
    $response->assertJsonPath('error', 'Usuário inativo no SIAPE. Acesso negado.');
})->group('login-controller');

test('authenticateFirebaseToken retorna 200 com erro quando token é inválido', function () {
    $entidade = Entidade::factory()->create();

    $firebase = Mockery::mock(FirebaseAuthService::class);
    $firebase->shouldReceive('verifyFirebaseToken')
        ->once()
        ->andReturn(['error' => 'invalid']);
    $this->app->instance(FirebaseAuthService::class, $firebase);

    $response = $this->postJson('/__tests/login/authenticate-firebase-token', [
        'entidade' => $entidade->sigla,
        'token' => 'token-invalido',
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'As credenciais fornecidas são inválidas.');
})->group('login-controller');

test('authenticateGoogleToken retorna 422 quando dados obrigatórios ausentes', function () {
    $response = $this->postJson('/__tests/login/authenticate-google-token', []);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['entidade', 'token']);
})->group('login-controller');

test('authenticateGoogleToken retorna 200 com sucesso quando token válido', function () {
    $usuario = Usuario::factory()->create([
        'email' => 'user@teste.com',
    ]);
    $entidade = Entidade::factory()->create();

    $google = Mockery::mock(GoogleService::class);
    $google->shouldReceive('verifyToken')
        ->once()
        ->andReturn([
            'email' => $usuario->email,
            'picture' => 'https://example.test/avatar.jpg',
        ]);
    $this->app->instance(GoogleService::class, $google);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')->once()->andReturn($usuario);
    $this->app->instance(LoginService::class, $loginService);

    Mockery::mock('overload:' . \App\Services\UsuarioService::class)
        ->shouldReceive('atualizarFotoPerfil')
        ->once()
        ->andReturnNull();

    $response = $this->postJson('/__tests/login/authenticate-google-token', [
        'entidade' => $entidade->sigla,
        'token' => 'token-valido',
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
    $response->assertJsonPath('usuario.id', $usuario->id);
    $response->assertJsonPath('entidade.id', $entidade->id);
    expect(session('kind'))->toBe('GOOGLE');
})->group('login-controller');

test('authenticateGoogleToken retorna 401 quando usuário é inativo', function () {
    $usuario = Usuario::factory()->create([
        'email' => 'user@teste.com',
    ]);
    $entidade = Entidade::factory()->create();

    $google = Mockery::mock(GoogleService::class);
    $google->shouldReceive('verifyToken')
        ->once()
        ->andReturn([
            'email' => $usuario->email,
            'picture' => 'https://example.test/avatar.jpg',
        ]);
    $this->app->instance(GoogleService::class, $google);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')->once()->andReturn(null);
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-google-token', [
        'entidade' => $entidade->sigla,
        'token' => 'token-valido',
    ]);

    $response->assertStatus(401);
    $response->assertJsonPath('error', 'Usuário inativo no SIAPE. Acesso negado.');
})->group('login-controller');

test('authenticateGoogleToken retorna 200 com erro quando token é inválido', function () {
    $entidade = Entidade::factory()->create();

    $google = Mockery::mock(GoogleService::class);
    $google->shouldReceive('verifyToken')
        ->once()
        ->andReturn(['error' => 'invalid']);
    $this->app->instance(GoogleService::class, $google);

    $response = $this->postJson('/__tests/login/authenticate-google-token', [
        'entidade' => $entidade->sigla,
        'token' => 'token-invalido',
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'As credenciais fornecidas são inválidas.');
})->group('login-controller');

test('authenticateApiSession retorna 200 com erro quando não há usuário autenticado', function () {
    $response = $this->postJson('/__tests/login/authenticate-api-session', []);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'Sessão não encontrada');
})->group('login-controller');

test('authenticateApiSession retorna token e dados quando autenticado via Sanctum', function () {
    $usuario = Usuario::factory()->create();
    $entidade = Entidade::factory()->create();

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')->once()->andReturn($usuario);
    $this->app->instance(LoginService::class, $loginService);

    $token = $usuario->createToken('device')->plainTextToken;
    Sanctum::actingAs($usuario);
    session(['kind' => 'SESSION']);

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)->postJson('/__tests/login/authenticate-api-session-auth', []);

    $response->assertStatus(200);
    $response->assertJsonPath('token', $token);
    $response->assertJsonPath('kind', 'SESSION');
    $response->assertJsonPath('usuario.id', $usuario->id);
    $response->assertJsonPath('entidade.id', $entidade->id);
})->group('login-controller');

test('authenticateApiUserPassword retorna 422 quando dados obrigatórios ausentes', function () {
    $response = $this->postJson('/__tests/login/authenticate-api-user-password', []);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['entidade', 'email', 'password', 'device_name']);
})->group('login-controller');

test('authenticateApiUserPassword retorna token quando usuário existe e está autenticado no request', function () {
    $usuario = Usuario::factory()->create();
    $entidade = Entidade::factory()->create();

    $this->actingAs($usuario, 'web');

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')->once()->andReturn($usuario);
    $this->app->instance(LoginService::class, $loginService);

    $response = $this->postJson('/__tests/login/authenticate-api-user-password', [
        'entidade' => $entidade->sigla,
        'email' => $usuario->email,
        'password' => 'nao-validado-pelo-controller',
        'device_name' => 'device',
    ]);

    $response->assertStatus(200);
    expect(Arr::get($response->json(), 'token'))->toBeString();
    $response->assertJsonPath('usuario.id', $usuario->id);
    $response->assertJsonPath('entidade.id', $entidade->id);
    expect(session('kind'))->toBe('USERPASSWORD');
})->group('login-controller');

test('authenticateApiUserPassword retorna 200 com erro quando email não existe', function () {
    $entidade = Entidade::factory()->create();

    $response = $this->postJson('/__tests/login/authenticate-api-user-password', [
        'entidade' => $entidade->sigla,
        'email' => 'naoexiste@teste.com',
        'password' => 'x',
        'device_name' => 'device',
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'As credenciais fornecidas são inválidas.');
})->group('login-controller');

test('authenticateApiFirebaseToken retorna 422 quando dados obrigatórios ausentes', function () {
    $response = $this->postJson('/__tests/login/authenticate-api-firebase-token', []);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['entidade', 'token', 'device_name']);
})->group('login-controller');

test('authenticateApiFirebaseToken retorna token quando token é válido e usuário existe', function () {
    $usuario = Usuario::factory()->create([
        'email' => 'user@teste.com',
    ]);
    $entidade = Entidade::factory()->create();

    $firebase = Mockery::mock(FirebaseAuthService::class);
    $firebase->shouldReceive('verifyFirebaseToken')
        ->once()
        ->andReturn([
            'email' => $usuario->email,
            'picture' => 'https://example.test/avatar.jpg',
        ]);
    $this->app->instance(FirebaseAuthService::class, $firebase);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')->once()->andReturn($usuario);
    $this->app->instance(LoginService::class, $loginService);

    Mockery::mock('overload:' . \App\Services\UsuarioService::class)
        ->shouldReceive('atualizarFotoPerfil')
        ->once()
        ->andReturnNull();

    $response = $this->postJson('/__tests/login/authenticate-api-firebase-token', [
        'entidade' => $entidade->sigla,
        'token' => 'token-valido',
        'device_name' => 'device',
    ]);

    $response->assertStatus(200);
    expect(Arr::get($response->json(), 'token'))->toBeString();
    $response->assertJsonPath('usuario.id', $usuario->id);
    $response->assertJsonPath('entidade.id', $entidade->id);
    expect(session('kind'))->toBe('FIREBASE');
})->group('login-controller');

test('authenticateApiFirebaseToken retorna 200 com erro quando token é inválido', function () {
    $entidade = Entidade::factory()->create();

    $firebase = Mockery::mock(FirebaseAuthService::class);
    $firebase->shouldReceive('verifyFirebaseToken')
        ->once()
        ->andReturn(['error' => 'invalid']);
    $this->app->instance(FirebaseAuthService::class, $firebase);

    $response = $this->postJson('/__tests/login/authenticate-api-firebase-token', [
        'entidade' => $entidade->sigla,
        'token' => 'token-invalido',
        'device_name' => 'device',
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'As credenciais fornecidas são inválidas.');
})->group('login-controller');

test('authenticateApiGoogleToken retorna 422 quando dados obrigatórios ausentes', function () {
    $response = $this->postJson('/__tests/login/authenticate-api-google-token', []);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['entidade', 'token', 'device_name']);
})->group('login-controller');

test('authenticateApiGoogleToken retorna token quando token é válido e usuário existe', function () {
    $usuario = Usuario::factory()->create([
        'email' => 'user@teste.com',
    ]);
    $entidade = Entidade::factory()->create();

    $google = Mockery::mock(GoogleService::class);
    $google->shouldReceive('verifyToken')
        ->once()
        ->andReturn([
            'email' => $usuario->email,
            'picture' => 'https://example.test/avatar.jpg',
        ]);
    $this->app->instance(GoogleService::class, $google);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')->once()->andReturn($usuario);
    $this->app->instance(LoginService::class, $loginService);

    Mockery::mock('overload:' . \App\Services\UsuarioService::class)
        ->shouldReceive('atualizarFotoPerfil')
        ->once()
        ->andReturnNull();

    $response = $this->postJson('/__tests/login/authenticate-api-google-token', [
        'entidade' => $entidade->sigla,
        'token' => 'token-valido',
        'device_name' => 'device',
    ]);

    $response->assertStatus(200);
    expect(Arr::get($response->json(), 'token'))->toBeString();
    $response->assertJsonPath('usuario.id', $usuario->id);
    $response->assertJsonPath('entidade.id', $entidade->id);
    expect(session('kind'))->toBe('GOOGLE');
})->group('login-controller');

test('authenticateApiGoogleToken retorna 200 com erro quando token é inválido', function () {
    $entidade = Entidade::factory()->create();

    $google = Mockery::mock(GoogleService::class);
    $google->shouldReceive('verifyToken')
        ->once()
        ->andReturn(['error' => 'invalid']);
    $this->app->instance(GoogleService::class, $google);

    $response = $this->postJson('/__tests/login/authenticate-api-google-token', [
        'entidade' => $entidade->sigla,
        'token' => 'token-invalido',
        'device_name' => 'device',
    ]);

    $response->assertStatus(200);
    $response->assertJsonPath('error', 'As credenciais fornecidas são inválidas.');
})->group('login-controller');

test('validateApiToken retorna valid=false quando não autenticado', function () {
    $response = $this->getJson('/__tests/login/validate-token-open');

    $response->assertStatus(200);
    $response->assertJsonPath('valid', false);
})->group('login-controller');

test('validateApiToken retorna valid=true quando autenticado via Sanctum', function () {
    $usuario = Usuario::factory()->create();
    $token = $usuario->createToken('device')->plainTextToken;
    Sanctum::actingAs($usuario);

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)->getJson('/__tests/login/validate-token-auth');

    $response->assertStatus(200);
    $response->assertJsonPath('valid', true);
})->group('login-controller');

test('signInAzureRedirect retorna redirect do provider', function () {
    config()->set('app.url', 'https://app.test');
    config()->set('services.azure.client_id', 'client');
    config()->set('services.azure.client_secret', 'secret');
    config()->set('services.azure.tenant', 'tenant');

    $entidade = Entidade::factory()->create();

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $this->app->instance(LoginService::class, $loginService);

    $provider = Mockery::mock();
    $provider->shouldReceive('setConfig')->once()->andReturnSelf();
    $provider->shouldReceive('scopes')->once()->andReturnSelf();
    $provider->shouldReceive('redirect')->once()->andReturn(redirect('https://example.test/azure'));

    Socialite::shouldReceive('driver')->once()->with('azure')->andReturn($provider);

    $response = $this->get('/__tests/login/azure-redirect');

    $response->assertRedirect('https://example.test/azure');
})->group('login-controller');

test('signInAzureCallback retorna view e registra sessão quando login é válido', function () {
    config()->set('app.url', 'https://app.test');
    config()->set('services.azure.client_id', 'client');
    config()->set('services.azure.client_secret', 'secret');
    config()->set('services.azure.tenant', 'tenant');

    $entidade = Entidade::factory()->create();
    $usuario = Usuario::factory()->create(['email' => 'user@teste.com']);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')->once()->andReturn($usuario);
    $this->app->instance(LoginService::class, $loginService);

    $provider = Mockery::mock();
    $provider->shouldReceive('setConfig')->once()->andReturnSelf();
    $provider->shouldReceive('user')->once()->andReturn((object) [
        'token' => 'token',
        'email' => 'user@teste.com#EXT#',
    ]);

    Socialite::shouldReceive('driver')->once()->with('azure')->andReturn($provider);

    $response = $this->get('/__tests/login/azure-callback');

    $response->assertOk();
    $response->assertViewIs('azure');
    expect(session('kind'))->toBe('AZURE');
    expect(Auth::check())->toBeTrue();
})->group('login-controller');

test('signInAzureCallback retorna 401 quando usuário é inativo', function () {
    config()->set('app.url', 'https://app.test');
    config()->set('services.azure.client_id', 'client');
    config()->set('services.azure.client_secret', 'secret');
    config()->set('services.azure.tenant', 'tenant');

    $entidade = Entidade::factory()->create();
    $usuario = Usuario::factory()->create(['email' => 'user@teste.com']);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')->once()->andReturn(null);
    $this->app->instance(LoginService::class, $loginService);

    $provider = Mockery::mock();
    $provider->shouldReceive('setConfig')->once()->andReturnSelf();
    $provider->shouldReceive('user')->once()->andReturn((object) [
        'token' => 'token',
        'email' => $usuario->email,
    ]);

    Socialite::shouldReceive('driver')->once()->with('azure')->andReturn($provider);

    $response = $this->get('/__tests/login/azure-callback');

    $response->assertStatus(401);
    $response->assertJsonPath('error', 'Usuário inativo no SIAPE. Acesso negado.');
})->group('login-controller');

test('signInGovBrRedirect retorna redirect do provider', function () {
    config()->set('services.govbr.client_id', 'client');
    config()->set('services.govbr.client_secret', 'secret');
    config()->set('services.govbr.environment', 'test');
    config()->set('services.govbr.redirect', 'https://app.test/api/login-govbr-callback/');
    config()->set('services.govbr.code_challenge', 'challenge');
    config()->set('services.govbr.code_challenge_method', 'S256');

    $entidade = Entidade::factory()->create();

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $this->app->instance(LoginService::class, $loginService);

    $provider = Mockery::mock();
    $provider->shouldReceive('setConfig')->once()->andReturnSelf();
    $provider->shouldReceive('scopes')->once()->andReturnSelf();
    $provider->shouldReceive('redirect')->once()->andReturn(redirect('https://example.test/govbr'));

    Socialite::shouldReceive('driver')->once()->with('govbr')->andReturn($provider);

    $response = $this->get('/__tests/login/govbr-redirect');

    $response->assertRedirect('https://example.test/govbr');
})->group('login-controller');

test('signInGovBrCallback retorna view e registra sessão quando login é válido', function () {
    config()->set('services.govbr.client_id', 'client');
    config()->set('services.govbr.client_secret', 'secret');
    config()->set('services.govbr.environment', 'test');
    config()->set('services.govbr.redirect', 'https://app.test/api/login-govbr-callback/');
    config()->set('services.govbr.code_verifier', 'verifier');

    Http::fake([
        '*' => Http::response([], 401),
    ]);

    $entidade = Entidade::factory()->create();
    $usuario = Usuario::factory()->create(['cpf' => '12345678900']);

    $loginService = Mockery::mock(LoginService::class);
    $loginService->shouldReceive('registrarEntidade')->once()->andReturn($entidade);
    $loginService->shouldReceive('registrarUsuario')->once()->andReturn($usuario);
    $this->app->instance(LoginService::class, $loginService);

    $provider = Mockery::mock();
    $provider->shouldReceive('setConfig')->once()->andReturnSelf();
    $provider->shouldReceive('stateless')->once()->andReturnSelf();
    $provider->shouldReceive('user')->once()->andReturn((object) [
        'token' => 'token',
        'cpf' => $usuario->cpf,
        'email' => 'user_test.com#EXT#',
    ]);

    Socialite::shouldReceive('driver')->once()->with('govbr')->andReturn($provider);

    $response = $this->get('/__tests/login/govbr-callback?code=abc&state=st');

    $response->assertOk();
    $response->assertViewIs('govbr');
    expect(session('kind'))->toBe('GOVBR');
    expect(Auth::check())->toBeTrue();
})->group('login-controller');
