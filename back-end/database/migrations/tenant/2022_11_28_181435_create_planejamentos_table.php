<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanejamentosTable extends Migration
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
            $table->dateTime('inicio')->comment("Data de inicio do planejamento institucional");
            $table->dateTime('fim')->nullable()->comment("Data do fim do planejamento institucional");
            $table->dateTime('data_arquivamento')->nullable()->comment("Data de arquivamento do planejamento institucional");
            $table->json('valores')->comment("Valores da entidade/unidade");
            // Chaves estrangeiras:
            $table->foreignUuid('entidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Entidade do planejamento institucional");
            $table->foreignUuid('unidade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Unidade do planejamento institucional (opcional)");
            $table->foreignUuid('planejamento_pai_id')->nullable()->constrained("planejamentos")->onDelete('restrict')->onUpdate('cascade')->comment("Planejamento institucional superior (obrigatório, se o planejamento for de uma unidade)");
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
}
