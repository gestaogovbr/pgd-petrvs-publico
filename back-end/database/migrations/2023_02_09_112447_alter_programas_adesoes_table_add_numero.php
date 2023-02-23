<?php

use App\Models\Adesao;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProgramasAdesoesTableAddNumero extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::table('programas_adesoes', function (Blueprint $table) {
            $table->integer('numero')->default(0)->comment("Número da adesão (Gerado pelo sistema)");
        });
        $numero = 1;
        foreach (Adesao::all() as $adesao) {
            $adesao->numero = $numero;
            $numero++;
            $adesao->save();
        }
        Schema::table('programas_adesoes', function (Blueprint $table) {
            $table->unique(['numero']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planos', function (Blueprint $table) {
            $table->dropUnique(['numero']);
            $table->dropColumn('numero');
        });
    }
}
