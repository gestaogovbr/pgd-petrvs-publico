<?php

declare(strict_types=1);

namespace App\Exports;

use App\Models\PlanoEntrega;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaRowDTO;
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
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RelatorioEntregaExport implements FromCollection, WithMapping, WithHeadings,
    WithColumnFormatting, WithProperties, WithStyles, WithColumnWidths, WithEvents
{
    use RegistersEventListeners;

    public function __construct(
        private readonly Collection $rows
    ) {
    }

    public function collection(): Collection
    {
        return $this->rows;
    }

    public function headings(): array
    {
        return [
            'Unidade',
            'Entrega',
            'Data de início',
            'Data de fim',
            'Planejado',
            'Alcançado',
            '% de alcance',
            'Planejamento Institucional',
            'Cadeia de Valor',
            'Plano',
            '# ID',
            'Status do Plano',
            'Participantes envolvidos',
            'Planos de Trabalhos vinculados',
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 35,
            'B' => 40,
            'C' => 14,
            'D' => 14,
            'E' => 12,
            'F' => 12,
            'G' => 12,
            'H' => 12,
            'I' => 12,
            'J' => 35,
            'K' => 10,
            'L' => 18,
            'M' => 14,
            'N' => 16,
        ];
    }

    /** @param RelatorioEntregaRowDTO $row */
    public function map($row): array
    {
        $statusLabel = PlanoEntrega::STATUSES[$row->plano_status] ?? $row->plano_status;
        $percentual = $row->meta_percentual;

        return [
            $row->unidadeHierarquia,
            $row->entregaNome,
            $this->dateValue($row->data_inicio),
            $this->dateValue($row->data_fim),
            $row->meta_planejado,
            $row->meta_alcancado,
            $percentual.'%',
            $row->qtd_planejamento_institucional,
            $row->qtd_cadeia_valor,
            $row->plano_rotulo,
            '#'.$row->plano_numero,
            $statusLabel,
            $row->qtd_participantes,
            $row->qtd_planos_trabalho,
        ];
    }

    private function dateValue(mixed $value): mixed
    {
        if ($value === null || $value === '') {
            return '-';
        }

        return Date::stringToExcel((string) $value);
    }

    public function columnFormats(): array
    {
        return [
            'C' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'D' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }

    public function properties(): array
    {
        return [
            'creator' => 'MGI',
            'title' => 'Relatório de Entregas',
            'description' => 'Relatório de Entregas do PGD Petrvs',
            'subject' => 'Entregas',
            'keywords' => 'pgd,entregas',
            'company' => 'MGI',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        $lastRow = max(1, $this->rows->count()) + 1;

        return [
            'A1:N'.$lastRow => [
                'borders' => [
                    'outline' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        'color' => ['argb' => '000000'],
                    ],
                ],
            ],
            1 => [
                'font' => ['bold' => true],
                'alignment' => ['vertical' => Alignment::VERTICAL_CENTER],
            ],
        ];
    }

    public static function afterSheet(AfterSheet $event): void
    {
        $event->sheet->getDelegate()->getRowDimension(1)->setRowHeight(45);
        $event->sheet->getDelegate()->getStyle('1')->getAlignment()->setWrapText(true);
        $event->sheet->getStyle('A1:N1')->getFill()
            ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
            ->getStartColor()->setARGB('fc9fc0');
    }
}
