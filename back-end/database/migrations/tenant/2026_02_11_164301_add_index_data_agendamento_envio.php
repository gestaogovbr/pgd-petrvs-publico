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
        Schema::table('usuarios', function (Blueprint $table) {
            $table->index(['data_agendamento_envio']);
        });

        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->index('data_agendamento_envio');
        });

        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->index('data_agendamento_envio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->dropIndex(['data_agendamento_envio']);
        });

        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->dropIndex(['data_agendamento_envio']);
        });

        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropIndex(['data_agendamento_envio']);
        });
    }
};
