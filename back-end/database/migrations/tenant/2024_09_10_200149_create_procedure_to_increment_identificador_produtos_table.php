<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
            CREATE PROCEDURE sequence_plano_trabalho_numero() BEGIN
                UPDATE sequences SET plano_trabalho_numero = plano_trabalho_numero + 1;
                SELECT plano_trabalho_numero AS number FROM sequences;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_plano_trabalho_numero');
    }
};
