<?php

declare(strict_types=1);

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class RelatorioLacunaPlanoTrabalhoExport implements FromCollection, WithMapping, WithHeadings
{
    public function __construct(private readonly mixed $rows) {}

    public function collection()
    {
        return collect($this->rows);
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
}
