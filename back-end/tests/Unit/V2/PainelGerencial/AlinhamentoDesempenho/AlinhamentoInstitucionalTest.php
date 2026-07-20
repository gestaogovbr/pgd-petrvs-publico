<?php

use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\AlinhamentoDesempenho\DataProviders\AlinhamentoInstitucional;
use App\V2\PainelGerencial\DTOs\DistribuicaoUnidadeDTO;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\DTOs\IndicadorDTO;
use Illuminate\Database\Eloquent\Collection;

beforeEach(function () {
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
});

afterEach(function () {
    Mockery::close();
});

describe('AlinhamentoInstitucional - segmentos', function () {

    test('retorna exatamente 4 segmentos com nomes corretos', function () {
        $provider = criarProvider($this->unidadeRepo, [
            'unidade-1' => new DistribuicaoUnidadeDTO('unidade-1', 'SIGLA', [0, 0, 0, 0], 0),
        ]);
        $filtros = new FiltrosPainelDTO('situacao_atual', 'unidade-1', null, null);

        $resultado = $provider->getData($filtros);

        expect($resultado->segmentos)->toBe([
            'Vinculadas a Objetivos Estratégicos ao PEI',
            'Vinculadas a Processo da CV',
            'Vinculadas a ambos',
            'Não vinculadas',
        ]);
        expect($resultado->segmentos)->toHaveCount(4);
    });
});

describe('AlinhamentoInstitucional - getData orquestração', function () {

    test('retorna distribuição zerada quando não há entregas', function () {
        $provider = criarProvider($this->unidadeRepo, [
            'unidade-1' => new DistribuicaoUnidadeDTO('unidade-1', 'SIGLA', [0, 0, 0, 0], 0),
        ]);
        $filtros = new FiltrosPainelDTO('situacao_atual', 'unidade-1', null, null);

        $resultado = $provider->getData($filtros);

        expect($resultado->distribuicoes)->toHaveCount(1);
        expect($resultado->distribuicoes[0]->valores)->toBe([0, 0, 0, 0]);
        expect($resultado->distribuicoes[0]->total)->toBe(0);
    });

    test('primeira distribuição consolida unidade selecionada com filhas', function () {
        $filha = Mockery::mock(Unidade::class)->makePartial();
        $filha->id = 'filha-1';
        $filha->sigla = 'F1';

        $provider = criarProvider(
            $this->unidadeRepo,
            distribuicoes: [
                'unidade-1' => new DistribuicaoUnidadeDTO('unidade-1', 'SIGLA', [3, 4, 2, 1], 10),
                'filha-1' => new DistribuicaoUnidadeDTO('filha-1', 'F1', [1, 1, 0, 1], 3),
            ],
            filhas: new Collection([$filha]),
        );
        $filtros = new FiltrosPainelDTO('situacao_atual', 'unidade-1', null, null);

        $resultado = $provider->getData($filtros);

        expect($resultado->distribuicoes[0]->unidadeId)->toBe('unidade-1');
        expect($resultado->distribuicoes[0]->unidadeSigla)->toBe('SIGLA');
        expect($resultado->distribuicoes[0]->valores)->toBe([3, 4, 2, 1]);
        expect($resultado->distribuicoes[0]->total)->toBe(10);
    });

    test('gera distribuição individual para cada filha', function () {
        $filha1 = Mockery::mock(Unidade::class)->makePartial();
        $filha1->id = 'filha-1';
        $filha1->sigla = 'F1';

        $filha2 = Mockery::mock(Unidade::class)->makePartial();
        $filha2->id = 'filha-2';
        $filha2->sigla = 'F2';

        $provider = criarProvider(
            $this->unidadeRepo,
            distribuicoes: [
                'unidade-1' => new DistribuicaoUnidadeDTO('unidade-1', 'SIGLA', [2, 2, 1, 0], 5),
                'filha-1' => new DistribuicaoUnidadeDTO('filha-1', 'F1', [1, 0, 0, 1], 2),
                'filha-2' => new DistribuicaoUnidadeDTO('filha-2', 'F2', [0, 1, 1, 1], 3),
            ],
            filhas: new Collection([$filha1, $filha2]),
        );
        $filtros = new FiltrosPainelDTO('situacao_atual', 'unidade-1', null, null);

        $resultado = $provider->getData($filtros);

        expect($resultado->distribuicoes)->toHaveCount(3);
        expect($resultado->distribuicoes[0]->unidadeId)->toBe('unidade-1');
    });

    test('subordinadas são ordenadas por total decrescente mantendo a primeira fixa', function () {
        $filha1 = Mockery::mock(Unidade::class)->makePartial();
        $filha1->id = 'filha-1';
        $filha1->sigla = 'F1';

        $filha2 = Mockery::mock(Unidade::class)->makePartial();
        $filha2->id = 'filha-2';
        $filha2->sigla = 'F2';

        $filha3 = Mockery::mock(Unidade::class)->makePartial();
        $filha3->id = 'filha-3';
        $filha3->sigla = 'F3';

        $provider = criarProvider(
            $this->unidadeRepo,
            distribuicoes: [
                'unidade-1' => new DistribuicaoUnidadeDTO('unidade-1', 'SIGLA', [5, 5, 5, 5], 20),
                'filha-1' => new DistribuicaoUnidadeDTO('filha-1', 'F1', [1, 0, 0, 0], 1),
                'filha-2' => new DistribuicaoUnidadeDTO('filha-2', 'F2', [5, 2, 1, 2], 10),
                'filha-3' => new DistribuicaoUnidadeDTO('filha-3', 'F3', [3, 1, 0, 1], 5),
            ],
            filhas: new Collection([$filha1, $filha2, $filha3]),
        );
        $filtros = new FiltrosPainelDTO('situacao_atual', 'unidade-1', null, null);

        $resultado = $provider->getData($filtros);

        // Primeira permanece fixa
        expect($resultado->distribuicoes[0]->unidadeId)->toBe('unidade-1');
        // Subordinadas ordenadas por total desc: filha-2(10) > filha-3(5) > filha-1(1)
        expect($resultado->distribuicoes[1]->unidadeId)->toBe('filha-2');
        expect($resultado->distribuicoes[1]->total)->toBe(10);
        expect($resultado->distribuicoes[2]->unidadeId)->toBe('filha-3');
        expect($resultado->distribuicoes[2]->total)->toBe(5);
        expect($resultado->distribuicoes[3]->unidadeId)->toBe('filha-1');
        expect($resultado->distribuicoes[3]->total)->toBe(1);
    });
});

describe('AlinhamentoInstitucional - valores por segmento', function () {

    test('segmento PEI no índice 0', function () {
        $provider = criarProvider($this->unidadeRepo, [
            'unidade-1' => new DistribuicaoUnidadeDTO('unidade-1', 'SIGLA', [5, 0, 0, 0], 5),
        ]);
        $filtros = new FiltrosPainelDTO('situacao_atual', 'unidade-1', null, null);

        $resultado = $provider->getData($filtros);

        expect($resultado->distribuicoes[0]->valores[0])->toBe(5);
    });

    test('segmento CV no índice 1', function () {
        $provider = criarProvider($this->unidadeRepo, [
            'unidade-1' => new DistribuicaoUnidadeDTO('unidade-1', 'SIGLA', [0, 3, 0, 0], 3),
        ]);
        $filtros = new FiltrosPainelDTO('situacao_atual', 'unidade-1', null, null);

        $resultado = $provider->getData($filtros);

        expect($resultado->distribuicoes[0]->valores[1])->toBe(3);
    });

    test('segmento Ambos no índice 2', function () {
        $provider = criarProvider($this->unidadeRepo, [
            'unidade-1' => new DistribuicaoUnidadeDTO('unidade-1', 'SIGLA', [0, 0, 7, 0], 7),
        ]);
        $filtros = new FiltrosPainelDTO('situacao_atual', 'unidade-1', null, null);

        $resultado = $provider->getData($filtros);

        expect($resultado->distribuicoes[0]->valores[2])->toBe(7);
    });

    test('segmento Não vinculadas no índice 3', function () {
        $provider = criarProvider($this->unidadeRepo, [
            'unidade-1' => new DistribuicaoUnidadeDTO('unidade-1', 'SIGLA', [0, 0, 0, 2], 2),
        ]);
        $filtros = new FiltrosPainelDTO('situacao_atual', 'unidade-1', null, null);

        $resultado = $provider->getData($filtros);

        expect($resultado->distribuicoes[0]->valores[3])->toBe(2);
    });

    test('distribuição com todos os segmentos preenchidos', function () {
        $provider = criarProvider($this->unidadeRepo, [
            'unidade-1' => new DistribuicaoUnidadeDTO('unidade-1', 'SIGLA', [10, 5, 3, 2], 20),
        ]);
        $filtros = new FiltrosPainelDTO('situacao_atual', 'unidade-1', null, null);

        $resultado = $provider->getData($filtros);
        $valores = $resultado->distribuicoes[0]->valores;

        expect($valores)->toHaveCount(4);
        expect($valores[0])->toBe(10); // PEI
        expect($valores[1])->toBe(5);  // CV
        expect($valores[2])->toBe(3);  // Ambos
        expect($valores[3])->toBe(2);  // Não vinculadas
    });
});

describe('AlinhamentoInstitucional - toArray', function () {

    test('toArray retorna estrutura correta para o front-end', function () {
        $provider = criarProvider($this->unidadeRepo, [
            'unidade-1' => new DistribuicaoUnidadeDTO('unidade-1', 'SIGLA', [2, 3, 1, 4], 10),
        ]);
        $filtros = new FiltrosPainelDTO('situacao_atual', 'unidade-1', null, null);

        $resultado = $provider->getData($filtros);
        $array = $resultado->toArray();

        expect($array)->toHaveKeys(['segmentos', 'distribuicoes']);
        expect($array['segmentos'])->toHaveCount(4);
        expect($array['distribuicoes'])->toHaveCount(1);
        expect($array['distribuicoes'][0])->toHaveKeys(['unidade_id', 'unidade_sigla', 'valores', 'total']);
        expect($array['distribuicoes'][0]['valores'])->toBe([2, 3, 1, 4]);
        expect($array['distribuicoes'][0]['total'])->toBe(10);
    });
});

// --- Helpers ---

/**
 * Cria um partial mock de AlinhamentoInstitucional que intercepta calcularDistribuicao.
 *
 * @param array<string, DistribuicaoUnidadeDTO> $distribuicoes mapa unidadeId => DTO
 */
function criarProvider(
    $unidadeRepo,
    array $distribuicoes,
    ?Collection $filhas = null,
): AlinhamentoInstitucional {
    $filhas = $filhas ?? new Collection();

    $unidade = Mockery::mock(Unidade::class)->makePartial();
    $unidade->id = 'unidade-1';
    $unidade->sigla = 'SIGLA';

    $unidadeRepo->shouldReceive('findById')->with('unidade-1')->andReturn($unidade);
    $unidadeRepo->shouldReceive('getSubordinadas')->with(['unidade-1'])->andReturn($filhas);

    $provider = Mockery::mock(AlinhamentoInstitucional::class, [$unidadeRepo])->makePartial();
    $provider->shouldAllowMockingProtectedMethods();

    $provider->shouldReceive('calcularDistribuicao')
        ->andReturnUsing(function (Unidade $unidadeArg) use ($distribuicoes) {
            return $distribuicoes[$unidadeArg->id]
                ?? new DistribuicaoUnidadeDTO($unidadeArg->id, $unidadeArg->sigla, [0, 0, 0, 0], 0);
        });

    return $provider;
}
