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
        Schema::table('afastamentos', function (Blueprint $table) {
            $table->integer('horas')->nullable(true)->after('data_fim');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('afastamentos', function (Blueprint $table) {
            $table->dropColumn('horas');
        });
    }
};
