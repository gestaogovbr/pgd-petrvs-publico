<?php

namespace Tests\Unit\Services;

use App\Services\SiapeIndividualServidorService;
use App\Services\IntegracaoServiceFactory;
use Tests\TestCase;
use ReflectionMethod;
use Mockery;
use Illuminate\Support\Facades\Log;

uses(TestCase::class);

afterAll(function () {
    Mockery::close();
});

describe('SiapeIndividualServidorService - Métodos de Banco de Dados', function () {

    it('executa fluxo completo de testes de banco de dados', function () {
        // Mock dependencies
        $mockFactory = Mockery::mock(IntegracaoServiceFactory::class);
        
        // Create partial mock of the service to intercept getModel
        $service = Mockery::mock(SiapeIndividualServidorService::class, [$mockFactory])->makePartial();
        $service->shouldAllowMockingProtectedMethods();
        
        $cpf = '12345678901';

        // Mocks for Models
        $mockUsuario = Mockery::mock('App\Models\Usuario');
        $mockPessoais = Mockery::mock('App\Models\SiapeConsultaDadosPessoais');
        $mockFuncionais = Mockery::mock('App\Models\SiapeConsultaDadosFuncionais');
        $mockUnidade = Mockery::mock('App\Models\Unidade');
        $mockListaUORGS = Mockery::mock('App\Models\SiapeListaUORGS');
        $mockDadosUORG = Mockery::mock('App\Models\SiapeDadosUORG');
        $mockEntidade = Mockery::mock('App\Models\Entidade');
        $mockBlackList = Mockery::mock('App\Models\SiapeBlackListServidor');
        $mockUnidadeIntegrante = Mockery::mock('App\Models\UnidadeIntegrante');
        $mockUnidadeIntegranteAtribuicao = Mockery::mock('App\Models\UnidadeIntegranteAtribuicao');

        // Mock getModel to return appropriate model mocks
        $service->shouldReceive('getModelInstance')->with('App\Models\Usuario')->andReturn($mockUsuario);
        $service->shouldReceive('getModelInstance')->with('App\Models\SiapeConsultaDadosPessoais')->andReturn($mockPessoais);
        $service->shouldReceive('getModelInstance')->with('App\Models\SiapeConsultaDadosFuncionais')->andReturn($mockFuncionais);
        $service->shouldReceive('getModelInstance')->with('App\Models\Unidade')->andReturn($mockUnidade);
        $service->shouldReceive('getModelInstance')->with('App\Models\SiapeListaUORGS')->andReturn($mockListaUORGS);
        $service->shouldReceive('getModelInstance')->with('App\Models\SiapeDadosUORG')->andReturn($mockDadosUORG);
        $service->shouldReceive('getModelInstance')->with('App\Models\Entidade')->andReturn($mockEntidade);
        $service->shouldReceive('getModelInstance')->with('App\Models\SiapeBlackListServidor')->andReturn($mockBlackList);
        $service->shouldReceive('getModelInstance')->with('App\Models\UnidadeIntegrante')->andReturn($mockUnidadeIntegrante);
        $service->shouldReceive('getModelInstance')->with('App\Models\UnidadeIntegranteAtribuicao')->andReturn($mockUnidadeIntegranteAtribuicao);

        // Mock Log facade to capture SiapeLog calls
        Log::shouldReceive('channel')->andReturnSelf();
        Log::shouldReceive('info')->withAnyArgs();
        Log::shouldReceive('error')->withAnyArgs();
        Log::shouldReceive('warning')->withAnyArgs();
        Log::shouldReceive('debug')->withAnyArgs();
        Log::shouldReceive('notice')->withAnyArgs();

        // --- Teste: deve buscar usuarios por cpf ---
        $builderMock1 = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMock1->shouldReceive('where')->with('cpf', $cpf)->andReturnSelf();
        $builderMock1->shouldReceive('get')->andReturn(collect([
            (object)[
                'id' => 1,
                'matricula' => 'M123',
                'nome' => 'Teste User',
                'email' => 'teste@test.com',
                'situacao_siape' => 'ativo',
                'lotacao' => (object)['unidade_id' => 1]
            ]
        ]));

        $mockUsuario->shouldReceive('with')->with(['lotacao.unidade'])->andReturn($builderMock1);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarUsuariosPorCpf');
        $method->setAccessible(true);
        $result = $method->invoke($service, $cpf);

        expect($result)->toBeArray();
        expect($result)->toHaveCount(1);
        expect($result[0]['nome'])->toBe('Teste User');


        // --- Teste: deve limpar dados siape anteriores ---
        $builderMockPessoais = Mockery::mock('Illuminate\Database\Query\Builder');
        $builderMockPessoais->shouldReceive('where')->with('cpf', $cpf)->andReturnSelf();
        $builderMockPessoais->shouldReceive('forceDelete')->once();

        $mockPessoais->shouldReceive('withTrashed')->andReturn($builderMockPessoais);

        $builderMockFuncionais = Mockery::mock('Illuminate\Database\Query\Builder');
        $builderMockFuncionais->shouldReceive('where')->with('cpf', $cpf)->andReturnSelf();
        $builderMockFuncionais->shouldReceive('forceDelete')->once();

        $mockFuncionais->shouldReceive('withTrashed')->andReturn($builderMockFuncionais);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'limparDadosSiape');
        $method->setAccessible(true);
        $method->invoke($service, $cpf);


        // --- Teste: deve verificar existencia de unidade ---
        $builderMockUnidade1 = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMockUnidade1->shouldReceive('where')->with('codigo', 'U123')->andReturnSelf();
        $builderMockUnidade1->shouldReceive('exists')->andReturn(true);
        
        $builderMockUnidade2 = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMockUnidade2->shouldReceive('where')->with('codigo', 'U999')->andReturnSelf();
        $builderMockUnidade2->shouldReceive('exists')->andReturn(false);

        $mockUnidade->shouldReceive('where')->with('codigo', 'U123')->andReturn($builderMockUnidade1);
        $mockUnidade->shouldReceive('where')->with('codigo', 'U999')->andReturn($builderMockUnidade2);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'verificarExistenciaUnidade');
        $method->setAccessible(true);
        
        expect($method->invoke($service, 'U123'))->toBeTrue();
        expect($method->invoke($service, 'U999'))->toBeFalse();


        // --- Teste: deve buscar uorg nao processada ---
        $builderMockUorg = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMockUorg->shouldReceive('orderBy')->with('updated_at', 'desc')->andReturnSelf();
        $builderMockUorg->shouldReceive('first')->andReturn((object)['cod_uorg' => 'U2']);

        $mockListaUORGS->shouldReceive('where')->with('processado', 0)->andReturn($builderMockUorg);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarUorgNaoProcessada');
        $method->setAccessible(true);
        $result = $method->invoke($service);

        expect($result)->not->toBeNull();
        expect($result->cod_uorg)->toBe('U2');


        // --- Teste: deve salvar historico unidade db ---
        $unidadeSiape = ['dataUltimaTransacao' => '01012023'];
        
        $mockDadosUORG->shouldReceive('insert')->once()->with(Mockery::on(function ($arg) {
            return isset($arg['id']) && $arg['response'] === '<xml></xml>';
        }));

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'salvarHistoricoUnidadeDb');
        $method->setAccessible(true);
        $method->invoke($service, '<xml></xml>', $unidadeSiape);


        // --- Teste: deve salvar dados consulta db ---
        $mockFuncionais->shouldReceive('insert')->once()->with(Mockery::on(function ($arg) use ($cpf) {
            return $arg['cpf'] === $cpf && $arg['response'] === '<func></func>';
        }));

        $mockPessoais->shouldReceive('insert')->once()->with(Mockery::on(function ($arg) use ($cpf) {
            return $arg['cpf'] === $cpf && $arg['response'] === '<pess></pess>';
        }));
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'salvarDadosConsultaDb');
        $method->setAccessible(true);
        $method->invoke($service, $cpf, '<func></func>', '<pess></pess>');


        // --- Teste: deve buscar todas entidades ---
        $mockEntidade->shouldReceive('all')->andReturn(collect([(object)['nome' => 'E1']]));
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarTodasEntidades');
        $method->setAccessible(true);
        $result = $method->invoke($service);

        expect($result->count())->toBeGreaterThanOrEqual(1);


        // --- Teste: deve buscar usuarios simples ---
        $builderMockSimples = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMockSimples->shouldReceive('where')->with('cpf', $cpf)->andReturnSelf();
        $builderMockSimples->shouldReceive('get')->andReturn(collect([(object)['cpf' => $cpf]]));

        $mockUsuario->shouldReceive('where')->with('cpf', $cpf)->andReturn($builderMockSimples);
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarUsuariosSimples');
        $method->setAccessible(true);
        $result = $method->invoke($service, $cpf);

        expect($result->count())->toBe(1);


        // --- Teste: deve remover da blacklist ---
        $modelInstanceMock = Mockery::mock('stdClass'); 
        $modelInstanceMock->shouldReceive('forceDelete')->once();

        $builderMockRemoveBL = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMockRemoveBL->shouldReceive('where')->with('cpf', $cpf)->andReturnSelf();
        $builderMockRemoveBL->shouldReceive('first')->andReturn($modelInstanceMock);

        $mockBlackList->shouldReceive('where')->with('cpf', $cpf)->andReturn($builderMockRemoveBL);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'removendoDaBlackList');
        $method->setAccessible(true);
        $method->invoke($service, $cpf);


        // --- Teste: deve buscar blacklist ---
        $builderMockSeekBL = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMockSeekBL->shouldReceive('where')->with('cpf', $cpf)->andReturnSelf();
        $builderMockSeekBL->shouldReceive('first')->andReturn((object)['cpf' => $cpf]);

        $mockBlackList->shouldReceive('where')->with('cpf', $cpf)->andReturn($builderMockSeekBL);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarBlacklist');
        $method->setAccessible(true);
        $result = $method->invoke($service, $cpf);

        expect($result)->not->toBeNull();


        // --- Teste: deve gerar usuarios resumo ---
        $builderMockResumo = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMockResumo->shouldReceive('where')->with('cpf', $cpf)->andReturnSelf();
        $builderMockResumo->shouldReceive('get')->andReturn(collect([(object)['matricula' => 'M1']]));

        $mockUsuario->shouldReceive('with')->with(['lotacao.unidade'])->andReturn($builderMockResumo);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'gerarUsuariosResumo');
        $method->setAccessible(true);
        $result = $method->invoke($service, $cpf);

        expect($result->count())->toBe(1);

    });

    it('cobre cenários de exceção e fluxos alternativos', function () {
        $mockFactory = Mockery::mock(IntegracaoServiceFactory::class);
        $service = Mockery::mock(SiapeIndividualServidorService::class, [$mockFactory])->makePartial();
        $service->shouldAllowMockingProtectedMethods();
        $cpf = '12345678901';

        // Mocks
        $mockUsuario = Mockery::mock('App\Models\Usuario');
        $mockPessoais = Mockery::mock('App\Models\SiapeConsultaDadosPessoais');
        $mockFuncionais = Mockery::mock('App\Models\SiapeConsultaDadosFuncionais');
        $mockUnidade = Mockery::mock('App\Models\Unidade');
        $mockListaUORGS = Mockery::mock('App\Models\SiapeListaUORGS');
        $mockDadosUORG = Mockery::mock('App\Models\SiapeDadosUORG');
        $mockEntidade = Mockery::mock('App\Models\Entidade');
        $mockBlackList = Mockery::mock('App\Models\SiapeBlackListServidor');
        
        $service->shouldReceive('getModelInstance')->with('App\Models\Usuario')->andReturn($mockUsuario);
        $service->shouldReceive('getModelInstance')->with('App\Models\SiapeConsultaDadosPessoais')->andReturn($mockPessoais);
        $service->shouldReceive('getModelInstance')->with('App\Models\SiapeConsultaDadosFuncionais')->andReturn($mockFuncionais);
        $service->shouldReceive('getModelInstance')->with('App\Models\Unidade')->andReturn($mockUnidade);
        $service->shouldReceive('getModelInstance')->with('App\Models\SiapeListaUORGS')->andReturn($mockListaUORGS);
        $service->shouldReceive('getModelInstance')->with('App\Models\SiapeDadosUORG')->andReturn($mockDadosUORG);
        $service->shouldReceive('getModelInstance')->with('App\Models\Entidade')->andReturn($mockEntidade);
        $service->shouldReceive('getModelInstance')->with('App\Models\SiapeBlackListServidor')->andReturn($mockBlackList);
        $service->shouldReceive('getModelInstance')->withAnyArgs()->andReturn(Mockery::mock('stdClass'));

        Log::shouldReceive('channel')->andReturnSelf();
        Log::shouldReceive('info')->withAnyArgs();
        Log::shouldReceive('error')->withAnyArgs();
        Log::shouldReceive('warning')->withAnyArgs();

        // 1. Test normalizarDadosFuncionais single item
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'normalizarDadosFuncionais');
        $method->setAccessible(true);
        $singleData = (object)['foo' => 'bar'];
        $result = $method->invoke($service, $cpf, $singleData);
        expect($result)->toBeArray()->toHaveCount(1);
        expect($result[0])->toBe($singleData);

        // 2. Test salvarHistoricoUnidade logic
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'salvarHistoricoUnidade');
        $method->setAccessible(true);
        // Case null
        $method->invoke($service, '<xml>', null);
        // Case not null
        $mockDadosUORG->shouldReceive('insert');
        $method->invoke($service, '<xml>', ['dataUltimaTransacao' => '01012023']);

        // 3. Test atualizarVinculosUsuarios Exception
        $service->shouldReceive('buscarUsuariosSimples')->with($cpf)->andThrow(new \Exception('Erro simulado'));
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'atualizarVinculosUsuarios');
        $method->setAccessible(true);
        $method->invoke($service, $cpf, []); // Should catch exception and log error

        // 4. Test executarSincronizacaoFinal Exception
        $service->shouldReceive('buscarTodasEntidades')->andThrow(new \Exception('Erro sync final'));
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'executarSincronizacaoFinal');
        $method->setAccessible(true);
        
        try {
            $method->invoke($service, $cpf);
        } catch (\Exception $e) {
            expect($e->getMessage())->toContain('Erro na sincronização final');
        }

        // 5. Test criarItemResumo lotacao nao associada
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

        // 6. Test detectarAlteracoes lotacao changed
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

        // 7. Test verificarBlacklist Exception
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
