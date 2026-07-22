<?php
namespace App\Exports;

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
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RelatorioUnidadeExport implements FromCollection, WithMapping, WithHeadings,
    WithColumnFormatting, WithProperties, WithStyles, WithColumnWidths, WithEvents
{
    use RegistersEventListeners;

    protected $rows;

    public function __construct($rows)
    {
        $this->rows = $rows;
    }

    public function collection()
    {
        return $this->rows;
    }

    public function headings(): array
    {
        return [
            'Sigla',
            'Unidade',
            'Uorg',
            'Instituidora',
            'Executora',
            'PE Vigente',
            'Chefia',
            'Chefia substituta',
            'Delegados',
            'Vinculados'
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 20, // Sigla
            'B' => 45, // Unidade
            'C' => 10, // Uorg
            'D' => 12, // Instituidora
            'E' => 12, // Executora
            'F' => 40, // PE Vigente
            'G' => 40, // Chefia
            'H' => 10, // Chefia substituta
            'I' => 10, // Delegados
            'J' => 10, // Vinculados
        ];
    }

    public function map($row): array
    {
        return [
            $row->sigla,
            $row->unidadeHierarquia,
            $row->codigo,
            $row->instituidora,
            $row->executora,
            $row->peVigenteNome ?? '',
            $row->chefiaNome,
            $row->totalSubstitutos,
            $row->totalDelegados,
            $row->totalVinculados
        ];
    }

    public function coalesce($value)
    {
        return strlen(trim($value)) ? $value : '-';
    }

    public function columnFormats(): array
    {
        return [
        ];
    }

    public function properties(): array
    {
        return [
            'creator'        => 'MGI',
            'title'          => 'Relatório de Unidades',
            'description'    => 'Relatório de Unidades do PGD Petrvs',
            'subject'        => 'Unidades',
            'keywords'       => 'pgd,unidades',
            'company'        => 'MGI',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // borda no conjunto inteiro + 1 linha de header
            'A1:J'.(count($this->rows) + 1) => [
                'borders' => [
                    'outline' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        'color' => ['argb' => '000000'],
                    ],
                ]
            ],
            // cabeçalho
            1    => [
                'font' => ['bold' => true],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        'color' => ['argb' => '000000'],
                    ],
                ]
            ],
            'C:J' => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ]
            ]
        ];
    }

    public static function afterSheet(AfterSheet $event)
    {
        $event->sheet->getDelegate()->getRowDimension('1')->setRowHeight(60);
        $event->sheet->getDelegate()->getStyle('1')->getAlignment()->setWrapText(true);
        $event->sheet->getStyle('A1:J1')->getFill()
          ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
          ->getStartColor()->setARGB('fc9fc0');
    }
}
