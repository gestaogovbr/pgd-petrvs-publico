<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\UsuarioService;
use App\Repository\UsuarioRepository;
use App\Repository\UnidadeRepository;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Perfil;
use App\Services\RawWhere;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Mockery;
use App\Exceptions\ValidateException;
use App\Exceptions\NotFoundException;
use App\Services\ServiceBase;
use App\Services\UnidadeService;
use App\Services\UnidadeIntegranteService;
use App\Services\UnidadeIntegranteAtribuicaoService;
use App\Services\NivelAcessoService;

use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\PlanoEntregaRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoEntrega;
use Carbon\Carbon;
use App\Services\IntegracaoService;
use App\Repository\PerfilRepository;
use App\Repository\TipoModalidadeRepository;
use App\Repository\IntegracaoServidorRepository;

class UsuarioServiceRepositoryTest extends TestCase
{
    protected $service;

    /** @var UsuarioRepository|\Mockery\MockInterface */
    protected $usuarioRepository;

    /** @var UnidadeRepository|\Mockery\MockInterface */
    protected $unidadeRepository;

    /** @var PerfilRepository|\Mockery\MockInterface */
    protected $perfilRepository;

    /** @var TipoModalidadeRepository|\Mockery\MockInterface */
    protected $tipoModalidadeRepository;

    /** @var IntegracaoServidorRepository|\Mockery\MockInterface */
    protected $integracaoServidorRepository;

    /** @var UnidadeService|\Mockery\MockInterface */
    protected $unidadeService;

    /** @var IntegracaoService|\Mockery\MockInterface */
    protected $integracaoService;

    /** @var UnidadeIntegranteService|\Mockery\MockInterface */
    protected $unidadeIntegranteService;

    /** @var UnidadeIntegranteAtribuicaoService|\Mockery\MockInterface */
    protected $unidadeIntegranteAtribuicaoService;

    /** @var NivelAcessoService|\Mockery\MockInterface */
    protected $nivelAcessoService;

    /** @var PlanoTrabalhoConsolidacaoRepository|\Mockery\MockInterface */
    protected $planoTrabalhoConsolidacaoRepository;

    /** @var PlanoTrabalhoRepository|\Mockery\MockInterface */
    protected $planoTrabalhoRepository;

    /** @var PlanoEntregaRepository|\Mockery\MockInterface */
    protected $planoEntregaRepository;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
        $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
        $this->perfilRepository = Mockery::mock(PerfilRepository::class);
        $this->tipoModalidadeRepository = Mockery::mock(TipoModalidadeRepository::class);
        $this->integracaoServidorRepository = Mockery::mock(IntegracaoServidorRepository::class);
        $this->planoTrabalhoConsolidacaoRepository = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
        $this->planoTrabalhoRepository = Mockery::mock(PlanoTrabalhoRepository::class);
        $this->planoEntregaRepository = Mockery::mock(PlanoEntregaRepository::class);
        
        $this->unidadeService = Mockery::mock(UnidadeService::class);
        $this->integracaoService = Mockery::mock(IntegracaoService::class);
        $this->unidadeIntegranteService = Mockery::mock(UnidadeIntegranteService::class);
        $this->unidadeIntegranteAtribuicaoService = Mockery::mock(UnidadeIntegranteAtribuicaoService::class);
        $this->nivelAcessoService = Mockery::mock(NivelAcessoService::class);

        $this->app->instance(UsuarioRepository::class, $this->usuarioRepository);
        $this->app->instance(UnidadeRepository::class, $this->unidadeRepository);
        $this->app->instance(PerfilRepository::class, $this->perfilRepository);
        $this->app->instance(TipoModalidadeRepository::class, $this->tipoModalidadeRepository);
        $this->app->instance(IntegracaoServidorRepository::class, $this->integracaoServidorRepository);
        $this->app->instance(PlanoTrabalhoConsolidacaoRepository::class, $this->planoTrabalhoConsolidacaoRepository);
        $this->app->instance(PlanoTrabalhoRepository::class, $this->planoTrabalhoRepository);
        $this->app->instance(PlanoEntregaRepository::class, $this->planoEntregaRepository);
        
        $this->app->instance(UnidadeService::class, $this->unidadeService);
        $this->app->instance(IntegracaoService::class, $this->integracaoService);
        $this->app->instance(UnidadeIntegranteService::class, $this->unidadeIntegranteService);
        $this->app->instance(UnidadeIntegranteAtribuicaoService::class, $this->unidadeIntegranteAtribuicaoService);
        $this->app->instance(NivelAcessoService::class, $this->nivelAcessoService);

        // Mock DB facade for transaction support in ServiceBase/UsuarioService
        DB::shouldReceive('beginTransaction')->byDefault();
        DB::shouldReceive('commit')->byDefault();
        DB::shouldReceive('rollback')->byDefault();

        // Create a partial mock of the class without constructor injection
        $this->service = Mockery::mock(UsuarioService::class)->makePartial();
        $this->service->shouldAllowMockingProtectedMethods();

        // Inject protected repositories via Reflection since constructor is not called
        $reflection = new \ReflectionClass(UsuarioService::class);
        
        $usuarioRepoProp = $reflection->getProperty('usuarioRepository');
        $usuarioRepoProp->setAccessible(true);
        $usuarioRepoProp->setValue($this->service, $this->usuarioRepository);
        
        $unidadeRepoProp = $reflection->getProperty('unidadeRepository');
        $unidadeRepoProp->setAccessible(true);
        $unidadeRepoProp->setValue($this->service, $this->unidadeRepository);

        $perfilRepoProp = $reflection->getProperty('perfilRepository');
        $perfilRepoProp->setAccessible(true);
        $perfilRepoProp->setValue($this->service, $this->perfilRepository);

        $tipoModalidadeRepoProp = $reflection->getProperty('tipoModalidadeRepository');
        $tipoModalidadeRepoProp->setAccessible(true);
        $tipoModalidadeRepoProp->setValue($this->service, $this->tipoModalidadeRepository);

        $integracaoServidorRepoProp = $reflection->getProperty('integracaoServidorRepository');
        $integracaoServidorRepoProp->setAccessible(true);
        $integracaoServidorRepoProp->setValue($this->service, $this->integracaoServidorRepository);

        $ptcRepoProp = $reflection->getProperty('planoTrabalhoConsolidacaoRepository');
        $ptcRepoProp->setAccessible(true);
        $ptcRepoProp->setValue($this->service, $this->planoTrabalhoConsolidacaoRepository);

        $ptRepoProp = $reflection->getProperty('planoTrabalhoRepository');
        $ptRepoProp->setAccessible(true);
        $ptRepoProp->setValue($this->service, $this->planoTrabalhoRepository);

        $peRepoProp = $reflection->getProperty('planoEntregaRepository');
        $peRepoProp->setAccessible(true);
        $peRepoProp->setValue($this->service, $this->planoEntregaRepository);
    }

    protected function tearDown(): void
    {
        if ($container = Mockery::getContainer()) {
            $this->addToAssertionCount($container->mockery_getExpectationCount());
        }
        Mockery::close();
        parent::tearDown();
    }

    public function test_construct_initializes_repositories()
    {
        $this->assertInstanceOf(UsuarioService::class, $this->service);
    }

    public function test_search_text_applies_unidade_filter_for_restricted_user()
    {
        $data = ['fields' => [], 'where' => []];
        $usuarioId = 'user-id';
        
        $userMock = Mockery::mock(Usuario::class);
        $userMock->shouldReceive('getAttribute')->with('id')->andReturn($usuarioId);
        $userMock->shouldReceive('hasPermissionTo')->with('MOD_USER_TUDO')->andReturn(false);
        
        Auth::shouldReceive('user')->andReturn($userMock);

        $this->unidadeRepository->shouldReceive('getAreasTrabalhoWhereClause')
            ->once()
            ->with($usuarioId, true, "where_unidades")
            ->andReturn("unidade_id = 'u1'");

        $this->usuarioRepository->shouldReceive('search')
            ->once()
            ->with(Mockery::on(function ($arg) {
                if (!in_array('usuario_externo', $arg['fields'])) return false;
                $hasRawWhere = false;
                foreach ($arg['where'] as $w) {
                    if ($w instanceof RawWhere && str_contains($w->expression, "unidade_id = 'u1'")) {
                        $hasRawWhere = true;
                    }
                }
                return $hasRawWhere;
            }))
            ->andReturn([]);

        $result = $this->service->searchText($data);
        $this->assertEquals([], $result);
    }

    public function test_search_text_does_not_apply_filter_for_admin_user()
    {
        $data = ['fields' => [], 'where' => []];
        $usuarioId = 'admin-id';
        
        $userMock = Mockery::mock(Usuario::class);
        $userMock->shouldReceive('getAttribute')->with('id')->andReturn($usuarioId);
        $userMock->shouldReceive('hasPermissionTo')->with('MOD_USER_TUDO')->andReturn(true);
        
        Auth::shouldReceive('user')->andReturn($userMock);

        $this->unidadeRepository->shouldReceive('getAreasTrabalhoWhereClause')->never();

        $this->usuarioRepository->shouldReceive('search')
            ->once()
            ->with(Mockery::on(function ($arg) {
                foreach ($arg['where'] as $w) {
                    if ($w instanceof RawWhere && str_contains($w->expression, "unidade_id = 'u1'")) {
                        return false;
                    }
                }
                return true;
            }))
            ->andReturn([]);

        $result = $this->service->searchText($data);
        $this->assertEquals([], $result);
    }

    public function test_get_by_id_calls_repository()
    {
        $id = 'user-id';
        $userMock = Mockery::mock(Usuario::class);
        $userMock->shouldReceive('offsetGet')->with('lotacao')->andReturn(null);
        $userMock->shouldReceive('offsetSet')->with('regramentos', []);
        
        $this->usuarioRepository->shouldReceive('findById')
            ->once()
            ->with($id)
            ->andReturn($userMock);
            
        $result = $this->service->getById($id);
        $this->assertEquals($userMock, $result);
    }

    public function test_get_by_id_throws_not_found_exception()
    {
        $id = 'invalid-id';
        $this->usuarioRepository->shouldReceive('findById')->once()->with($id)->andReturn(null);
        $this->expectException(NotFoundException::class);
        $this->service->getById($id);
    }

    public function test_destroy_calls_repository()
    {
        $id = 'user-id';
        $userMock = Mockery::mock(Usuario::class);
        $userMock->shouldReceive('getAttribute')->with('id')->andReturn($id);
        
        $this->usuarioRepository->shouldReceive('findById')->once()->with($id)->andReturn($userMock);
        $this->usuarioRepository->shouldReceive('removerVinculos')->once()->with($id);
        $userMock->shouldReceive('fresh')->andReturn($userMock);
        $this->usuarioRepository->shouldReceive('delete')->once()->with($id)->andReturn(true);
            
        $result = $this->service->destroy($id);
        $this->assertTrue($result);
    }

    public function test_atualizar_foto_perfil_updates_repository_when_changed()
    {
        $tipo = UsuarioService::LOGIN_GOOGLE;
        $url = 'http://new-url.com/photo.jpg';
        $id = 'user-id';
        
        $usuarioMock = Mockery::mock(Usuario::class);
        $usuarioMock->shouldReceive('getAttribute')->with('id')->andReturn($id);
        // Configurar acesso via propriedade mágica __get
        $usuarioMock->shouldReceive('__get')->with('id')->andReturn($id);
        $usuarioMock->shouldReceive('__get')->with('foto_google')->andReturn('old-url');
        $usuarioMock->shouldReceive('__get')->with('foto_microsoft')->andReturn(null);
        $usuarioMock->shouldReceive('__get')->with('foto_firebase')->andReturn(null);
        
        $usuarioMock->shouldReceive('getAttribute')->with('foto_google')->andReturn('old-url');
        
        // setAttribute é chamado quando fazemos $usuario->prop = val
        $usuarioMock->shouldReceive('setAttribute')->with('foto_perfil', Mockery::any());
        $usuarioMock->shouldReceive('setAttribute')->with('foto_google', $url);
        $usuarioMock->shouldReceive('__set')->with('foto_perfil', Mockery::any());
        $usuarioMock->shouldReceive('__set')->with('foto_google', $url);
        
        $this->service->shouldReceive('downloadImgProfile')
            ->once()
            ->with($url, "usuarios/" . $id)
            ->andReturn("path/to/profile.jpg");
            
        $this->usuarioRepository->shouldReceive('updateFotoPerfil')
            ->once()
            ->with($id, $tipo, $url, "path/to/profile.jpg");
            
        $this->service->atualizarFotoPerfil($tipo, $usuarioMock, $url);
    }

    public function test_is_gestor_unidade_recursivo_calls_repository()
    {
        $unidadeId = 'unidade-id';
        $usuarioId = 'user-id';
        
        $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
            ->once()
            ->with($unidadeId, $usuarioId)
            ->andReturn(true);
            
        $result = $this->service->isGestorUnidadeRecursivo($unidadeId, $usuarioId);
        $this->assertTrue($result);
    }

    public function test_is_participante_habilitado_calls_repository()
    {
        $usuarioId = 'user-id';
        $programaId = 'programa-id';
        
        $this->usuarioRepository->shouldReceive('isParticipanteHabilitado')
            ->once()
            ->with($usuarioId, $programaId)
            ->andReturn(true);
            
        $result = $this->service->isParticipanteHabilitado($usuarioId, $programaId);
        $this->assertTrue($result);
    }

    public function test_is_integrante_calls_repository()
    {
        $usuarioId = 'user-id';
        $unidadeId = 'unidade-id';
        $atribuicao = 'LOTADO';
        
        $this->usuarioRepository->shouldReceive('isIntegrante')
            ->once()
            ->with($usuarioId, $unidadeId, $atribuicao)
            ->andReturn(true);
            
        $result = $this->service->isIntegrante($atribuicao, $unidadeId, $usuarioId);
        $this->assertTrue($result);
    }

    public function test_store_creates_new_user()
    {
        $data = [
            'email' => 'test@test.com',
            'cpf' => '12345678900',
            'matricula' => '12345',
            'nome' => 'Test User',
            'apelido' => 'Tester',
            'perfil_id' => 'perfil-id',
            'integrantes' => [['unidade_id' => 'u1', 'atribuicao' => 'LOTADO']]
        ];
        $unidade = Mockery::mock(Unidade::class);
        
        // Mock validateStore dependencies
        $this->usuarioRepository->shouldReceive('findByCpfOrEmail')->andReturn(null);

        // Mock TipoModalidadeRepository for default value
        $mockTipoModalidade = (object) ['id' => 'modalidade-default-id'];
        $this->tipoModalidadeRepository->shouldReceive('findByName')
            ->with('Sem dados do SIAPE')
            ->andReturn($mockTipoModalidade);
        
        // Mock validations to avoid DB calls
        $this->service->shouldReceive('validarPerfil')->andReturn(null);
        $this->service->shouldReceive('validarColaborador')->andReturn(null);
        
        // Mock create
        $createdUser = Mockery::mock(Usuario::class);
        $createdUser->shouldReceive('getAttribute')->with('id')->andReturn('new-id');
        $this->usuarioRepository->shouldReceive('create')->once()->andReturn($createdUser);
        
        // Mock extraStore dependencies
        $this->unidadeIntegranteService->shouldReceive('salvarIntegrantes');
        
        $result = $this->service->store($data, $unidade);
        
        $this->assertEquals($createdUser, $result);
    }

    public function test_update_calls_repository()
    {
        $data = [
            'id' => 'user-id',
            'email' => 'test@test.com',
            'perfil_id' => 'perfil-id',
            'integrantes' => [['unidade_id' => 'u1']]
        ];
        $unidade = Mockery::mock(Unidade::class);
        
        // Mock validations to avoid DB calls
        $this->service->shouldReceive('validarPerfil')->andReturn(null);
        $this->service->shouldReceive('validarColaborador')->andReturn(null);
        
        // Mock update
        $updatedUser = Mockery::mock(Usuario::class);
        $updatedUser->shouldReceive('getAttribute')->with('id')->andReturn('user-id');
        $this->usuarioRepository->shouldReceive('update')->once()->with('user-id', Mockery::any())->andReturn($updatedUser);
        
        // Mock extraStore (called by extraUpdate)
        $this->unidadeIntegranteService->shouldReceive('salvarIntegrantes');
        $this->unidadeIntegranteAtribuicaoService->shouldReceive('checkLotacoes');
        
        $result = $this->service->update($data, $unidade);
        
        $this->assertEquals($updatedUser, $result);
    }

    public function test_atribuicoes_gestor_calls_repository()
    {
        $unidadeId = 'unidade-id';
        $usuarioId = 'user-id';
        
        $this->usuarioRepository->shouldReceive('getAtribuicoes')
            ->once()
            ->with($usuarioId, $unidadeId)
            ->andReturn(['GESTOR', 'OUTRA']);
            
        $result = $this->service->atribuicoesGestor($unidadeId, $usuarioId);
        
        $this->assertTrue($result['gestor']);
        $this->assertFalse($result['gestorSubstituto']);
        $this->assertFalse($result['gestorDelegado']);
    }

    public function test_pendencias_chefe_calls_repositories()
    {
        $usuarioId = 'user-id';
        $unidadeId = 'unidade-id';
        
        $unidadeMock = Mockery::mock(Unidade::class);
        $unidadeMock->shouldReceive('getAttribute')->with('id')->andReturn($unidadeId);
        $unidadeMock->shouldReceive('offsetExists')->with('id')->andReturn(true);
        $unidadeMock->shouldReceive('offsetGet')->with('id')->andReturn($unidadeId);
        $unidadesCollection = new \Illuminate\Database\Eloquent\Collection([$unidadeMock]);
        
        $this->unidadeRepository->shouldReceive('getUnidadesGerenciadas')
            ->once()
            ->with($usuarioId)
            ->andReturn($unidadesCollection);
            
        $this->unidadeRepository->shouldReceive('getSubordinadas')
            ->once()
            ->with([$unidadeId])
            ->andReturn(new \Illuminate\Database\Eloquent\Collection());

        $this->planoTrabalhoConsolidacaoRepository->shouldReceive('getPendentesAvaliacao')
            ->once()
            ->andReturn(new \Illuminate\Database\Eloquent\Collection());

        $this->planoTrabalhoRepository->shouldReceive('getPlanosTrabalhoAssinatura')
            ->once()
            ->andReturn(new \Illuminate\Database\Eloquent\Collection());

        $this->planoEntregaRepository->shouldReceive('getPlanosEntregaAvaliacao')
            ->once()
            ->andReturn(new \Illuminate\Database\Eloquent\Collection());

        $this->planoEntregaRepository->shouldReceive('getPlanosEntregaHomologacao')
            ->once()
            ->andReturn(new \Illuminate\Database\Eloquent\Collection());

        $this->planoEntregaRepository->shouldReceive('getEntregasPlanoEntregaHomologacao')
            ->once()
            ->andReturn(new \Illuminate\Database\Eloquent\Collection());

        $result = $this->service->pendenciasChefe($usuarioId, $unidadeId);
        
        $this->assertIsArray($result);
        $this->assertArrayHasKey('registrosExecucao', $result);
        $this->assertArrayHasKey('planosTrabalhoAssinatura', $result);
        $this->assertArrayHasKey('planosEntregaAvaliacao', $result);
    }

    public function test_gerar_usuario_calls_repository_new_usuario()
    {
        $dados = [
            'modalidade_pgd' => 'mod-1',
            'matricula' => '12345',
            'emailfuncional' => 'email@test.com',
            'nome' => 'Nome',
            'cpf' => '123',
            'apelido' => 'Apelido',
            'sexo' => 'M',
            'exercicio' => 'cod-exercicio',
            'data_modificacao' => '2023-01-01',
            'ident_unica' => 'id-unica',
            'telefone' => '123456789',
            'data_nascimento' => '1990-01-01',
            'situacao_funcional' => 'ATIVO',
            'uf' => 'DF'
        ];
        $modalidade = 'mod-default';
        $perfil = 'perfil-id';

        // Mock IntegracaoService expectations
        $this->integracaoService->shouldReceive('validarModalidadePgd')->with('mod-1')->andReturn('mod-1-id');
        
        // Mock TipoModalidadeRepository (caso precise de default, mas aqui vai achar)
        // Se validarModalidadePgd retornar algo, não chama getDefaultId

        $novoUsuarioMock = Mockery::mock(Usuario::class);
        
        $this->usuarioRepository->shouldReceive('newUsuario')
            ->once()
            ->with(Mockery::on(function($arg) use ($perfil) {
                return $arg['matricula'] == '12345' && 
                       $arg['tipo_modalidade_id'] == 'mod-1-id' &&
                       $arg['perfil_id'] == $perfil;
            }))
            ->andReturn($novoUsuarioMock);

        $result = $this->service->gerarUsuario($dados, $modalidade, $perfil);
        
        $this->assertEquals($novoUsuarioMock, $result);
    }

    public function test_areas_trabalho_where_calls_repository()
    {
        $subordinadas = true;
        $ignorar = [];
        $tabela = 'unidades';
        $usuarioId = 'user-id';
        
        $userMock = Mockery::mock(Usuario::class);
        $userMock->shouldReceive('getAttribute')->with('id')->andReturn($usuarioId);
        Auth::shouldReceive('user')->andReturn($userMock);
        
        $this->unidadeRepository->shouldReceive('getAreasTrabalhoWhereClause')
            ->once()
            ->with($usuarioId, $subordinadas, $tabela)
            ->andReturn("clause");
            
        $result = $this->service->areasTrabalhoWhere($subordinadas, $tabela);
        
        $this->assertEquals("clause", $result);
    }
    
    public function test_atualizar_servidor_calls_repository()
    {
        $usuarioObj = (object) [
            'id' => 'user-id',
            'matriculasiape' => '12345',
            'emailfuncional' => 'email@test.com',
            'nome_servidor' => 'Nome',
            'nome_guerra' => 'Apelido',
            'cod_jornada' => 'J1',
            'nome_jornada' => 'Jornada 1',
            'modalidade_pgd' => 'mod-pgd',
            'participa_pgd' => true,
            'ident_unica' => 'id-unica',
            'data_modificacao' => '2023-01-01',
            'data_nascimento' => '1990-01-01'
        ];
        
        // Mock IntegracaoService expectations
        $this->integracaoService->shouldReceive('verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake');
        $this->integracaoService->shouldReceive('validarModalidadePgd')->with('mod-pgd')->andReturn('mod-id');
        
        $this->usuarioRepository->shouldReceive('update')
            ->once()
            ->with('user-id', Mockery::on(function($arg) {
                return $arg['nome'] == 'Nome' && 
                       $arg['tipo_modalidade_id'] == 'mod-id';
            }));
            
        $this->service->atualizarServidor($usuarioObj);
    }
}