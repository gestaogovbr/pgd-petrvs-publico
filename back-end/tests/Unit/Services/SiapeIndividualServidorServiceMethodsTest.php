<?php

namespace Tests\Unit\Services;

use App\Models\Entidade;
use App\Models\SiapeBlackListServidor;
use App\Services\IntegracaoServiceFactory;
use App\Services\SiapeIndividualServidorService;
use Tests\TestCase;
use ReflectionMethod;
use Mockery;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use App\Repository\EntidadeRepository;
use App\Repository\SiapeBlackListServidorRepository;
use App\Repository\SiapeConsultaDadosFuncionaisRepository;
use App\Repository\SiapeConsultaDadosPessoaisRepository;
use App\Repository\SiapeDadosUORGRepository;
use App\Repository\SiapeListaUORGSRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UsuarioRepository;

uses(TestCase::class);

afterAll(function () {
    Mockery::close();
});

describe('SiapeIndividualServidorService - Métodos de Banco de Dados', function () {

    it('executa fluxo completo de testes de banco de dados', function () {
        $mockFactory = Mockery::mock(IntegracaoServiceFactory::class);

        $entidadeRepository = Mockery::mock(EntidadeRepository::class);
        $siapeBlackListServidorRepository = Mockery::mock(SiapeBlackListServidorRepository::class);
        $siapeConsultaDadosFuncionaisRepository = Mockery::mock(SiapeConsultaDadosFuncionaisRepository::class);
        $siapeConsultaDadosPessoaisRepository = Mockery::mock(SiapeConsultaDadosPessoaisRepository::class);
        $siapeDadosUORGRepository = Mockery::mock(SiapeDadosUORGRepository::class);
        $siapeListaUORGSRepository = Mockery::mock(SiapeListaUORGSRepository::class);
        $unidadeRepository = Mockery::mock(UnidadeRepository::class);
        $unidadeIntegranteRepository = Mockery::mock(UnidadeIntegranteRepository::class);
        $unidadeIntegranteAtribuicaoRepository = Mockery::mock(UnidadeIntegranteAtribuicaoRepository::class);
        $usuarioRepository = Mockery::mock(UsuarioRepository::class);

        $service = new SiapeIndividualServidorService(
            $mockFactory,
            $entidadeRepository,
            $siapeBlackListServidorRepository,
            $siapeConsultaDadosFuncionaisRepository,
            $siapeConsultaDadosPessoaisRepository,
            $siapeDadosUORGRepository,
            $siapeListaUORGSRepository,
            $unidadeRepository,
            $unidadeIntegranteRepository,
            $unidadeIntegranteAtribuicaoRepository,
            $usuarioRepository
        );

        $cpf = '12345678901';

        Log::shouldReceive('channel')->andReturnSelf();
        Log::shouldReceive('info')->withAnyArgs();
        Log::shouldReceive('error')->withAnyArgs();
        Log::shouldReceive('warning')->withAnyArgs();
        Log::shouldReceive('debug')->withAnyArgs();
        Log::shouldReceive('notice')->withAnyArgs();

        $usuarioRepository->shouldReceive('findByCpfWithLotacao')
            ->with($cpf)
            ->andReturn(new Collection([
            (object)[
                'id' => 1,
                'matricula' => 'M123',
                'nome' => 'Teste User',
                'email' => 'teste@test.com',
                'situacao_siape' => 'ativo',
                'lotacao' => (object)['unidade_id' => 1]
            ]
            ]));

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarUsuariosPorCpf');
        $method->setAccessible(true);
        $result = $method->invoke($service, $cpf);

        expect($result)->toBeArray();
        expect($result)->toHaveCount(1);
        expect($result[0]['nome'])->toBe('Teste User');


        $siapeConsultaDadosPessoaisRepository->shouldReceive('forceDeleteByCpf')->with($cpf)->once();
        $siapeConsultaDadosFuncionaisRepository->shouldReceive('forceDeleteByCpf')->with($cpf)->once();

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'limparDadosSiape');
        $method->setAccessible(true);
        $method->invoke($service, $cpf);


        $unidadeRepository->shouldReceive('existsByCodigo')->with('U123')->andReturn(true);
        $unidadeRepository->shouldReceive('existsByCodigo')->with('U999')->andReturn(false);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'verificarExistenciaUnidade');
        $method->setAccessible(true);
        
        expect($method->invoke($service, 'U123'))->toBeTrue();
        expect($method->invoke($service, 'U999'))->toBeFalse();


        $mockListaUorgs = new \App\Models\SiapeListaUORGS();
        $mockListaUorgs->cod_uorg = 'U2';
        $siapeListaUORGSRepository->shouldReceive('findUnprocessed')->andReturn($mockListaUorgs);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarUorgNaoProcessada');
        $method->setAccessible(true);
        $result = $method->invoke($service);

        expect($result)->not->toBeNull();
        expect($result->cod_uorg)->toBe('U2');


        $unidadeSiape = ['dataUltimaTransacao' => '01012023'];

        $siapeDadosUORGRepository->shouldReceive('create')
            ->once()
            ->with(Mockery::on(function (array $arg): bool {
                return isset($arg['id'])
                    && ($arg['response'] ?? null) === '<xml></xml>'
                    && ($arg['data_modificacao'] ?? null) === '2023-01-01 00:00:00'
                    && isset($arg['created_at'])
                    && isset($arg['updated_at']);
            }));

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'salvarHistoricoUnidadeDb');
        $method->setAccessible(true);
        $method->invoke($service, '<xml></xml>', $unidadeSiape);


        $siapeConsultaDadosFuncionaisRepository->shouldReceive('create')
            ->once()
            ->with(Mockery::on(function (array $arg) use ($cpf): bool {
                return ($arg['cpf'] ?? null) === $cpf && ($arg['response'] ?? null) === '<func></func>';
            }));
        $siapeConsultaDadosPessoaisRepository->shouldReceive('create')
            ->once()
            ->with(Mockery::on(function (array $arg) use ($cpf): bool {
                return ($arg['cpf'] ?? null) === $cpf && ($arg['response'] ?? null) === '<pess></pess>';
            }));
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'salvarDadosConsultaDb');
        $method->setAccessible(true);
        $method->invoke($service, $cpf, '<func></func>', '<pess></pess>');


        $entidadeRepository->shouldReceive('findAll')->andReturn(new Collection([new Entidade()]));
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarTodasEntidades');
        $method->setAccessible(true);
        $result = $method->invoke($service);

        expect($result->count())->toBeGreaterThanOrEqual(1);


        $usuarioRepository->shouldReceive('findAllByCpfUnfiltered')
            ->with($cpf)
            ->andReturn(new Collection([(object)['cpf' => $cpf]]));
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarUsuariosSimples');
        $method->setAccessible(true);
        $result = $method->invoke($service, $cpf);

        expect($result->count())->toBe(1);


        $blacklistModel = new SiapeBlackListServidor();
        $blacklistModel->id = 'bl-1';

        $siapeBlackListServidorRepository->shouldReceive('findByCpfAndOptionalMatricula')
            ->with($cpf, null)
            ->andReturn($blacklistModel);

        $siapeBlackListServidorRepository->shouldReceive('forceDelete')->with('bl-1')->once();

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'removendoDaBlackList');
        $method->setAccessible(true);
        $method->invoke($service, $cpf);


        $siapeBlackListServidorRepository->shouldReceive('findByCpfAndOptionalMatricula')
            ->with($cpf, null)
            ->andReturn($blacklistModel);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarBlacklist');
        $method->setAccessible(true);
        $result = $method->invoke($service, $cpf);

        expect($result)->not->toBeNull();


        $usuarioRepository->shouldReceive('findByCpfWithLotacao')
            ->with($cpf)
            ->andReturn(new Collection([(object)['matricula' => 'M1']]));

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'gerarUsuariosResumo');
        $method->setAccessible(true);
        $result = $method->invoke($service, $cpf);

        expect($result->count())->toBe(1);

    });

    it('cobre cenários de exceção e fluxos alternativos', function () {
        $mockFactory = Mockery::mock(IntegracaoServiceFactory::class);

        $service = Mockery::mock(SiapeIndividualServidorService::class, [
            $mockFactory,
            Mockery::mock(EntidadeRepository::class),
            Mockery::mock(SiapeBlackListServidorRepository::class),
            Mockery::mock(SiapeConsultaDadosFuncionaisRepository::class),
            Mockery::mock(SiapeConsultaDadosPessoaisRepository::class),
            Mockery::mock(SiapeDadosUORGRepository::class),
            Mockery::mock(SiapeListaUORGSRepository::class),
            Mockery::mock(UnidadeRepository::class),
            Mockery::mock(UnidadeIntegranteRepository::class),
            Mockery::mock(UnidadeIntegranteAtribuicaoRepository::class),
            Mockery::mock(UsuarioRepository::class),
        ])->makePartial();
        $service->shouldAllowMockingProtectedMethods();

        $cpf = '12345678901';

        Log::shouldReceive('channel')->andReturnSelf();
        Log::shouldReceive('info')->withAnyArgs();
        Log::shouldReceive('error')->withAnyArgs();
        Log::shouldReceive('warning')->withAnyArgs();

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'normalizarDadosFuncionais');
        $method->setAccessible(true);
        $singleData = (object)['foo' => 'bar'];
        $result = $method->invoke($service, $cpf, $singleData);
        expect($result)->toBeArray()->toHaveCount(1);
        expect($result[0])->toBe($singleData);

        $service->shouldReceive('buscarUsuariosSimples')->with($cpf)->andThrow(new \Exception('Erro simulado'));
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'atualizarVinculosUsuarios');
        $method->setAccessible(true);
        $method->invoke($service, $cpf, []); // Should catch exception and log error

        $service->shouldReceive('buscarTodasEntidades')->andThrow(new \Exception('Erro sync final'));
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'executarSincronizacaoFinal');
        $method->setAccessible(true);
        
        try {
            $method->invoke($service, $cpf);
        } catch (\Exception $e) {
            expect($e->getMessage())->toContain('Erro na sincronização final');
        }

        $uDepois = Mockery::mock('App\Models\Usuario');
        $uDepois->shouldReceive('getAttribute')->with('nome')->andReturn('Teste');
        $uDepois->shouldReceive('getAttribute')->with('lotacao')->andReturn(null);
        $uDepois->shouldReceive('getAttribute')->with('matricula')->andReturn('M1');
        $uDepois->shouldReceive('getAttribute')->with('id')->andReturn(1);
        $uDepois->shouldReceive('offsetExists')->with('lotacao')->andReturn(false);
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'criarItemResumo');
        $method->setAccessible(true);
        $item = $method->invoke($service, $uDepois, null, 'sucesso', 'msg');
        expect($item['status'])->toBe('parcial');

        $uAntes = ['lotacao_id' => 1];
        $uDepois = Mockery::mock('App\Models\Usuario');
        $uDepois->shouldReceive('getAttribute')->with('nome')->andReturn('Teste');
        $uDepois->shouldReceive('getAttribute')->with('email')->andReturn('email');
        $uDepois->shouldReceive('getAttribute')->with('matricula')->andReturn('M1');
        $uDepois->shouldReceive('getAttribute')->with('situacao_siape')->andReturn('ativo');
        $uDepois->shouldReceive('getAttribute')->with('lotacao')->andReturn((object)['unidade_id' => 2]);
        $uDepois->shouldReceive('offsetExists')->with('lotacao')->andReturn(true);
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'detectarAlteracoes');
        $method->setAccessible(true);
        $alteracoes = $method->invoke($service, $uAntes, $uDepois);
        expect($alteracoes)->toContain('lotacao_id');

        $service->shouldReceive('buscarBlacklist')->with($cpf)->andThrow(new \Exception('Erro BL'));
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'verificarBlacklist');
        $method->setAccessible(true);
        $uMock = Mockery::mock('App\Models\Usuario');
        $method->invoke($service, $cpf, $uMock); // Should log error
    });

    it('cobre getModelInstance real', function () {
        $service = app(SiapeIndividualServidorService::class);
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'getModelInstance');
        $method->setAccessible(true);
        
        $obj = $method->invoke($service, 'stdClass');
        expect($obj)->toBeInstanceOf('stdClass');
    });


});
