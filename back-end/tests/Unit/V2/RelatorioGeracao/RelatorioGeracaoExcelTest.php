<?php

declare(strict_types=1);

use App\Contracts\RelatorioExcelGeradorContract;
use App\Enums\RelatorioGeracaoTipo;
use App\Exports\RelatorioExcelPaginadoExport;
use App\Exports\RelatorioExcelPaginadoWriter;
use App\Models\RelatorioGeracao;
use App\Services\RelatorioGeracao\RelatorioExcelGeradorFactory;
use App\V2\RelatorioGeracao\RelatorioGeracaoExcel;
use App\V2\RelatorioGeracao\RelatorioGeracaoStorage;
use Tests\TestCase;

uses(TestCase::class);

afterAll(function () {
    Mockery::close();
});

function makeRelatorioGeracaoExcelModel(array $overrides = []): RelatorioGeracao
{
    $geracao = new RelatorioGeracao();
    $geracao->id = $overrides['id'] ?? 'geracao-1';
    $geracao->tipo = $overrides['tipo'] ?? RelatorioGeracaoTipo::PLANO_TRABALHO->value;
    $geracao->parametros = array_key_exists('parametros', $overrides)
        ? $overrides['parametros']
        : ['where' => [['unidade_id', '==', 'u-1']], 'orderBy' => []];

    return $geracao;
}

/**
 * @param (callable(RelatorioExcelPaginadoExport $export): bool)|null $onStore
 */
function makeRelatorioGeracaoExcelSut(
    RelatorioExcelGeradorContract $gerador,
    RelatorioGeracaoTipo $tipo,
    ?callable $onStore = null,
): RelatorioGeracaoExcel {
    $factory = Mockery::mock(RelatorioExcelGeradorFactory::class);
    $factory->shouldReceive('make')->once()->with($tipo)->andReturn($gerador);

    $storage = Mockery::mock(RelatorioGeracaoStorage::class);
    $storage->shouldReceive('caminho')->once()->with('geracao-1')->andReturn('relatorios/geracao-1.xlsx');
    $storage->shouldReceive('garantirDiretorio')->once();
    $storage->shouldReceive('caminhoAbsoluto')
        ->once()
        ->with('relatorios/geracao-1.xlsx')
        ->andReturn('/tmp/relatorios/geracao-1.xlsx');

    $writer = Mockery::mock(RelatorioExcelPaginadoWriter::class);
    $writer->shouldReceive('store')
        ->once()
        ->with(
            Mockery::on(function (RelatorioExcelPaginadoExport $export) use ($onStore): bool {
                if ($onStore !== null) {
                    return $onStore($export, '/tmp/relatorios/geracao-1.xlsx');
                }

                return true;
            }),
            '/tmp/relatorios/geracao-1.xlsx',
        );

    return new RelatorioGeracaoExcel($factory, $writer, $storage);
}

test('gerar persiste o excel paginado e devolve o caminho e o nome do arquivo', function () {
    $geracao = makeRelatorioGeracaoExcelModel();
    $gerador = Mockery::mock(RelatorioExcelGeradorContract::class);
    $gerador->shouldReceive('criarExport')->once()->andReturn(new stdClass());
    $gerador->shouldReceive('pageSize')->once()->andReturn(500);
    $gerador->shouldReceive('arquivoNome')->once()->andReturn('relatorio-planos-trabalho.xlsx');

    $excel = makeRelatorioGeracaoExcelSut($gerador, RelatorioGeracaoTipo::PLANO_TRABALHO);

    expect($excel->gerar($geracao, static function (): void {}))->toBe([
        'path' => 'relatorios/geracao-1.xlsx',
        'nome' => 'relatorio-planos-trabalho.xlsx',
    ]);
});

test('gerar consulta a página com os parâmetros da geração e reporta progresso', function () {
    $geracao = makeRelatorioGeracaoExcelModel();
    $progresso = [];
    $gerador = Mockery::mock(RelatorioExcelGeradorContract::class);
    $gerador->shouldReceive('criarExport')->once()->andReturn(new stdClass());
    $gerador->shouldReceive('pageSize')->once()->andReturn(250);
    $gerador->shouldReceive('arquivoNome')->once()->andReturn('relatorio-planos-trabalho.xlsx');
    $gerador->shouldReceive('consultarPagina')
        ->once()
        ->with($geracao->parametros, 1, 250)
        ->andReturn(['count' => 0, 'rows' => []]);

    $excel = makeRelatorioGeracaoExcelSut(
        $gerador,
        RelatorioGeracaoTipo::PLANO_TRABALHO,
        function (RelatorioExcelPaginadoExport $export): bool {
            iterator_to_array($export->generator());

            return true;
        },
    );

    $excel->gerar($geracao, function (int $processadas, ?int $total) use (&$progresso): void {
        $progresso[] = [$processadas, $total];
    });

    expect($progresso)->toBe([[0, 0]]);
});

test('gerar usa lista vazia quando a geração não tem parâmetros', function () {
    $geracao = makeRelatorioGeracaoExcelModel(['parametros' => null]);
    $gerador = Mockery::mock(RelatorioExcelGeradorContract::class);
    $gerador->shouldReceive('criarExport')->once()->andReturn(new stdClass());
    $gerador->shouldReceive('pageSize')->once()->andReturn(500);
    $gerador->shouldReceive('arquivoNome')->once()->andReturn('relatorio-planos-trabalho.xlsx');
    $gerador->shouldReceive('consultarPagina')
        ->once()
        ->with([], 1, 500)
        ->andReturn(['count' => 0, 'rows' => []]);

    $excel = makeRelatorioGeracaoExcelSut(
        $gerador,
        RelatorioGeracaoTipo::PLANO_TRABALHO,
        function (RelatorioExcelPaginadoExport $export): bool {
            iterator_to_array($export->generator());

            return true;
        },
    );

    expect($excel->gerar($geracao, static function (): void {})['path'])->toBe('relatorios/geracao-1.xlsx');
});

test('gerar resolve o gerador do relatório detalhado', function () {
    $geracao = makeRelatorioGeracaoExcelModel([
        'tipo' => RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->value,
    ]);
    $gerador = Mockery::mock(RelatorioExcelGeradorContract::class);
    $gerador->shouldReceive('criarExport')->once()->andReturn(new stdClass());
    $gerador->shouldReceive('pageSize')->once()->andReturn(500);
    $gerador->shouldReceive('arquivoNome')->once()->andReturn('relatorio-planos-trabalho-detalhado.xlsx');

    $excel = makeRelatorioGeracaoExcelSut($gerador, RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO);

    expect($excel->gerar($geracao, static function (): void {}))->toBe([
        'path' => 'relatorios/geracao-1.xlsx',
        'nome' => 'relatorio-planos-trabalho-detalhado.xlsx',
    ]);
});

test('gerar lança erro quando o tipo da geração é inválido', function () {
    $geracao = makeRelatorioGeracaoExcelModel(['tipo' => 'tipo_invalido']);
    $factory = Mockery::mock(RelatorioExcelGeradorFactory::class);
    $factory->shouldNotReceive('make');

    $excel = new RelatorioGeracaoExcel(
        $factory,
        Mockery::mock(RelatorioExcelPaginadoWriter::class),
        Mockery::mock(RelatorioGeracaoStorage::class),
    );

    $excel->gerar($geracao, static function (): void {});
})->throws(ValueError::class);
