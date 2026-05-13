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

        // Neto: 40, filhos = []
        expect($data[$objNeto->id]['esforco_total_horas'])->toEqual(40);
        expect($data[$objNeto->id]['filhos'])->toBeEmpty();
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
});
