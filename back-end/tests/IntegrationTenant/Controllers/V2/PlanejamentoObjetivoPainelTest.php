<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoEntregaEntregaProgresso;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Usuario;
use App\V2\Planejamento\Objetivo\PlanejamentoObjetivoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

require_once __DIR__ . '/PlanejamentoObjetivoEsforcoTotalTest.php';

beforeEach(function () {
    if (!Route::has('__tests.v2.objetivo.painel-resumo')) {
        Route::middleware(['api'])->group(function () {
            Route::get('/api/__tests/v2/planejamento/objetivo/{id}/painel-resumo', [PlanejamentoObjetivoController::class, 'painelResumo'])
                ->whereUuid('id')
                ->name('__tests.v2.objetivo.painel-resumo');
            Route::get('/api/__tests/v2/planejamento/objetivo/{id}/entregas-detalhamento', [PlanejamentoObjetivoController::class, 'entregasDetalhamento'])
                ->whereUuid('id')
                ->name('__tests.v2.objetivo.entregas-detalhamento');
        });
    }

    $this->usuario = Usuario::factory()->create([
        'cod_jornada' => 40,
        'participa_pgd' => 'sim',
    ]);

    $this->actingAs($this->usuario, 'web');
});

describe('GET /api/v2/planejamento/objetivo/{id}/painel-resumo', function () {

    test('retorna 404 para objetivo inexistente', function () {
        $this->getJson('/api/__tests/v2/planejamento/objetivo/' . Str::uuid()->toString() . '/painel-resumo')
            ->assertStatus(404);
    });

    test('retorna resumo com informações gerais e métricas zeradas sem vínculos', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo painel');

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/painel-resumo");
        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.objetivo_id', $obj->id)
            ->assertJsonPath('data.nome', 'Objetivo painel')
            ->assertJsonPath('data.planejamento_nome', 'Planejamento Teste')
            ->assertJsonPath('data.entregas.total_entregas', 0)
            ->assertJsonPath('data.pessoas.total_participantes', 0)
            ->assertJsonPath('data.filtro_unidades', []);
    });

    test('retorna esforço e participantes com PT concluído vinculado', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo com PT');
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasPlano: 7, forcaTrabalho: 100.0);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/painel-resumo");
        $response->assertStatus(200)
            ->assertJsonPath('data.entregas.total_entregas', 1)
            ->assertJsonPath('data.pessoas.total_participantes', 1)
            ->assertJsonPath('data.esforco.mostrar_disponivel', true);

        expect($response->json('data.filtro_unidades'))->toHaveCount(1);
    });

    test('filtra resumo por unidade', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo filtro unidade');
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasPlano: 7, forcaTrabalho: 100.0);

        $unidadeId = $base['unidade']->id;

        $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/painel-resumo?unidade_id={$unidadeId}")
            ->assertStatus(200)
            ->assertJsonPath('data.entregas.total_entregas', 1);

        $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/painel-resumo?unidade_id=" . Str::uuid()->toString())
            ->assertStatus(200)
            ->assertJsonPath('data.entregas.total_entregas', 0);
    });
});

describe('GET /api/v2/planejamento/objetivo/{id}/entregas-detalhamento', function () {

    test('retorna 404 para objetivo inexistente', function () {
        $this->getJson('/api/__tests/v2/planejamento/objetivo/' . Str::uuid()->toString() . '/entregas-detalhamento')
            ->assertStatus(404);
    });

    test('retorna detalhamento com filtros e linha da entrega', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo detalhe');
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasPlano: 7, forcaTrabalho: 100.0);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/entregas-detalhamento");
        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.objetivo_id', $obj->id);

        $itens = $response->json('data.itens');
        expect($itens)->toHaveCount(1);
        expect($itens[0])->toHaveKeys([
            'unidade_sigla',
            'plano_entrega_status',
            'entrega_titulo',
            'progresso_esperado',
            'progresso_realizado',
            'registro_execucao',
            'mostrar_disponivel',
        ]);
        expect($response->json('data.filtro_entregas'))->toHaveCount(1);
        expect($response->json('data.filtro_unidades'))->toHaveCount(1);
    });

    test('retorna progresso e registro_execucao do lançamento mais recente', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo progresso');
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasPlano: 7, forcaTrabalho: 100.0);

        $entrega = PlanoEntregaEntrega::query()->firstOrFail();
        $entrega->update([
            'progresso_esperado' => 10,
            'progresso_realizado' => 5,
            'homologado' => false,
        ]);

        PlanoEntregaEntregaProgresso::query()->create([
            'id' => Str::uuid()->toString(),
            'usuario_id' => $this->usuario->id,
            'plano_entrega_entrega_id' => $entrega->id,
            'data_progresso' => now()->subDay()->toDateString(),
            'data_inicio' => $entrega->data_inicio,
            'data_fim' => $entrega->data_fim,
            'homologado' => false,
            'meta' => $entrega->meta ?? [],
            'realizado' => $entrega->realizado,
            'progresso_esperado' => 50,
            'progresso_realizado' => 20,
            'registro_execucao' => 'Progresso antigo',
        ]);

        PlanoEntregaEntregaProgresso::query()->create([
            'id' => Str::uuid()->toString(),
            'usuario_id' => $this->usuario->id,
            'plano_entrega_entrega_id' => $entrega->id,
            'data_progresso' => now()->toDateString(),
            'data_inicio' => $entrega->data_inicio,
            'data_fim' => $entrega->data_fim,
            'homologado' => true,
            'meta' => $entrega->meta ?? [],
            'realizado' => $entrega->realizado,
            'progresso_esperado' => 80,
            'progresso_realizado' => 65,
            'registro_execucao' => 'Execução registrada no progresso mais recente',
        ]);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/entregas-detalhamento");
        $response->assertStatus(200);

        $item = $response->json('data.itens.0');
        expect((float) $item['progresso_esperado'])->toBe(80.0)
            ->and((float) $item['progresso_realizado'])->toBe(65.0)
            ->and($item['homologado'])->toBeTrue()
            ->and($item['registro_execucao'])->toBe('Execução registrada no progresso mais recente');
    });
});

describe('esforco_executado em planos_trabalhos_entregas', function () {

    test('padrão de esforco_executado igual ao planejado após criação', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo PT');
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasPlano: 7, forcaTrabalho: 60.0);

        $pte = PlanoTrabalhoEntrega::query()->firstOrFail();
        expect((float) $pte->esforco_executado)->toEqual((float) $pte->forca_trabalho);
    });
});
