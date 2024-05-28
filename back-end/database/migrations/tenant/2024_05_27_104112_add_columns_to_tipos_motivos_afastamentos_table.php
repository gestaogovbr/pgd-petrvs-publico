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
        Schema::table('tipos_motivos_afastamentos', function (Blueprint $table) {
          $table->enum('calculo', ['ACRESCIMO', 'DECRESCIMO'])->comment('Usado para calcular as horas do agente público')->nullable(false)->default('DECRESCIMO')->after('nome'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tipos_motivos_afastamentos', function (Blueprint $table) {
            $table->dropColumn('calculo');
        });
    }
};
