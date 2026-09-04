<?php

namespace Tests\IntegrationTenant\DataProviders\Adesao;

use App\Models\Unidade;
use App\V2\PainelGerencial\Adesao\DataProviders\UnidadesHistoricasDataProvider;
use App\V2\PainelGerencial\DTOs\UnidadeResumoDTO;
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

    if (!Schema::hasColumn('serie_unidades_executoras', 'unidade_nome')) {
        $this->artisan('migrate', [
            '--path' => 'database/migrations/tenant/2026_08_10_160000_add_unidade_nome_to_serie_adesao_tables.php',
            '--realpath' => false,
        ]);
    }
});

describe('UnidadesHistoricas', function () {

    test('retorna array de UnidadeResumoDTO', function () {
        Unidade::factory()->create();

        $provider = app(UnidadesHistoricasDataProvider::class);
        $result = $provider->getData();

        expect($result)->not->toBeEmpty();
        expect($result[0])->toBeInstanceOf(UnidadeResumoDTO::class);
    });

    test('retorna unidades atuais da tabela unidades', function () {
        $unidade = Unidade::factory()->create();

        $provider = app(UnidadesHistoricasDataProvider::class);
        $result = $provider->getData();

        $encontrada = collect($result)->first(fn (UnidadeResumoDTO $dto) => $dto->id === $unidade->id);

        expect($encontrada)->not->toBeNull();
        expect($encontrada->sigla)->toBe($unidade->sigla);
        expect($encontrada->nome)->toBe($unidade->nome);
    });

    test('retorna unidades históricas que não existem mais na tabela unidades', function () {
        $unidadeId = Str::uuid()->toString();

        DB::table('serie_unidades_executoras')->insert([
            'id' => Str::uuid()->toString(),
            'unidade_id' => $unidadeId,
            'unidade_sigla' => 'EXTINTA',
            'unidade_nome' => 'Unidade Extinta',
            'unidade_pai_id' => null,
            'periodo' => '2025-01',
            'executoras_qtd' => 1,
            'nao_executoras_qtd' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $provider = app(UnidadesHistoricasDataProvider::class);
        $result = $provider->getData();

        $encontrada = collect($result)->first(fn (UnidadeResumoDTO $dto) => $dto->id === $unidadeId);

        expect($encontrada)->not->toBeNull();
        expect($encontrada->sigla)->toBe('EXTINTA');
        expect($encontrada->nome)->toBe('Unidade Extinta');
    });

    test('prioriza dados atuais quando unidade existe em ambas as fontes', function () {
        $unidade = Unidade::factory()->create(['sigla' => 'ATUAL', 'nome' => 'Nome Atual']);

        DB::table('serie_unidades_executoras')->insert([
            'id' => Str::uuid()->toString(),
            'unidade_id' => $unidade->id,
            'unidade_sigla' => 'ANTIGA',
            'unidade_nome' => 'Nome Antigo',
            'unidade_pai_id' => null,
            'periodo' => '2025-01',
            'executoras_qtd' => 1,
            'nao_executoras_qtd' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $provider = app(UnidadesHistoricasDataProvider::class);
        $result = $provider->getData();

        $encontrada = collect($result)->first(fn (UnidadeResumoDTO $dto) => $dto->id === $unidade->id);

        expect($encontrada->sigla)->toBe('ATUAL');
        expect($encontrada->nome)->toBe('Nome Atual');
    });

    test('não duplica unidades quando existem em ambas as tabelas de série', function () {
        $unidadeId = Str::uuid()->toString();

        DB::table('serie_unidades_executoras')->insert([
            'id' => Str::uuid()->toString(),
            'unidade_id' => $unidadeId,
            'unidade_sigla' => 'DUP',
            'unidade_nome' => 'Duplicada',
            'unidade_pai_id' => null,
            'periodo' => '2025-01',
            'executoras_qtd' => 1,
            'nao_executoras_qtd' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('serie_participantes_pgd')->insert([
            'id' => Str::uuid()->toString(),
            'unidade_id' => $unidadeId,
            'unidade_sigla' => 'DUP',
            'unidade_nome' => 'Duplicada',
            'unidade_pai_id' => null,
            'periodo' => '2025-01',
            'participantes_qtd' => 5,
            'nao_participantes_qtd' => 3,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $provider = app(UnidadesHistoricasDataProvider::class);
        $result = $provider->getData();

        $ocorrencias = collect($result)->filter(fn (UnidadeResumoDTO $dto) => $dto->id === $unidadeId)->count();

        expect($ocorrencias)->toBe(1);
    });

    test('resultado é ordenado por sigla', function () {
        Unidade::factory()->create(['sigla' => 'ZZZ', 'nome' => 'Última']);
        Unidade::factory()->create(['sigla' => 'AAA', 'nome' => 'Primeira']);

        $provider = app(UnidadesHistoricasDataProvider::class);
        $result = $provider->getData();

        $siglas = array_map(fn (UnidadeResumoDTO $dto) => $dto->sigla, $result);
        $sorted = $siglas;
        sort($sorted);

        expect($siglas)->toBe($sorted);
    });

    test('toArray serializa corretamente', function () {
        $unidade = Unidade::factory()->create();

        $provider = app(UnidadesHistoricasDataProvider::class);
        $result = $provider->getData();

        $encontrada = collect($result)->first(fn (UnidadeResumoDTO $dto) => $dto->id === $unidade->id);
        $array = $encontrada->toArray();

        expect($array)->toHaveKeys(['id', 'sigla', 'nome']);
        expect($array['id'])->toBe($unidade->id);
        expect($array['sigla'])->toBe($unidade->sigla);
        expect($array['nome'])->toBe($unidade->nome);
    });
});
