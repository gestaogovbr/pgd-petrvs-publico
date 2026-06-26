<?php

use App\DTOs\Sipec\ServidorSipecDTO;
use App\Models\IntegracaoServidor;
use App\Models\SipecServidor;
use App\Repository\IntegracaoServidorRepository;
use App\Services\Sipec\Servidor\SipecServidorIntegracaoService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function setupSiapeLogMockSipecServidor(): void
{
    $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
    $loggerMock->shouldReceive('info', 'warning', 'error', 'debug', 'notice')->withAnyArgs();
    Log::shouldReceive('channel')->with('siape')->andReturn($loggerMock);
}

function criarServidorSipecJson(array $overrides = []): array
{
    return array_merge([
        'cpf' => '12345678901',
        'nome' => 'João da Silva',
        'vinculos' => [
            [
                'matriculaSiape' => '1234567',
                'codOrgao' => '17500',
                'codUorgExercicio' => '1000',
                'codUorgLotacao' => '1000',
                'codSitFuncional' => '1',
                'situacaoServidor' => ['nomeSitFuncional' => 'ATIVO PERMANENTE'],
                'codCargo' => '701',
                'codAtivFun' => null,
                'codUpag' => '999',
                'codJornada' => '40',
                'jornadaTrabalho' => ['nomeJornada' => '40 HORAS SEMANAIS'],
                'modalidadePGD' => '1',
                'participaPGD' => 'sim',
                'identUnica' => '9999',
                'dataOcorrIngressoOrgao' => '2020-01-01',
                'dataOcorrExclusao' => null,
                'dataUltimaTransacao' => '2025-06-01T10:00:00',
                'servidorDisponivel' => ['emailInstitucional' => 'joao@orgao.gov.br'],
            ],
        ],
    ], $overrides);
}

function criarModelSipecServidor(array $json, bool $processado = false): SipecServidor
{
    $model = Mockery::mock(SipecServidor::class)->makePartial();
    $model->id = 'uuid-1';
    $model->cpf = $json['cpf'] ?? '12345678901';
    $model->matricula = '1234567';
    $model->response = json_encode($json);
    $model->processado = $processado;
    $model->data_modificacao = now();
    $model->shouldReceive('update')->with(['processado' => true])->andReturn(true);

    return $model;
}

describe('SipecServidorIntegracaoService', function () {

    test('deve inserir registro em integracao_servidores quando não existe', function () {
        setupSiapeLogMockSipecServidor();

        $json = criarServidorSipecJson();
        $registro = criarModelSipecServidor($json);

        $repo = Mockery::mock(IntegracaoServidorRepository::class);
        $repo->shouldReceive('getServidor')
            ->with('12345678901', '1234567')
            ->once()
            ->andReturn(null);
        $repo->shouldReceive('save')
            ->once()
            ->with(Mockery::on(function (IntegracaoServidor $model) {
                return $model->cpf === '12345678901'
                    && $model->matriculasiape === '1234567'
                    && $model->emailfuncional === 'joao@orgao.gov.br'
                    && $model->situacao_funcional === 'ATIVO_PERMANENTE'
                    && $model->participa_pgd === 'sim'
                    && $model->ident_unica === '9999';
            }))
            ->andReturn(true);

        $service = new SipecServidorIntegracaoService($repo);

        // Simular chunkById chamando o callback diretamente
        $mockBuilder = Mockery::mock(Builder::class);
        $mockBuilder->shouldReceive('whereNull')->with('deleted_at')->andReturnSelf();
        $mockBuilder->shouldReceive('chunkById')
            ->with(100, Mockery::on(function ($callback) use ($registro) {
                $callback(collect([$registro]));
                return true;
            }))
            ->andReturn(true);

        // Usar partial mock para interceptar a query
        $serviceMock = Mockery::mock(SipecServidorIntegracaoService::class, [$repo])->makePartial();

        // Como chunkById é chamado em SipecServidor model, precisamos mockar o model estático
        // Em vez disso, testamos via reflection chamando processarRegistro diretamente
        $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $resultado = $method->invoke($service, $registro);

        expect($resultado)->toBe('inseridos');
    });

    test('deve atualizar registro em integracao_servidores quando já existe', function () {
        setupSiapeLogMockSipecServidor();

        $json = criarServidorSipecJson();
        $registro = criarModelSipecServidor($json);

        $existente = Mockery::mock(IntegracaoServidor::class)->makePartial();
        $existente->cpf = '12345678901';
        $existente->matriculasiape = '1234567';

        $repo = Mockery::mock(IntegracaoServidorRepository::class);
        $repo->shouldReceive('getServidor')
            ->with('12345678901', '1234567')
            ->once()
            ->andReturn($existente);
        $repo->shouldReceive('update')
            ->with('12345678901', '1234567', Mockery::on(function (array $data) {
                return $data['cpf'] === '12345678901'
                    && $data['nome'] === 'João da Silva'
                    && $data['emailfuncional'] === 'joao@orgao.gov.br';
            }))
            ->once()
            ->andReturn(true);

        $service = new SipecServidorIntegracaoService($repo);

        $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $resultado = $method->invoke($service, $registro);

        expect($resultado)->toBe('atualizados');
    });

    test('deve descartar registro sem CPF', function () {
        setupSiapeLogMockSipecServidor();

        $json = ['nome' => 'Sem CPF'];
        $registro = criarModelSipecServidor($json);
        $registro->cpf = null;

        $repo = Mockery::mock(IntegracaoServidorRepository::class);
        $repo->shouldNotReceive('save');
        $repo->shouldNotReceive('update');

        $service = new SipecServidorIntegracaoService($repo);

        $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $resultado = $method->invoke($service, $registro);

        expect($resultado)->toBe('descartados');
    });

    test('deve descartar vínculo com dataOcorrExclusao preenchido', function () {
        setupSiapeLogMockSipecServidor();

        $json = criarServidorSipecJson();
        $json['vinculos'][0]['dataOcorrExclusao'] = '2024-01-01';
        $registro = criarModelSipecServidor($json);

        $repo = Mockery::mock(IntegracaoServidorRepository::class);
        $repo->shouldNotReceive('save');
        $repo->shouldNotReceive('update');

        $service = new SipecServidorIntegracaoService($repo);

        $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $resultado = $method->invoke($service, $registro);

        expect($resultado)->toBe('descartados');
    });

    test('deve descartar vínculo sem matrícula', function () {
        setupSiapeLogMockSipecServidor();

        $json = criarServidorSipecJson();
        $json['vinculos'][0]['matriculaSiape'] = null;
        $registro = criarModelSipecServidor($json);

        $repo = Mockery::mock(IntegracaoServidorRepository::class);
        $repo->shouldNotReceive('save');
        $repo->shouldNotReceive('update');

        $service = new SipecServidorIntegracaoService($repo);

        $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $resultado = $method->invoke($service, $registro);

        expect($resultado)->toBe('descartados');
    });

    test('deve normalizar participaPGD para sim/não', function () {
        setupSiapeLogMockSipecServidor();

        $json = criarServidorSipecJson();
        $json['vinculos'][0]['participaPGD'] = 'SIM';
        $registro = criarModelSipecServidor($json);

        $repo = Mockery::mock(IntegracaoServidorRepository::class);
        $repo->shouldReceive('getServidor')->andReturn(null);
        $repo->shouldReceive('save')
            ->with(Mockery::on(function (IntegracaoServidor $model) {
                return $model->participa_pgd === 'sim';
            }))
            ->andReturn(true);

        $service = new SipecServidorIntegracaoService($repo);

        $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $resultado = $method->invoke($service, $registro);

        expect($resultado)->toBe('inseridos');
    });

    test('deve filtrar email com naoinformado@', function () {
        setupSiapeLogMockSipecServidor();

        $json = criarServidorSipecJson();
        $json['vinculos'][0]['servidorDisponivel']['emailInstitucional'] = 'naoinformado@orgao.gov.br';
        $registro = criarModelSipecServidor($json);

        $repo = Mockery::mock(IntegracaoServidorRepository::class);
        $repo->shouldReceive('getServidor')->andReturn(null);
        $repo->shouldReceive('save')
            ->with(Mockery::on(function (IntegracaoServidor $model) {
                return $model->emailfuncional === null;
            }))
            ->andReturn(true);

        $service = new SipecServidorIntegracaoService($repo);

        $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $resultado = $method->invoke($service, $registro);

        expect($resultado)->toBe('inseridos');
    });

    test('deve processar múltiplos vínculos de um mesmo servidor', function () {
        setupSiapeLogMockSipecServidor();

        $json = criarServidorSipecJson();
        $json['vinculos'][] = [
            'matriculaSiape' => '7654321',
            'codOrgao' => '17500',
            'codUorgExercicio' => '2000',
            'codUorgLotacao' => '2000',
            'codSitFuncional' => '1',
            'situacaoServidor' => ['nomeSitFuncional' => 'ATIVO PERMANENTE'],
            'codCargo' => '702',
            'codAtivFun' => '123',
            'codUpag' => '888',
            'codJornada' => '40',
            'jornadaTrabalho' => ['nomeJornada' => '40 HORAS SEMANAIS'],
            'modalidadePGD' => null,
            'participaPGD' => null,
            'identUnica' => '8888',
            'dataOcorrIngressoOrgao' => '2021-03-15',
            'dataOcorrExclusao' => null,
            'dataUltimaTransacao' => '2025-06-02T10:00:00',
            'servidorDisponivel' => ['emailInstitucional' => 'joao2@orgao.gov.br'],
        ];
        $registro = criarModelSipecServidor($json);

        $repo = Mockery::mock(IntegracaoServidorRepository::class);
        $repo->shouldReceive('getServidor')->andReturn(null);
        $repo->shouldReceive('save')->twice()->andReturn(true);

        $service = new SipecServidorIntegracaoService($repo);

        $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $method->invoke($service, $registro);
    });

    test('deve gerar funcoes como JSON quando codAtivFun está preenchido', function () {
        setupSiapeLogMockSipecServidor();

        $json = criarServidorSipecJson();
        $json['vinculos'][0]['codAtivFun'] = '456';
        $registro = criarModelSipecServidor($json);

        $repo = Mockery::mock(IntegracaoServidorRepository::class);
        $repo->shouldReceive('getServidor')->andReturn(null);
        $repo->shouldReceive('save')
            ->with(Mockery::on(function (IntegracaoServidor $model) {
                $funcoes = json_decode($model->funcoes, true);
                return $funcoes['funcao']['tipo_funcao'] === '1'
                    && $funcoes['funcao']['uorg_funcao'] === '1000';
            }))
            ->andReturn(true);

        $service = new SipecServidorIntegracaoService($repo);

        $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $resultado = $method->invoke($service, $registro);

        expect($resultado)->toBe('inseridos');
    });

    test('deve usar nomeSitFuncional como fallback quando código não está no enum', function () {
        setupSiapeLogMockSipecServidor();

        $json = criarServidorSipecJson();
        $json['vinculos'][0]['codSitFuncional'] = '999'; // não existe no enum
        $json['vinculos'][0]['situacaoServidor']['nomeSitFuncional'] = 'SITUACAO_NOVA';
        $registro = criarModelSipecServidor($json);

        $repo = Mockery::mock(IntegracaoServidorRepository::class);
        $repo->shouldReceive('getServidor')->andReturn(null);
        $repo->shouldReceive('save')
            ->with(Mockery::on(function (IntegracaoServidor $model) {
                return $model->situacao_funcional === 'SITUACAO_NOVA';
            }))
            ->andReturn(true);

        $service = new SipecServidorIntegracaoService($repo);

        $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $resultado = $method->invoke($service, $registro);

        expect($resultado)->toBe('inseridos');
    });
});
