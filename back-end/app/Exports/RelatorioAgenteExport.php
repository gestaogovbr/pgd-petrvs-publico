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

class RelatorioAgenteExport implements FromCollection, WithMapping, WithHeadings,
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
            'Nome',
            'Matrícula SIAPE',
            'Jornada',
            'Perfil',
            'Situação',
            'Seleção',
            'Lotado',
            'Modalidade SouGov',
            'Modalidade do último Plano de Trabalho',
            'Comparação Sougov x Petrvs',
            'Indisponibilidade de teletrabalho',
            'Início Indisponibilidade de teletrabalho',
            'Fim Indisponibilidade de teletrabalho'
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 40, // Nome
            'B' => 10, // Matrícula SIAPE
            'C' => 10, // Jornada
            'D' => 20, // Perfil
            'E' => 20, // Situação
            'F' => 30, // Seleção
            'G' => 30, // Lotado
            'H' => 20, // Modalidade SouGov
            'I' => 30, // Modalidade do último Plano de Trabalho
            'J' => 15, // Comparação Sougov x Petrvs
            'K' => 40, // Indisponibilidade de teletrabalho
            'L' => 15, // Início Indisponibilidade de teletrabalho
            'M' => 15, // Fim Indisponibilidade de teletrabalho
        ];
    }

    public function map($row): array
    {
        return [
            $row->nome,
            $row->matricula,
            $row->jornada ?? '-',
            $row->perfil,
            $row->situacao ?? '-',
            $row->programaNome,
            $row->unidadeHierarquia,
            '-',
            $row->tipoModalidadeNome,
            '-',
            $row->tipoPedagio,
            Date::stringToExcel($row->data_inicial_pedagio),
            Date::stringToExcel($row->data_final_pedagio)
        ];
    }

    public function coalesce($value)
    {
        return strlen(trim($value)) ? $value : '-';
    }

    public function columnFormats(): array
    {
        return [
            'L' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'M' => NumberFormat::FORMAT_DATE_DDMMYYYY
        ];
    }

    public function properties(): array
    {
        return [
            'creator'        => 'MGI',
            'title'          => 'Relatório de Agentes Públicos',
            'description'    => 'Relatório de Agentes do PGD Petrvs',
            'subject'        => 'Agentes Públicos',
            'keywords'       => 'pgd,agentes',
            'company'        => 'MGI',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // borda no conjunto inteiro + 1 linha de header
            'A1:M'.(count($this->rows) + 1) => [
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
            'B:M' => [
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
        $event->sheet->getStyle('A1:M1')->getFill()
          ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
          ->getStartColor()->setARGB('fc9fc0');
        $event->sheet->getStyle('K')->getAlignment()->setWrapText(true); // quebra de texto
    }
}
