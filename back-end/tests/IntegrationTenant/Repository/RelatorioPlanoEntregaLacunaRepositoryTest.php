<?php

use App\Enums\StatusEnum;
use App\Models\PlanoEntrega;
use App\Models\Unidade;
use App\Repository\RelatorioPlanoEntregaLacuna\Eloquent\EloquentRelatorioPlanoEntregaLacunaReadRepository;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

beforeEach(function () {
    Bus::fake();
    relatorioLacunaGarantirTabelaHistorico();
    $this->repository = app(EloquentRelatorioPlanoEntregaLacunaReadRepository::class);
});

function relatorioLacunaGarantirTabelaHistorico(): void
{
    if (Schema::hasTable('unidades_executora_historico')) {
        return;
    }

    Schema::create('unidades_executora_historico', function (Blueprint $table): void {
        $table->uuid('id')->primary();
        $table->uuid('unidade_id');
        $table->boolean('executora');
        $table->date('data_inicio');
        $table->date('data_fim')->nullable();
        $table->timestamps();
        $table->index(['unidade_id', 'data_inicio']);
    });
}

function relatorioLacunaPayload(string $unidadeId, array $extra = []): array
{
    return [
        'page' => $extra['page'] ?? 1,
        'limit' => $extra['limit'] ?? 50,
        'orderBy' => $extra['orderBy'] ?? [
            ['unidadeHierarquia', 'asc'],
            ['data_inicio', 'asc'],
        ],
        'where' => array_merge([
            ['unidade_id', '==', $unidadeId],
            ['periodo_inicio', '>=', '2026-01-05'],
            ['periodo_fim', '<=', '2026-01-09'],
        ], $extra['where'] ?? []),
    ];
}

function relatorioLacunaTornarExecutora(Unidade $unidade, string $inicio = '2026-01-01', ?string $fim = null): void
{
    DB::table('unidades_executora_historico')
        ->where('unidade_id', $unidade->id)
        ->update([
            'executora' => 1,
            'data_inicio' => $inicio,
            'data_fim' => $fim,
        ]);
}

test('ignora unidade que nao era executora no periodo consultado', function () {
    $unidade = Unidade::factory()->create(['executora' => false]);

    $result = $this->repository->query(relatorioLacunaPayload($unidade->id));

    expect($result['count'])->toBe(0)
        ->and($result['rows'])->toHaveCount(0);
});

test('nao gera lacuna quando plano avaliado cobre o periodo', function () {
    $unidade = Unidade::factory()->create(['executora' => true]);
    relatorioLacunaTornarExecutora($unidade);

    PlanoEntrega::factory()->create([
        'unidade_id' => $unidade->id,
        'status' => StatusEnum::AVALIADO->value,
        'data_inicio' => '2026-01-01',
        'data_fim' => '2026-01-31',
    ]);

    $result = $this->repository->query(relatorioLacunaPayload($unidade->id));

    expect($result['count'])->toBe(0)
        ->and($result['rows'])->toHaveCount(0);
});

test('paginacao incremental retorna so a pagina pedida e o total de lacunas', function () {
    $pai = Unidade::factory()->create(['executora' => true, 'nome' => 'Unidade Pai Lacuna']);
    $filhaA = Unidade::factory()->create([
        'executora' => true,
        'unidade_pai_id' => $pai->id,
        'nome' => 'Unidade Filha A Lacuna',
    ]);
    $filhaB = Unidade::factory()->create([
        'executora' => true,
        'unidade_pai_id' => $pai->id,
        'nome' => 'Unidade Filha B Lacuna',
    ]);

    foreach ([$pai, $filhaA, $filhaB] as $unidade) {
        relatorioLacunaTornarExecutora($unidade, '2026-01-01', '2026-01-31');
    }

    $pagina1 = $this->repository->query(relatorioLacunaPayload($pai->id, [
        'page' => 1,
        'limit' => 1,
        'where' => [
            ['incluir_unidades_subordinadas', '==', 1],
        ],
    ]));

    $pagina2 = $this->repository->query(relatorioLacunaPayload($pai->id, [
        'page' => 2,
        'limit' => 1,
        'where' => [
            ['incluir_unidades_subordinadas', '==', 1],
        ],
    ]));

    expect($pagina1['count'])->toBe(3)
        ->and($pagina1['rows'])->toHaveCount(1)
        ->and($pagina2['count'])->toBe(3)
        ->and($pagina2['rows'])->toHaveCount(1)
        ->and($pagina1['rows']->first()->id)->not->toBe($pagina2['rows']->first()->id);
});

test('filtro por nome reduz unidades antes do calculo', function () {
    $unidadeAlvo = Unidade::factory()->create(['executora' => true, 'nome' => 'Alvo Relatorio Lacuna']);
    $outra = Unidade::factory()->create([
        'executora' => true,
        'unidade_pai_id' => $unidadeAlvo->id,
        'nome' => 'Outra Unidade Sem Match',
    ]);

    relatorioLacunaTornarExecutora($unidadeAlvo, '2026-01-01', '2026-01-31');
    relatorioLacunaTornarExecutora($outra, '2026-01-01', '2026-01-31');

    $result = $this->repository->query(relatorioLacunaPayload($unidadeAlvo->id, [
        'where' => [
            ['incluir_unidades_subordinadas', '==', 1],
            ['nome', 'like', '%Alvo Relatorio Lacuna%'],
        ],
    ]));

    expect($result['count'])->toBe(1)
        ->and($result['rows'])->toHaveCount(1)
        ->and($result['rows']->first()->nome)->toBe('Alvo Relatorio Lacuna');
});
