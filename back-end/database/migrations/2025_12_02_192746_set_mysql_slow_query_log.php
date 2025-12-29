<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::getDriverName() !== 'mysql') {
            return;
        }

        $slow = DB::select("SHOW VARIABLES LIKE 'slow_query_log'");
        $file = DB::select("SHOW VARIABLES LIKE 'slow_query_log_file'");
        $slowVal = isset($slow[0]) ? ($slow[0]->Value ?? $slow[0]->Value ?? ($slow[0]->value ?? null)) : null;
        $fileVal = isset($file[0]) ? ($file[0]->Value ?? $file[0]->Value ?? ($file[0]->value ?? null)) : null;
        if ($slowVal === 'ON' || $slowVal === '1') {
            return;
        }
        DB::beginTransaction();
        try {
            DB::statement("SET GLOBAL slow_query_log = 1");
            DB::statement("SET GLOBAL slow_query_log_file = '/var/log/mysql/mysql-slow.log'");
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Erro ao configurar slow query log: ' . $e->getMessage());
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() !== 'mysql') {
            return;
        }

        DB::beginTransaction();
        try {
            DB::statement("SET GLOBAL slow_query_log = 0");
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Erro ao reverter slow query log: ' . $e->getMessage());
        }
    }
};
