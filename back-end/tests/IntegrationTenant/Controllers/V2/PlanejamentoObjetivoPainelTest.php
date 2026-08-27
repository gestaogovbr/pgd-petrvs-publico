<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoEntregaEntregaProgresso;
use App\Models\PlanoTrabalho;
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

    // Os describes do EsforcoTotalTest são carregados via require_once e executam também
    // sob este arquivo; sem estas rotas eles falhariam com 404.
    if (!Route::has('__tests.v2.objetivo.esforco-total')) {
        Route::middleware(['api'])->group(function () {
            Route::get('/api/__tests/v2/planejamento/objetivo/{id}/esforco-total', [PlanejamentoObjetivoController::class, 'esforcoTotal'])
                ->whereUuid('id')
                ->name('__tests.v2.objetivo.esforco-total');
            Route::get('/api/__tests/v2/planejamento/objetivo/{id}/entregas', [PlanejamentoObjetivoController::class, 'entregas'])
                ->whereUuid('id')
                ->name('__tests.v2.objetivo.entregas');
            Route::get('/api/__tests/v2/planejamento/objetivo/{id}/equipes', [PlanejamentoObjetivoController::class, 'equipes'])
                ->whereUuid('id')
                ->name('__tests.v2.objetivo.equipes');
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
            ->assertJsonPath('data.item.entregas.total_entregas', 0)
            ->assertJsonPath('data.item.pessoas.total_participantes', 0)
            ->assertJsonPath('data.consolidado.entregas.total_entregas', 0)
            ->assertJsonPath('data.consolidado.pessoas.total_participantes', 0)
            ->assertJsonPath('data.filtro_unidades', []);
    });

    test('retorna esforço e participantes com PT concluído vinculado', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo com PT');
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasUteis: 7, forcaTrabalho: 100.0);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/painel-resumo");
        $response->assertStatus(200)
            ->assertJsonPath('data.item.entregas.total_entregas', 1)
            ->assertJsonPath('data.item.pessoas.total_participantes', 1)
            ->assertJsonPath('data.item.esforco.mostrar_disponivel', true);

        // CHD do PT (8h/dia na factory) × 7 dias úteis = 56h
        expect((float) $response->json('data.item.esforco.disponivel_horas'))->toEqual(56.0);
        expect($response->json('data.filtro_unidades'))->toHaveCount(1);
    });

    test('usa a CHD do PT no esforço disponível, com fallback de 8h quando zerada', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo CHD');
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasUteis: 7, forcaTrabalho: 100.0);

        $pt = PlanoTrabalho::query()->firstOrFail();

        // CHD do PT = 6h/dia → 6 × 7 dias úteis = 42h (independente do cod_jornada do usuário, que é 40)
        $pt->update(['carga_horaria' => 6]);
        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/painel-resumo");
        expect((float) $response->json('data.item.esforco.disponivel_horas'))->toEqual(42.0);

        // carga_horaria zerada → fallback 8h/dia → 8 × 7 dias úteis = 56h
        $pt->update(['carga_horaria' => 0]);
        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/painel-resumo");
        expect((float) $response->json('data.item.esforco.disponivel_horas'))->toEqual(56.0);
    });

    test('consolidado soma o item selecionado e os subordinados, sem incluir ancestrais', function () {
        $base = criarEstruturaBase();
        $objPai = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Pai');
        $objFilho = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Filho', paiId: $objPai->id);
        $objNeto = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Neto', superiorId: $objFilho->id);

        $usuario2 = Usuario::factory()->create(['cod_jornada' => 40, 'participa_pgd' => 'sim']);
        $usuario3 = Usuario::factory()->create(['cod_jornada' => 40, 'participa_pgd' => 'sim']);

        vincularEntregaComEsforco($objPai, $base, $this->usuario, diasUteis: 7, forcaTrabalho: 100.0);
        vincularEntregaComEsforco($objFilho, $base, $usuario2, diasUteis: 7, forcaTrabalho: 100.0);
        vincularEntregaComEsforco($objNeto, $base, $usuario3, diasUteis: 7, forcaTrabalho: 100.0);

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objFilho->id}/painel-resumo");
        $response->assertStatus(200)
            // Item selecionado: só o Filho
            ->assertJsonPath('data.item.entregas.total_entregas', 1)
            ->assertJsonPath('data.item.pessoas.total_participantes', 1)
            // Consolidado: Filho + Neto (descendente via objetivo_superior_id); Pai fica de fora
            ->assertJsonPath('data.consolidado.entregas.total_entregas', 2)
            ->assertJsonPath('data.consolidado.pessoas.total_participantes', 2);

        expect((float) $response->json('data.item.esforco.disponivel_horas'))->toEqual(56.0)
            ->and((float) $response->json('data.consolidado.esforco.disponivel_horas'))->toEqual(112.0);
    });

    test('participante em PTs de mais de um objetivo conta uma única vez no consolidado', function () {
        $base = criarEstruturaBase();
        $objPai = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Pai');
        $objFilho = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Filho', paiId: $objPai->id);

        vincularEntregaComEsforco($objPai, $base, $this->usuario, diasUteis: 7, forcaTrabalho: 100.0);
        vincularEntregaComEsforco($objFilho, $base, $this->usuario, diasUteis: 7, forcaTrabalho: 100.0);

        $this->getJson("/api/__tests/v2/planejamento/objetivo/{$objPai->id}/painel-resumo")
            ->assertStatus(200)
            ->assertJsonPath('data.consolidado.entregas.total_entregas', 2)
            ->assertJsonPath('data.consolidado.pessoas.total_participantes', 1);
    });

    test('entrega concluída só conta em plano de entregas AVALIADO', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo conclusão');
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasUteis: 7, forcaTrabalho: 100.0);

        $entrega = PlanoEntregaEntrega::query()->firstOrFail();
        $entrega->update(['progresso_realizado' => 100]);

        // PE não avaliado: entrega 100% não conta como concluída
        $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/painel-resumo")
            ->assertStatus(200)
            ->assertJsonPath('data.item.entregas.total_entregas', 1)
            ->assertJsonPath('data.item.entregas.total_entregas_avaliadas', 0)
            ->assertJsonPath('data.item.entregas.entregas_concluidas', 0);

        // PE avaliado: entrega conta como concluída e percentual usa base de avaliadas
        // ('status' não é fillable; saveQuietly evita observers de envio ao PGD)
        $base['planoEntrega']->forceFill(['status' => 'AVALIADO'])->saveQuietly();

        $response = $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/painel-resumo");
        $response->assertStatus(200)
            ->assertJsonPath('data.item.entregas.total_entregas', 1)
            ->assertJsonPath('data.item.entregas.total_entregas_avaliadas', 1)
            ->assertJsonPath('data.item.entregas.entregas_concluidas', 1);

        expect((float) $response->json('data.item.entregas.percentual_concluidas'))->toEqual(100.0);
    });

    test('filtra resumo por unidade', function () {
        $base = criarEstruturaBase();
        $obj = criarObjetivo($base['planejamento']->id, $base['eixo']->id, 'Objetivo filtro unidade');
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasUteis: 7, forcaTrabalho: 100.0);

        $unidadeId = $base['unidade']->id;

        $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/painel-resumo?unidade_id={$unidadeId}")
            ->assertStatus(200)
            ->assertJsonPath('data.item.entregas.total_entregas', 1);

        $this->getJson("/api/__tests/v2/planejamento/objetivo/{$obj->id}/painel-resumo?unidade_id=" . Str::uuid()->toString())
            ->assertStatus(200)
            ->assertJsonPath('data.item.entregas.total_entregas', 0);
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
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasUteis: 7, forcaTrabalho: 100.0);

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
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasUteis: 7, forcaTrabalho: 100.0);

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
        vincularEntregaComEsforco($obj, $base, $this->usuario, diasUteis: 7, forcaTrabalho: 60.0);

        $pte = PlanoTrabalhoEntrega::query()->firstOrFail();
        expect((float) $pte->esforco_executado)->toEqual((float) $pte->forca_trabalho);
    });
});
