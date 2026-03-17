<?php

namespace Tests\Unit\Services;

use App\Services\LoginService;
use App\Services\UsuarioService;
use App\Services\UnidadeService;
use App\Services\FirebaseAuthService;
use App\Services\GoogleService;
use App\Models\Usuario;
use App\Models\Entidade;
use App\Repository\UsuarioRepository;
use App\Repository\EntidadeRepository;
use App\Repository\UnidadeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->usuarioService = Mockery::mock(UsuarioService::class);
    $this->usuarioService
        ->shouldReceive('anexarUnidadesVinculadasPorCpf')
        ->andReturnNull()
        ->byDefault();
    $this->unidadeService = Mockery::mock(UnidadeService::class);
    $this->firebaseAuthService = Mockery::mock(FirebaseAuthService::class);
    $this->googleService = Mockery::mock(GoogleService::class);
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $this->entidadeRepository = Mockery::mock(EntidadeRepository::class);
    $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);

    $this->service = Mockery::mock(LoginService::class, [
        $this->usuarioService,
        $this->unidadeService,
        $this->firebaseAuthService,
        $this->googleService,
        $this->usuarioRepository,
        $this->entidadeRepository,
        $this->unidadeRepository
    ])->makePartial();

    $this->service->shouldAllowMockingProtectedMethods();
});

afterAll(function () {
    Mockery::close();
});

test('registrar entidade corretamente quando sigla fornecida', function () {
    $request = Mockery::mock(Request::class);
    $request->shouldReceive('hasSession')->andReturn(false);
    $request->shouldReceive('input')->with('entidade')->andReturn('ENTIDADE_TESTE');
    $request->shouldReceive('header')->with('X-Entidade')->andReturn(null);

    $entidadeMock = Mockery::mock(Entidade::class);
    $entidadeMock->shouldReceive('getAttribute')->with('id')->andReturn('uuid-entidade');
    
    $this->entidadeRepository->shouldReceive('findBySigla')
        ->with('ENTIDADE_TESTE', Mockery::any())
        ->andReturn($entidadeMock);

    $result = $this->service->registrarEntidade($request);

    expect($result)->toBe($entidadeMock);
});

test('authenticate user password corretamente via api', function () {
    $credentials = [
        'email' => 'teste@teste.com',
        'password' => 'password',
        'device_name' => 'device'
    ];

    $sessionMock = Mockery::mock();
    $sessionMock->shouldReceive('get')->with('entidade_id')->andReturn(null);
    $sessionMock->shouldReceive('put');
    
    $request = Mockery::mock(Request::class);
    $request->shouldReceive('session')->andReturn($sessionMock);

    // Mock Usuario
    $usuarioMock = Mockery::mock(Usuario::class);
    $usuarioMock->shouldReceive('getAttribute')->with('password')->andReturn(Hash::make('password'));
    $usuarioMock->shouldReceive('getAttribute')->with('id')->andReturn('uuid-usuario');
    $usuarioMock->shouldReceive('getAttribute')->with('email')->andReturn('teste@teste.com');
    $usuarioMock->shouldReceive('getAttribute')->with('cpf')->andReturn('12345678901');
    $usuarioMock->shouldReceive('getAttribute')->with('situacao_siape')->andReturn('ATIVO_PERMANENTE');
    $usuarioMock->shouldReceive('getAttribute')->with('config')->andReturn([]);
    $usuarioMock->shouldReceive('offsetExists')->with('config')->andReturn(true);
    $usuarioMock->shouldReceive('getAttribute')->with('lotacao')->andReturn(null);
    $usuarioMock->shouldReceive('offsetExists')->with('lotacao')->andReturn(false);
    $usuarioMock->shouldReceive('createToken')->andReturn((object)['plainTextToken' => 'token-123']);
    $usuarioMock->shouldReceive('update');
    $usuarioMock->shouldReceive('fresh');
    $usuarioMock->shouldReceive('setAttribute')->with('unidades_vinculadas', Mockery::type('array'))->andReturnSelf();

    // Hash check
    Hash::shouldReceive('check')->with('password', Mockery::any())->andReturn(true);

    // 1. findUserByEmail -> UsuarioRepository::findByEmail
    $this->usuarioRepository->shouldReceive('findByEmail')
        ->with('teste@teste.com')
        ->andReturn($usuarioMock);

    // 2. loadUserWithRelations -> UsuarioRepository::loadUserWithRelations
    $this->usuarioRepository->shouldReceive('loadUserWithRelations')
        ->with('uuid-usuario', '') // string vazia pois entidade_id é null e tratado no service
        ->andReturn($usuarioMock);

    $this->usuarioRepository->shouldReceive('findActivesByCpf')
        ->with('12345678901')
        ->andReturn(new \Illuminate\Database\Eloquent\Collection());

    $this->usuarioRepository->shouldReceive('getUnidadesVinculadas')
        ->with('12345678901')
        ->andReturn(new \Illuminate\Database\Eloquent\Collection());

    // Mock registrarEntidade internal call
    $this->service->shouldReceive('registrarEntidade')->andReturn(Mockery::mock(Entidade::class));

    $result = $this->service->authenticateApiUserPassword($credentials, $request);

    expect($result)->toBeArray();
    expect($result['token'])->toBe('token-123');
    expect($result['usuario'])->toBe($usuarioMock);
});

test('authenticate firebase token success', function () {
    $credentials = ['token' => 'firebase-token', 'device_name' => 'device'];
    $request = Mockery::mock(Request::class);
    
    $sessionMock = Mockery::mock();
    $sessionMock->shouldReceive('get')->with('entidade_id')->andReturn(null);
    $sessionMock->shouldReceive('put');
    
    $request->shouldReceive('session')->andReturn($sessionMock);

    // Mock FirebaseAuthService
    $tokenData = [
        'email' => 'teste@teste.com',
        'cpf' => '12345678901',
        'picture' => 'http://picture.url'
    ];
    $this->firebaseAuthService->shouldReceive('verifyFirebaseToken')->with('firebase-token')->andReturn($tokenData);

    // Mock Usuario
    $usuarioMock = Mockery::mock(Usuario::class);
    $usuarioMock->shouldReceive('getAttribute')->with('id')->andReturn('uuid-usuario');
    $usuarioMock->shouldReceive('getAttribute')->with('cpf')->andReturn('12345678901');
    $usuarioMock->shouldReceive('getAttribute')->with('situacao_siape')->andReturn('ATIVO_PERMANENTE');
    $usuarioMock->shouldReceive('getAttribute')->with('config')->andReturn([]);
    $usuarioMock->shouldReceive('offsetExists')->with('config')->andReturn(true);
    $usuarioMock->shouldReceive('getAttribute')->with('lotacao')->andReturn(null);
    $usuarioMock->shouldReceive('offsetExists')->with('lotacao')->andReturn(false);
    $usuarioMock->shouldReceive('createToken')->andReturn((object)['plainTextToken' => 'token-123']);
    $usuarioMock->shouldReceive('update');
    $usuarioMock->shouldReceive('fresh');
    $usuarioMock->shouldReceive('setAttribute')->with('unidades_vinculadas', Mockery::type('array'))->andReturnSelf();
    
    $this->usuarioService->shouldReceive('atualizarFotoPerfil')
        ->with(UsuarioService::LOGIN_FIREBASE, $usuarioMock, 'http://picture.url');

    // findUserByEmail
    $this->usuarioRepository->shouldReceive('findByEmail')
        ->with('teste@teste.com')
        ->andReturn($usuarioMock);
    
    // loadUserWithRelations
    $this->usuarioRepository->shouldReceive('loadUserWithRelations')
        ->with('uuid-usuario', '')
        ->andReturn($usuarioMock);

    $this->usuarioRepository->shouldReceive('findActivesByCpf')
        ->with('12345678901')
        ->andReturn(new \Illuminate\Database\Eloquent\Collection());

    $this->usuarioRepository->shouldReceive('getUnidadesVinculadas')
        ->with('12345678901')
        ->andReturn(new \Illuminate\Database\Eloquent\Collection());

    $this->service->shouldReceive('registrarEntidade')->andReturn(Mockery::mock(Entidade::class));

    $result = $this->service->authenticateApiFirebaseToken($credentials, $request);

    expect($result)->toBeArray();
    expect($result['token'])->toBe('token-123');
});

test('horario unidade sem login lanca excecao', function () {
    Auth::shouldReceive('check')->andReturn(false);
    $request = Mockery::mock(Request::class);
    
    expect(fn() => $this->service->horarioUnidade($request))
        ->toThrow(\Exception::class, "Usuário não logado");
});

test('horario unidade sem unidade selecionada lanca excecao', function () {
    Auth::shouldReceive('check')->andReturn(true);
    
    $request = Mockery::mock(Request::class);
    $sessionMock = Mockery::mock();
    $sessionMock->shouldReceive('get')->with('unidade_id')->andReturn(null);
    $request->shouldReceive('session')->andReturn($sessionMock);
    
    expect(fn() => $this->service->horarioUnidade($request))
        ->toThrow(\Exception::class, "Usuário sem unidade selecionada");
});

test('horario unidade sucesso', function () {
    Auth::shouldReceive('check')->andReturn(true);
    
    $request = Mockery::mock(Request::class);
    $sessionMock = Mockery::mock();
    $sessionMock->shouldReceive('get')->with('unidade_id')->andReturn('uuid-unidade');
    $request->shouldReceive('session')->andReturn($sessionMock);
    
    $this->unidadeService->shouldReceive('hora')->with('uuid-unidade')->andReturn('12:00');
    
    $result = $this->service->horarioUnidade($request);
    
    expect($result)->toBe('12:00');
});

test('logout', function () {
    $request = Mockery::mock(Request::class);
    $usuarioMock = Mockery::mock(Usuario::class);
    $tokenMock = Mockery::mock();
    $tokenMock->shouldReceive('delete');
    
    $usuarioMock->shouldReceive('currentAccessToken')->andReturn($tokenMock);
    
    Auth::shouldReceive('user')->andReturn($usuarioMock);
    Auth::shouldReceive('shouldUse');
    Auth::shouldReceive('guard')->andReturnSelf();
    Auth::shouldReceive('check')->andReturn(true);
    Auth::shouldReceive('logout');
    
    $request->shouldReceive('user')->andReturn($usuarioMock);
    $request->shouldReceive('session')->andReturnSelf();
    $request->shouldReceive('invalidate');
    $request->shouldReceive('regenerateToken');

    // Case 1: Stateless Sanctum
    $this->service->logout($request);
    
    // Case 2: Web Guard
    $usuarioMock->shouldReceive('currentAccessToken')->andReturn(null);
    $this->service->logout($request);
    
    expect(true)->toBeTrue(); // If no exception, passed
});

test('signIn govbr callback normaliza cpf e encontra usuario ativo', function () {
    $request = Request::create('/login-govbr-callback/ABC', 'GET', [
        'code' => 'code-123',
        'state' => 'state-123',
    ]);

    $session = app('session')->driver();
    $session->start();
    $request->setLaravelSession($session);

    $entidade = new Entidade();
    $entidade->id = 'uuid-entidade';
    $entidade->sigla = 'ABC';

    $usuario = new Usuario();
    $usuario->id = 'uuid-usuario';
    $usuario->cpf = '12345678901';
    $usuario->situacao_siape = 'ATIVO_PERMANENTE';
    $usuario->config = [];

    $socialiteUser = (object) [
        'cpf' => '123.456.789-01',
    ];

    $provider = new class ($socialiteUser) {
        public function __construct(private object $socialiteUser)
        {
        }

        public function stateless(): self
        {
            return $this;
        }

        public function user(): object
        {
            return $this->socialiteUser;
        }
    };

    $config = new \SocialiteProviders\Manager\Config('client', 'secret', 'redirect', []);

    $this->service->shouldReceive('registrarEntidade')->andReturn($entidade);
    $this->service->shouldReceive('getConfigGovBr')->andReturn($config);
    $this->service->shouldReceive('govBrProvider')->andReturn($provider);
    $this->service->shouldReceive('registrarUsuario')->andReturn($usuario);

    $this->usuarioRepository->shouldReceive('findActivesByCpf')
        ->with('12345678901')
        ->andReturn(new \Illuminate\Database\Eloquent\Collection([$usuario]));

    Auth::shouldReceive('loginUsingId')->with('uuid-usuario')->andReturn(true);

    $result = $this->service->signInGovBrCallback($request);

    expect($result)->toBeArray();
    expect($result['kind'])->toBe(LoginService::KIND_GOVBR);
    expect($result['usuario'])->toBe($usuario);
    expect($result['entidade'])->toBe($entidade);
});

test('signIn govbr callback faz fallback para email quando cpf ausente', function () {
    $request = Request::create('/login-govbr-callback/ABC', 'GET', [
        'code' => 'code-123',
        'state' => 'state-123',
    ]);

    $session = app('session')->driver();
    $session->start();
    $request->setLaravelSession($session);

    $entidade = new Entidade();
    $entidade->id = 'uuid-entidade';
    $entidade->sigla = 'ABC';

    $usuario = new Usuario();
    $usuario->id = 'uuid-usuario';
    $usuario->cpf = '12345678901';
    $usuario->situacao_siape = 'ATIVO_PERMANENTE';
    $usuario->config = [];

    $socialiteUser = (object) [
        'email' => 'teste@teste.com',
    ];

    $provider = new class ($socialiteUser) {
        public function __construct(private object $socialiteUser)
        {
        }

        public function stateless(): self
        {
            return $this;
        }

        public function user(): object
        {
            return $this->socialiteUser;
        }
    };

    $config = new \SocialiteProviders\Manager\Config('client', 'secret', 'redirect', []);

    $this->service->shouldReceive('registrarEntidade')->andReturn($entidade);
    $this->service->shouldReceive('getConfigGovBr')->andReturn($config);
    $this->service->shouldReceive('govBrProvider')->andReturn($provider);
    $this->service->shouldReceive('registrarUsuario')->andReturn($usuario);

    $this->usuarioRepository->shouldReceive('findActivesByCpf')
        ->with('')
        ->andReturn(new \Illuminate\Database\Eloquent\Collection());

    $this->usuarioRepository->shouldReceive('findByCpf')
        ->with('')
        ->andReturn(null);
    $this->usuarioRepository->shouldReceive('findByEmail')
        ->with('teste@teste.com')
        ->andReturn($usuario);

    Auth::shouldReceive('loginUsingId')->with('uuid-usuario')->andReturn(true);

    $result = $this->service->signInGovBrCallback($request);

    expect($result)->toBeArray();
    expect($result['kind'])->toBe(LoginService::KIND_GOVBR);
    expect($result['usuario'])->toBe($usuario);
});

test('registrarUsuario inclui unidades_vinculadas com atributos minimos', function () {
    $sessionMock = Mockery::mock();
    $sessionMock->shouldReceive('get')->with('entidade_id')->andReturn('entidade-1');
    $sessionMock->shouldReceive('put')->with('unidade_id', Mockery::any());

    $request = Mockery::mock(Request::class);
    $request->shouldReceive('session')->andReturn($sessionMock);

    $usuario = new Usuario();
    $usuario->id = 'uuid-usuario';
    $usuario->cpf = '12345678901';
    $usuario->config = [];

    $usuarioComRelacoes = new Usuario();
    $usuarioComRelacoes->id = 'uuid-usuario';
    $usuarioComRelacoes->cpf = '12345678901';
    $usuarioComRelacoes->config = [];
    $usuarioComRelacoes->setRelation('lotacao', null);

    $this->usuarioRepository->shouldReceive('loadUserWithRelations')
        ->with('uuid-usuario', 'entidade-1')
        ->andReturn($usuarioComRelacoes);
        
    $this->usuarioService->shouldReceive('anexarUnidadesVinculadasPorCpf')
        ->once()
        ->with(Mockery::on(function ($arg) {
            return $arg instanceof Usuario && $arg->cpf === '12345678901';
        }))
        ->andReturnUsing(function (Usuario $usuario) {
            $usuario->setAttribute('unidades_vinculadas', [
                [
                    'id' => 'unidade-1',
                    'sigla' => 'U1',
                    'matricula' => '0001',
                    'emProcessoDeInativacao' => false,
                ],
                [
                    'id' => 'unidade-1',
                    'sigla' => 'U1',
                    'matricula' => '0002',
                    'emProcessoDeInativacao' => true,
                ],
            ]);
        });

    $result = $this->service->registrarUsuario($request, $usuario);

    expect($result)->toBeInstanceOf(Usuario::class);

    $unidadesVinculadas = $result->getAttribute('unidades_vinculadas');
    expect($unidadesVinculadas)->toBeArray();
    expect($unidadesVinculadas)->toHaveCount(2);
    expect($unidadesVinculadas[0])->toMatchArray([
        'id' => 'unidade-1',
        'sigla' => 'U1',
        'matricula' => '0001',
        'emProcessoDeInativacao' => false,
    ]);
    expect($unidadesVinculadas[1])->toMatchArray([
        'id' => 'unidade-1',
        'sigla' => 'U1',
        'matricula' => '0002',
        'emProcessoDeInativacao' => true,
    ]);
});
