<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterProgramasAdesoesTableAddNumero extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(Schema::hasTable('programas_adesoes') && !Schema::hasColumn('programas_adesoes', 'numero')) {
            Schema::table('programas_adesoes', function (Blueprint $table) {
                $table->integer('numero')->default(0)->comment("Número da adesão (Gerado pelo sistema)");
            });
            $numero = 1;
            foreach (DB::table("programas_adesoes")->get() as $adesao) {
                DB::table("programas_adesoes")->where('id', $adesao->id)->update(['numero' => $numero]);
                $numero++;
            }
            Schema::table('programas_adesoes', function (Blueprint $table) {
                $table->unique(['numero']);
            });
        }
        /* Correção necessária devido a erro na criação da Migration (Rollback está excluindo campo número da tabela planos ao invés de fazer o que deveria) */
        if(Schema::hasTable('planos') && !Schema::hasColumn('planos', 'numero')) {
            Schema::table('planos', function (Blueprint $table) {
                $table->integer('numero')->default(0)->comment("Número do plano (Gerado pelo sistema)");
            });
            $numero = 1;
            foreach (DB::table("planos")->get() as $adesao) {
                DB::table("planos")->where('id', $adesao->id)->update(['numero' => $numero]);
                $numero++;
            }
            Schema::table('planos', function (Blueprint $table) {
                $table->unique(['numero']);
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('programas_adesoes', function (Blueprint $table) {
            $table->dropUnique(['numero']);
            $table->dropColumn('numero');
        });
    }
}
