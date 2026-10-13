<?php

declare(strict_types=1);

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithProperties;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RelatorioLacunaPlanoTrabalhoExport implements FromCollection, WithMapping, WithHeadings,
    WithColumnFormatting, WithProperties, WithStyles, WithColumnWidths, WithEvents
{
    use RegistersEventListeners;

    private readonly Collection $rows;

    public function __construct(mixed $rows)
    {
        $this->rows = $rows instanceof Collection ? $rows : collect($rows);
    }

    public function collection(): Collection
    {
        return $this->rows;
    }

    public function headings(): array
    {
        return [
            'Agente Público',
            'Matrícula Siape',
            'Lotação',
            'Lacuna',
            'Quantidade de Dias',
            'Ocorrências',
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 38, // Agente Público
            'B' => 16, // Matrícula Siape
            'C' => 48, // Lotação
            'D' => 26, // Lacuna
            'E' => 18, // Quantidade de Dias
            'F' => 40, // Ocorrências
        ];
    }

    public function map($row): array
    {
        return [
            $row->nome_exibicao ?? $row->nome ?? '-',
            $row->matricula ?? '-',
            $row->unidadeHierarquia ?? $row->unidadeNome ?? '-',
            $row->lacuna ?? '-',
            $row->quantidade_dias ?? 0,
            $row->ocorrencias_texto ?? 'Sem ocorrência',
        ];
    }

    public function columnFormats(): array
    {
        return [
            'E' => NumberFormat::FORMAT_NUMBER,
        ];
    }

    public function properties(): array
    {
        return [
            'creator' => 'MGI',
            'title' => 'Relatório de Lacunas de Planos de Trabalho',
            'description' => 'Relatório de Lacunas de Planos de Trabalho do PGD Petrvs',
            'subject' => 'Lacunas de Planos de Trabalho',
            'keywords' => 'pgd,lacunas,plano-trabalho',
            'company' => 'MGI',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        $lastRow = max(1, $this->rows->count()) + 1;

        return [
            'A1:F'.$lastRow => [
                'borders' => [
                    'outline' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        'color' => ['argb' => '000000'],
                    ],
                ],
            ],
            1 => [
                'font' => ['bold' => true],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ],
            'A1:A'.$lastRow => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_LEFT,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ],
            'B1:B'.$lastRow => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_LEFT,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ],
            'C1:C'.$lastRow => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_LEFT,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ],
            'D1:D'.$lastRow => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ],
            'E1:E'.$lastRow => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ],
            'F1:F'.$lastRow => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_LEFT,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ],
        ];
    }

    public static function afterSheet(AfterSheet $event): void
    {
        $sheet = $event->sheet->getDelegate();
        $sheet->getRowDimension(1)->setRowHeight(45);
        $sheet->getStyle('1')->getAlignment()->setWrapText(true);
        $event->sheet->getStyle('A1:F1')->getFill()
            ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
            ->getStartColor()->setARGB('fc9fc0');
    }
}
