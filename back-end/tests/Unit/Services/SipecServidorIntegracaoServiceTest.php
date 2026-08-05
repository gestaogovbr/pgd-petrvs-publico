<?php

use App\DTOs\Sipec\ServidorSipecDTO;
use App\Models\IntegracaoServidor;
use App\Models\SipecServidor;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\Sipec\SipecServidorRepository;
use App\Services\Sipec\Servidor\SipecServidorIntegracaoService;
use Illuminate\Support\Facades\Log;
use Psr\Log\LoggerInterface;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function setupSiapeLogMockSipecServidor(): void
{
    $loggerMock = Mockery::mock(LoggerInterface::class);
    $loggerMock->shouldReceive('info', 'warning', 'error', 'debug', 'notice')->withAnyArgs();
    Log::shouldReceive('channel')->with('sipec')->andReturn($loggerMock);
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

    return $model;
}

function criarService(?IntegracaoServidorRepository $integracaoRepo = null, ?SipecServidorRepository $sipecRepo = null): SipecServidorIntegracaoService
{
    $integracaoRepo ??= Mockery::mock(IntegracaoServidorRepository::class);
    $sipecRepo ??= Mockery::mock(SipecServidorRepository::class);

    return new SipecServidorIntegracaoService($integracaoRepo, $sipecRepo);
}

describe('SipecServidorIntegracaoService', function () {

    describe('processar()', function () {

        test('deve processar registros via repository e marcar como processado', function () {
            setupSiapeLogMockSipecServidor();

            $json = criarServidorSipecJson();
            $registro = criarModelSipecServidor($json);

            $sipecRepo = Mockery::mock(SipecServidorRepository::class);
            $sipecRepo->shouldReceive('chunkNaoProcessados')
                ->with(100, Mockery::on(function ($callback) use ($registro) {
                    $callback(collect([$registro]));
                    return true;
                }))
                ->once();
            $sipecRepo->shouldReceive('marcarComoProcessado')
                ->with($registro)
                ->once()
                ->andReturn(true);

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldReceive('getServidor')->andReturn(null);
            $integracaoRepo->shouldReceive('save')->andReturn(true);

            $service = new SipecServidorIntegracaoService($integracaoRepo, $sipecRepo);
            $resultado = $service->processar();

            expect($resultado)->toBe([
                'inseridos' => 1,
                'atualizados' => 0,
                'descartados' => 0,
                'erros' => 0,
            ]);
        });

        test('deve contabilizar erros e não marcar como processado quando falha', function () {
            setupSiapeLogMockSipecServidor();
            Log::shouldReceive('error')->withAnyArgs();

            $json = criarServidorSipecJson();
            $registro = criarModelSipecServidor($json);

            $sipecRepo = Mockery::mock(SipecServidorRepository::class);
            $sipecRepo->shouldReceive('chunkNaoProcessados')
                ->with(100, Mockery::on(function ($callback) use ($registro) {
                    $callback(collect([$registro]));
                    return true;
                }))
                ->once();
            $sipecRepo->shouldNotReceive('marcarComoProcessado');

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldReceive('getServidor')
                ->andThrow(new RuntimeException('Erro de conexão'));

            $service = new SipecServidorIntegracaoService($integracaoRepo, $sipecRepo);
            $resultado = $service->processar();

            expect($resultado)->toBe([
                'inseridos' => 0,
                'atualizados' => 0,
                'descartados' => 0,
                'erros' => 1,
            ]);
        });

        test('deve retornar contadores zerados quando não há registros', function () {
            setupSiapeLogMockSipecServidor();

            $sipecRepo = Mockery::mock(SipecServidorRepository::class);
            $sipecRepo->shouldReceive('chunkNaoProcessados')
                ->with(100, Mockery::type('callable'))
                ->once();

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);

            $service = new SipecServidorIntegracaoService($integracaoRepo, $sipecRepo);
            $resultado = $service->processar();

            expect($resultado)->toBe([
                'inseridos' => 0,
                'atualizados' => 0,
                'descartados' => 0,
                'erros' => 0,
            ]);
        });
    });

    describe('processarRegistro()', function () {

        test('deve inserir registro em integracao_servidores quando não existe', function () {
            setupSiapeLogMockSipecServidor();

            $json = criarServidorSipecJson();
            $registro = criarModelSipecServidor($json);

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldReceive('getServidor')
                ->with('12345678901', '1234567')
                ->once()
                ->andReturn(null);
            $integracaoRepo->shouldReceive('save')
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

            $service = criarService($integracaoRepo);

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

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldReceive('getServidor')
                ->with('12345678901', '1234567')
                ->once()
                ->andReturn($existente);
            $integracaoRepo->shouldReceive('update')
                ->with('12345678901', '1234567', Mockery::on(function (array $data) {
                    return $data['cpf'] === '12345678901'
                        && $data['nome'] === 'João da Silva'
                        && $data['emailfuncional'] === 'joao@orgao.gov.br';
                }))
                ->once()
                ->andReturn(true);

            $service = criarService($integracaoRepo);

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

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldNotReceive('save');
            $integracaoRepo->shouldNotReceive('update');

            $service = criarService($integracaoRepo);

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

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldNotReceive('save');
            $integracaoRepo->shouldNotReceive('update');

            $service = criarService($integracaoRepo);

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

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldNotReceive('save');
            $integracaoRepo->shouldNotReceive('update');

            $service = criarService($integracaoRepo);

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

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldReceive('getServidor')->andReturn(null);
            $integracaoRepo->shouldReceive('save')
                ->with(Mockery::on(function (IntegracaoServidor $model) {
                    return $model->participa_pgd === 'sim';
                }))
                ->andReturn(true);

            $service = criarService($integracaoRepo);

            $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
            $method->setAccessible(true);

            $resultado = $method->invoke($service, $registro);

            expect($resultado)->toBe('inseridos');
        });

        test('deve retornar null para email sem @', function () {
            setupSiapeLogMockSipecServidor();

            $json = criarServidorSipecJson();
            $json['vinculos'][0]['servidorDisponivel']['emailInstitucional'] = 'emailsemarroba';
            $registro = criarModelSipecServidor($json);

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldReceive('getServidor')->andReturn(null);
            $integracaoRepo->shouldReceive('save')
                ->with(Mockery::on(function (IntegracaoServidor $model) {
                    return $model->emailfuncional === null;
                }))
                ->andReturn(true);

            $service = criarService($integracaoRepo);

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

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldReceive('getServidor')->andReturn(null);
            $integracaoRepo->shouldReceive('save')->twice()->andReturn(true);

            $service = criarService($integracaoRepo);

            $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
            $method->setAccessible(true);

            $resultado = $method->invoke($service, $registro);

            expect($resultado)->toBe('inseridos');
        });

        test('deve gerar funcoes como JSON quando codAtivFun está preenchido', function () {
            setupSiapeLogMockSipecServidor();

            $json = criarServidorSipecJson();
            $json['vinculos'][0]['codAtivFun'] = '456';
            $registro = criarModelSipecServidor($json);

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldReceive('getServidor')->andReturn(null);
            $integracaoRepo->shouldReceive('save')
                ->with(Mockery::on(function (IntegracaoServidor $model) {
                    $funcoes = json_decode($model->funcoes, true);
                    return $funcoes['funcao']['tipo_funcao'] === '1'
                        && $funcoes['funcao']['uorg_funcao'] === '1000';
                }))
                ->andReturn(true);

            $service = criarService($integracaoRepo);

            $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
            $method->setAccessible(true);

            $resultado = $method->invoke($service, $registro);

            expect($resultado)->toBe('inseridos');
        });

        test('deve usar nomeSitFuncional como fallback quando código não está no enum', function () {
            setupSiapeLogMockSipecServidor();

            $json = criarServidorSipecJson();
            $json['vinculos'][0]['codSitFuncional'] = '999';
            $json['vinculos'][0]['situacaoServidor']['nomeSitFuncional'] = 'SITUACAO_NOVA';
            $registro = criarModelSipecServidor($json);

            $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
            $integracaoRepo->shouldReceive('getServidor')->andReturn(null);
            $integracaoRepo->shouldReceive('save')
                ->with(Mockery::on(function (IntegracaoServidor $model) {
                    return $model->situacao_funcional === 'SITUACAO_NOVA';
                }))
                ->andReturn(true);

            $service = criarService($integracaoRepo);

            $method = new ReflectionMethod(SipecServidorIntegracaoService::class, 'processarRegistro');
            $method->setAccessible(true);

            $resultado = $method->invoke($service, $registro);

            expect($resultado)->toBe('inseridos');
        });
    });
});
