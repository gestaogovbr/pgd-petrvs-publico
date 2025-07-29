<?php
namespace App\Exports;

use App\Exports\RelatorioPlanoTrabalhoExport;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RelatorioPlanoTrabalhoDetalhadoExport extends RelatorioPlanoTrabalhoExport
{
    public function headings(): array
    {
        return [
            [
                ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'PERÍODOS AVALIATIVOS'
            ], [
                '#ID',
                'Nome do Participante',
                'Unidade Executora',
                'Distribuição % da CHD no período',
                'Status do PT',
                'Início da Vigência',
                'Fim da Vigência',
                'Duração (dias)',
                'Início',
                'Fim',
                'Data de conclusão do Registro de Execução',
                'Situação do Registro de Execução',
                'Data da  Avaliação',
                'Situação da Avaliação',
                'Nota da avaliação',
                'Data do Recurso',
                'Data da Reavaliação',
                'Nota da reavaliação'
            ]
        ];
    }

    public function map($row): array
    {
        $map = parent::map($row);
        array_pop($map); //remove a colun de periodos avaliativos

        return array_merge($map, [
            Date::stringToExcel($row->data_inicio_avaliativo),
            Date::stringToExcel($row->data_fim_avaliativo),
            Date::stringToExcel($row->data_conclusao),
            $row->situacao_execucao,
            Date::stringToExcel($row->data_avaliacao),
            $row->situacao_avaliacao,
            $row->nota,
            Date::stringToExcel($row->data_recurso),
            Date::stringToExcel($row->data_avaliacao),
            $row->nota
        ]);
    }

    public function columnFormats(): array
    {
        return array_merge(parent::columnFormats(), [
            'I' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'J' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'K' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'M' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'P' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'Q' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ]);
    }

    public function columnWidths(): array
    {
        return array_merge(parent::columnWidths(), [
                'I' =>  15,
                'J' =>  15,
                'K' =>  15,
                'L' =>  20,
                'M' =>  20,
                'N' =>  20,
                'O' =>  20,
                'P' =>  15,
                'Q' =>  15,
                'R' =>  20,
        ]);
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->mergeCells('I1:R1');

        return [
            1   => [
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_NONE
                    ],
                ]
            ],
            'I1:R1' => [
                'borders' => [
                    'outline' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        'color' => ['argb' => '000000'],
                    ],
                ]
            ],
            2    => [
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
            'H' => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ]
            ],
            'I1:I'.(count($this->rows) + 2) => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'left' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        'color' => ['argb' => '000000'],
                    ],
                ]
            ],
            'D:R' => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                ]
            ],
            // borda no conjunto inteiro + 2 linhas de header
            'A1:R'.(count($this->rows) + 2) => [
                'borders' => [
                    'outline' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        'color' => ['argb' => '000000'],
                    ],
                ]
            ]
        ];
    }

    public static function afterSheet(AfterSheet $event)
    {
        $event->sheet->getDelegate()->getRowDimension('1')->setRowHeight(20);
        $event->sheet->getDelegate()->getRowDimension('2')->setRowHeight(60);
        $event->sheet->getDelegate()->getStyle('2')->getAlignment()->setWrapText(true);
        $event->sheet->getStyle('A1:R2')->getFill()
          ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
          ->getStartColor()->setARGB('fc9fc0');
    }
}
