<?php

use App\Enums\StatusEnum;
use App\Models\PlanoEntrega;
use App\Models\Unidade;
use App\Repository\RelatorioPlanoEntregaLacuna\Eloquent\EloquentRelatorioPlanoEntregaLacunaReadRepository;
use App\V2\RelatorioPlanoEntregaLacuna\DTOs\RelatorioPlanoEntregaLacunaFiltersDTO;
use App\V2\RelatorioPlanoEntregaLacuna\DTOs\RelatorioPlanoEntregaLacunaQueryDTO;
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

function relatorioLacunaQueryDto(string $unidadeId, array $extra = []): RelatorioPlanoEntregaLacunaQueryDTO
{
    $filtersExtra = $extra['filters'] ?? [];

    return new RelatorioPlanoEntregaLacunaQueryDTO(
        page: $extra['page'] ?? 1,
        limit: $extra['limit'] ?? 50,
        filters: new RelatorioPlanoEntregaLacunaFiltersDTO(
            unidadeId: $unidadeId,
            incluirUnidadesSubordinadas: (bool) ($filtersExtra['incluirUnidadesSubordinadas'] ?? false),
            periodoInicio: $filtersExtra['periodoInicio'] ?? '2026-01-05',
            periodoFim: $filtersExtra['periodoFim'] ?? '2026-01-09',
            unidadeHierarquia: $filtersExtra['unidadeHierarquia'] ?? null,
            nome: $filtersExtra['nome'] ?? null,
            codigo: $filtersExtra['codigo'] ?? null,
            lacuna: $filtersExtra['lacuna'] ?? null,
            quantidadeDias: $filtersExtra['quantidadeDias'] ?? null,
        ),
        orderBy: $extra['orderBy'] ?? RelatorioPlanoEntregaLacunaQueryDTO::ORDEM_PADRAO,
    );
}

function relatorioLacunaTornarExecutora(Unidade $unidade, string $inicio = '2026-01-01', ?string $fim = null): void
{
    DB::table('unidades_executora_historico')->where('unidade_id', $unidade->id)->delete();

    DB::table('unidades_executora_historico')->insert([
        'id' => (string) \Illuminate\Support\Str::uuid(),
        'unidade_id' => $unidade->id,
        'executora' => 1,
        'data_inicio' => $inicio,
        'data_fim' => $fim,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
}

test('ignora unidade que nao era executora no periodo consultado', function () {
    $unidade = Unidade::factory()->create(['executora' => false]);

    $result = $this->repository->query(relatorioLacunaQueryDto($unidade->id));

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

    $result = $this->repository->query(relatorioLacunaQueryDto($unidade->id));

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

    $pagina1 = $this->repository->query(relatorioLacunaQueryDto($pai->id, [
        'page' => 1,
        'limit' => 1,
        'filters' => [
            'incluirUnidadesSubordinadas' => true,
        ],
    ]));

    $pagina2 = $this->repository->query(relatorioLacunaQueryDto($pai->id, [
        'page' => 2,
        'limit' => 1,
        'filters' => [
            'incluirUnidadesSubordinadas' => true,
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

    $result = $this->repository->query(relatorioLacunaQueryDto($unidadeAlvo->id, [
        'filters' => [
            'incluirUnidadesSubordinadas' => true,
            'nome' => 'Alvo Relatorio Lacuna',
        ],
    ]));

    expect($result['count'])->toBe(1)
        ->and($result['rows'])->toHaveCount(1)
        ->and($result['rows']->first()->nome)->toBe('Alvo Relatorio Lacuna');
});
