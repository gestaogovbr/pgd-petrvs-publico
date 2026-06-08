<?php

use App\Exceptions\NotFoundException;
use App\Models\PlanejamentoObjetivo;
use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;
use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoEntregasListagemDTO;
use App\V2\Planejamento\Objetivo\EsforcoTotalGraphAssembler;
use App\V2\Planejamento\Objetivo\PlanejamentoObjetivoService;
use Illuminate\Database\Eloquent\Model;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarPlanejamentoObjetivoService(
    ?PlanejamentoObjetivoReadRepositoryContract $repository = null,
    ?EsforcoTotalGraphAssembler $assembler = null,
): PlanejamentoObjetivoService {
    return new PlanejamentoObjetivoService(
        $repository ?? Mockery::mock(PlanejamentoObjetivoReadRepositoryContract::class),
        $assembler ?? new EsforcoTotalGraphAssembler(),
    );
}

function objetivoModel(string $id = 'obj-1'): PlanejamentoObjetivo
{
    $objetivo = new PlanejamentoObjetivo();
    $objetivo->id = $id;
    $objetivo->nome = 'Objetivo Teste';

    return $objetivo;
}

/**
 * @return stdClass{
 *     plano_entrega_entrega_id: string,
 *     entrega_titulo: string,
 *     entrega_catalogo_id: ?string,
 *     entrega_catalogo_nome: ?string,
 *     entrega_unidade_id: string,
 *     entrega_unidade_nome: string,
 *     entrega_unidade_sigla: string,
 *     progresso_esperado: float,
 *     progresso_realizado: float,
 *     homologado: int,
 *     esforco_horas_total: float
 * }
 */
function linhaEntregaPlano(array $overrides = []): stdClass
{
    return (object) array_merge([
        'plano_entrega_entrega_id' => 'pee-1',
        'entrega_titulo' => 'Entrega A',
        'entrega_catalogo_id' => null,
        'entrega_catalogo_nome' => null,
        'entrega_unidade_id' => 'un-1',
        'entrega_unidade_nome' => 'Unidade',
        'entrega_unidade_sigla' => 'UN',
        'progresso_esperado' => 50.0,
        'progresso_realizado' => 40.0,
        'homologado' => 1,
        'esforco_horas_total' => 56.0,
    ], (array) $overrides);
}

describe('PlanejamentoObjetivoService::getEsforcoTotal', function () {

    test('lança NotFoundException quando objetivo não existe', function () {
        $repo = Mockery::mock(PlanejamentoObjetivoReadRepositoryContract::class);
        $repo->shouldReceive('find')->once()->with('inexistente')->andReturn(null);

        $service = criarPlanejamentoObjetivoService(repository: $repo);
        $service->getEsforcoTotal('inexistente');
    })->throws(NotFoundException::class, "Objetivo com id 'inexistente' não foi encontrado ou foi removido.");

    test('lança NotFoundException quando find não retorna PlanejamentoObjetivo', function () {
        $repo = Mockery::mock(PlanejamentoObjetivoReadRepositoryContract::class);
        $repo->shouldReceive('find')->once()->with('obj-x')->andReturn(Mockery::mock(Model::class));

        $service = criarPlanejamentoObjetivoService(repository: $repo);
        $service->getEsforcoTotal('obj-x');
    })->throws(NotFoundException::class);

    test('retorna array vazio quando fechamento não tem ids', function () {
        $objetivo = objetivoModel('obj-1');

        $repo = Mockery::mock(PlanejamentoObjetivoReadRepositoryContract::class);
        $repo->shouldReceive('find')->once()->with('obj-1')->andReturn($objetivo);
        $repo->shouldReceive('coletarIdsFechamento')->once()->with('obj-1')->andReturn([]);
        $repo->shouldNotReceive('loadEsforcoPorIds');

        $service = criarPlanejamentoObjetivoService(repository: $repo);

        expect($service->getEsforcoTotal('obj-1'))->toBe([]);
    });

    test('delega coleta e carga ao repository e monta grafo com assembler real', function () {
        $objetivo = objetivoModel('obj-1');
        $rows = [
            (object) [
                'objetivo_id' => 'obj-1',
                'objetivo_nome' => 'Objetivo',
                'objetivo_pai_id' => null,
                'objetivo_superior_id' => null,
                'planejamento_nome' => 'Plano',
                'total_entregas' => 0,
                'esforco_proprio' => 10.0,
            ],
        ];

        $repo = Mockery::mock(PlanejamentoObjetivoReadRepositoryContract::class);
        $repo->shouldReceive('find')->once()->with('obj-1')->andReturn($objetivo);
        $repo->shouldReceive('coletarIdsFechamento')->once()->with('obj-1')->andReturn(['obj-1']);
        $repo->shouldReceive('loadEsforcoPorIds')->once()->with(['obj-1'])->andReturn($rows);
        $repo->shouldReceive('lookupNomes')->andReturn([]);

        $result = criarPlanejamentoObjetivoService(repository: $repo)->getEsforcoTotal('obj-1');

        expect($result)->toHaveKey('obj-1')
            ->and($result['obj-1'])->toBeInstanceOf(EsforcoNodeDTO::class)
            ->and($result['obj-1']->esforco_total_horas)->toEqual(10.0);
    });
});

describe('PlanejamentoObjetivoService::getEntregasComEsforco', function () {

    test('lança NotFoundException quando objetivo não existe', function () {
        $repo = Mockery::mock(PlanejamentoObjetivoReadRepositoryContract::class);
        $repo->shouldReceive('find')->once()->with('inexistente')->andReturn(null);
        $repo->shouldNotReceive('listarEntregasPlanoEntregaPorObjetivoId');

        $service = criarPlanejamentoObjetivoService(repository: $repo);
        $service->getEntregasComEsforco('inexistente');
    })->throws(NotFoundException::class);

    test('monta DTO com entregas e esforço por unidade', function () {
        $objetivo = objetivoModel('obj-1');
        $rowEntrega = linhaEntregaPlano();
        $rowUnidade = (object) [
            'unidade_id' => 'un-1',
            'unidade_nome' => 'Unidade',
            'unidade_sigla' => 'UN',
            'esforco_horas_total' => 56.0,
        ];

        $repo = Mockery::mock(PlanejamentoObjetivoReadRepositoryContract::class);
        $repo->shouldReceive('find')->once()->with('obj-1')->andReturn($objetivo);
        $repo->shouldReceive('listarEntregasPlanoEntregaPorObjetivoId')->once()->with('obj-1')->andReturn([$rowEntrega]);
        $repo->shouldReceive('listarEsforcoPorUnidadePlanoTrabalhoConcluidoPorObjetivoId')
            ->once()
            ->with('obj-1')
            ->andReturn([$rowUnidade]);

        $result = criarPlanejamentoObjetivoService(repository: $repo)->getEntregasComEsforco('obj-1');

        expect($result)->toBeInstanceOf(ObjetivoEntregasListagemDTO::class)
            ->and($result->objetivo_id)->toBe('obj-1')
            ->and($result->total_entregas)->toBe(1)
            ->and($result->itens)->toHaveCount(1)
            ->and($result->itens[0]->entrega_titulo)->toBe('Entrega A')
            ->and($result->itens[0]->esforco_horas_total)->toEqual(56.0)
            ->and($result->esforco_por_unidade)->toHaveCount(1)
            ->and($result->esforco_por_unidade[0]->unidade_sigla)->toBe('UN');
    });

    test('retorna listagem vazia quando não há vínculos', function () {
        $objetivo = objetivoModel('obj-vazio');

        $repo = Mockery::mock(PlanejamentoObjetivoReadRepositoryContract::class);
        $repo->shouldReceive('find')->once()->andReturn($objetivo);
        $repo->shouldReceive('listarEntregasPlanoEntregaPorObjetivoId')->once()->andReturn([]);
        $repo->shouldReceive('listarEsforcoPorUnidadePlanoTrabalhoConcluidoPorObjetivoId')->once()->andReturn([]);

        $result = criarPlanejamentoObjetivoService(repository: $repo)->getEntregasComEsforco('obj-vazio');

        expect($result->total_entregas)->toBe(0)
            ->and($result->itens)->toBe([])
            ->and($result->esforco_por_unidade)->toBe([]);
    });
});
