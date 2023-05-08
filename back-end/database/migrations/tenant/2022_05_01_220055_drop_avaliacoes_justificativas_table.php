<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropAvaliacoesJustificativasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('atividades_tipos_processos', function (Blueprint $table) {
            $table->dropForeign(['atividade_id']);
            $table->dropColumn('atividade_id');
        });
        Schema::table('atividades_tipos_processos', function (Blueprint $table) {
            $table->foreignUuid('atividade_id')->constrained('atividades')->onDelete('restrict')->onUpdate('cascade');
        });
        Schema::dropIfExists('avaliacoes_justificativas');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('atividades_tipos_processos', function (Blueprint $table) {
            $table->dropForeign(['atividade_id']);
            $table->dropColumn('atividade_id');
        });
        Schema::table('atividades_tipos_processos', function (Blueprint $table) {
            $table->foreignUuid('atividade_id')->constrained('avaliacoes_justificativas')->onDelete('restrict')->onUpdate('cascade');
        });
        // Não é necessário recriar a tabela, essa tabela é obsoleta 
    }
}
