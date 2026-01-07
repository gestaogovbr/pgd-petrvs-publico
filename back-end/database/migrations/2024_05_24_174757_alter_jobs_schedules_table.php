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
            $table->dropColumn(['diario', 'horario']);
        });

        Schema::table('jobs_schedules', function (Blueprint $table) {
            $table->renameColumn('nome_do_job', 'nome');
        });

        Schema::table('jobs_schedules', function (Blueprint $table) {
            $table->addColumn('string', 'classe', [
                'length' => 100,
                'nullable' => false,
            ])->after('nome');
            $table->addColumn('integer', 'minutos')->after('classe')->nullable(true);
            $table->addColumn('integer', 'horas')->after('minutos')->nullable(true);
            $table->addColumn('integer', 'dias')->after('horas')->nullable(true);
            $table->addColumn('integer', 'semanas')->after('dias')->nullable(true);
            $table->addColumn('integer', 'meses')->after('semanas')->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs_schedules', function (Blueprint $table) {
            $table->renameColumn('nome', 'nome_do_job');
            if (Schema::hasColumn('jobs_schedules', 'minutos')) {
                $table->dropColumn('minutos');
            }
            if (Schema::hasColumn('jobs_schedules', 'horas')) {
                $table->dropColumn('horas');
            }
            if (Schema::hasColumn('jobs_schedules', 'dias')) {
                $table->dropColumn('dias');
            }
            if (Schema::hasColumn('jobs_schedules', 'semanas')) {
                $table->dropColumn('semanas');
            }
            if (Schema::hasColumn('jobs_schedules', 'meses')) {
                $table->dropColumn('meses');
            }
            if (Schema::hasColumn('jobs_schedules', 'classe')) {
                $table->dropColumn('classe');
            }
            $table->addColumn('boolean', 'diario')->after('nome')->default(false);
            $table->addColumn('time', 'horario')->after('diario')->nullable(true);
        });
    }
};
