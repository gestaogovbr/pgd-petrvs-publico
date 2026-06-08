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
        DB::statement('DROP VIEW IF EXISTS view_api_pgd');
        DB::statement('DROP VIEW IF EXISTS view_pgd_usuarios');
        DB::statement('DROP VIEW IF EXISTS view_pgd_planos_entrega');
        DB::statement('DROP VIEW IF EXISTS view_pgd_planos_trabalho');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
