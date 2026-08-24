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
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RelatorioAgenteExport implements FromCollection, WithMapping, WithHeadings,
    WithColumnFormatting, WithProperties, WithStyles, WithColumnWidths, WithEvents
{
    use RegistersEventListeners;

    private const COLUMN_WIDTHS = [
        'A' => 40, // Agente Público
        'B' => 15, // Matrícula Siape
        'C' => 15, // Situação
        'D' => 30, // Regramento
        'E' => 30, // Lotação
        'F' => 18, // Participante do PGD
        'G' => 25, // Plano de Trabalho do Dia
        'H' => 30, // Status do Plano de Trabalho do Dia
        'I' => 20, // Modalidade Siape
        'J' => 30, // Modalidade do Plano de Trabalho do Dia
        'K' => 20, // Comparação Siape x Petrvs
        'L' => 40, // Indisponibilidade de teletrabalho
        'M' => 15, // Início Indisponibilidade
        'N' => 15, // Fim Indisponibilidade
    ];

    private const DATE_COLUMNS = ['M', 'N'];

    private const WRAP_TEXT_COLUMN = 'L';

    protected $rows;

    public function __construct($rows)
    {
        $this->rows = $rows;
    }

    public function collection()
    {
        return $this->rows;
    }

    private static function lastColumn(): string
    {
        $keys = array_keys(self::COLUMN_WIDTHS);

        return end($keys);
    }

    public function headings(): array
    {
        return [
            'Agente Público',
            'Matrícula Siape',
            'Situação',
            'Regramento',
            'Lotação',
            'Participante do PGD',
            'Plano de Trabalho do Dia',
            'Status do Plano de Trabalho do Dia',
            'Modalidade Siape',
            'Modalidade do Plano de Trabalho do Dia',
            'Comparação Siape x Petrvs',
            'Indisponibilidade de teletrabalho',
            'Início Indisponibilidade de teletrabalho',
            'Fim Indisponibilidade de teletrabalho',
        ];
    }

    public function columnWidths(): array
    {
        return self::COLUMN_WIDTHS;
    }

    public function map($row): array
    {
        return [
            $row->nome_exibicao ?? $row->nome,
            $row->matricula ?? '-',
            $row->situacao ?? '-',
            $row->programaNome ?? '-',
            $row->unidadeHierarquia ?? '-',
            $row->participantePGD ?? 'Não',
            $row->plano_trabalho_numero ? 'PT #' . $row->plano_trabalho_numero : '-',
            $row->plano_trabalho_status_label ?? '-',
            $row->modalidadeSouGov ?? '-',
            $row->tipoModalidadeNome ?? '-',
            $row->comparacaoSouGovPetrvs ?? '-',
            $row->tipoPedagio ?? '-',
            Date::stringToExcel($row->data_inicial_pedagio),
            Date::stringToExcel($row->data_final_pedagio),
        ];
    }

    public function columnFormats(): array
    {
        $formats = [];
        foreach (self::DATE_COLUMNS as $col) {
            $formats[$col] = NumberFormat::FORMAT_DATE_DDMMYYYY;
        }

        return $formats;
    }

    public function properties(): array
    {
        return [
            'creator' => 'MGI',
            'title' => 'Relatório de Agentes Públicos',
            'description' => 'Relatório de Agentes do PGD Petrvs',
            'subject' => 'Agentes Públicos',
            'keywords' => 'pgd,agentes',
            'company' => 'MGI',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $lastColumn = self::lastColumn();
        $lastRow = count($this->rows) + 1;

        return [
            "A1:{$lastColumn}{$lastRow}" => [
                'borders' => [
                    'outline' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['argb' => '000000'],
                    ],
                ],
            ],
            1 => [
                'font' => ['bold' => true],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['argb' => '000000'],
                    ],
                ],
            ],
            "B:{$lastColumn}" => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ],
            ],
        ];
    }

    public static function afterSheet(AfterSheet $event)
    {
        $lastColumn = self::lastColumn();

        $event->sheet->getDelegate()->getRowDimension('1')->setRowHeight(60);
        $event->sheet->getDelegate()->getStyle('1')->getAlignment()->setWrapText(true);
        $event->sheet->getStyle("A1:{$lastColumn}1")->getFill()
            ->setFillType(Fill::FILL_SOLID)
            ->getStartColor()->setARGB('fc9fc0');
        $event->sheet->getStyle(self::WRAP_TEXT_COLUMN)->getAlignment()->setWrapText(true);
    }
}
