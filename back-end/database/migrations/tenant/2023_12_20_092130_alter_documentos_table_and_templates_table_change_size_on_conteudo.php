<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documentos', function (Blueprint $table) {
          $table->longText('template')->change();
        });

        Schema::table('templates', function (Blueprint $table) {
          $table->longText('conteudo')->change();
        });

    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('documentos', function (Blueprint $table) {
          $table->text('template')->change();
        });

        Schema::table('templates', function (Blueprint $table) {
          $table->text('conteudo')->change();
        });

    }
};
