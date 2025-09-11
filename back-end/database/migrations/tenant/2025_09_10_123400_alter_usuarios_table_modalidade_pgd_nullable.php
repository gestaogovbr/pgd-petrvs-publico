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
            $table->dropForeign('usuarios_modalidade_pgd_foreign');
        });
        
        Schema::table('usuarios', function (Blueprint $table) {
            $table->uuid('modalidade_pgd')->nullable()->change();
        });
        
        Schema::table('usuarios', function (Blueprint $table) {
            $table->foreign('modalidade_pgd')->references('id')->on('tipos_modalidades_siape');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropForeign('usuarios_modalidade_pgd_foreign');
        });
        
        Schema::table('usuarios', function (Blueprint $table) {
            $table->uuid('modalidade_pgd')->nullable(false)->change();
        });
        
        Schema::table('usuarios', function (Blueprint $table) {
            $table->foreign('modalidade_pgd')->references('id')->on('tipos_modalidades_siape');
        });
    }
};