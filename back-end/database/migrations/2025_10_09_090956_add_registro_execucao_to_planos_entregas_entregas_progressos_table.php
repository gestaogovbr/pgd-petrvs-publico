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
        Schema::table('planos_entregas_entregas_progressos', function (Blueprint $table) {
            $table->longText('registro_execucao')->nullable()->comment('Registro de execução da entrega');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planos_entregas_entregas_progressos', function (Blueprint $table) {
            $table->dropColumn('registro_execucao');
        });
    }
};
