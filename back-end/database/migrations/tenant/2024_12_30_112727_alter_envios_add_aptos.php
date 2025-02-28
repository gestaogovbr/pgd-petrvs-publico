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
            $table->integer('qtde_participantes_aptos')->default(0);
            $table->integer('qtde_entregas_aptos')->default(0);
            $table->integer('qtde_trabalhos_aptos')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('envios', function (Blueprint $table) {
            $table->dropColumn('qtde_participantes_aptos');
            $table->dropColumn('qtde_entregas_aptos');
            $table->dropColumn('qtde_trabalhos_aptos');
        });
    }
};
