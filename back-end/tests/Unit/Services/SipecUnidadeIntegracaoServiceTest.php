<?php

use App\Models\IntegracaoUnidade;
use App\Models\SipecUnidade;
use App\Services\Sipec\Unidade\ArvoreUnidadeBuilder;
use App\Services\Sipec\Unidade\SipecUnidadeIntegracaoService;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function setupLogMockUnidade(): void
{
    $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
    $loggerMock->shouldReceive('info', 'warning', 'error', 'debug', 'notice', 'log', 'critical')->withAnyArgs();
    Log::shouldReceive('channel')->andReturn($loggerMock);
    Log::shouldReceive('error', 'info', 'warning', 'debug')->withAnyArgs();
}

function criarUnidadeObj(string $codigo, ?string $pai): object
{
    return (object) [
        'id_servo' => $codigo,
        'pai_servo' => $pai,
    ];
}

describe('ArvoreUnidadeBuilder', function () {

    test('deve agrupar unidades por nível de profundidade', function () {
        $unidades = [
            criarUnidadeObj('1', null),      // raiz
            criarUnidadeObj('2', '1'),       // nível 1
            criarUnidadeObj('3', '1'),       // nível 1
            criarUnidadeObj('4', '2'),       // nível 2
            criarUnidadeObj('5', '4'),       // nível 3
        ];

        $builder = new ArvoreUnidadeBuilder($unidades, '1');
        $niveis = $builder->getNiveisPorProfundidade();

        expect($niveis)->toHaveCount(4)
            ->and($niveis[0])->toHaveCount(1)
            ->and($niveis[0][0]->id_servo)->toBe('1')
            ->and($niveis[1])->toHaveCount(2)
            ->and($niveis[2])->toHaveCount(1)
            ->and($niveis[2][0]->id_servo)->toBe('4')
            ->and($niveis[3])->toHaveCount(1)
            ->and($niveis[3][0]->id_servo)->toBe('5');
    });

    test('deve identificar raiz pelo código configurado', function () {
        $unidades = [
            criarUnidadeObj('100', '999'),
            criarUnidadeObj('200', '100'),
        ];

        $builder = new ArvoreUnidadeBuilder($unidades, '100');
        $niveis = $builder->getNiveisPorProfundidade();

        expect($niveis[0][0]->id_servo)->toBe('100');
    });

    test('deve usar código configurado como raiz quando disponível', function () {
        $unidades = [
            criarUnidadeObj('A', 'X'),   // pai não existe na lista
            criarUnidadeObj('B', 'A'),
            criarUnidadeObj('C', 'B'),
        ];

        $builder = new ArvoreUnidadeBuilder($unidades, 'A');
        $niveis = $builder->getNiveisPorProfundidade();

        expect($niveis[0][0]->id_servo)->toBe('A')
            ->and($niveis[1][0]->id_servo)->toBe('B')
            ->and($niveis[2][0]->id_servo)->toBe('C');
    });

    test('deve detectar órfãos quando há ciclo', function () {
        $unidades = [
            criarUnidadeObj('1', '999'),    // raiz (pai fora da lista)
            criarUnidadeObj('2', '1'),      // alcançável
            criarUnidadeObj('A', 'B'),      // ciclo
            criarUnidadeObj('B', 'A'),      // ciclo
        ];

        $builder = new ArvoreUnidadeBuilder($unidades, '1');
        $orfaos = $builder->getOrfaos();

        expect($orfaos)->toContain('A')
            ->and($orfaos)->toContain('B')
            ->and($orfaos)->not->toContain('1')
            ->and($orfaos)->not->toContain('2');
    });

    test('deve detectar órfãos quando pai não existe na lista', function () {
        $unidades = [
            criarUnidadeObj('1', '999'),
            criarUnidadeObj('2', '1'),
            criarUnidadeObj('99', '888'),  // pai 888 não existe
        ];

        $builder = new ArvoreUnidadeBuilder($unidades, '1');
        $orfaos = $builder->getOrfaos();

        expect($orfaos)->toContain('99');
    });

    test('deve retornar vazio quando código raiz não está na lista', function () {
        setupLogMockUnidade();

        $unidades = [
            criarUnidadeObj('A', 'B'),
            criarUnidadeObj('B', 'A'),
        ];

        $builder = new ArvoreUnidadeBuilder($unidades, '999');
        $niveis = $builder->getNiveisPorProfundidade();

        expect($niveis)->toBeEmpty();
    });

    test('deve ignorar unidades sem id_servo', function () {
        $unidades = [
            criarUnidadeObj('1', '999'),
            (object) ['id_servo' => null, 'pai_servo' => '1'],
            (object) ['id_servo' => '', 'pai_servo' => '1'],
            criarUnidadeObj('2', '1'),
        ];

        $builder = new ArvoreUnidadeBuilder($unidades, '1');
        $niveis = $builder->getNiveisPorProfundidade();

        $totalUnidades = array_sum(array_map('count', $niveis));
        expect($totalUnidades)->toBe(2); // apenas '1' e '2'
    });
});

describe('SipecUnidadeIntegracaoService', function () {

    test('deve descartar registro sem codUorg', function () {
        setupLogMockUnidade();

        $registro = Mockery::mock(SipecUnidade::class)->makePartial();
        $registro->id = 'uuid-2';
        $registro->codigo = null;
        $registro->response = json_encode(['nomeUorg' => 'Sem Codigo']);
        $registro->processado = false;

        $sipecUnidadeRepo = Mockery::mock(\App\Repository\SipecUnidadeRepository::class);
        $integracaoUnidadeRepo = Mockery::mock(\App\Repository\IntegracaoUnidadeRepository::class);

        $service = new SipecUnidadeIntegracaoService($sipecUnidadeRepo, $integracaoUnidadeRepo);

        $method = new ReflectionMethod(SipecUnidadeIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $resultado = $method->invoke($service, $registro);

        expect($resultado)->toBe('descartadas');
    });

    test('deve descartar registro com JSON vazio', function () {
        setupLogMockUnidade();

        $registro = Mockery::mock(SipecUnidade::class)->makePartial();
        $registro->id = 'uuid-3';
        $registro->codigo = null;
        $registro->response = json_encode([]);
        $registro->processado = false;

        $sipecUnidadeRepo = Mockery::mock(\App\Repository\SipecUnidadeRepository::class);
        $integracaoUnidadeRepo = Mockery::mock(\App\Repository\IntegracaoUnidadeRepository::class);

        $service = new SipecUnidadeIntegracaoService($sipecUnidadeRepo, $integracaoUnidadeRepo);

        $method = new ReflectionMethod(SipecUnidadeIntegracaoService::class, 'processarRegistro');
        $method->setAccessible(true);

        $resultado = $method->invoke($service, $registro);

        expect($resultado)->toBe('descartadas');
    });
});
