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
        Schema::table('envios', function (Blueprint $table) {
            $table->integer('qtde_participantes_sucessos')->default(0);
            $table->integer('qtde_participantes_falhas')->default(0);
            $table->integer('qtde_entregas_sucessos')->default(0);
            $table->integer('qtde_entregas_falhas')->default(0);
            $table->integer('qtde_trabalhos_sucessos')->default(0);
            $table->integer('qtde_trabalhos_falhas')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('envios', function (Blueprint $table) {
            $table->dropColumn('qtde_participantes_sucessos');
            $table->dropColumn('qtde_participantes_falhas');
            $table->dropColumn('qtde_entregas_sucessos');
            $table->dropColumn('qtde_entregas_falhas');
            $table->dropColumn('qtde_trabalhos_sucessos');
            $table->dropColumn('qtde_trabalhos_falhas');
        });
    }
};
