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
        DB::query("DELETE FROM integracao_servidores
        WHERE id IN (
            SELECT * FROM (
                SELECT MIN(id) AS id
                FROM integracao_servidores
                GROUP BY cpf
                HAVING COUNT(*) > 1
            ) AS subquery
        );");
    } 

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
