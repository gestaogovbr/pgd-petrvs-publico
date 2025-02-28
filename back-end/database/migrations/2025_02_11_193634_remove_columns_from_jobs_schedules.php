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
        Schema::table('jobs_schedules', function (Blueprint $table) {
            $table->dropColumn(['minutos', 'horas', 'dias', 'semanas', 'meses']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs_schedules', function (Blueprint $table) {
            $table->integer('minutos')->nullable();
            $table->integer('horas')->nullable();
            $table->integer('dias')->nullable();
            $table->integer('semanas')->nullable();
            $table->integer('meses')->nullable();
        });
    }
};
