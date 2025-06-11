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
            $table->string('expressao_cron')->nullable()->change();
            $table->string('periodicidade', 15)->default('custom');
            $table->integer('dia')->nullable();
            $table->string('horario', 5)->nullable();
            $table->string('intervalo_tipo', 10)->nullable();
            $table->integer('intervalo_qtde')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs_schedules', function (Blueprint $table) {
            $table->dropColumn('periodicidade');
            $table->dropColumn('dia');
            $table->dropColumn('horario');
            $table->dropColumn('intervalo_tipo');
            $table->dropColumn('intervalo_qtde');
            $table->string('expressao_cron')->nullable(false)->change();
        });
    }
};
