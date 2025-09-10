<?php
namespace App\Exports;

use App\Models\EnvioItem;
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

class RelatorioErrosEnvioExport implements FromCollection, WithMapping, WithHeadings,
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
            'Categoria',
            'ID',
            'Número/Matrícula SIAPE',
            'Data de Envio',
            'Motivo'
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 20, // Categoria
            'B' => 30, // ID
            'C' => 10, // Matrícula SIAPE
            'D' => 15, // Data de Envio,
            'E' => 100, // Motivo
        ];
    }

    public function map($row): array
    {
        return [
            EnvioItem::TIPOS[$row->categoria],
            $row->uid,
            $row->numero,
            Date::stringToExcel($row->data_envio),
            $row->motivo,
        ];
    }

    public function coalesce($value)
    {
        return strlen(trim($value)) ? $value : '-';
    }

    public function columnFormats(): array
    {
        return [
            'D' => NumberFormat::FORMAT_DATE_DDMMYYYY
        ];
    }

    public function properties(): array
    {
        return [
            'creator'        => 'MGI',
            'title'          => 'Relatório de Erros de API',
            'description'    => 'Relatório de Erros de Envio do PGD Petrvs',
            'subject'        => 'Erros de Envio',
            'keywords'       => 'pgd,erros,envio',
            'company'        => 'MGI',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // borda no conjunto inteiro + 1 linha de header
            'A1:E'.(count($this->rows) + 1) => [
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
            'C:D' => [
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
        $event->sheet->getStyle('A1:E1')->getFill()
          ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
          ->getStartColor()->setARGB('fc9fc0');
        $event->sheet->getStyle('E')->getAlignment()->setWrapText(true); // quebra de texto
    }
}
