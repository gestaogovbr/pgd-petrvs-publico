<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class RelatorioPlanoEntregaLacunaExport implements FromCollection, WithMapping, WithHeadings
{
    public function __construct(
        protected $rows
    ) {
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
            'UORG',
            'Lacuna',
            'Quantidade de Dias',
        ];
    }

    public function map($row): array
    {
        $inicio = $row->data_inicio ? date('d/m/Y', strtotime((string) $row->data_inicio)) : '';
        $fim = $row->data_fim ? date('d/m/Y', strtotime((string) $row->data_fim)) : '';

        return [
            $row->unidadeHierarquia,
            $row->nome,
            $row->codigo,
            trim($inicio . ' a ' . $fim),
            $row->quantidade_dias,
        ];
    }
}
