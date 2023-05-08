<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanejamentosObjetivosTableAddObjetivoPaiPath extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->text('path')->nullable()->comment('Path dos nós pais separados por /, ou null caso sejam nós raiz');
            $table->foreignUuid('objetivo_pai_id')->nullable()->constrained("planejamentos_objetivos")->onDelete('restrict')->onUpdate('cascade');
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
            $table->dropColumn('path');
            $table->dropForeign(['objetivo_pai_id']);
            $table->dropColumn('objetivo_pai_id');
        });
    }
}
