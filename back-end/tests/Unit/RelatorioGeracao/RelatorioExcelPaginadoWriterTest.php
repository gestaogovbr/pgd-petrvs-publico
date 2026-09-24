<?php

use App\Exports\RelatorioExcelPaginadoExport;
use App\Exports\RelatorioExcelPaginadoWriter;
use App\Exports\RelatorioPlanoTrabalhoDetalhadoExport;
use App\Exports\RelatorioPlanoTrabalhoExport;
use Illuminate\Support\Collection;
use OpenSpout\Reader\XLSX\Reader;

test('writer gera xlsx em streaming com cabeçalho e linhas mapeadas', function () {
    $path = sys_get_temp_dir() . '/relatorio-writer-' . uniqid() . '.xlsx';

    $export = new RelatorioExcelPaginadoExport(
        new RelatorioPlanoTrabalhoExport(new Collection()),
        fn () => [
            'count' => 1,
            'rows' => collect([
                (object) [
                    'numero' => 42,
                    'participanteNome' => 'Fulano',
                    'unidadeHierarquia' => 'SE/CO',
                    'chd' => 50.5,
                    'status' => 'ATIVO',
                    'dataInicio' => '2024-01-15',
                    'dataFim' => '2024-02-15',
                    'duracao' => 32,
                    'qtdePeriodosAvaliativos' => 1,
                ],
            ]),
        ],
        500
    );

    (new RelatorioExcelPaginadoWriter())->store($export, $path);

    expect(is_file($path))->toBeTrue();

    $rows = readXlsxRows($path);
    unlink($path);

    expect($rows[0][0])->toBe('#ID')
        ->and($rows[1][0])->toBe('#42')
        ->and($rows[1][1])->toBe('Fulano')
        ->and($rows[1][5])->toBeInstanceOf(DateTimeInterface::class)
        ->and($rows[1][5]->format('Y-m-d'))->toBe('2024-01-15');
});

test('writer aplica merge do cabeçalho do relatório detalhado', function () {
    $path = sys_get_temp_dir() . '/relatorio-writer-detalhado-' . uniqid() . '.xlsx';

    $inner = new RelatorioPlanoTrabalhoDetalhadoExport(new Collection());
    $export = new RelatorioExcelPaginadoExport(
        $inner,
        fn () => ['count' => 0, 'rows' => collect()],
        500
    );

    expect($export->streamMergeRanges())->toBe(['I1:R1']);

    (new RelatorioExcelPaginadoWriter())->store($export, $path);

    $zip = new ZipArchive();
    expect($zip->open($path))->toBeTrue();
    $sheet = $zip->getFromName('xl/worksheets/sheet1.xml');
    $zip->close();
    unlink($path);

    expect($sheet)->toContain('ref="I1:R1"')
        ->and($sheet)->toContain('PERÍODOS AVALIATIVOS');
});

function readXlsxRows(string $path): array
{
    $reader = new Reader();
    $reader->open($path);
    $rows = [];
    foreach ($reader->getSheetIterator() as $sheet) {
        foreach ($sheet->getRowIterator() as $row) {
            $rows[] = $row->toArray();
        }
    }
    $reader->close();

    return $rows;
}
