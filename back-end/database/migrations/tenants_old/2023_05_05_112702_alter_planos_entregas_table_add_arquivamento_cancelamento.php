<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlanosEntregasTableAddArquivamentoCancelamento extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("planos_entregas", function(Blueprint $table) {
            $table->dateTime('data_arquivamento')->nullable()->comment("Data de arquivamento do plano de entregas");
            $table->dateTime('data_cancelamento')->nullable()->comment("Data de cancelamento do plano de entregas");
            $table->foreignUuid('cancelamento_usuario_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table("planos_entregas", function(Blueprint $table) {
            $table->dropColumn('data_arquivamento');
            $table->dropColumn('data_cancelamento');
            $table->dropForeign(['cancelamento_usuario_id']);
            $table->dropColumn('cancelamento_usuario_id');
        });
        Schema::enableForeignKeyConstraints();
    }
}
