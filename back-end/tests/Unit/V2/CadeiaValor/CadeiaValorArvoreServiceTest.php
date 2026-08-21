<?php

use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoGraphAssembler;
use App\V2\CadeiaValor\CadeiaValorArvoreService;
use App\V2\CadeiaValor\DTOs\CadeiaValorArvoreDTO;
use App\V2\CadeiaValor\DTOs\CadeiaValorProcessoNodeDTO;
use App\V2\CadeiaValor\DTOs\CadeiaValorVinculoCrossCadeiaDTO;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarProcessoMock(string $id, string $cadeiaValorId, ?string $paiId = null, int $sequencia = 1, string $nome = 'Processo'): CadeiaValorProcesso
{
    $model = Mockery::mock(CadeiaValorProcesso::class)->makePartial();
    $model->id = $id;
    $model->cadeia_valor_id = $cadeiaValorId;
    $model->processo_pai_id = $paiId;
    $model->sequencia = $sequencia;
    $model->nome = $nome;

    return $model;
}

function criarServiceComMock(): CadeiaValorArvoreService
{
    $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
    return new CadeiaValorArvoreService($repo, new ArvoreInstitucionalEsforcoGraphAssembler());
}

describe('CadeiaValorArvoreService - coletarTodosAncestrais', function () {

    test('retorna lista vazia para nó raiz', function () {
        $service = criarServiceComMock();
        $reflection = new ReflectionMethod($service, 'coletarTodosAncestrais');
        $reflection->setAccessible(true);

        $processoRaiz = criarProcessoMock('p1', 'cv-1', null);
        $todosProcessos = new Collection([$processoRaiz]);

        $result = $reflection->invoke($service, $processoRaiz, $todosProcessos);

        expect($result)->toBe([]);
    });

    test('retorna todos os ancestrais do mais próximo ao mais distante', function () {
        $service = criarServiceComMock();
        $reflection = new ReflectionMethod($service, 'coletarTodosAncestrais');
        $reflection->setAccessible(true);

        $pBisavo = criarProcessoMock('p-bisavo', 'cv-1', null, 1, 'Bisavô');
        $pAvo = criarProcessoMock('p-avo', 'cv-1', 'p-bisavo', 1, 'Avô');
        $pPai = criarProcessoMock('p-pai', 'cv-1', 'p-avo', 1, 'Pai');
        $pFilho = criarProcessoMock('p-filho', 'cv-1', 'p-pai', 1, 'Filho');

        $todosProcessos = new Collection([$pBisavo, $pAvo, $pPai, $pFilho]);

        $result = $reflection->invoke($service, $pFilho, $todosProcessos);

        expect($result)->toBe(['p-pai', 'p-avo', 'p-bisavo']);
    });
});

describe('CadeiaValorArvoreService - calcularNivel', function () {

    test('retorna 1 para nó raiz', function () {
        $service = criarServiceComMock();
        $reflection = new ReflectionMethod($service, 'calcularNivel');
        $reflection->setAccessible(true);

        $pRaiz = criarProcessoMock('p-raiz', 'cv-1', null);
        $todosProcessos = new Collection([$pRaiz]);

        $result = $reflection->invoke($service, $pRaiz, $todosProcessos);

        expect($result)->toBe(1);
    });

    test('retorna nível correto para nó profundo', function () {
        $service = criarServiceComMock();
        $reflection = new ReflectionMethod($service, 'calcularNivel');
        $reflection->setAccessible(true);

        $pRaiz = criarProcessoMock('p-raiz', 'cv-1', null);
        $pNivel2 = criarProcessoMock('p-n2', 'cv-1', 'p-raiz');
        $pNivel3 = criarProcessoMock('p-n3', 'cv-1', 'p-n2');

        $todosProcessos = new Collection([$pRaiz, $pNivel2, $pNivel3]);

        $result = $reflection->invoke($service, $pNivel3, $todosProcessos);

        expect($result)->toBe(3);
    });
});

describe('DTOs - serialização', function () {

    test('CadeiaValorProcessoNodeDTO serializa corretamente', function () {
        $dto = CadeiaValorProcessoNodeDTO::fromArray([
            'processo_id' => 'p1',
            'nome' => 'Processo 1',
            'sequencia' => 3,
            'processo_pai_id' => 'p0',
            'cadeia_valor_id' => 'cv1',
            'cadeia_valor_nome' => 'Cadeia A',
            'nivel' => 2,
            'total_vinculos' => 5,
            'etiquetas' => ['tag1', 'tag2'],
            'filhos_ids' => ['p2', 'p3'],
            'vinculos_cross_cadeia' => [],
        ]);

        $json = $dto->jsonSerialize();

        expect($json['processo_id'])->toBe('p1');
        expect($json['nome'])->toBe('Processo 1');
        expect($json['sequencia'])->toBe(3);
        expect($json['nivel'])->toBe(2);
        expect($json['total_vinculos'])->toBe(5);
        expect($json['filhos_ids'])->toBe(['p2', 'p3']);
    });

    test('CadeiaValorProcessoNodeDTO trata processo_pai_id nulo', function () {
        $dto = CadeiaValorProcessoNodeDTO::fromArray([
            'processo_id' => 'p1',
            'nome' => 'Raiz',
            'sequencia' => 1,
            'processo_pai_id' => null,
            'cadeia_valor_id' => 'cv1',
            'cadeia_valor_nome' => 'Cadeia A',
            'nivel' => 1,
            'total_vinculos' => 0,
        ]);

        expect($dto->processo_pai_id)->toBeNull();
    });

    test('CadeiaValorVinculoCrossCadeiaDTO serializa corretamente', function () {
        $dto = CadeiaValorVinculoCrossCadeiaDTO::fromArray([
            'processo_id' => 'p-ext',
            'processo_nome' => 'Processo Externo',
            'cadeia_valor_id' => 'cv-ext',
            'cadeia_valor_nome' => 'Outra Cadeia',
        ]);

        $json = $dto->jsonSerialize();

        expect($json['processo_id'])->toBe('p-ext');
        expect($json['processo_nome'])->toBe('Processo Externo');
        expect($json['cadeia_valor_id'])->toBe('cv-ext');
        expect($json['cadeia_valor_nome'])->toBe('Outra Cadeia');
    });

    test('CadeiaValorArvoreDTO serializa corretamente', function () {
        $dto = new CadeiaValorArvoreDTO(
            processo_focal_id: 'pf-1',
            cadeia_valor_id: 'cv-1',
            cadeia_valor_nome: 'Cadeia Teste',
            nos: [],
            ancestrais_ids: ['anc-1', 'anc-2'],
            raiz_ids: ['raiz-1'],
            nivel_maximo: 4,
        );

        $json = $dto->jsonSerialize();

        expect($json['processo_focal_id'])->toBe('pf-1');
        expect($json['ancestrais_ids'])->toBe(['anc-1', 'anc-2']);
        expect($json['raiz_ids'])->toBe(['raiz-1']);
        expect($json['nivel_maximo'])->toBe(4);
    });
});
