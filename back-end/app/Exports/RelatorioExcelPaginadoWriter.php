<?php

declare(strict_types=1);

namespace App\Exports;

use DateTimeInterface;
use InvalidArgumentException;
use OpenSpout\Common\Entity\Cell;
use OpenSpout\Common\Entity\Row;
use OpenSpout\Common\Entity\Style\CellAlignment;
use OpenSpout\Common\Entity\Style\CellVerticalAlignment;
use OpenSpout\Common\Entity\Style\Style;
use OpenSpout\Writer\XLSX\Entity\SheetView;
use OpenSpout\Writer\XLSX\Options;
use OpenSpout\Writer\XLSX\Properties;
use OpenSpout\Writer\XLSX\Writer;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use RuntimeException;

class RelatorioExcelPaginadoWriter
{
    public const DATE_FORMAT = 'DD/MM/YYYY';

    public function store(RelatorioExcelPaginadoExport $export, string $absolutePath): void
    {
        $directory = dirname($absolutePath);
        if (! is_dir($directory) && ! mkdir($directory, 0777, true) && ! is_dir($directory)) {
            throw new RuntimeException('Não foi possível criar o diretório do relatório.');
        }

        $options = new Options();
        $options->SHOULD_USE_INLINE_STRINGS = true;
        $this->applyProperties($options, $export);
        $this->applyColumnWidths($options, $export);
        $this->applyMergeRanges($options, $export);

        $writer = new Writer($options);
        $writer->openToFile($absolutePath);

        try {
            $headerRows = $this->headerRows($export);
            $freezeRow = count($headerRows) + 1;
            $sheetView = new SheetView();
            $sheetView->setFreezeRow($freezeRow);
            $writer->getCurrentSheet()->setSheetView($sheetView);

            $headerStyle = $this->headerStyle();
            $dateStyle = (new Style())->setFormat(self::DATE_FORMAT);
            $dateColumns = $this->dateColumnIndexes($export);

            foreach ($headerRows as $headerRow) {
                $writer->addRow(Row::fromValues($headerRow, $headerStyle));
            }

            foreach ($export->generator() as $row) {
                $writer->addRow(new Row(
                    $this->cellsFromValues($export->map($row), $dateColumns, $dateStyle)
                ));
            }
        } finally {
            $writer->close();
        }
    }

    /**
     * @return list<list<mixed>>
     */
    private function headerRows(RelatorioExcelPaginadoExport $export): array
    {
        $headings = $export->headings();
        $rows = isset($headings[0]) && is_array($headings[0]) ? $headings : [$headings];
        $width = 0;
        foreach ($rows as $row) {
            $width = max($width, count($row));
        }

        $padded = [];
        foreach ($rows as $row) {
            $padded[] = array_pad(array_values($row), $width, '');
        }

        return $padded;
    }

    private function headerStyle(): Style
    {
        return (new Style())
            ->setFontBold()
            ->setBackgroundColor('FC9FC0')
            ->setShouldWrapText()
            ->setCellAlignment(CellAlignment::CENTER)
            ->setCellVerticalAlignment(CellVerticalAlignment::CENTER);
    }

    /**
     * @return array<int, true>
     */
    private function dateColumnIndexes(RelatorioExcelPaginadoExport $export): array
    {
        $indexes = [];
        foreach ($export->columnFormats() as $letter => $format) {
            if (! is_string($letter) || $format !== NumberFormat::FORMAT_DATE_DDMMYYYY) {
                continue;
            }
            $indexes[$this->columnLetterToIndex($letter) - 1] = true;
        }

        return $indexes;
    }

    /**
     * @param array<int, mixed> $values
     * @param array<int, true> $dateColumns
     * @return list<Cell>
     */
    private function cellsFromValues(array $values, array $dateColumns, Style $dateStyle): array
    {
        $cells = [];
        foreach (array_values($values) as $index => $value) {
            if ($value instanceof DateTimeInterface) {
                $cells[] = Cell::fromValue($value, $dateStyle);
                continue;
            }

            if (isset($dateColumns[$index]) && is_numeric($value) && (float) $value > 0) {
                $cells[] = Cell::fromValue(Date::excelToDateTimeObject((float) $value), $dateStyle);
                continue;
            }

            $cells[] = Cell::fromValue($value === false ? null : $value);
        }

        return $cells;
    }

    private function applyProperties(Options $options, RelatorioExcelPaginadoExport $export): void
    {
        $properties = $export->properties();
        if ($properties === []) {
            return;
        }

        $options->setProperties(new Properties(
            title: (string) ($properties['title'] ?? 'Relatório'),
            subject: $properties['subject'] ?? null,
            application: 'Petrvs PGD',
            creator: (string) ($properties['creator'] ?? 'MGI'),
            lastModifiedBy: (string) ($properties['creator'] ?? 'MGI'),
            keywords: $properties['keywords'] ?? null,
            description: $properties['description'] ?? null,
            category: $properties['company'] ?? null,
        ));
    }

    private function applyColumnWidths(Options $options, RelatorioExcelPaginadoExport $export): void
    {
        foreach ($export->columnWidths() as $letter => $width) {
            if (! is_string($letter) || ! preg_match('/^[A-Z]+$/i', $letter)) {
                continue;
            }
            $options->setColumnWidth((float) $width, $this->columnLetterToIndex($letter));
        }
    }

    private function applyMergeRanges(Options $options, RelatorioExcelPaginadoExport $export): void
    {
        foreach ($export->streamMergeRanges() as $range) {
            $parsed = $this->parseA1Range($range);
            $options->mergeCells(
                $parsed['startCol'],
                $parsed['startRow'],
                $parsed['endCol'],
                $parsed['endRow'],
            );
        }
    }

    /**
     * @return array{startCol: int, startRow: int, endCol: int, endRow: int}
     */
    private function parseA1Range(string $range): array
    {
        if (! preg_match('/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/i', $range, $matches)) {
            throw new InvalidArgumentException("Intervalo de células inválido: {$range}");
        }

        return [
            'startCol' => $this->columnLetterToIndex($matches[1]) - 1,
            'startRow' => (int) $matches[2],
            'endCol' => $this->columnLetterToIndex($matches[3]) - 1,
            'endRow' => (int) $matches[4],
        ];
    }

    private function columnLetterToIndex(string $letter): int
    {
        $letter = strtoupper($letter);
        $index = 0;
        $length = strlen($letter);
        for ($i = 0; $i < $length; $i++) {
            $index = ($index * 26) + (ord($letter[$i]) - 64);
        }

        return $index;
    }
}
