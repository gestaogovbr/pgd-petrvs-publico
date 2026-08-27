<?php

namespace Tests\IntegrationTenant\DataProviders\Adesao;

use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\PainelGerencial\Adesao\DataProviders\EvolucaoAdesaoParticipantesDataProvider;
use App\V2\PainelGerencial\Adesao\DataProviders\EvolucaoAdesaoUnidadesDataProvider;
use App\V2\PainelGerencial\Adesao\DataProviders\ParticipantesPGDDataProvider;
use App\V2\PainelGerencial\Adesao\DataProviders\UnidadesExecutorasDataProvider;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

beforeEach(function () {
    if (!Schema::hasTable('serie_unidades_executoras')) {
        $this->artisan('migrate', [
            '--path' => 'database/migrations/tenant/2026_07_17_100000_create_serie_adesao_tables.php',
            '--realpath' => false,
        ]);
    }

    $this->unidadePai = Unidade::factory()->create(['executora' => true]);
    $this->filhaExec = Unidade::factory()->create([
        'unidade_pai_id' => $this->unidadePai->id,
        'executora' => true,
    ]);
    $this->filhaNaoExec = Unidade::factory()->create([
        'unidade_pai_id' => $this->unidadePai->id,
        'executora' => false,
    ]);

    $this->filtros = new FiltrosPainelDTO(
        tipoConsulta: 'situacao_atual',
        unidadeId: $this->unidadePai->id,
        dataInicio: null,
        dataFim: null,
    );

    $this->inserirSerieUnidades = function (Unidade $unidade, string $periodo, int $exec, int $naoExec) {
        DB::table('serie_unidades_executoras')->insert([
            'id' => Str::uuid()->toString(),
            'unidade_id' => $unidade->id,
            'unidade_sigla' => $unidade->sigla,
            'unidade_pai_id' => $unidade->unidade_pai_id,
            'periodo' => $periodo,
            'executoras_qtd' => $exec,
            'nao_executoras_qtd' => $naoExec,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    };

    $this->inserirSerieParticipantes = function (Unidade $unidade, string $periodo, int $part, int $naoPart) {
        DB::table('serie_participantes_pgd')->insert([
            'id' => Str::uuid()->toString(),
            'unidade_id' => $unidade->id,
            'unidade_sigla' => $unidade->sigla,
            'unidade_pai_id' => $unidade->unidade_pai_id,
            'periodo' => $periodo,
            'participantes_qtd' => $part,
            'nao_participantes_qtd' => $naoPart,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    };
});

describe('UnidadesExecutorasDataProvider', function () {

    test('retorna distribuição de unidades executoras e não executoras', function () {
        $provider = app(UnidadesExecutorasDataProvider::class);

        $resultado = $provider->getData($this->filtros);

        expect($resultado->segmentos)->toBe(['Executoras', 'Não Executoras']);
        expect($resultado->distribuicoes)->toHaveCount(3);

        $principal = $resultado->distribuicoes[0];
        expect($principal->unidadeId)->toBe($this->unidadePai->id);
        expect($principal->valores[0])->toBe(2);
        expect($principal->valores[1])->toBe(1);
        expect($principal->total)->toBe(3);
    });

    test('consolida subordinadas recursivas para cada filha', function () {
        Unidade::factory()->create([
            'unidade_pai_id' => $this->filhaExec->id,
            'executora' => true,
        ]);

        $provider = app(UnidadesExecutorasDataProvider::class);
        $resultado = $provider->getData($this->filtros);

        $principal = $resultado->distribuicoes[0];
        expect($principal->valores[0])->toBe(3);
        expect($principal->total)->toBe(4);

        $distFilhaExec = collect($resultado->distribuicoes)->first(fn ($d) => $d->unidadeId === $this->filhaExec->id);
        expect($distFilhaExec->valores[0])->toBe(2);
        expect($distFilhaExec->total)->toBe(2);
    });

    test('ordena subordinadas por total decrescente', function () {
        Unidade::factory()->count(3)->create([
            'unidade_pai_id' => $this->filhaNaoExec->id,
            'executora' => true,
        ]);

        $provider = app(UnidadesExecutorasDataProvider::class);
        $resultado = $provider->getData($this->filtros);

        $subordinadas = array_slice($resultado->distribuicoes, 1);
        expect($subordinadas[0]->total)->toBeGreaterThanOrEqual($subordinadas[1]->total);
    });
});

describe('ParticipantesPGDDataProvider', function () {

    test('retorna distribuição de participantes e não participantes', function () {
        $participante = Usuario::factory()->create(['participa_pgd' => 'sim']);
        $naoParticipante = Usuario::factory()->create(['participa_pgd' => 'não']);

        UnidadeIntegranteAtribuicao::factory()->lotado()
            ->paraUsuarioUnidade($participante->id, $this->unidadePai->id)->create();
        UnidadeIntegranteAtribuicao::factory()->lotado()
            ->paraUsuarioUnidade($naoParticipante->id, $this->unidadePai->id)->create();

        $provider = app(ParticipantesPGDDataProvider::class);
        $resultado = $provider->getData($this->filtros);

        expect($resultado->segmentos)->toBe(['Participantes', 'Não Participantes']);

        $principal = $resultado->distribuicoes[0];
        expect($principal->unidadeId)->toBe($this->unidadePai->id);
        expect($principal->valores[0])->toBe(1);
        expect($principal->valores[1])->toBe(1);
        expect($principal->total)->toBe(2);
    });

    test('consolida participantes de subordinadas recursivas', function () {
        $participante = Usuario::factory()->create(['participa_pgd' => 'sim']);
        UnidadeIntegranteAtribuicao::factory()->lotado()
            ->paraUsuarioUnidade($participante->id, $this->filhaExec->id)->create();

        $provider = app(ParticipantesPGDDataProvider::class);
        $resultado = $provider->getData($this->filtros);

        $principal = $resultado->distribuicoes[0];
        expect($principal->valores[0])->toBe(1);
        expect($principal->total)->toBe(1);
    });

    test('considera apenas atribuições LOTADO e COLABORADOR', function () {
        $participante = Usuario::factory()->create(['participa_pgd' => 'sim']);

        UnidadeIntegranteAtribuicao::factory()
            ->paraUsuarioUnidade($participante->id, $this->unidadePai->id)
            ->create(['atribuicao' => 'GESTOR_SUBSTITUTO']);

        $provider = app(ParticipantesPGDDataProvider::class);
        $resultado = $provider->getData($this->filtros);

        $principal = $resultado->distribuicoes[0];
        expect($principal->total)->toBe(0);
    });
});

describe('EvolucaoAdesaoUnidadesDataProvider', function () {

    test('retorna série histórica de unidades executoras', function () {
        ($this->inserirSerieUnidades)($this->unidadePai, '2026-01', 5, 2);
        ($this->inserirSerieUnidades)($this->unidadePai, '2026-02', 6, 1);

        $filtros = new FiltrosPainelDTO(
            tipoConsulta: 'historico',
            unidadeId: $this->unidadePai->id,
            dataInicio: '2026-01-01',
            dataFim: '2026-02-28',
        );

        $provider = app(EvolucaoAdesaoUnidadesDataProvider::class);
        $resultado = $provider->getData($filtros);

        expect($resultado)->toHaveKey('serie');
        expect($resultado['serie'])->toHaveCount(2);
        expect($resultado['serie'][0]['periodo'])->toBe('2026-01');
        expect($resultado['serie'][0]['executoras'])->toBe(5);
        expect($resultado['serie'][0]['nao_executoras'])->toBe(2);
        expect($resultado['serie'][1]['periodo'])->toBe('2026-02');
        expect($resultado['serie'][1]['executoras'])->toBe(6);
    });

    test('retorna zeros para períodos sem dados na série', function () {
        ($this->inserirSerieUnidades)($this->unidadePai, '2026-01', 5, 2);

        $filtros = new FiltrosPainelDTO(
            tipoConsulta: 'historico',
            unidadeId: $this->unidadePai->id,
            dataInicio: '2026-01-01',
            dataFim: '2026-03-31',
        );

        $provider = app(EvolucaoAdesaoUnidadesDataProvider::class);
        $resultado = $provider->getData($filtros);

        expect($resultado['serie'])->toHaveCount(3);
        expect($resultado['serie'][1]['executoras'])->toBe(0);
        expect($resultado['serie'][2]['executoras'])->toBe(0);
    });

    test('soma dados de subordinadas na série', function () {
        ($this->inserirSerieUnidades)($this->unidadePai, '2026-03', 3, 1);
        ($this->inserirSerieUnidades)($this->filhaExec, '2026-03', 2, 0);

        $filtros = new FiltrosPainelDTO(
            tipoConsulta: 'historico',
            unidadeId: $this->unidadePai->id,
            dataInicio: '2026-03-01',
            dataFim: '2026-03-31',
        );

        $provider = app(EvolucaoAdesaoUnidadesDataProvider::class);
        $resultado = $provider->getData($filtros);

        $march = collect($resultado['serie'])->firstWhere('periodo', '2026-03');
        expect($march['executoras'])->toBe(5);
        expect($march['nao_executoras'])->toBe(1);
    });

    test('getPeriodosDisponiveis retorna períodos distintos ordenados', function () {
        ($this->inserirSerieUnidades)($this->unidadePai, '2026-03', 1, 1);
        ($this->inserirSerieUnidades)($this->unidadePai, '2026-01', 1, 1);
        ($this->inserirSerieUnidades)($this->filhaExec, '2026-01', 1, 1);

        $provider = app(EvolucaoAdesaoUnidadesDataProvider::class);
        $periodos = $provider->getPeriodosDisponiveis();

        expect($periodos)->toBe(['2026-01', '2026-03']);
    });
});

describe('EvolucaoAdesaoParticipantesDataProvider', function () {

    test('retorna série histórica de participantes PGD', function () {
        ($this->inserirSerieParticipantes)($this->unidadePai, '2026-01', 10, 5);
        ($this->inserirSerieParticipantes)($this->unidadePai, '2026-02', 12, 3);

        $filtros = new FiltrosPainelDTO(
            tipoConsulta: 'historico',
            unidadeId: $this->unidadePai->id,
            dataInicio: '2026-01-01',
            dataFim: '2026-02-28',
        );

        $provider = app(EvolucaoAdesaoParticipantesDataProvider::class);
        $resultado = $provider->getData($filtros);

        expect($resultado)->toHaveKey('serie');
        expect($resultado['serie'])->toHaveCount(2);
        expect($resultado['serie'][0]['participantes'])->toBe(10);
        expect($resultado['serie'][0]['nao_participantes'])->toBe(5);
        expect($resultado['serie'][1]['participantes'])->toBe(12);
    });

    test('soma dados de subordinadas na série de participantes', function () {
        ($this->inserirSerieParticipantes)($this->unidadePai, '2026-04', 8, 2);
        ($this->inserirSerieParticipantes)($this->filhaExec, '2026-04', 5, 3);

        $filtros = new FiltrosPainelDTO(
            tipoConsulta: 'historico',
            unidadeId: $this->unidadePai->id,
            dataInicio: '2026-04-01',
            dataFim: '2026-04-30',
        );

        $provider = app(EvolucaoAdesaoParticipantesDataProvider::class);
        $resultado = $provider->getData($filtros);

        $april = collect($resultado['serie'])->firstWhere('periodo', '2026-04');
        expect($april['participantes'])->toBe(13);
        expect($april['nao_participantes'])->toBe(5);
    });
});
