<?php
namespace App\Exports;

use App\Models\PlanoTrabalho;
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
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RelatorioPlanoTrabalhoExport implements FromCollection, WithMapping, WithHeadings,
    WithColumnFormatting, WithProperties, WithStyles, WithColumnWidths, WithEvents
{
    use RegistersEventListeners;

    protected $rows;
    protected ?int $totalRows = null;

    public function __construct($rows)
    {
        $this->rows = $rows;
    }

    public function setTotalRows(int $totalRows): self
    {
        $this->totalRows = $totalRows;
        return $this;
    }

    protected function totalRows(): int
    {
        if ($this->totalRows !== null) {
            return $this->totalRows;
        }

        return is_countable($this->rows) ? count($this->rows) : 0;
    }

    public function collection()
    {
        return $this->rows;
    }

    public function headings(): array
    {
        return [
            '#ID',
            'Nome do Participante',
            'Unidade Executora',
            'Distribuição % da CHD no período',
            'Status do PT',
            'Início da Vigência',
            'Fim da Vigência',
            'Duração (dias)',
            'Períodos Avaliativos'
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 14,
            'B' => 30,
            'C' => 30,
            'D' => 12,
            'E' => 20,
            'F' => 15,
            'G' => 15,
            'H' => 16,
            'I' => 10
        ];
    }

    public function map($row): array
    {
        return array_merge($this->mapPlanoTrabalho($row), [
            $row->qtdePeriodosAvaliativos ?? 0,
        ]);
    }

    /**
     * @return list<mixed>
     */
    protected function mapPlanoTrabalho($row): array
    {
        return [
            '#'.$row->numero,
            $row->participanteNome,
            $row->unidadeHierarquia,
            number_format((float) ($row->chd ?? 0), 2, ','),
            PlanoTrabalho::STATUSES[$row->status] ?? $row->status,
            Date::stringToExcel($row->dataInicio),
            Date::stringToExcel($row->dataFim),
            $row->duracao,
        ];
    }

    public function columnFormats(): array
    {
        return [
            'F' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'G' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }

    public function properties(): array
    {
        return [
            'creator'        => 'MGI',
            'title'          => 'Relatório de Planos de Trabalho',
            'description'    => 'Relatório de Planos de Trabalho do PGD Petrvs',
            'subject'        => 'Planos de Trabalho',
            'keywords'       => 'pgd,plano de trabalho',
            'company'        => 'Governo Federal',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1    => [
                'font' => ['bold' => true],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['argb' => '000000'],
                    ],
                ]
            ],
            'E:I' => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ]
            ],
        ];
    }

    public static function afterSheet(AfterSheet $event)
    {
        $event->sheet->getDelegate()->getRowDimension('1')->setRowHeight(60);
        $event->sheet->getDelegate()->getStyle('1')->getAlignment()->setWrapText(true);
        $event->sheet->getStyle('A1:I1')->getFill()
          ->setFillType(Fill::FILL_SOLID)
          ->getStartColor()->setARGB('fc9fc0');
    }
}
