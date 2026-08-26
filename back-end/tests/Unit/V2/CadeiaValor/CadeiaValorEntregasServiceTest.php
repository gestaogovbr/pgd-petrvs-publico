<?php

use App\Enums\StatusEnum;
use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\Repository\UnidadeRepository;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalAbrangenciaPolicy;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelAssembler;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelDataProvider;
use App\V2\ArvoreInstitucional\DTOs\EntregaDetalheLinhaDTO;
use App\V2\CadeiaValor\CadeiaValorPainelService;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelEntregasDetalhamentoDTO;
use App\V2\CadeiaValor\Validators\CadeiaValorProcessoValidator;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarEntregasService(
    ?CadeiaValorReadRepositoryContract $repo = null,
    ?ArvoreInstitucionalPainelDataProvider $painelDataProvider = null,
): CadeiaValorPainelService {
    $repo = $repo ?? Mockery::mock(CadeiaValorReadRepositoryContract::class);
    $painelDataProvider = $painelDataProvider ?? Mockery::mock(ArvoreInstitucionalPainelDataProvider::class);
    $unidadeRepo = Mockery::mock(UnidadeRepository::class);

    return new CadeiaValorPainelService(
        $repo,
        new ArvoreInstitucionalPainelAssembler(),
        $painelDataProvider,
        new CadeiaValorProcessoValidator($repo),
        new ArvoreInstitucionalAbrangenciaPolicy($unidadeRepo),
    );
}

function mockEntregaRow(array $overrides = []): \stdClass
{
    return (object) array_merge([
        'plano_entrega_entrega_id' => 'pee-1',
        'unidade_id' => 'u-1',
        'unidade_sigla' => 'UA',
        'unidade_nome' => 'Unidade A',
        'plano_entrega_id' => 'pe-1',
        'plano_entrega_nome' => 'Plano Entrega 1',
        'plano_entrega_status' => StatusEnum::ATIVO->value,
        'plano_entrega_data_inicio' => '2025-01-01',
        'plano_entrega_data_fim' => '2025-12-31',
        'entrega_titulo' => 'Entrega Teste',
        'entrega_descricao' => 'Descrição da entrega',
        'descricao_meta' => 'Meta descritiva',
        'etiquetas' => null,
        'progresso_esperado' => 50.0,
        'progresso_realizado' => 30.0,
        'meta' => '{"porcentagem": 100}',
        'realizado' => '{"porcentagem": 40}',
        'tipo_indicador' => 'PORCENTAGEM',
        'lista_qualitativos' => null,
        'registro_execucao' => 'Última atividade realizada',
        'participantes_total' => 3,
        'participantes_somente_unidade_propria' => 2,
        'participantes_somente_outras_unidades' => 1,
        'participantes_em_ambas' => 0,
        'esforco_disponivel_horas' => 500.0,
        'esforco_planejado_horas' => 400.0,
        'esforco_executado_horas' => 200.0,
        'tem_pt_pactuado' => true,
        'tem_pt_concluido' => true,
    ], $overrides);
}

describe('CadeiaValorPainelService::getEntregasDetalhamento', function () {

    test('getEntregasDetalhamento retorna DTO de detalhamento com itens', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $painelDataProvider = Mockery::mock(ArvoreInstitucionalPainelDataProvider::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $processo = Mockery::mock(CadeiaValorProcesso::class)->makePartial();

        $repo->shouldReceive('findCadeiaValor')->with('cv-1')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('proc-1', 'cv-1')->andReturn($processo);
        $painelDataProvider->shouldReceive('listarDetalhamentoEntregas')
            ->withAnyArgs()
            ->andReturn([mockEntregaRow()]);

        $service = criarEntregasService($repo, $painelDataProvider);
        $result = $service->getEntregasDetalhamento('cv-1', 'proc-1');

        expect($result)->toBeInstanceOf(CadeiaValorPainelEntregasDetalhamentoDTO::class)
            ->and($result->processo_id)->toBe('proc-1')
            ->and($result->itens)->toHaveCount(1)
            ->and($result->itens[0])->toBeInstanceOf(EntregaDetalheLinhaDTO::class)
            ->and($result->itens[0]->plano_entrega_entrega_id)->toBe('pee-1')
            ->and($result->itens[0]->registro_execucao)->toBe('Última atividade realizada')
            ->and($result->itens[0]->mostrar_planejado)->toBeTrue()
            ->and($result->itens[0]->mostrar_executado)->toBeTrue()
            ->and($result->filtro_entregas)->toHaveCount(1)
            ->and($result->filtro_unidades)->toHaveCount(1);
    });

    test('getEntregasDetalhamento com abrangência itens_subordinados busca filhos', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $painelDataProvider = Mockery::mock(ArvoreInstitucionalPainelDataProvider::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $processo = Mockery::mock(CadeiaValorProcesso::class)->makePartial();

        $repo->shouldReceive('findCadeiaValor')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->andReturn($processo);
        $repo->shouldReceive('coletarIdsFilhosRecursivo')
            ->with('proc-1')
            ->once()
            ->andReturn(['proc-1', 'proc-2', 'proc-3']);
        $painelDataProvider->shouldReceive('listarDetalhamentoEntregas')
            ->withAnyArgs()
            ->andReturn([]);

        $service = criarEntregasService($repo, $painelDataProvider);
        $result = $service->getEntregasDetalhamento('cv-1', 'proc-1', ['abrangencia' => 'itens_subordinados']);

        expect($result->itens)->toBe([]);
    });

    test('getEntregasDetalhamento lança NotFoundException se cadeia não existe', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $repo->shouldReceive('findCadeiaValor')->with('cv-inexistente')->andReturnNull();

        $service = criarEntregasService($repo);
        $service->getEntregasDetalhamento('cv-inexistente', 'proc-1');
    })->throws(\App\Exceptions\NotFoundException::class);

    test('getEntregasDetalhamento lança NotFoundException se processo não existe', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $repo->shouldReceive('findCadeiaValor')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('proc-inexistente', 'cv-1')->andReturnNull();

        $service = criarEntregasService($repo);
        $service->getEntregasDetalhamento('cv-1', 'proc-inexistente');
    })->throws(\App\Exceptions\NotFoundException::class);
});
