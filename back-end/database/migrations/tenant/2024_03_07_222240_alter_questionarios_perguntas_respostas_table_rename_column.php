<?php

use Illuminate\Database\Migrations\Migration;
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
      Schema::table('questionarios_perguntas_respostas', function (Blueprint $table) {
        $table->dropForeign('fk_questionario_resp_id');
        $table->renameColumn('questionario_resposta_id', 'questionario_preenchimento_id');
      });

      Schema::table('questionarios_perguntas_respostas', function (Blueprint $table) {
        $table->foreign('questionario_preenchimento_id','fk_questionario_preenchimento_id')->references('id')->on("questionarios_preenchimentos")->onDelete('restrict')->onUpdate('cascade')->comment("Preenchimento");
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table('questionarios_perguntas_respostas', function (Blueprint $table) {
        $table->dropForeign('fk_questionario_preenchimento_id');
        $table->renameColumn('questionario_preenchimento_id','questionario_resposta_id');
      });

      Schema::table('questionarios_perguntas_respostas', function (Blueprint $table) {
        $table->foreign('questionario_resposta_id','fk_questionario_resp_id')->references('id')->on("questionarios_preenchimentos")->onDelete('restrict')->onUpdate('cascade')->comment("Preenchimento");
      });
    }
};
