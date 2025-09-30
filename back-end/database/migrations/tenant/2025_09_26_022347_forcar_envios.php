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
       DB::statement('update planos_trabalhos set data_envio_api_pgd = null');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
