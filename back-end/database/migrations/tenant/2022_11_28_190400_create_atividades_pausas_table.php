<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAtividadesPausasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('atividades_pausas', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('inicio')->comment("Data inicio da pausa");
            $table->dateTime('fim')->nullable()->comment("Data de retorno");
            // Chaves estrangeiras:
            $table->foreignUuid('atividade_id')->onDelete('restrict')->onUpdate('cascade')->comment("Atividade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('atividades_pausas');
    }
}
