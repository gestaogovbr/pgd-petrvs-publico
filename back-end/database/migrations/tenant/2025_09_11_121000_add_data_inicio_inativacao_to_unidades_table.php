<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('unidades', function (Blueprint $table) {
            $table->dateTime('data_inicio_inativacao')
                      ->nullable()
                      ->after('data_inativacao')
                      ->comment('Data de início do processo de inativação da unidade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('unidades', function (Blueprint $table) {
             $table->dropColumn('data_inicio_inativacao');
        });
    }
};