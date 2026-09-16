<?php

declare(strict_types=1);

use App\V2\RelatorioGeracao\RelatorioGeracaoStorage;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Tests\TestCase;

uses(TestCase::class);

test('caminho usa o diretório de relatórios e o id da geração', function () {
    $storage = new RelatorioGeracaoStorage();

    expect($storage->caminho('geracao-1'))->toBe('relatorios/geracao-1.xlsx')
        ->and(RelatorioGeracaoStorage::DISCO)->toBe('local')
        ->and(RelatorioGeracaoStorage::DIRETORIO)->toBe('relatorios');
});

test('caminhoAbsoluto resolve o path no disco local', function () {
    Storage::fake('local');

    $absoluto = (new RelatorioGeracaoStorage())->caminhoAbsoluto('relatorios/geracao-1.xlsx');

    expect($absoluto)->toEndWith('relatorios/geracao-1.xlsx');
});

test('garantirDiretorio cria o diretório de relatórios', function () {
    Storage::fake('local');

    (new RelatorioGeracaoStorage())->garantirDiretorio();

    expect(Storage::disk('local')->exists('relatorios'))->toBeTrue();
});

test('existe indica se o arquivo está no disco', function () {
    Storage::fake('local');
    $storage = new RelatorioGeracaoStorage();

    expect($storage->existe('relatorios/geracao-1.xlsx'))->toBeFalse();

    Storage::disk('local')->put('relatorios/geracao-1.xlsx', 'xlsx');

    expect($storage->existe('relatorios/geracao-1.xlsx'))->toBeTrue();
});

test('apagar remove o arquivo existente', function () {
    Storage::fake('local');
    Storage::disk('local')->put('relatorios/geracao-1.xlsx', 'xlsx');

    (new RelatorioGeracaoStorage())->apagar('relatorios/geracao-1.xlsx');

    Storage::disk('local')->assertMissing('relatorios/geracao-1.xlsx');
});

test('apagar ignora caminho nulo vazio ou inexistente', function () {
    Storage::fake('local');
    Storage::disk('local')->put('relatorios/geracao-1.xlsx', 'xlsx');
    $storage = new RelatorioGeracaoStorage();

    $storage->apagar(null);
    $storage->apagar('');
    $storage->apagar('relatorios/inexistente.xlsx');

    Storage::disk('local')->assertExists('relatorios/geracao-1.xlsx');
});

test('apagarGeracao remove o caminho informado e o caminho padrão', function () {
    Storage::fake('local');
    Storage::disk('local')->put('relatorios/geracao-1.xlsx', 'xlsx');
    Storage::disk('local')->put('relatorios/custom.xlsx', 'xlsx');

    (new RelatorioGeracaoStorage())->apagarGeracao('geracao-1', 'relatorios/custom.xlsx');

    Storage::disk('local')->assertMissing('relatorios/geracao-1.xlsx');
    Storage::disk('local')->assertMissing('relatorios/custom.xlsx');
});

test('apagarGeracao usa só o caminho padrão quando arquivo_path é inválido', function () {
    Storage::fake('local');
    Storage::disk('local')->put('relatorios/geracao-1.xlsx', 'xlsx');

    (new RelatorioGeracaoStorage())->apagarGeracao('geracao-1', null);
    Storage::disk('local')->assertMissing('relatorios/geracao-1.xlsx');

    Storage::disk('local')->put('relatorios/geracao-1.xlsx', 'xlsx');
    (new RelatorioGeracaoStorage())->apagarGeracao('geracao-1', '');
    Storage::disk('local')->assertMissing('relatorios/geracao-1.xlsx');

    Storage::disk('local')->put('relatorios/geracao-1.xlsx', 'xlsx');
    (new RelatorioGeracaoStorage())->apagarGeracao('geracao-1', ['relatorios/outro.xlsx']);
    Storage::disk('local')->assertMissing('relatorios/geracao-1.xlsx');
});

test('download devolve o arquivo com o nome informado', function () {
    Storage::fake('local');
    Storage::disk('local')->put('relatorios/geracao-1.xlsx', 'conteudo');

    $response = (new RelatorioGeracaoStorage())->download(
        'relatorios/geracao-1.xlsx',
        'relatorio-planos-trabalho.xlsx',
    );

    expect($response)->toBeInstanceOf(StreamedResponse::class)
        ->and($response->getStatusCode())->toBe(200)
        ->and($response->headers->get('Content-Disposition'))->toContain('relatorio-planos-trabalho.xlsx');
});
