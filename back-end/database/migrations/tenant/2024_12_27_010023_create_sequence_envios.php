<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $maxNumero = DB::table('envios')->max('numero') + 1;
        DB::statement("CREATE SEQUENCE seq_envios START WITH $maxNumero INCREMENT BY 1 MINVALUE 1 NOCYCLE CACHE 0");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP SEQUENCE seq_envios');
    }
};
