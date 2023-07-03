<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AlterDemandasAddEntregaProgresso extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('demandas', function (Blueprint $table) {
            $table->decimal('progresso', 5, 2)->default(0)->comment("Progresso da realização da atividade");
            $table->foreignUuid('entrega_id')->nullable()->constrained("planos_trabalhos_entregas")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projetos_tarefas', function (Blueprint $table) {
            $table->dropColumn('progresso');
            $table->dropForeign(['entrega_id']);
            $table->dropColumn('entrega_id');
        });
    }
}
