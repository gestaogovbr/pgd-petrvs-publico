<?php

namespace Tests\Unit\Services;

use App\Services\SiapeIndividualServidorService;
use Tests\TestCase;
use ReflectionMethod;
use Mockery;
use Illuminate\Support\Str;
use App\Models\Usuario;
use App\Models\SiapeConsultaDadosPessoais;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Models\Unidade;
use App\Models\SiapeListaUORGS;
use App\Models\SiapeDadosUORG;
use App\Models\Entidade;
use App\Models\SiapeBlackListServidor;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use ReflectionClass;

// Use default TestCase
uses(TestCase::class);

// Global storage for mocks
$sharedMocks = [];

beforeAll(function () {
    global $sharedMocks;
    
    // Define aliases only if the class is not already loaded
    // We use 'alias:' to mock static methods on Eloquent models
    $classesToMock = [
        'App\Models\Usuario',
        'App\Models\SiapeConsultaDadosPessoais',
        'App\Models\SiapeConsultaDadosFuncionais',
        'App\Models\Unidade',
        'App\Models\SiapeListaUORGS',
        'App\Models\SiapeDadosUORG',
        'App\Models\Entidade',
        'App\Models\SiapeBlackListServidor',
        'App\Models\UnidadeIntegrante',
        'App\Models\UnidadeIntegranteAtribuicao',
        'App\Facades\SiapeLog',
    ];

    foreach ($classesToMock as $class) {
        if (!class_exists($class, false)) {
            // We store the mock, but for aliases, Mockery manages the instance internally
            $sharedMocks[$class] = Mockery::mock("alias:$class");
        }
    }
});

afterAll(function () {
    Mockery::close();
});

describe('SiapeIndividualServidorService - Métodos de Banco de Dados', function () {

    // Running all tests in a single 'it' block to prevent Mockery::close() 
    // from destroying alias mocks between tests, which causes "Call to a member function __call() on null"
    // errors because alias classes persist while their mock instances are cleared.
    it('executa fluxo completo de testes de banco de dados', function () {
        global $sharedMocks;
        $service = new SiapeIndividualServidorService();
        $cpf = '12345678901';

        // Setup common mocks
        $sharedMocks['App\Facades\SiapeLog']->shouldReceive('info')->withAnyArgs()->andReturnNull();
        $sharedMocks['App\Facades\SiapeLog']->shouldReceive('error')->withAnyArgs()->andReturnNull(); // Just in case

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

        // We use the alias mock directly from the global array or by class name if needed
        // Since we are inside the same process, we can access the alias.
        // Note: For alias mocks, we should set expectations on the mock object we created.
        // But since we can't easily retrieve it if lost, we rely on $sharedMocks if valid, 
        // OR we can try to use the class name if Mockery allows.
        
        // Let's use the shared mock instance.
        $sharedMocks['App\Models\Usuario']->shouldReceive('with')->with(['lotacao.unidade'])->andReturn($builderMock1);

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

        $sharedMocks['App\Models\SiapeConsultaDadosPessoais']->shouldReceive('withTrashed')->andReturn($builderMockPessoais);

        $builderMockFuncionais = Mockery::mock('Illuminate\Database\Query\Builder');
        $builderMockFuncionais->shouldReceive('where')->with('cpf', $cpf)->andReturnSelf();
        $builderMockFuncionais->shouldReceive('forceDelete')->once();

        $sharedMocks['App\Models\SiapeConsultaDadosFuncionais']->shouldReceive('withTrashed')->andReturn($builderMockFuncionais);

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

        $sharedMocks['App\Models\Unidade']->shouldReceive('where')->with('codigo', 'U123')->andReturn($builderMockUnidade1);
        $sharedMocks['App\Models\Unidade']->shouldReceive('where')->with('codigo', 'U999')->andReturn($builderMockUnidade2);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'verificarExistenciaUnidade');
        $method->setAccessible(true);
        
        expect($method->invoke($service, 'U123'))->toBeTrue();
        expect($method->invoke($service, 'U999'))->toBeFalse();


        // --- Teste: deve buscar uorg nao processada ---
        $builderMockUorg = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMockUorg->shouldReceive('orderBy')->with('updated_at', 'desc')->andReturnSelf();
        $builderMockUorg->shouldReceive('first')->andReturn((object)['cod_uorg' => 'U2']);

        $sharedMocks['App\Models\SiapeListaUORGS']->shouldReceive('where')->with('processado', 0)->andReturn($builderMockUorg);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarUorgNaoProcessada');
        $method->setAccessible(true);
        $result = $method->invoke($service);

        expect($result)->not->toBeNull();
        expect($result->cod_uorg)->toBe('U2');


        // --- Teste: deve salvar historico unidade db ---
        $unidadeSiape = ['dataUltimaTransacao' => '01012023'];
        
        $sharedMocks['App\Models\SiapeDadosUORG']->shouldReceive('insert')->once()->with(Mockery::on(function ($arg) {
            return isset($arg['id']) && $arg['response'] === '<xml></xml>';
        }));

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'salvarHistoricoUnidadeDb');
        $method->setAccessible(true);
        $method->invoke($service, '<xml></xml>', $unidadeSiape);


        // --- Teste: deve salvar dados consulta db ---
        $sharedMocks['App\Models\SiapeConsultaDadosFuncionais']->shouldReceive('insert')->once()->with(Mockery::on(function ($arg) use ($cpf) {
            return $arg['cpf'] === $cpf && $arg['response'] === '<func></func>';
        }));

        $sharedMocks['App\Models\SiapeConsultaDadosPessoais']->shouldReceive('insert')->once()->with(Mockery::on(function ($arg) use ($cpf) {
            return $arg['cpf'] === $cpf && $arg['response'] === '<pess></pess>';
        }));
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'salvarDadosConsultaDb');
        $method->setAccessible(true);
        $method->invoke($service, $cpf, '<func></func>', '<pess></pess>');


        // --- Teste: deve buscar todas entidades ---
        $sharedMocks['App\Models\Entidade']->shouldReceive('all')->andReturn(collect([(object)['nome' => 'E1']]));
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarTodasEntidades');
        $method->setAccessible(true);
        $result = $method->invoke($service);

        expect($result->count())->toBeGreaterThanOrEqual(1);


        // --- Teste: deve buscar usuarios simples ---
        $builderMockSimples = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMockSimples->shouldReceive('where')->with('cpf', $cpf)->andReturnSelf();
        $builderMockSimples->shouldReceive('get')->andReturn(collect([(object)['cpf' => $cpf]]));

        $sharedMocks['App\Models\Usuario']->shouldReceive('where')->with('cpf', $cpf)->andReturn($builderMockSimples);
        
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

        $sharedMocks['App\Models\SiapeBlackListServidor']->shouldReceive('where')->with('cpf', $cpf)->andReturn($builderMockRemoveBL);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'removendoDaBlackList');
        $method->setAccessible(true);
        $method->invoke($service, $cpf);


        // --- Teste: deve buscar blacklist ---
        $builderMockSeekBL = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMockSeekBL->shouldReceive('where')->with('cpf', $cpf)->andReturnSelf();
        $builderMockSeekBL->shouldReceive('first')->andReturn((object)['cpf' => $cpf]);

        $sharedMocks['App\Models\SiapeBlackListServidor']->shouldReceive('where')->with('cpf', $cpf)->andReturn($builderMockSeekBL);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'buscarBlacklist');
        $method->setAccessible(true);
        $result = $method->invoke($service, $cpf);

        expect($result)->not->toBeNull();


        // --- Teste: deve gerar usuarios resumo ---
        $builderMockResumo = Mockery::mock('Illuminate\Database\Eloquent\Builder');
        $builderMockResumo->shouldReceive('where')->with('cpf', $cpf)->andReturnSelf();
        $builderMockResumo->shouldReceive('get')->andReturn(collect([(object)['matricula' => 'M1']]));

        $sharedMocks['App\Models\Usuario']->shouldReceive('with')->with(['lotacao.unidade'])->andReturn($builderMockResumo);

        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'gerarUsuariosResumo');
        $method->setAccessible(true);
        $result = $method->invoke($service, $cpf);

        expect($result->count())->toBe(1);

    });

});
