<?php

use App\Models\HistoricoExecutoraUnidade;
use App\Models\Unidade;
use App\Services\UnidadeExecutoraHistoricoService;
use Illuminate\Support\Facades\DB;

test('issue 2742 - registrar criacao cria periodo aberto e permite ler via model', function () {
    $unidade = Unidade::factory()->create(['executora' => true]);

    app(UnidadeExecutoraHistoricoService::class)->registrarCriacao($unidade);

    expect(HistoricoExecutoraUnidade::where('unidade_id', $unidade->id)->count())->toBe(1);

    $periodo = HistoricoExecutoraUnidade::where('unidade_id', $unidade->id)->first();
    expect($periodo->executora)->toBeTrue()
        ->and($periodo->data_fim)->toBeNull();
});

test('issue 2742 - alternar flag executora encerra periodo aberto e cria novo periodo', function () {
    $unidade = Unidade::factory()->create(['executora' => true]);
    $service = app(UnidadeExecutoraHistoricoService::class);
    $service->registrarCriacao($unidade);

    $dataInicioNovo = now()->toDateString();
    $dataFimAnterior = now()->subDay()->toDateString();

    $unidade->forceFill(['executora' => false])->save();
    $service->registrarAlteracaoExecutora($unidade, true, $dataInicioNovo, $dataFimAnterior);

    $historicos = DB::table('unidades_executora_historico')
        ->where('unidade_id', $unidade->id)
        ->get();

    expect($historicos)->toHaveCount(2);

    $periodoEncerrado = $historicos->first(fn ($historico) => $historico->data_fim !== null);
    $periodoAberto = $historicos->first(fn ($historico) => $historico->data_fim === null);

    expect($periodoEncerrado->executora)->toBe(1)
        ->and($periodoEncerrado->data_fim)->toBe($dataFimAnterior)
        ->and($periodoAberto->executora)->toBe(0)
        ->and($periodoAberto->data_inicio)->toBe($dataInicioNovo)
        ->and($periodoAberto->data_fim)->toBeNull();
});

test('issue 2742 - alternar flag executora nao cria novo periodo quando o valor nao muda', function () {
    $unidade = Unidade::factory()->create(['executora' => true]);
    $service = app(UnidadeExecutoraHistoricoService::class);
    $service->registrarCriacao($unidade);

    $service->registrarAlteracaoExecutora($unidade, true, '2026-10-28', '2026-10-27');

    expect(HistoricoExecutoraUnidade::where('unidade_id', $unidade->id)->count())->toBe(1)
        ->and(HistoricoExecutoraUnidade::where('unidade_id', $unidade->id)->first()->data_fim)->toBeNull();
});
