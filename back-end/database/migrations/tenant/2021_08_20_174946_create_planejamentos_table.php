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
        Schema::create('planejamentos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome do planejamento institucional");
            $table->text('missao')->comment("Missão da entidade/unidade");
            $table->text('visao')->comment("Visão da entidade/unidade");
            $table->dateTime('data_inicio')->comment("Data de início do planejamento institucional");
            $table->dateTime('data_fim')->comment("Data final do planejamento institucional");
            $table->dateTime('data_arquivamento')->nullable()->comment("Data de arquivamento do planejamento institucional");
            $table->json('valores')->comment("Valores da unidade");
            $table->json('resultados_institucionais')->nullable()->comment("Resultados da unidade");
            // Chaves estrangeiras:
            $table->foreignUuid('entidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Entidade do planejamento institucional");
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Unidade do planejamento institucional");
            $table->foreignUuid('planejamento_superior_id')->nullable()->constrained("planejamentos")->onDelete('restrict')->onUpdate('cascade')->comment("Planejamento institucional superior (opcional)");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planejamentos');

    }
};
