<?php

namespace App\Exports;

use Generator;
use Maatwebsite\Excel\Concerns\FromGenerator;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithProperties;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RelatorioExcelPaginadoExport implements
    FromGenerator,
    WithMapping,
    WithHeadings,
    WithColumnFormatting,
    WithProperties,
    WithStyles,
    WithColumnWidths,
    WithEvents
{
    /**
     * @param callable(int $page, int $limit): array{count?: int, rows: iterable} $pageFetcher
     * @param (callable(int $processadas, ?int $total): void)|null $onProgress
     */
    public function __construct(
        private object $export,
        private $pageFetcher,
        private int $pageSize = 500,
        private $onProgress = null,
    ) {
    }

    public function generator(): Generator
    {
        $page = 1;
        $processedRows = 0;
        $totalRows = null;

        while (true) {
            $result = ($this->pageFetcher)($page, $this->pageSize);
            $rows = $result['rows'] ?? [];
            $count = is_countable($rows) ? count($rows) : 0;

            if ($page === 1 && array_key_exists('count', $result) && $result['count'] !== null) {
                $totalRows = max(0, (int) $result['count']);
                if (method_exists($this->export, 'setTotalRows')) {
                    $this->export->setTotalRows($totalRows);
                }
            }

            if ($count === 0) {
                if ($page === 1) {
                    $this->reportProgress(0, $totalRows);
                }
                break;
            }

            foreach ($rows as $row) {
                yield $row;
            }

            $processedRows += $count;
            $totalInformado = $totalRows;
            if ($totalInformado === null && $count < $this->pageSize) {
                $totalInformado = $processedRows;
            }
            $processadas = $totalInformado === null
                ? $processedRows
                : min($processedRows, $totalInformado);
            $this->reportProgress($processadas, $totalInformado);

            $ultimaParcial = $count < $this->pageSize;
            $atingiuTotal = $totalRows !== null && $processedRows >= $totalRows;
            if ($ultimaParcial || $atingiuTotal) {
                break;
            }

            unset($result, $rows);
            $page++;
        }
    }

    private function reportProgress(int $processadas, ?int $total): void
    {
        if (is_callable($this->onProgress)) {
            ($this->onProgress)($processadas, $total);
        }
    }

    public function map($row): array
    {
        return $this->export->map($row);
    }

    public function headings(): array
    {
        return $this->export->headings();
    }

    public function columnFormats(): array
    {
        return method_exists($this->export, 'columnFormats')
            ? $this->export->columnFormats()
            : [];
    }

    public function columnWidths(): array
    {
        return method_exists($this->export, 'columnWidths')
            ? $this->export->columnWidths()
            : [];
    }

    public function properties(): array
    {
        return method_exists($this->export, 'properties')
            ? $this->export->properties()
            : [];
    }

    public function styles(Worksheet $sheet)
    {
        return method_exists($this->export, 'styles')
            ? $this->export->styles($sheet)
            : [];
    }

    public function registerEvents(): array
    {
        $export = $this->export;

        return [
            AfterSheet::class => function (AfterSheet $event) use ($export) {
                $class = get_class($export);
                if (method_exists($class, 'afterSheet')) {
                    $class::afterSheet($event);
                }
            },
        ];
    }

    /**
     * @return list<string>
     */
    public function streamMergeRanges(): array
    {
        return method_exists($this->export, 'streamMergeRanges')
            ? $this->export->streamMergeRanges()
            : [];
    }
}
