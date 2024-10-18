<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('integracao_unidades')->truncate();
        DB::table('integracao_servidores')->truncate();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //nada a ser feito
    }
};
