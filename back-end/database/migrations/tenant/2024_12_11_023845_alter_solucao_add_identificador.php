<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::table('solucao_produtos_servicos', function (Blueprint $table) {            
            $table->bigInteger('identificador')->unsigned()->nullable(true);
            $table->unique(['identificador']);
        });

        DB::statement("UPDATE solucao_produtos_servicos SET identificador = (@seq := coalesce(@seq, 0) + 1) ORDER BY id");

        Schema::table('solucao_produtos_servicos', function (Blueprint $table) {            
            $table->bigInteger('identificador')->unsigned()->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produtos', function (Blueprint $table) {
            $table->dropUnique(['identificador']);
            $table->dropColumn(['identificador']);
        });
    }
};
