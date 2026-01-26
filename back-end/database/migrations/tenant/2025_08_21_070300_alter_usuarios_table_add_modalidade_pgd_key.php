<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Atribuir null aos registros que não têm referência válida
        $validIds = DB::table('tipos_modalidades_siape')
            ->pluck('id');
            
        DB::table('usuarios')
            ->whereNotNull('modalidade_pgd')
            ->whereNotIn('modalidade_pgd', $validIds)
            ->update(['modalidade_pgd' => null]);
        
        DB::table('integracao_servidores')
            ->whereNotNull('modalidade_pgd')
            ->whereNotIn('modalidade_pgd', $validIds)
            ->update(['modalidade_pgd' => null]);
        
        Schema::table('usuarios', function (Blueprint $table){
            $table->foreign('modalidade_pgd')->references('id')->on('tipos_modalidades_siape');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropForeign('usuarios_modalidade_pgd_foreign');
        });
    }
};
