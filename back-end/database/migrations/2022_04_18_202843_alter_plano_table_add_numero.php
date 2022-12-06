<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Plano;

class AlterPlanoTableAddNumero extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planos', function (Blueprint $table) {
            $table->integer('numero')->default(0)->comment("Número do plano (Gerado pelo sistema)");
        });
        $numero = 1;
        foreach (Plano::all() as $plano) {
            $plano->numero = $numero;
            $numero++;
            $plano->save();
        }
        Schema::table('planos', function (Blueprint $table) {
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
