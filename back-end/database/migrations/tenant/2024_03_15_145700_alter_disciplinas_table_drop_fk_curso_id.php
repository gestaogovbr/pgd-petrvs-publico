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
    Schema::table('disciplinas', function (Blueprint $table) {
      $table->dropForeign('materias_curso_id_foreign');
      //$table->dropForeign(['curso_id']);
      $table->dropColumn('curso_id');
    });
  }
  /**
   * Reverse the migrations.
   *
   */
  public function down()
  {
    Schema::table('disciplinas', function (Blueprint $table) {
      $table->uuid('curso_id')->nullable();
      $table->foreign('curso_id', 'materias_curso_id_foreign')->nullable()->references('id')->on('cursos')->onDelete('restrict')->onUpdate('cascade')->comment("FK Curso ID");
      //$table->foreignUuid('curso_id')->nullable(true)->constrained('cursos', 'materias_curso_id_foreign')->onDelete('restrict')->onUpdate('cascade');
    });
  }
};
