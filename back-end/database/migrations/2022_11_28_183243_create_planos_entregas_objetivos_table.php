<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosEntregasObjetivosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_entregas_objetivos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            // Chaves estrangeiras:
            $table->foreignUuid('objetivo_id')->constrained("planejamentos_objetivos")->onDelete('restrict')->onUpdate('cascade');
            /*$table->uuid('planejamento_entrega_id');
            $table->foreign('planejamento_entrega_id', 'fk_planej_entr_obj_planej_entr_id')->references('id')->on('planejamentos_entregas')->onDelete('restrict')->onUpdate('cascade');*/
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
        Schema::dropIfExists('planos_entregas_objetivos');
        Schema::enableForeignKeyConstraints();
    }
}
