<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterComentariosTableAddEntregaId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comentarios', function (Blueprint $table) {
            $table->foreignUuid('demanda_entrega_id')->nullable()->constrained("demandas_entregas")->onDelete('cascade')->onUpdate('cascade')->comment("Comentário da entrega");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('comentarios', function (Blueprint $table) {
            $table->dropForeign('demanda_entrega_id');
            $table->dropColumn('demanda_entrega_id');
        });
    }
}
