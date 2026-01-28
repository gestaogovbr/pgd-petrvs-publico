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
        Schema::create('atividades_pausas', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data de início da pausa");
            $table->dateTime('data_fim')->nullable()->comment("Data de retorno");
            // Chaves estrangeiras:
            $table->foreignUuid('atividade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Atividade");
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
};
