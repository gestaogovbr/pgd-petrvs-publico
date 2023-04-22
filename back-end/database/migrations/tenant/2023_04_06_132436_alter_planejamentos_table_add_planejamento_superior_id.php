<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanejamentosTableAddPlanejamentoSuperiorId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planejamentos', function (Blueprint $table) {
            $table->foreignUuid('planejamento_superior_id')->nullable()->constrained("planejamentos")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planejamentos', function (Blueprint $table) {
            $table->dropForeign(['planejamento_superior_id']);
            $table->dropColumn('planejamento_superior_id');
        });
    }
}
