<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('planos_entregas_entregas_produtos', function (Blueprint $table) {
            // Primeiro, remova a chave estrangeira existente
            $table->dropForeign(['entrega_id']);

            // Em seguida, recrie a chave estrangeira com o comportamento desejado
            $table->foreign('entrega_id')
                ->references('id')->on('planos_entregas_entregas')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planos_entregas_entregas_produtos', function (Blueprint $table) {
            // Primeiro, remova a chave estrangeira alterada
            $table->dropForeign(['entrega_id']);

            // Recrie a chave estrangeira original (sem o `ON UPDATE CASCADE`, se necessário)
            $table->foreign('entrega_id')
                ->references('id')->on('planos_entregas_entregas')
                ->onUpdate('restrict'); // Altere conforme o comportamento original
        });
    }
};
