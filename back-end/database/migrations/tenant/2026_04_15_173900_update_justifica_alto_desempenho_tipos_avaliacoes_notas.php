<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('tipos_avaliacoes_notas')
            ->where('nota', 'LIKE', '%Alto desempenho%')
            ->update(['justifica' => 1]);
    }

    public function down(): void
    {
        DB::table('tipos_avaliacoes_notas')
            ->where('nota', 'LIKE', '%Alto desempenho%')
            ->update(['justifica' => 0]);
    }
};
