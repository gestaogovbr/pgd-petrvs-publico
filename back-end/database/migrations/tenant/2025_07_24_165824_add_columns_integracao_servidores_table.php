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
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->string('nome_jornada', 100)->comment('Codigo da Jornada')->nullable(); 
            $table->integer('cod_jornada')->comment('Nome da Jornada')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->dropColumn('nome_jornada'); 
            $table->dropColumn('cod_jornada'); 
        });
    }
};
