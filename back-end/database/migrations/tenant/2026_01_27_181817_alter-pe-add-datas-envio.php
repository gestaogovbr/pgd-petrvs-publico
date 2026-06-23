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
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->timestamp('data_agendamento_envio')->nullable()->comment('Data do agendamento para envio para a API');
            $table->timestamp('data_tentativa_envio')->nullable()->comment('Data da Ultima Tentativa de Envio');
            $table->text('log_envio')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->dropColumn('data_agendamento_envio');
            $table->dropColumn('data_tentativa_envio');
            $table->dropColumn('log_envio');
        });
    }
};
