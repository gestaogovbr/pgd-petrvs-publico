<?php

namespace App\Services\CSV;

use App\Models\PlanoTrabalho;

class RelatorioPlanoTrabalhoCsv extends CsvExporter
{
    protected static function getHeaders(): array
    {
        return [
            '#ID',
            'Nome do Participante',
            'Unidade Executora',
            'Distribuição % da CHD no período',
            'Data Fim',
            'Status'
        ];
    }

    protected static function getRowData($row): array
    {
        return [
            $row->numero,
            $row->participanteNome,
            $row->unidadeHierarquia,
            number_format((float) $row->chd, 2, ','),
            $row->dataFim,
            PlanoTrabalho::STATUSES[$row->status] ?? $row->status
        ];
    }
}
