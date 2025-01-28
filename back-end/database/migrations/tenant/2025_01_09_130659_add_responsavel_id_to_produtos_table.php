<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();
        //garante que as tabelas estejam limpas para adicionar a chave estrangeira
        DB::table('produto_produto')->truncate();
        DB::table('produto_processo_cadeia_valor')->truncate();
        DB::table('produtos_solucoes')->truncate();
        DB::table('produto_clientes')->truncate();
        DB::table('produtos')->truncate();
        Schema::enableForeignKeyConstraints();

        if (!Schema::hasColumn('produtos', 'responsavel_id')) {
            Schema::table('produtos', function (Blueprint $table) {
                $table->uuid('responsavel_id')->after('id');
                $table->foreign('responsavel_id')->references('id')->on('usuarios')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produtos', function (Blueprint $table) {
            $table->dropForeign(['responsavel_id']);
            $table->dropColumn('responsavel_id');
        });
    }
};
