<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProgramasAdesoesTableAddEntidadeId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('programas_adesoes', function (Blueprint $table) {
            $table->foreignUuid('entidade_id')->nullable()->constrained("entidades")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('programas_adesoes', function (Blueprint $table) {
            $table->dropForeign(['entidade_id']);
            $table->dropColumn('entidade_id');
        });
    }
}
