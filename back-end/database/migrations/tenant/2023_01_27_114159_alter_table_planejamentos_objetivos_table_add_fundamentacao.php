<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTablePlanejamentosObjetivosTableAddFundamentacao extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->string('fundamentacao', 256)->comment("Fundamentação");
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->dropColumn('fundamentacao');
        });
    }
}
