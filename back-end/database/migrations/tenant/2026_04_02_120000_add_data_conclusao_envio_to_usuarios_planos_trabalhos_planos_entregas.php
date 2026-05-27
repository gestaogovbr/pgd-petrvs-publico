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
            $table->timestamp('data_conclusao_envio')->nullable()->comment('Data em que o envio foi concluído com sucesso na API PGD');
        });

        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->timestamp('data_conclusao_envio')->nullable()->comment('Data em que o envio foi concluído com sucesso na API PGD');
        });

        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->timestamp('data_conclusao_envio')->nullable()->comment('Data em que o envio foi concluído com sucesso na API PGD');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('data_conclusao_envio');
        });

        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->dropColumn('data_conclusao_envio');
        });

        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->dropColumn('data_conclusao_envio');
        });
    }
};
