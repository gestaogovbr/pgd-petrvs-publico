<?php

use App\Models\IntegracaoUnidade;
use App\Models\Unidade;
use App\Repository\IntegracaoUnidadeRepository;
use App\Repository\UnidadeRepository;
use App\Services\Sipec\Unidade\SipecUnidadeAtualizacaoService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function setupLogMockAtualizacao(): void
{
    $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
    $loggerMock->shouldReceive('info', 'warning', 'error', 'debug', 'notice', 'log', 'critical')->withAnyArgs();
    Log::shouldReceive('channel')->andReturn($loggerMock);
    Log::shouldReceive('error', 'info', 'warning', 'debug')->withAnyArgs();
}

function criarUnidadeModel(array $attrs): Unidade
{
    $unidade = Mockery::mock(Unidade::class)->makePartial();
    foreach ($attrs as $key => $value) {
        $unidade->$key = $value;
    }
    return $unidade;
}

function criarIntegracaoUnidadeModel(array $attrs): IntegracaoUnidade
{
    $model = Mockery::mock(IntegracaoUnidade::class)->makePartial();
    foreach ($attrs as $key => $value) {
        $model->$key = $value;
    }
    return $model;
}

describe('SipecUnidadeAtualizacaoService - processar', function () {

    test('deve retornar contadores zerados quando não há unidades de integração', function () {
        setupLogMockAtualizacao();

        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $integracaoRepo = Mockery::mock(IntegracaoUnidadeRepository::class);

        $unidadeRepo->shouldReceive('findAllComCodigoParaSincronizacao')
            ->once()
            ->andReturn(new Collection());

        $integracaoRepo->shouldReceive('findByCodigo')->andReturnNull();
        $integracaoRepo->shouldReceive('findAllAtivasParaSincronizacao')
            ->once()
            ->andReturn(new Collection());

        $unidadeRepo->shouldReceive('reativarPorIntegracao')->once()->andReturn(0);

        DB::shouldReceive('table->whereNotNull->pluck->all')->andReturn([]);

        config(['integracao.sipec.codUorg' => null, 'integracao.codigoUnidadeRaiz' => null]);

        $service = new SipecUnidadeAtualizacaoService($unidadeRepo, $integracaoRepo);
        $resultado = $service->processar();

        expect($resultado)->toBe([
            'inseridas' => 0,
            'atualizadas_hierarquia' => 0,
            'atualizadas_dados' => 0,
            'ativadas' => 0,
            'erros' => 0,
        ]);
    });

    test('deve inserir unidade nova quando não existe no mapa', function () {
        setupLogMockAtualizacao();

        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $integracaoRepo = Mockery::mock(IntegracaoUnidadeRepository::class);

        $unidadeRaiz = criarUnidadeModel([
            'id' => 'raiz-id',
            'codigo' => 'RAIZ',
            'nome' => 'Raiz',
            'sigla' => 'RZ',
            'path' => '',
            'unidade_pai_id' => null,
            'cidade_id' => null,
            'entidade_id' => 'entidade-1',
        ]);

        $unidadeRepo->shouldReceive('findAllComCodigoParaSincronizacao')
            ->once()
            ->andReturn(new Collection([$unidadeRaiz]));

        $integracaoRaiz = criarIntegracaoUnidadeModel([
            'id_servo' => 'RAIZ',
            'pai_servo' => null,
            'nomeuorg' => 'Raiz',
            'siglauorg' => 'RZ',
            'municipio_ibge' => null,
            'data_modificacao' => '2024-01-01 00:00:00',
        ]);

        $integracaoNova = criarIntegracaoUnidadeModel([
            'id_servo' => 'NOVA',
            'pai_servo' => 'RAIZ',
            'nomeuorg' => 'Unidade Nova',
            'siglauorg' => 'UN',
            'municipio_ibge' => '3550308',
            'data_modificacao' => '2024-01-01 00:00:00',
        ]);

        $integracaoRepo->shouldReceive('findAllAtivasParaSincronizacao')
            ->once()
            ->andReturn(new Collection([$integracaoRaiz, $integracaoNova]));

        $integracaoRepo->shouldReceive('findByCodigo')->andReturnNull();

        $novaUnidade = criarUnidadeModel([
            'id' => 'nova-id',
            'codigo' => 'NOVA',
            'nome' => 'Unidade Nova',
            'sigla' => 'UN',
            'path' => 'raiz-id',
            'unidade_pai_id' => 'raiz-id',
            'cidade_id' => 'cidade-sp',
            'entidade_id' => 'entidade-1',
        ]);

        $unidadeRepo->shouldReceive('create')
            ->once()
            ->andReturn($novaUnidade);

        $unidadeRepo->shouldReceive('reativarPorIntegracao')->once()->andReturn(0);
        $unidadeRepo->shouldReceive('findBySigla')->andReturnNull();

        DB::shouldReceive('table')->andReturnSelf();
        DB::shouldReceive('whereNotNull')->andReturnSelf();
        DB::shouldReceive('pluck')->andReturnSelf();
        DB::shouldReceive('all')->andReturn(['3550308' => 'cidade-sp']);
        DB::shouldReceive('transaction')->andReturnUsing(function ($callback) {
            return $callback();
        });

        config(['integracao.sipec.codUorg' => 'RAIZ', 'integracao.codigoUnidadeRaiz' => 'RAIZ']);

        $service = new SipecUnidadeAtualizacaoService($unidadeRepo, $integracaoRepo);
        $resultado = $service->processar();

        expect($resultado['inseridas'])->toBe(1);
    });

    test('deve atualizar dados quando nome ou sigla mudou', function () {
        setupLogMockAtualizacao();

        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $integracaoRepo = Mockery::mock(IntegracaoUnidadeRepository::class);

        $unidadeExistente = criarUnidadeModel([
            'id' => 'u-1',
            'codigo' => 'COD1',
            'nome' => 'Nome Antigo',
            'sigla' => 'NA',
            'path' => '',
            'unidade_pai_id' => null,
            'cidade_id' => null,
            'entidade_id' => 'entidade-1',
        ]);

        $unidadeRepo->shouldReceive('findAllComCodigoParaSincronizacao')
            ->once()
            ->andReturn(new Collection([$unidadeExistente]));

        $integracaoAtualizada = criarIntegracaoUnidadeModel([
            'id_servo' => 'COD1',
            'pai_servo' => null,
            'nomeuorg' => 'Nome Novo',
            'siglauorg' => 'NN',
            'municipio_ibge' => null,
            'data_modificacao' => '2024-06-01 00:00:00',
        ]);

        $integracaoRepo->shouldReceive('findAllAtivasParaSincronizacao')
            ->once()
            ->andReturn(new Collection([$integracaoAtualizada]));

        $integracaoRepo->shouldReceive('findByCodigo')->andReturnNull();

        $unidadeRepo->shouldReceive('update')
            ->once()
            ->with('u-1', Mockery::on(function ($dados) {
                return $dados['nome'] === 'Nome Novo' && $dados['sigla'] === 'NN';
            }))
            ->andReturn($unidadeExistente);

        $unidadeRepo->shouldReceive('reativarPorIntegracao')->once()->andReturn(0);

        DB::shouldReceive('table')->andReturnSelf();
        DB::shouldReceive('whereNotNull')->andReturnSelf();
        DB::shouldReceive('pluck')->andReturnSelf();
        DB::shouldReceive('all')->andReturn([]);
        DB::shouldReceive('transaction')->andReturnUsing(function ($callback) {
            return $callback();
        });

        config(['integracao.sipec.codUorg' => 'COD1', 'integracao.codigoUnidadeRaiz' => 'COD1']);

        $service = new SipecUnidadeAtualizacaoService($unidadeRepo, $integracaoRepo);
        $resultado = $service->processar();

        expect($resultado['atualizadas_dados'])->toBe(1);
    });

    test('deve não atualizar quando dados são iguais', function () {
        setupLogMockAtualizacao();

        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $integracaoRepo = Mockery::mock(IntegracaoUnidadeRepository::class);

        $unidadeExistente = criarUnidadeModel([
            'id' => 'u-1',
            'codigo' => 'COD1',
            'nome' => 'Mesmo Nome',
            'sigla' => 'MN',
            'path' => '',
            'unidade_pai_id' => null,
            'cidade_id' => 'cidade-1',
            'entidade_id' => 'entidade-1',
        ]);

        $unidadeRepo->shouldReceive('findAllComCodigoParaSincronizacao')
            ->once()
            ->andReturn(new Collection([$unidadeExistente]));

        $integracaoIgual = criarIntegracaoUnidadeModel([
            'id_servo' => 'COD1',
            'pai_servo' => null,
            'nomeuorg' => 'Mesmo Nome',
            'siglauorg' => 'MN',
            'municipio_ibge' => '1234',
            'data_modificacao' => '2024-01-01 00:00:00',
        ]);

        $integracaoRepo->shouldReceive('findAllAtivasParaSincronizacao')
            ->once()
            ->andReturn(new Collection([$integracaoIgual]));

        $integracaoRepo->shouldReceive('findByCodigo')->andReturnNull();

        $unidadeRepo->shouldNotReceive('update');
        $unidadeRepo->shouldNotReceive('create');
        $unidadeRepo->shouldReceive('reativarPorIntegracao')->once()->andReturn(0);

        DB::shouldReceive('table')->andReturnSelf();
        DB::shouldReceive('whereNotNull')->andReturnSelf();
        DB::shouldReceive('pluck')->andReturnSelf();
        DB::shouldReceive('all')->andReturn(['1234' => 'cidade-1']);
        DB::shouldReceive('transaction')->andReturnUsing(function ($callback) {
            return $callback();
        });

        config(['integracao.sipec.codUorg' => 'COD1', 'integracao.codigoUnidadeRaiz' => 'COD1']);

        $service = new SipecUnidadeAtualizacaoService($unidadeRepo, $integracaoRepo);
        $resultado = $service->processar();

        expect($resultado['inseridas'])->toBe(0)
            ->and($resultado['atualizadas_dados'])->toBe(0)
            ->and($resultado['atualizadas_hierarquia'])->toBe(0);
    });

    test('deve contar ativadas quando reativarPorIntegracao retorna valor', function () {
        setupLogMockAtualizacao();

        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $integracaoRepo = Mockery::mock(IntegracaoUnidadeRepository::class);

        $unidadeRepo->shouldReceive('findAllComCodigoParaSincronizacao')
            ->once()
            ->andReturn(new Collection());

        $integracaoRepo->shouldReceive('findByCodigo')->andReturnNull();
        $integracaoRepo->shouldReceive('findAllAtivasParaSincronizacao')
            ->once()
            ->andReturn(new Collection());

        $unidadeRepo->shouldReceive('reativarPorIntegracao')->once()->andReturn(5);

        DB::shouldReceive('table')->andReturnSelf();
        DB::shouldReceive('whereNotNull')->andReturnSelf();
        DB::shouldReceive('pluck')->andReturnSelf();
        DB::shouldReceive('all')->andReturn([]);

        config(['integracao.sipec.codUorg' => null, 'integracao.codigoUnidadeRaiz' => null]);

        $service = new SipecUnidadeAtualizacaoService($unidadeRepo, $integracaoRepo);
        $resultado = $service->processar();

        expect($resultado['ativadas'])->toBe(5);
    });

    test('deve atualizar hierarquia quando pai mudou', function () {
        setupLogMockAtualizacao();

        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $integracaoRepo = Mockery::mock(IntegracaoUnidadeRepository::class);

        $raiz = criarUnidadeModel([
            'id' => 'raiz-id',
            'codigo' => 'RAIZ',
            'nome' => 'Raiz',
            'sigla' => 'RZ',
            'path' => '',
            'unidade_pai_id' => null,
            'cidade_id' => null,
            'entidade_id' => 'entidade-1',
        ]);

        $paiA = criarUnidadeModel([
            'id' => 'pai-a-id',
            'codigo' => 'PAI_A',
            'nome' => 'Pai A',
            'sigla' => 'PA',
            'path' => 'raiz-id',
            'unidade_pai_id' => 'raiz-id',
            'cidade_id' => null,
            'entidade_id' => 'entidade-1',
        ]);

        $paiB = criarUnidadeModel([
            'id' => 'pai-b-id',
            'codigo' => 'PAI_B',
            'nome' => 'Pai B',
            'sigla' => 'PB',
            'path' => 'raiz-id',
            'unidade_pai_id' => 'raiz-id',
            'cidade_id' => null,
            'entidade_id' => 'entidade-1',
        ]);

        $filha = criarUnidadeModel([
            'id' => 'filha-id',
            'codigo' => 'FILHA',
            'nome' => 'Filha',
            'sigla' => 'FL',
            'path' => 'raiz-id/pai-a-id',
            'unidade_pai_id' => 'pai-a-id',
            'cidade_id' => null,
            'entidade_id' => 'entidade-1',
        ]);

        $unidadeRepo->shouldReceive('findAllComCodigoParaSincronizacao')
            ->once()
            ->andReturn(new Collection([$raiz, $paiA, $paiB, $filha]));

        $integracaoRaiz = criarIntegracaoUnidadeModel([
            'id_servo' => 'RAIZ',
            'pai_servo' => null,
            'nomeuorg' => 'Raiz',
            'siglauorg' => 'RZ',
            'municipio_ibge' => null,
            'data_modificacao' => '2024-01-01 00:00:00',
        ]);

        $integracaoPaiA = criarIntegracaoUnidadeModel([
            'id_servo' => 'PAI_A',
            'pai_servo' => 'RAIZ',
            'nomeuorg' => 'Pai A',
            'siglauorg' => 'PA',
            'municipio_ibge' => null,
            'data_modificacao' => '2024-01-01 00:00:00',
        ]);

        $integracaoPaiB = criarIntegracaoUnidadeModel([
            'id_servo' => 'PAI_B',
            'pai_servo' => 'RAIZ',
            'nomeuorg' => 'Pai B',
            'siglauorg' => 'PB',
            'municipio_ibge' => null,
            'data_modificacao' => '2024-01-01 00:00:00',
        ]);

        $integracaoFilha = criarIntegracaoUnidadeModel([
            'id_servo' => 'FILHA',
            'pai_servo' => 'PAI_B',
            'nomeuorg' => 'Filha',
            'siglauorg' => 'FL',
            'municipio_ibge' => null,
            'data_modificacao' => '2024-06-01 00:00:00',
        ]);

        $integracaoRepo->shouldReceive('findAllAtivasParaSincronizacao')
            ->once()
            ->andReturn(new Collection([$integracaoRaiz, $integracaoPaiA, $integracaoPaiB, $integracaoFilha]));

        $integracaoRepo->shouldReceive('findByCodigo')->andReturnNull();

        $unidadeRepo->shouldReceive('update')
            ->once()
            ->with('filha-id', Mockery::on(function ($dados) {
                return $dados['unidade_pai_id'] === 'pai-b-id'
                    && $dados['path'] === 'raiz-id/pai-b-id';
            }))
            ->andReturn($filha);

        $unidadeRepo->shouldReceive('recalcularPaths')
            ->once()
            ->with('raiz-id/pai-a-id/filha-id', 'raiz-id/pai-b-id/filha-id')
            ->andReturn(0);

        $unidadeRepo->shouldReceive('reativarPorIntegracao')->once()->andReturn(0);

        DB::shouldReceive('table')->andReturnSelf();
        DB::shouldReceive('whereNotNull')->andReturnSelf();
        DB::shouldReceive('pluck')->andReturnSelf();
        DB::shouldReceive('all')->andReturn([]);
        DB::shouldReceive('transaction')->andReturnUsing(function ($callback) {
            return $callback();
        });

        config(['integracao.sipec.codUorg' => 'RAIZ', 'integracao.codigoUnidadeRaiz' => 'RAIZ']);

        $service = new SipecUnidadeAtualizacaoService($unidadeRepo, $integracaoRepo);
        $resultado = $service->processar();

        expect($resultado['atualizadas_hierarquia'])->toBe(1);
    });
});
