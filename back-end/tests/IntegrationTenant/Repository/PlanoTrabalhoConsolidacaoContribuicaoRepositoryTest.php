<?php

namespace Tests\IntegrationTenant\Repository;

use App\Models\Entrega;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicaoRepository;
use Illuminate\Support\Carbon;

uses()->group('integration-tenant');

function criarConsolidacao(): PlanoTrabalhoConsolidacao
{
    $unidade = Unidade::factory()->create();
    $usuario = Usuario::factory()->create();
    $programa = Programa::factory()->create();
    $plano = PlanoTrabalho::factory()->create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'criacao_usuario_id' => $usuario->id,
        'programa_id' => $programa->id,
        'status' => 'ATIVO',
    ]);

    return PlanoTrabalhoConsolidacao::create([
        'plano_trabalho_id' => $plano->id,
        'data_inicio' => '2025-01-01',
        'data_fim' => '2025-01-31',
        'status' => 'INCLUIDO',
    ]);
}

function criarEntregaPE(Unidade $unidade = null): PlanoEntregaEntrega
{
    $unidade = $unidade ?? Unidade::factory()->create();
    $entregaCatalogo = Entrega::factory()->create(['unidade_id' => $unidade->id]);
    $planoEntrega = PlanoEntrega::factory()->create([
        'unidade_id' => $unidade->id,
        'criacao_usuario_id' => Usuario::factory()->create()->id,
    ]);

    return PlanoEntregaEntrega::factory()->create([
        'plano_entrega_id' => $planoEntrega->id,
        'entrega_id' => $entregaCatalogo->id,
        'unidade_id' => $unidade->id,
    ]);
}

test('create e findByConsolidacao retornam a contribuição persistida', function () {
    $repo = app(PlanoTrabalhoConsolidacaoContribuicaoRepository::class);
    $consolidacao = criarConsolidacao();
    $pee = criarEntregaPE();

    $repo->create([
        'plano_trabalho_consolidacao_id' => $consolidacao->id,
        'plano_entrega_entrega_id' => $pee->id,
        'orgao' => null,
        'descricao' => 'Trabalho',
        'esforco_executado' => 40,
    ]);

    $contribuicoes = $repo->findByConsolidacao($consolidacao->id);

    expect($contribuicoes)->toHaveCount(1);
    expect((float) $contribuicoes->first()->esforco_executado)->toBe(40.0);
});

test('totalEsforcoExecutadoPorConsolidacao soma os esforços do período', function () {
    $repo = app(PlanoTrabalhoConsolidacaoContribuicaoRepository::class);
    $consolidacao = criarConsolidacao();

    $repo->create(['plano_trabalho_consolidacao_id' => $consolidacao->id, 'descricao' => 'A', 'esforco_executado' => 60]);
    $repo->create(['plano_trabalho_consolidacao_id' => $consolidacao->id, 'descricao' => 'B', 'esforco_executado' => 40]);

    expect($repo->totalEsforcoExecutadoPorConsolidacao($consolidacao->id))->toBe(100.0);
});

test('possuiNaoRegistrada detecta contribuição sem registrado_at', function () {
    $repo = app(PlanoTrabalhoConsolidacaoContribuicaoRepository::class);
    $consolidacao = criarConsolidacao();

    $contribuicao = $repo->create([
        'plano_trabalho_consolidacao_id' => $consolidacao->id,
        'descricao' => 'A',
        'esforco_executado' => 100,
    ]);

    expect($repo->possuiNaoRegistrada($consolidacao->id))->toBeTrue();

    $repo->marcarRegistrado($contribuicao->id, Carbon::now());

    expect($repo->possuiNaoRegistrada($consolidacao->id))->toBeFalse();
});

test('marcarRegistrado não sobrescreve registrado_at já definido', function () {
    $repo = app(PlanoTrabalhoConsolidacaoContribuicaoRepository::class);
    $consolidacao = criarConsolidacao();

    $contribuicao = $repo->create([
        'plano_trabalho_consolidacao_id' => $consolidacao->id,
        'descricao' => 'A',
        'esforco_executado' => 100,
    ]);

    $primeiro = Carbon::parse('2025-02-01 10:00:00');
    $repo->marcarRegistrado($contribuicao->id, $primeiro);
    $repo->marcarRegistrado($contribuicao->id, Carbon::parse('2025-03-01 10:00:00'));

    $atual = $repo->findById($contribuicao->id);

    expect($atual->registrado_at->format('Y-m-d H:i:s'))->toBe('2025-02-01 10:00:00');
});

test('inserirEmLote insere múltiplas linhas sem eventos', function () {
    $repo = app(PlanoTrabalhoConsolidacaoContribuicaoRepository::class);
    $consolidacao = criarConsolidacao();
    $agora = Carbon::now();

    $repo->inserirEmLote([
        [
            'id' => (string) \Ramsey\Uuid\Uuid::uuid4(),
            'plano_trabalho_consolidacao_id' => $consolidacao->id,
            'plano_trabalho_entrega_id' => null,
            'plano_entrega_entrega_id' => null,
            'orgao' => null,
            'descricao' => null,
            'esforco_executado' => 50,
            'registrado_at' => null,
            'created_at' => $agora,
            'updated_at' => $agora,
        ],
    ]);

    expect($repo->findByConsolidacao($consolidacao->id))->toHaveCount(1);
});
