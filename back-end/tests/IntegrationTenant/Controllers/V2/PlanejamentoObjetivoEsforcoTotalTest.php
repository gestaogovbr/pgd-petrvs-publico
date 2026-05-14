<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\Models\EixoTematico;
use App\Models\Entrega;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoEntregaEntregaObjetivo;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\PlanejamentoObjetivo;
use App\Models\Planejamento;
use App\Models\Usuario;
use App\V2\Planejamento\Objetivo\PlanejamentoObjetivoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

beforeEach(function () {
    if (!Route::has('__tests.v2.objetivo.esforco-total')) {
        Route::middleware(['api'])->group(function () {
            Route::get('/api/__tests/v2/planejamento/objetivo/{id}/esforco-total', [PlanejamentoObjetivoController::class, 'esforcoTotal'])
                ->whereUuid('id')
                ->name('__tests.v2.objetivo.esforco-total');
            Route::get('/api/__tests/v2/planejamento/objetivo/{id}/entregas', [PlanejamentoObjetivoController::class, 'entregas'])
                ->whereUuid('id')
                ->name('__tests.v2.objetivo.entregas');
        });
    }

    $this->usuario = Usuario::factory()->create([
        'cod_jornada' => 40,
        'participa_pgd' => 'sim',
    ]);

    $this->actingAs($this->usuario, 'web');
});

/**
 * Helper: cria a estrutura base (entidade, unidade, programa, planejamento, eixo)
 */
function criarEstruturaBase(): array
{
    $entidade = \App\Models\Entidade::factory()->create();
    $unidade = \App\Models\Unidade::factory()->create();
    $programa = \App\Models\Programa::factory()->create(['unidade_id' => $unidade->id]);

    $eixo = EixoTematico::create([
        'id' => Str::uuid()->toString(),
        'nome' => 'Eixo Teste',
        'icone' => 'bi bi-star',
        'cor' => '#000000',
    ]);

    $planejamento = Planejamento::create([
        'id' => Str::uuid()->toString(),
        'nome' => 'Planejamento Teste',
        'missao' => 'Missão',
        'visao' => 'Visão',
        'data_inicio' => '2024-01-01',
        'data_fim' => '2025-12-31',
        'valores' => '[]',
        'entidade_id' => $entidade->id,
        'unidade_id' => $unidade->id,
    ]);

    $planoEntrega = PlanoEntrega::factory()->create([
        'unidade_id' => $unidade->id,
        'programa_id' => $programa->id,
        'planejamento_id' => $planejamento->id,
        'criacao_usuario_id' => Usuario::factory()->create(['cod_jornada' => 40, 'participa_pgd' => 'sim'])->id,
    ]);

    $entrega = Entrega::factory()->create();

    return compact('entidade', 'unidade', 'programa', 'eixo', 'planejamento', 'planoEntrega', 'entrega');
}

/**
 * Helper: cria um objetivo
 */
function criarObjetivo(string $planejamentoId, string $eixoId, string $nome, ?string $paiId = null, ?string $superiorId = null): PlanejamentoObjetivo
{
    return PlanejamentoObjetivo::create([
        'id' => Str::uuid()->toString(),
        'nome' => $nome,
        'fundamentacao' => 'Fundamentação teste',
        'sequencia' => 0,
        'planejamento_id' => $planejamentoId,
        'eixo_tematico_id' => $eixoId,
        'objetivo_pai_id' => $paiId,
        'objetivo_superior_id' => $superiorId,
        'integra_okr' => 1,
    ]);
}

/**
 * Helper: vincula uma entrega a um objetivo com plano de trabalho concluído
 */
function vincularEntregaComEsforco(
    PlanejamentoObjetivo $objetivo,
    array $base,
    Usuario $usuario,
    int $diasPlano = 7,
    float $forcaTrabalho = 100.0
): void {
    $planoEntregaEntrega = PlanoEntregaEntrega::factory()->create([
        'plano_entrega_id' => $base['planoEntrega']->id,
        'entrega_id' => $base['entrega']->id,
        'unidade_id' => $base['unidade']->id,
    ]);

    PlanoEntregaEntregaObjetivo::create([
        'id' => Str::uuid()->toString(),
        'planejamento_objetivo_id' => $objetivo->id,
        'entrega_id' => $planoEntregaEntrega->id,
    ]);

    $planoTrabalho = PlanoTrabalho::factory()->concluido()->create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $base['unidade']->id,
        'programa_id' => $base['programa']->id,
        'criacao_usuario_id' => $usuario->id,
        'data_inicio' => '2024-01-01',
        'data_fim' => now()->parse('2024-01-01')->addDays($diasPlano - 1)->format('Y-m-d'),
    ]);

    PlanoTrabalhoEntrega::factory()->create([
        'plano_trabalho_id' => $planoTrabalho->id,
        'plano_entrega_entrega_id' => $planoEntregaEntrega->id,
        'forca_trabalho' => $forcaTrabalho,
    ]);
}

// ── Testes ──────────────────────────────────────────────────────────

/**
 * Helper: marca nós no cache com prefixo "cached-" no objetivo_nome
 */
function marcarNosComPrefixoCached(array $objetivos): void
{
    foreach ($objetivos as $o) {
        $node = \Illuminate\Support\Facades\Cache::tags('esforco-total')->get("esforco-total:node:{$o->id}");
        if ($node) {
            $tagged = new \App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO(
                objetivo_id: $node->objetivo_id,
                objetivo_nome: "cached-{$node->objetivo_nome}",
                objetivo_pai_id: $node->objetivo_pai_id,
                objetivo_superior_id: $node->objetivo_superior_id,
                planejamento_nome: $node->planejamento_nome,
                total_entregas: $node->total_entregas,
                esforco_proprio: $node->esforco_proprio,
                esforco_total_horas: $node->esforco_total_horas,
                filhos: $node->filhos,
                objetivo_pai: $node->objetivo_pai,
                objetivo_superior: $node->objetivo_superior,
            );
            \Illuminate\Support\Facades\Cache::tags('esforco-total')->put("esforco-total:node:{$o->id}", $tagged, now()->addMinutes(10));
        }
    }
}


describe('GET /api/v2/planejamento/objetivo/{id}/esforco-total', function () {

    test('retorna 404 para objetivo inexistente', function () {
        $this->getJson('/api/__tests/v2/planejamento/objetivo/' . Str::uuid()->toString() . '/esforco-total')
            ->assertStatus(404);
    });

    test('retorna esforço zero para objetivo sem entregas', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo Vazio');

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/esforco-total");

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');
        expect($data)->toHaveKey($obj->id);
        expect($data[$obj->id]['esforco_total_horas'])->toEqual(0);
        expect($data[$obj->id]['objetivo_pai'])->toBeNull();
        expect($data[$obj->id]['objetivo_superior'])->toBeNull();
    });

    /**
     * Cenário: árvore simples com acúmulo — resposta é map<uuid, node>
     *
     *  obj-filho (40h) ← consultado
     *   └── obj-neto (40h)
     *
     * obj-filho.filhos = [neto.id]
     */
    test('acumula esforço recursivamente nos descendentes via objetivo_pai_id', function () {
        $base = criarEstruturaBase();

        $objPai = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Pai');
        $objFilho = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Filho', paiId: $objPai->id);
        $objNeto = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Neto', paiId: $objFilho->id);

        vincularEntregaComEsforco($objPai, $base, $this->usuario, diasPlano: 7);
        vincularEntregaComEsforco($objFilho, $base, $this->usuario, diasPlano: 7);
        vincularEntregaComEsforco($objNeto, $base, $this->usuario, diasPlano: 7);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objFilho->id}/esforco-total");
        $response->assertStatus(200);

        $data = $response->json('data');

        // Map has 2 entries: filho + neto
        expect($data)->toHaveCount(2);
        expect($data)->toHaveKey($objFilho->id);
        expect($data)->toHaveKey($objNeto->id);

        // Filho: 40 + 40 = 80, filhos = [neto.id]
        expect($data[$objFilho->id]['esforco_total_horas'])->toEqual(80);
        expect($data[$objFilho->id]['filhos'])->toBe([$objNeto->id]);
        expect($data[$objFilho->id]['objetivo_pai'])->toBe(['id' => $objPai->id, 'nome' => 'Pai']);

        // Neto: 40h, has objetivo_pai pointing to Filho
        expect($data[$objNeto->id]['esforco_total_horas'])->toEqual(40);
        expect($data[$objNeto->id]['filhos'])->toBeEmpty();
        expect($data[$objNeto->id]['objetivo_pai'])->toBe(['id' => $objFilho->id, 'nome' => 'Filho']);
    });

    /**
     * Cenário: objetivo com objetivo_superior_id
     */
    test('retorna referência ao objetivo_superior quando existe', function () {
        $base = criarEstruturaBase();

        $objSuperior = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Superior DTI');
        $objDep = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Dep', superiorId: $objSuperior->id);
        $objDepFilho = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Dep Filho', paiId: $objDep->id);

        vincularEntregaComEsforco($objDep, $base, $this->usuario, diasPlano: 7);
        vincularEntregaComEsforco($objDepFilho, $base, $this->usuario, diasPlano: 7);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objDep->id}/esforco-total");
        $response->assertStatus(200);

        $data = $response->json('data');

        expect($data[$objDep->id]['objetivo_nome'])->toBe('Dep');
        expect($data[$objDep->id]['esforco_total_horas'])->toEqual(80);
        expect($data[$objDep->id]['objetivo_superior'])->toBe(['id' => $objSuperior->id, 'nome' => 'Superior DTI']);
        expect($data[$objDep->id]['objetivo_pai'])->toBeNull();
    });

    /**
     * Cenário: objetivo com AMBOS pai e superior
     */
    test('retorna referências a pai e superior quando ambos existem', function () {
        $base = criarEstruturaBase();

        $objSuperior = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Superior');
        $objPai = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Pai');
        $objAlvo = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Alvo', paiId: $objPai->id, superiorId: $objSuperior->id);

        vincularEntregaComEsforco($objAlvo, $base, $this->usuario, diasPlano: 7);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objAlvo->id}/esforco-total");
        $response->assertStatus(200);

        $data = $response->json('data');

        expect($data[$objAlvo->id]['objetivo_pai'])->toBe(['id' => $objPai->id, 'nome' => 'Pai']);
        expect($data[$objAlvo->id]['objetivo_superior'])->toBe(['id' => $objSuperior->id, 'nome' => 'Superior']);
    });

    /**
     * Cenário: plano de trabalho NÃO concluído não conta no esforço
     */
    test('ignora planos de trabalho que não estão CONCLUIDO', function () {
        $base = criarEstruturaBase();

        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo');

        $planoEntregaEntrega = PlanoEntregaEntrega::factory()->create([
            'plano_entrega_id' => $base['planoEntrega']->id,
            'entrega_id' => $base['entrega']->id,
            'unidade_id' => $base['unidade']->id,
        ]);

        PlanoEntregaEntregaObjetivo::create([
            'id' => Str::uuid()->toString(),
            'planejamento_objetivo_id' => $obj->id,
            'entrega_id' => $planoEntregaEntrega->id,
        ]);

        // Plano ATIVO (não concluído)
        $planoTrabalho = PlanoTrabalho::factory()->ativo()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $base['unidade']->id,
            'programa_id' => $base['programa']->id,
            'criacao_usuario_id' => $this->usuario->id,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-07',
        ]);

        PlanoTrabalhoEntrega::factory()->create([
            'plano_trabalho_id' => $planoTrabalho->id,
            'plano_entrega_entrega_id' => $planoEntregaEntrega->id,
            'forca_trabalho' => 100,
        ]);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/esforco-total");
        $response->assertStatus(200);

        $data = $response->json('data');
        expect($data[$obj->id]['esforco_total_horas'])->toEqual(0);
        expect($data[$obj->id]['total_entregas'])->toEqual(1);
    });

    /**
     * Cenário: forca_trabalho parcial (50%)
     */
    /**
     * Cenário: descendente conectado via objetivo_superior_id (não objetivo_pai_id)
     * Garante que o branch elseif (superiorId) é exercitado no buildMap.
     */
    test('acumula esforço de descendente vinculado via objetivo_superior_id', function () {
        $base = criarEstruturaBase();

        $objRaiz = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Raiz');
        $objSub = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Subordinado', superiorId: $objRaiz->id);

        vincularEntregaComEsforco($objRaiz, $base, $this->usuario, diasPlano: 7);
        vincularEntregaComEsforco($objSub, $base, $this->usuario, diasPlano: 7);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objRaiz->id}/esforco-total");
        $response->assertStatus(200);

        $data = $response->json('data');

        // Raiz: 40 + 40 = 80 (inclui subordinado)
        expect($data[$objRaiz->id]['esforco_total_horas'])->toEqual(80);
        expect($data[$objRaiz->id]['filhos'])->toBe([$objSub->id]);

        // Subordinado: 40
        expect($data[$objSub->id]['esforco_total_horas'])->toEqual(40);
        expect($data[$objSub->id]['objetivo_superior'])->toBe(['id' => $objRaiz->id, 'nome' => 'Raiz']);
    });

    test('calcula corretamente com forca_trabalho parcial', function () {
        $base = criarEstruturaBase();

        $objPai = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Pai');
        $objFilho = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Filho', paiId: $objPai->id);

        vincularEntregaComEsforco($objPai, $base, $this->usuario, diasPlano: 7, forcaTrabalho: 100.0);
        vincularEntregaComEsforco($objFilho, $base, $this->usuario, diasPlano: 7, forcaTrabalho: 50.0);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objPai->id}/esforco-total");
        $response->assertStatus(200);

        $data = $response->json('data');

        // Pai: 40 + 20 = 60
        expect($data[$objPai->id]['esforco_total_horas'])->toEqual(60);
        // Filho: 20
        expect($data[$objFilho->id]['esforco_total_horas'])->toEqual(20);
    });

    test('segunda chamada retorna do cache', function () {
        $base = criarEstruturaBase();

        $objPai = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Pai');
        $objFilho = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Filho', paiId: $objPai->id);

        vincularEntregaComEsforco($objPai, $base, $this->usuario, diasPlano: 7);
        vincularEntregaComEsforco($objFilho, $base, $this->usuario, diasPlano: 7);

        // Primeira chamada — popula cache
        $response1 = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objPai->id}/esforco-total");
        $response1->assertStatus(200);

        // Marcar nós no cache com prefixo "cached-"
        marcarNosComPrefixoCached([$objPai, $objFilho]);

        // Segunda chamada — todos devem vir do cache (com prefixo)
        $response2 = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objPai->id}/esforco-total");
        $response2->assertStatus(200);

        $data = $response2->json('data');
        expect($data[$objPai->id]['objetivo_nome'])->toBe('cached-Pai');
        expect($data[$objFilho->id]['objetivo_nome'])->toBe('cached-Filho');
    });

    test('não entra em loop com nó auto-referenciante (objetivo_pai_id = id)', function () {
        $base = criarEstruturaBase();

        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Self Parent');

        // Forçar auto-referência direta
        \Illuminate\Support\Facades\DB::table('planejamentos_objetivos')
            ->where('id', $obj->id)
            ->update(['objetivo_pai_id' => $obj->id]);

        vincularEntregaComEsforco($obj, $base, $this->usuario, diasPlano: 7);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/esforco-total");
        $response->assertStatus(200);

        $data = $response->json('data');
        expect($data[$obj->id]['filhos'])->toBeEmpty();
        expect($data[$obj->id]['esforco_total_horas'])->toEqual(40);
    });

    // NOTE: Ciclos (A→B→A) não são testáveis sem DB-level recursion limit.
    // A proteção po.id != d.id cobre auto-referência.
    // Ciclos indiretos devem ser prevenidos na validação de escrita (service/validator).

    /**
     * Árvore: 1(2(3,4), 5(6, 7(8,9,10)), 11, 12)
     * Flush nós 2 e 7, 11 do cache → partial rebuild deve retornar mesmo resultado.
     * Marca nós no cache com prefixo "cached-" para verificar origem.
     */
    test('rebuild parcial com nós intermediários ausentes retorna mesmo resultado', function () {
        $base = criarEstruturaBase();

        $obj1 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '1');
        $obj2 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '2', paiId: $obj1->id);
        $obj3 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '3', paiId: $obj2->id);
        $obj4 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '4', paiId: $obj2->id);
        $obj5 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '5', paiId: $obj1->id);
        $obj6 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '6', paiId: $obj5->id);
        $obj7 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '7', paiId: $obj5->id);
        $obj8 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '8', paiId: $obj7->id);
        $obj9 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '9', paiId: $obj7->id);
        $obj10 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '10', paiId: $obj7->id);
        $obj11 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '11', paiId: $obj1->id);
        $obj12 = criarObjetivo($base['planejamento']->id, $base['eixo']->id, '12', paiId: $obj1->id);

        foreach ([$obj1, $obj2, $obj3, $obj4, $obj5, $obj6, $obj7, $obj8, $obj9, $obj10] as $obj) {
            vincularEntregaComEsforco($obj, $base, $this->usuario, diasPlano: 7);
        }

        // Primeira chamada — popula cache
        $response1 = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj1->id}/esforco-total");
        $response1->assertStatus(200);
        $expected = $response1->json('data');

        // Marcar nós no cache com prefixo "cached-" no nome (reconstruct pois é readonly)
        $allIds = [$obj1, $obj2, $obj3, $obj4, $obj5, $obj6, $obj7, $obj8, $obj9, $obj10, $obj11, $obj12];
        marcarNosComPrefixoCached($allIds);

        // Flush nós 2 e 7 (intermediários)
        \Illuminate\Support\Facades\Cache::tags('esforco-total')->forget("esforco-total:node:{$obj2->id}");
        \Illuminate\Support\Facades\Cache::tags('esforco-total')->forget("esforco-total:node:{$obj7->id}");
        \Illuminate\Support\Facades\Cache::tags('esforco-total')->forget("esforco-total:node:{$obj11->id}");

        // Segunda chamada — partial rebuild
        $response2 = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj1->id}/esforco-total");
        $response2->assertStatus(200);
        $actual = $response2->json('data');

        // Nós que vieram do cache devem ter prefixo "cached-"
        expect($actual[$obj1->id]['objetivo_nome'])->toBe('cached-1');   // cache hit
        expect($actual[$obj5->id]['objetivo_nome'])->toBe('cached-5');   // cache hit
        expect($actual[$obj6->id]['objetivo_nome'])->toBe('cached-6');   // cache hit
        expect($actual[$obj12->id]['objetivo_nome'])->toBe('cached-12');   // cache hit

        // Nós 2, 7, 11 foram rebuilt (sem prefixo) — vieram frescos do DB
        expect($actual[$obj2->id]['objetivo_nome'])->toBe('2');          // rebuilt
        expect($actual[$obj7->id]['objetivo_nome'])->toBe('7');          // rebuilt
        expect($actual[$obj11->id]['objetivo_nome'])->toBe('11');          // rebuilt

        // Filhos de nós rebuilt também são frescos (CTE descende deles)
        expect($actual[$obj3->id]['objetivo_nome'])->toBe('3');          // rebuilt (filho de 2)
        expect($actual[$obj4->id]['objetivo_nome'])->toBe('4');          // rebuilt (filho de 2)
        expect($actual[$obj8->id]['objetivo_nome'])->toBe('8');          // rebuilt (filho de 7)
        expect($actual[$obj9->id]['objetivo_nome'])->toBe('9');          // rebuilt (filho de 7)
        expect($actual[$obj10->id]['objetivo_nome'])->toBe('10');        // rebuilt (filho de 7)

        // Totais devem ser idênticos ao original (re-acumulados)
        expect($actual[$obj1->id]['esforco_total_horas'])->toEqual($expected[$obj1->id]['esforco_total_horas']);
    });
});

// ── Entregas ────────────────────────────────────────────────────────

describe('GET /api/v2/planejamento/objetivo/{id}/entregas', function () {

    test('retorna 404 para objetivo inexistente', function () {
        $this->getJson('/api/__tests/v2/planejamento/objetivo/' . Str::uuid()->toString() . '/entregas')
            ->assertStatus(404);
    });

    test('retorna lista vazia quando objetivo não tem entregas', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Sem Entregas');

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/entregas");

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data', []);
    });

    test('retorna entregas agrupadas por unidade', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Com Entregas');

        // Criar 2 entregas na mesma unidade
        $entrega1 = PlanoEntregaEntrega::factory()->create([
            'plano_entrega_id' => $base['planoEntrega']->id,
            'entrega_id' => $base['entrega']->id,
            'unidade_id' => $base['unidade']->id,
            'descricao_entrega' => 'Entrega Alpha',
        ]);
        $entrega2 = PlanoEntregaEntrega::factory()->create([
            'plano_entrega_id' => $base['planoEntrega']->id,
            'entrega_id' => $base['entrega']->id,
            'unidade_id' => $base['unidade']->id,
            'descricao_entrega' => 'Entrega Beta',
        ]);

        PlanoEntregaEntregaObjetivo::create([
            'id' => Str::uuid()->toString(),
            'planejamento_objetivo_id' => $obj->id,
            'entrega_id' => $entrega1->id,
        ]);
        PlanoEntregaEntregaObjetivo::create([
            'id' => Str::uuid()->toString(),
            'planejamento_objetivo_id' => $obj->id,
            'entrega_id' => $entrega2->id,
        ]);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/entregas");
        $response->assertStatus(200);

        $data = $response->json('data');

        // 1 grupo (mesma unidade)
        expect($data)->toHaveCount(1);
        expect($data[0]['unidade_id'])->toBe($base['unidade']->id);
        expect($data[0]['unidade_nome'])->not->toBeEmpty();
        expect($data[0]['entregas'])->toHaveCount(2);
    });

    test('agrupa entregas de unidades diferentes', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Multi Unidade');

        $outraUnidade = \App\Models\Unidade::factory()->create();

        $entrega1 = PlanoEntregaEntrega::factory()->create([
            'plano_entrega_id' => $base['planoEntrega']->id,
            'entrega_id' => $base['entrega']->id,
            'unidade_id' => $base['unidade']->id,
            'descricao_entrega' => 'Entrega Unidade A',
        ]);
        $entrega2 = PlanoEntregaEntrega::factory()->create([
            'plano_entrega_id' => $base['planoEntrega']->id,
            'entrega_id' => $base['entrega']->id,
            'unidade_id' => $outraUnidade->id,
            'descricao_entrega' => 'Entrega Unidade B',
        ]);

        PlanoEntregaEntregaObjetivo::create([
            'id' => Str::uuid()->toString(),
            'planejamento_objetivo_id' => $obj->id,
            'entrega_id' => $entrega1->id,
        ]);
        PlanoEntregaEntregaObjetivo::create([
            'id' => Str::uuid()->toString(),
            'planejamento_objetivo_id' => $obj->id,
            'entrega_id' => $entrega2->id,
        ]);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/entregas");
        $response->assertStatus(200);

        $data = $response->json('data');

        // 2 grupos (unidades diferentes)
        expect($data)->toHaveCount(2);

        $unidadeIds = array_column($data, 'unidade_id');
        expect($unidadeIds)->toContain($base['unidade']->id);
        expect($unidadeIds)->toContain($outraUnidade->id);
    });
});
