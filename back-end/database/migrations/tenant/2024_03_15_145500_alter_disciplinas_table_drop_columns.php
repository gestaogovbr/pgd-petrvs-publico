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
      $table->dropColumn('horas_aula');
      $table->string('sigla', 20)->nullable()->comment("Sigla da disciplina.");
    });
  }

  /**
   * Reverse the migrations.
   *
   */
  public function down()
  {
    Schema::table('disciplinas', function (Blueprint $table) {
      $table->dropColumn('sigla');
      $table->tinyInteger('horas_aula')->nullable()->comment("Horas aula da matéria");
    });
  }
};
