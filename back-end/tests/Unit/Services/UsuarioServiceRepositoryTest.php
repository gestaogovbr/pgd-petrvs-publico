<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\UsuarioService;
use App\Repository\UsuarioRepository;
use App\Services\UnidadeIntegranteService;
use App\Services\UnidadeIntegranteAtribuicaoService;
use App\Services\NivelAcessoService;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Models\Unidade;
use Illuminate\Support\Facades\Auth;
use Mockery;
use App\Services\ServiceBase;

class UsuarioServiceRepositoryTest extends TestCase
{
    protected $service;
    protected $usuarioRepositoryMock;
    protected $unidadeIntegranteServiceMock;
    protected $unidadeIntegranteAtribuicaoServiceMock;
    protected $nivelAcessoServiceMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->usuarioRepositoryMock = Mockery::mock(UsuarioRepository::class);
        $this->unidadeIntegranteServiceMock = Mockery::mock(UnidadeIntegranteService::class);
        $this->unidadeIntegranteAtribuicaoServiceMock = Mockery::mock(UnidadeIntegranteAtribuicaoService::class);
        $this->nivelAcessoServiceMock = Mockery::mock(NivelAcessoService::class);

        // Bind mocks into the container so app() calls resolve to them
        $this->app->instance(UsuarioRepository::class, $this->usuarioRepositoryMock);
        $this->app->instance(UnidadeIntegranteService::class, $this->unidadeIntegranteServiceMock);
        $this->app->instance(UnidadeIntegranteAtribuicaoService::class, $this->unidadeIntegranteAtribuicaoServiceMock);
        $this->app->instance(NivelAcessoService::class, $this->nivelAcessoServiceMock);

        // Create partial mock of service
        // We need to call constructor manually or let Mockery do it if we pass arguments (none here)
        // But since we want partial mock with protected methods allowed:
        $this->service = Mockery::mock(UsuarioService::class)->makePartial()->shouldAllowMockingProtectedMethods();
        
        // Manually invoke constructor to trigger app() resolution
        $this->service->__construct();
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_store_creates_new_user()
    {
        $data = [
            'email' => 'test@example.com', 
            'nome' => 'Test User', 
            'cpf' => '12345678900',
            'perfil_id' => 'perfil-id',
            'integrantes' => [['unidade_id' => 'u1']]
        ];
        $unidade = new Unidade();

        // Mock findPerfil on Service
        $perfilParticipante = new Perfil(['id' => 'perfil-id', 'nivel' => 1, 'nome' => 'Participante']);
        $this->service->shouldReceive('findPerfil')
            ->with('perfil-id')
            ->andReturn($perfilParticipante);

        // Mock Auth::user()
        $loggedUser = new Usuario(['id' => 'logged-id']);
        $loggedUser->perfil = (object)['id' => 'admin-id', 'nivel' => 0]; // Admin level
        Auth::shouldReceive('user')->andReturn($loggedUser);
        
        // Mock NivelAcessoService
        $perfilDev = new Perfil(['id' => 'dev-id']);
        $this->nivelAcessoServiceMock->shouldReceive('getPerfilDesenvolvedor')->andReturn($perfilDev);

        // Mock Repository FindByCpfOrEmail (validation check)
        $this->usuarioRepositoryMock->shouldReceive('findByCpfOrEmail')
            ->with('12345678900', 'test@example.com', null, true)
            ->andReturn(null);

        // Mock Repository Create
        $createdUser = new Usuario(array_merge($data));
        $createdUser->id = 'new-id';
        $this->usuarioRepositoryMock->shouldReceive('create')
            ->with(Mockery::type('array'))
            ->once()
            ->andReturn($createdUser);

        // Mock UnidadeIntegranteService
        $this->unidadeIntegranteServiceMock->shouldReceive('salvarIntegrantes')->once();
        
        // checkLotacoes is NOT called for INSERT action in extraStore logic currently
        // so we don't expect it.

        $result = $this->service->store($data, $unidade);

        $this->assertInstanceOf(Usuario::class, $result);
        $this->assertEquals('new-id', $result->id);
    }

    public function test_update_updates_user()
    {
        $data = [
            'id' => 'user-id', 
            'nome' => 'Updated Name', 
            'perfil_id' => 'perfil-id',
            'integrantes' => [['unidade_id' => 'u1']]
        ];
        $unidade = new Unidade();

        // Mock findPerfil on Service
        $perfilParticipante = new Perfil(['id' => 'perfil-id', 'nivel' => 1, 'nome' => 'Participante']);
        $this->service->shouldReceive('findPerfil')
            ->with('perfil-id')
            ->andReturn($perfilParticipante);

        // Mocking Auth again
        $loggedUser = new Usuario(['id' => 'logged-id']);
        $loggedUser->perfil = (object)['id' => 'admin-id', 'nivel' => 0];
        Auth::shouldReceive('user')->andReturn($loggedUser);
        
        $perfilDev = new Perfil(['id' => 'dev-id']);
        $this->nivelAcessoServiceMock->shouldReceive('getPerfilDesenvolvedor')->andReturn($perfilDev);

        $existingUser = new Usuario(['id' => 'user-id', 'perfil_id' => 'perfil-id']);
        $this->usuarioRepositoryMock->shouldReceive('findById')->with('user-id')->andReturn($existingUser);

        $updatedUser = new Usuario(array_merge($data));
        $this->usuarioRepositoryMock->shouldReceive('update')
            ->with('user-id', Mockery::type('array'))
            ->once()
            ->andReturn($updatedUser);
            
        $this->unidadeIntegranteServiceMock->shouldReceive('salvarIntegrantes')->once();
        $this->unidadeIntegranteAtribuicaoServiceMock->shouldReceive('checkLotacoes')->once();
 
        $result = $this->service->update($data, $unidade);

        $this->assertEquals($updatedUser, $result);
    }

    public function test_destroy_deletes_user()
    {
        $id = 'user-id';
        $user = new Usuario();
        $user->id = $id;
        $this->usuarioRepositoryMock->shouldReceive('findById')->with($id)->once()->andReturn($user);
        $this->usuarioRepositoryMock->shouldReceive('delete')->with($id)->once()->andReturn(true);
        $this->usuarioRepositoryMock->shouldReceive('removerVinculos')->with($id)->once();

        $result = $this->service->destroy($id);

        $this->assertTrue($result);
    }

    public function test_get_by_id_returns_user()
    {
        $id = 'user-id';
        $user = new Usuario(['id' => $id]);
        $this->usuarioRepositoryMock->shouldReceive('findById')->with($id)->once()->andReturn($user);

        $result = $this->service->getById($id);

        $this->assertEquals($user, $result);
    }

    public function test_is_gestor_unidade_recursivo_delegates_to_repository()
    {
        $userId = 'user-id';
        $unidadeId = 'unidade-id';
        // Service signature: isGestorUnidadeRecursivo($unidadeId, $usuarioId)
        // Repo signature: isGestorUnidadeRecursivo($usuarioId, $unidadeId)
        
        $this->usuarioRepositoryMock->shouldReceive('isGestorUnidadeRecursivo')
            ->with($userId, $unidadeId)
            ->once()
            ->andReturn(true);

        $result = $this->service->isGestorUnidadeRecursivo($unidadeId, $userId);

        $this->assertTrue($result);
    }
}
