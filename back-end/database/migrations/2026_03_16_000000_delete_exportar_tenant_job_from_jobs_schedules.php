<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('jobs_schedules')
            ->where('classe', 'ExportarTenantJob')
            ->delete();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Intencionalmente vazio: não é possível restaurar os registros excluídos.
    }
};

