<?php

namespace Tests;

use Illuminate\Support\Facades\DB;

class DatabaseSetup
{
    public static function DBup(): void
    {
        $sqlPath = __DIR__ . '/sqlite.sql';
        $sql = file_get_contents($sqlPath);

        $statements = array_filter(array_map('trim', explode(';', $sql)));

        DB::statement('PRAGMA foreign_keys = OFF');

        foreach ($statements as $statement) {
            if (!empty($statement) && 
                !str_starts_with($statement, '--') &&
                !str_starts_with($statement, 'PRAGMA') &&
                !str_starts_with($statement, 'BEGIN') &&
                !str_starts_with($statement, 'COMMIT')) {
                try {
                    DB::statement($statement);
                } catch (\Exception $e) {
                    echo "Error: " . $e->getMessage() . "\n";
                }
            }
        }
    }
}
