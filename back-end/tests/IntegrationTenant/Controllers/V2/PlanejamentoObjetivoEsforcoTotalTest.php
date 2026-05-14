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
     * Cenário: fechamento bidirecional incluindo Pai (ancestral), Filho (consultado) e Neto (descendente)
     *
     *  Pai (40h)
     *   └── Filho (40h)  ← consultado
     *        └── Neto (40h)
     */
    test('inclui ascendentes e descendentes via objetivo_pai_id (fechamento bidirecional)', function () {
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

        expect($data)->toHaveCount(3);
        expect($data)->toHaveKey($objPai->id);
        expect($data)->toHaveKey($objFilho->id);
        expect($data)->toHaveKey($objNeto->id);

        expect($data[$objPai->id]['esforco_total_horas'])->toEqual(120);
        expect($data[$objPai->id]['filhos_pai'])->toBe([$objFilho->id]);
        expect($data[$objPai->id]['filhos_superior'])->toBeEmpty();
        expect($data[$objPai->id]['objetivo_pai'])->toBeNull();

        expect($data[$objFilho->id]['esforco_total_horas'])->toEqual(80);
        expect($data[$objFilho->id]['filhos_pai'])->toBe([$objNeto->id]);
        expect($data[$objFilho->id]['objetivo_pai'])->toBe(['id' => $objPai->id, 'nome' => 'Pai']);

        expect($data[$objNeto->id]['esforco_total_horas'])->toEqual(40);
        expect($data[$objNeto->id]['filhos_pai'])->toBeEmpty();
        expect($data[$objNeto->id]['objetivo_pai'])->toBe(['id' => $objFilho->id, 'nome' => 'Filho']);
    });

    /**
     * Cenário: objetivo com objetivo_superior_id — superior também entra no fechamento
     */
    test('inclui o objetivo_superior no fechamento e o expõe em filhos_superior', function () {
        $base = criarEstruturaBase();

        $objSuperior = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Superior DTI');
        $objDep = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Dep', superiorId: $objSuperior->id);
        $objDepFilho = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Dep Filho', paiId: $objDep->id);

        vincularEntregaComEsforco($objDep, $base, $this->usuario, diasPlano: 7);
        vincularEntregaComEsforco($objDepFilho, $base, $this->usuario, diasPlano: 7);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objDep->id}/esforco-total");
        $response->assertStatus(200);

        $data = $response->json('data');

        expect($data)->toHaveCount(3);
        expect($data)->toHaveKey($objSuperior->id);
        expect($data)->toHaveKey($objDep->id);
        expect($data)->toHaveKey($objDepFilho->id);

        expect($data[$objSuperior->id]['filhos_superior'])->toBe([$objDep->id]);
        expect($data[$objSuperior->id]['filhos_pai'])->toBeEmpty();
        expect($data[$objSuperior->id]['esforco_total_horas'])->toEqual(80);

        expect($data[$objDep->id]['esforco_total_horas'])->toEqual(80);
        expect($data[$objDep->id]['filhos_pai'])->toBe([$objDepFilho->id]);
        expect($data[$objDep->id]['objetivo_superior'])->toBe(['id' => $objSuperior->id, 'nome' => 'Superior DTI']);
        expect($data[$objDep->id]['objetivo_pai'])->toBeNull();

        expect($data[$objDepFilho->id]['objetivo_pai'])->toBe(['id' => $objDep->id, 'nome' => 'Dep']);
    });

    /**
     * Cenário: filho com PAI e SUPERIOR aparece em ambas as listas de adjacência
     */
    test('separa filhos_pai e filhos_superior preservando a aresta dupla', function () {
        $base = criarEstruturaBase();

        $objSuperior = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Superior');
        $objPai = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Pai');
        $objAlvo = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Alvo', paiId: $objPai->id, superiorId: $objSuperior->id);

        vincularEntregaComEsforco($objAlvo, $base, $this->usuario, diasPlano: 7);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objAlvo->id}/esforco-total");
        $response->assertStatus(200);

        $data = $response->json('data');

        expect($data)->toHaveKey($objPai->id);
        expect($data)->toHaveKey($objSuperior->id);
        expect($data)->toHaveKey($objAlvo->id);

        expect($data[$objPai->id]['filhos_pai'])->toBe([$objAlvo->id]);
        expect($data[$objPai->id]['filhos_superior'])->toBeEmpty();
        expect($data[$objPai->id]['esforco_total_horas'])->toEqual(40);

        expect($data[$objSuperior->id]['filhos_superior'])->toBe([$objAlvo->id]);
        expect($data[$objSuperior->id]['filhos_pai'])->toBeEmpty();
        expect($data[$objSuperior->id]['esforco_total_horas'])->toEqual(40);

        expect($data[$objAlvo->id]['objetivo_pai'])->toBe(['id' => $objPai->id, 'nome' => 'Pai']);
        expect($data[$objAlvo->id]['objetivo_superior'])->toBe(['id' => $objSuperior->id, 'nome' => 'Superior']);
        expect($data[$objAlvo->id]['filhos'])->toBeEmpty();
    });

    /**
     * Cenário: ciclo via objetivo_pai_id não trava nem infla o esforço total
     */
    test('protege contra ciclos em objetivo_pai_id', function () {
        $base = criarEstruturaBase();

        $objA = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'A');
        $objB = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'B', paiId: $objA->id);
        $objA->objetivo_pai_id = $objB->id;
        $objA->save();

        vincularEntregaComEsforco($objA, $base, $this->usuario, diasPlano: 7);
        vincularEntregaComEsforco($objB, $base, $this->usuario, diasPlano: 7);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objA->id}/esforco-total");
        $response->assertStatus(200);

        $data = $response->json('data');

        expect($data)->toHaveCount(2);
        expect($data[$objA->id]['esforco_total_horas'])->toBeGreaterThanOrEqual(40.0);
        expect($data[$objA->id]['esforco_total_horas'])->toBeLessThanOrEqual(80.0);
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

    /**
     * Cenário: consulta partindo do neto inclui pai e avô (subida)
     */
    test('inclui ancestrais quando a consulta parte do neto', function () {
        $base = criarEstruturaBase();

        $objAvo = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Avô');
        $objPai = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Pai', paiId: $objAvo->id);
        $objNeto = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Neto', paiId: $objPai->id);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objNeto->id}/esforco-total");
        $response->assertStatus(200);

        $data = $response->json('data');

        expect($data)->toHaveCount(3);
        expect($data[$objNeto->id]['objetivo_pai'])->toBe(['id' => $objPai->id, 'nome' => 'Pai']);
        expect($data[$objPai->id]['objetivo_pai'])->toBe(['id' => $objAvo->id, 'nome' => 'Avô']);
        expect($data[$objAvo->id]['objetivo_pai'])->toBeNull();
    });
});

describe('GET /api/v2/planejamento/objetivo/{id}/entregas', function () {

    test('retorna 404 para objetivo inexistente', function () {
        $this->getJson('/api/__tests/v2/planejamento/objetivo/' . Str::uuid()->toString() . '/entregas')
            ->assertStatus(404);
    });

    test('retorna contagens zero quando não há vínculos', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Sem vínculos');

        $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/entregas")
            ->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.objetivo_id', $obj->id)
            ->assertJsonPath('data.total_entregas', 0);
    });

    test('lista entrega do plano de entregas com progresso e esforço por unidade (PT concluído)', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Com PT concluído');
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasPlano: 7, forcaTrabalho: 100.0);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/entregas");
        $response->assertStatus(200)
            ->assertJsonPath('data.total_entregas', 1);

        $itens = $response->json('data.itens');
        expect($itens)->toHaveCount(1);
        expect($itens[0])->toHaveKeys(['progresso_esperado', 'progresso_realizado', 'homologado', 'esforco_horas_total']);
        expect((float) $itens[0]['esforco_horas_total'])->toBeGreaterThan(0);

        $porUnidade = $response->json('data.esforco_por_unidade');
        expect($porUnidade)->toHaveCount(1);
        expect((float) $porUnidade[0]['esforco_horas_total'])->toBeGreaterThan(0);
    });

    test('lista entrega do PE mesmo sem PT concluído, com esforço zero e sem totais por unidade', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Só PT ativo');

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

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/entregas");
        $response->assertStatus(200)
            ->assertJsonPath('data.total_entregas', 1);

        $itens = $response->json('data.itens');
        expect($itens)->toHaveCount(1);
        expect((float) $itens[0]['esforco_horas_total'])->toEqual(0.0);

        expect($response->json('data.esforco_por_unidade'))->toBe([]);
    });
});
