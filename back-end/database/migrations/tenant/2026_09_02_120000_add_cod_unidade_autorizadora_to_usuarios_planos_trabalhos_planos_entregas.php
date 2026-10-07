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
            $table->string('cod_unidade_autorizadora', 20)->nullable()->comment('Código da unidade autorizadora utilizado no envio para a API PGD');
        });

        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->string('cod_unidade_autorizadora', 20)->nullable()->comment('Código da unidade autorizadora utilizado no envio para a API PGD');
        });

        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->string('cod_unidade_autorizadora', 20)->nullable()->comment('Código da unidade autorizadora utilizado no envio para a API PGD');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('cod_unidade_autorizadora');
        });

        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->dropColumn('cod_unidade_autorizadora');
        });

        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->dropColumn('cod_unidade_autorizadora');
        });
    }
};
