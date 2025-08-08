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
        DB::transaction(function () {
            DB::table('integracao_servidores')->update(['data_modificacao' => DateTime::createFromFormat('dmY', '01012020')->format('Y-m-d 00:00:00')]);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
