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
    Schema::table('historicos_docencias_internas', function (Blueprint $table) {
      // Exclui a restrição de integridade associada ao campo curso_id
      $table->dropForeign('fk_hist_docen_int_id_curso_id');
      $table->dropColumn('curso_id');
      // Cria a restrição de integridade associada ao campo disciplina_id
      $table->uuid('disciplina_id');
      $table->foreign('disciplina_id')->references('id')->on('disciplinas')->onDelete('restrict')->onUpdate('cascade')->comment("Disciplina da qual o servidor é docente.");
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('historicos_docencias_internas', function (Blueprint $table) {
      // Exclui a restrição de integridade associada ao campo disciplina_id
      $table->dropForeign(['disciplina_id']);
      $table->dropColumn('disciplina_id');
      // Cria a restrição de integridade associada ao campo curso_id
      $table->uuid('curso_id');
      $table->foreign('curso_id', 'fk_hist_docen_int_id_curso_id')->references('id')->on('cursos')->onDelete('restrict')->onUpdate('cascade')->comment("Curso FK.");
    });
  }
};
