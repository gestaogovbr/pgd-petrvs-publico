<?php
namespace App\Http\Responses;

use Illuminate\Support\Facades\Response;

class CsvResponse
{
    public static function fromData(string $csv, string $filename = 'export.csv', int $status = 200)
    {
        return Response::make($csv, $status, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }
}
