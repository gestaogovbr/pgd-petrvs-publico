<?php

namespace Tests\IntegrationTenant\Jobs;

use App\Jobs\ConsolidarSerieAdesao;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

beforeEach(function () {
    if (!Schema::hasTable('serie_unidades_executoras')) {
        $this->artisan('migrate', [
            '--path' => 'database/migrations/tenant/2026_07_17_100000_create_serie_adesao_tables.php',
            '--realpath' => false,
        ]);
    }

    if (!Schema::hasColumn('serie_unidades_executoras', 'unidade_nome')) {
        $this->artisan('migrate', [
            '--path' => 'database/migrations/tenant/2026_08_10_160000_add_unidade_nome_to_serie_adesao_tables.php',
            '--realpath' => false,
        ]);
    }

    $this->unidadePai = Unidade::factory()->create(['executora' => true]);
    $this->unidadeFilha = Unidade::factory()->create([
        'unidade_pai_id' => $this->unidadePai->id,
        'executora' => true,
    ]);
    $this->unidadeNaoExec = Unidade::factory()->create([
        'unidade_pai_id' => $this->unidadePai->id,
        'executora' => false,
    ]);
});

describe('ConsolidarSerieAdesao', function () {

    test('consolida unidades executoras para o período informado', function () {
        (new ConsolidarSerieAdesao(null, '2026-07'))->handle(app(\App\V2\PainelGerencial\Adesao\SerieAdesaoService::class));

        $registro = DB::table('serie_unidades_executoras')
            ->where('unidade_id', $this->unidadePai->id)
            ->where('periodo', '2026-07')
            ->first();

        expect($registro)->not->toBeNull();
        // Pai + 2 filhas = 3 unidades, 2 executoras (pai + filha), 1 não executora
        expect((int) $registro->executoras_qtd)->toBe(2);
        expect((int) $registro->nao_executoras_qtd)->toBe(1);
        expect($registro->unidade_sigla)->toBe($this->unidadePai->sigla);
    });

    test('consolida participantes PGD para o período informado', function () {
        $participante = Usuario::factory()->create(['participa_pgd' => 'sim']);
        $naoParticipante = Usuario::factory()->create(['participa_pgd' => 'não']);

        UnidadeIntegranteAtribuicao::factory()->lotado()
            ->paraUsuarioUnidade($participante->id, $this->unidadePai->id)->create();
        UnidadeIntegranteAtribuicao::factory()->lotado()
            ->paraUsuarioUnidade($naoParticipante->id, $this->unidadePai->id)->create();

        (new ConsolidarSerieAdesao(null, '2026-07'))->handle(app(\App\V2\PainelGerencial\Adesao\SerieAdesaoService::class));

        $registro = DB::table('serie_participantes_pgd')
            ->where('unidade_id', $this->unidadePai->id)
            ->where('periodo', '2026-07')
            ->first();

        expect($registro)->not->toBeNull();
        expect((int) $registro->participantes_qtd)->toBe(1);
        expect((int) $registro->nao_participantes_qtd)->toBe(1);
        expect($registro->unidade_sigla)->toBe($this->unidadePai->sigla);
    });

    test('usa período atual quando não informado', function () {
        (new ConsolidarSerieAdesao())->handle(app(\App\V2\PainelGerencial\Adesao\SerieAdesaoService::class));

        $periodo = now()->format('Y-m');
        $count = DB::table('serie_unidades_executoras')
            ->where('periodo', $periodo)
            ->count();

        expect($count)->toBeGreaterThan(0);
    });

    test('atualiza registro existente ao rodar novamente para o mesmo período', function () {
        (new ConsolidarSerieAdesao(null, '2026-07'))->handle(app(\App\V2\PainelGerencial\Adesao\SerieAdesaoService::class));

        // Muda o estado
        $this->unidadeNaoExec->update(['executora' => true]);

        (new ConsolidarSerieAdesao(null, '2026-07'))->handle(app(\App\V2\PainelGerencial\Adesao\SerieAdesaoService::class));

        $registro = DB::table('serie_unidades_executoras')
            ->where('unidade_id', $this->unidadePai->id)
            ->where('periodo', '2026-07')
            ->first();

        // Agora são 3 executoras, 0 não executoras
        expect((int) $registro->executoras_qtd)->toBe(3);
        expect((int) $registro->nao_executoras_qtd)->toBe(0);
    });

    test('persiste unidade_sigla e unidade_nome independente da unidade ser deletada depois', function () {
        (new ConsolidarSerieAdesao(null, '2026-07'))->handle(app(\App\V2\PainelGerencial\Adesao\SerieAdesaoService::class));

        $siglaOriginal = $this->unidadePai->sigla;
        $nomeOriginal = $this->unidadePai->nome;
        $this->unidadePai->delete();

        $registro = DB::table('serie_unidades_executoras')
            ->where('unidade_id', $this->unidadePai->id)
            ->where('periodo', '2026-07')
            ->first();

        expect($registro)->not->toBeNull();
        expect($registro->unidade_sigla)->toBe($siglaOriginal);
        expect($registro->unidade_nome)->toBe($nomeOriginal);
    });
});
