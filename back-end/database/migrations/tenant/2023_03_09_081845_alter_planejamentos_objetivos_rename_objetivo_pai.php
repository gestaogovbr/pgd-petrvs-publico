<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanejamentosObjetivosRenameObjetivoPai extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->dropForeign('planejamentos_objetivos_objetivo_pai_id_foreign');
            $table->dropColumn('objetivo_pai_id');
            $table->foreignUuid('objetivo_superior_id')->nullable()->constrained("planejamentos_objetivos")->onDelete('restrict')->onUpdate('cascade');
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
            $table->dropForeign('planejamentos_objetivos_objetivo_superior_id_foreign');
            $table->dropColumn('objetivo_superior_id');
            $table->foreignUuid('objetivo_pai_id')->nullable()->constrained("planejamentos_objetivos")->onDelete('restrict')->onUpdate('cascade');
        });
    }
}
