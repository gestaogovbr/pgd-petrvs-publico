<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\ProcessadorAtualizacaoDadosSiapeService;
use App\Repository\UsuarioRepository;
use App\Repository\UnidadeRepository;
use App\Repository\IntegracaoServidorRepository;
use App\Services\UsuarioService;
use App\Services\UnidadeIntegranteService;
use App\Services\IntegracaoService;
use App\Services\NivelAcessoService;
use Illuminate\Support\Facades\DB;
use Mockery;

class ProcessadorAtualizacaoDadosSiapeServiceTest extends TestCase
{
    protected $service;
    protected $usuarioRepository;
    protected $unidadeRepository;
    protected $integracaoServidorRepository;
    protected $usuarioService;
    protected $unidadeIntegranteService;
    protected $integracaoService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
        $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
        $this->integracaoServidorRepository = Mockery::mock(IntegracaoServidorRepository::class);
        $this->usuarioService = Mockery::mock(UsuarioService::class);
        $this->unidadeIntegranteService = Mockery::mock(UnidadeIntegranteService::class);
        $this->integracaoService = Mockery::mock(IntegracaoService::class);

        // Mock DB facade
        DB::shouldReceive('transaction')->andReturnUsing(function ($callback) {
            return $callback();
        });

        $this->app->instance(UsuarioRepository::class, $this->usuarioRepository);
        $this->app->instance(UnidadeRepository::class, $this->unidadeRepository);
        $this->app->instance(IntegracaoServidorRepository::class, $this->integracaoServidorRepository);
        $this->app->instance(UsuarioService::class, $this->usuarioService);
        $this->app->instance(UnidadeIntegranteService::class, $this->unidadeIntegranteService);
        $this->app->instance(IntegracaoService::class, $this->integracaoService);

        // Instantiate service
        $this->service = new ProcessadorAtualizacaoDadosSiapeService();
        
        // Inject dependencies manually if needed or rely on ServiceBase __get magic which uses app()
        // Since we bound mocks to app(), __get should return them.
    }
    
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /**
     * @runInSeparateProcess
     * @preserveGlobalState disabled
     */
    public function test_processar_dados_pessoais_e_lotacoes()
    {
        // Mock NivelAcessoService static call
        $mockNivelAcesso = Mockery::mock('alias:App\Services\NivelAcessoService');
        $mockNivelAcesso->shouldReceive('getPerfilParticipante')->andReturn((object)['id' => 'perfil-id']);

        $result = ['servidores' => ['Observações' => []]];
        $usuarioComum = 'usuario_comum';

        $dados = [
            (object)[
                'id' => 'user-1',
                'matriculasiape' => '12345',
                'emailfuncional' => 'email@test.com',
                'modalidade_pgd' => 'mod',
                'nome_servidor' => 'Nome',
                'nome_guerra' => 'Apelido',
                'cod_jornada' => 'J1',
                'nome_jornada' => 'Jornada',
                'participa_pgd' => true,
                'ident_unica' => 'id-unica',
                'data_modificacao' => '2023-01-01',
                'data_nascimento' => '1990-01-01',
                'cpf' => '12345678900'
            ]
        ];

        // 1. processarDadosPessoais
        $this->integracaoServidorRepository->shouldReceive('buscarAtualizacoesDados')
            ->once()
            ->andReturn($dados);

        $this->usuarioService->shouldReceive('atualizarServidor')
            ->once()
            ->with($dados[0]);

        // 2. processarLotacoes
        $this->integracaoServidorRepository->shouldReceive('getAtualizacoesLotacoes')
            ->once()
            ->andReturn([]);
            
        $this->integracaoServidorRepository->shouldReceive('getServidoresInseridosNaoLotados')
            ->once()
            ->andReturn([]);
            
        $this->usuarioService->shouldReceive('atualizarMatriculasUsuariosSemMatricula')
            ->once();
            
        $this->integracaoServidorRepository->shouldReceive('getUsuariosAusentes')
            ->once()
            ->andReturn([]);

        $this->integracaoService->shouldReceive('validarModalidadePgd')
            ->with('')
            ->andReturn('modalidade-id');

        // Execute
        $this->service->processar($result, $usuarioComum);
        
        // Verify logs or result (optional)
        $this->assertCount(1, $result['servidores']['Observações']); // 1 message from dados pessoais
    }
}
