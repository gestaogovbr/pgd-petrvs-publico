<?php
namespace App\Services\CSV;

class CsvExporter
{
    protected static function getHeaders(): array {
        return [];
    }

    protected static function getRowData($row): array
    {
        return [];
    }

    public static function toCSV($rows): string
    {
        $handle = fopen('php://temp', 'w');

        // Adiciona BOM UTF-8 para Excel abrir com acentuação correta
        fwrite($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));

        // Cabeçalhos
        fputcsv($handle, static::getHeaders(), ';');

        // Linhas
        foreach ($rows as $row) {
            fputcsv($handle, static::getRowData($row), ';');
        }

        rewind($handle);
        $csv = stream_get_contents($handle);
        fclose($handle);

        return $csv;
    }
}
