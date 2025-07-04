<?php
namespace App\Exports;

use App\Models\PlanoEntrega;
use Carbon\Carbon;
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

use function PHPUnit\Framework\isEmpty;

class RelatorioPlanoEntregaExport implements FromCollection, WithMapping, WithHeadings,
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
            'Unidade',
            '#ID',
            'Nome',
            'Homologação',
            'Status',
            'Início da Vigência',
            'Fim da Vigência',
            'Duração (dias)',
            'Data da conclusão',
            'Data da avaliação',
            'Situação da avaliação',
            'Nota da avaliação',
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 30,
            'B' => 10,
            'C' => 30,
            'D' => 15,
            'E' => 20,
            'F' => 15,
            'G' => 15,
            'H' => 10,
            'I' => 10,
            'J' => 10,
            'K' => 10,
            'L' => 10,
        ];
    }

    public function map($row): array
    {
        return [
            $row->unidadeHierarquia,
            '#'.$row->numero,
            $row->entregaNome,
            '-',
            PlanoEntrega::STATUSES[$row->status],
            Date::stringToExcel($row->dataInicio),
            Date::stringToExcel($row->dataFim),
            $row->duracao,
            '-',
            Date::stringToExcel($row->data_avaliacao),
            $this->coalesce($row->situacao_avaliacao),
            $this->coalesce($row->nota)
        ];
    }

    public function coalesce($value)
    {
        return strlen(trim($value)) ? $value : '-';
    }

    public function columnFormats(): array
    {
        return [
            'F' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'G' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'J' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }

    public function properties(): array
    {
        return [
            'creator'        => 'MGI',
            'title'          => 'Relatório de Planos de Entrega',
            'description'    => 'Relatório de Planos de Entrega do PGD Petrvs',
            'subject'        => 'Planos de Entrega',
            'keywords'       => 'pgd,plano de entrega',
            'company'        => 'MGI',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // borda no conjunto inteiro + 1 linha de header
            'A1:L'.(count($this->rows) + 1) => [
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
            'D:L' => [
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
        $event->sheet->getStyle('A1:L1')->getFill()
          ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
          ->getStartColor()->setARGB('fc9fc0');
    }
}
